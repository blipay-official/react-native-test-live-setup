const http = require('node:http');
const { randomUUID } = require('node:crypto');
const { seedAnalyses } = require('./seed');

const PORT = Number(process.env.PORT ?? 3000);
const FAILURE_RATE = Number(process.env.FAILURE_RATE ?? 0);
const PENDING_SECONDS = Number(process.env.PENDING_SECONDS ?? 20);
const PAGE_SIZE = 20;

const analyses = seedAnalyses(PENDING_SECONDS);

function resolvePending(analysis) {
  if (analysis.status !== 'PENDING' || Date.now() < analysis.resolve_at) return analysis;
  const income = analysis.type === 'PERSON' ? analysis.income : analysis.revenue / 4;
  analysis.status = income >= 1500 ? 'APPROVED' : 'DENIED';
  if (analysis.status === 'APPROVED') analysis.max_amount = Math.round(income * 3);
  return analysis;
}

function toResponse(analysis) {
  const { resolve_at, ...rest } = resolvePending(analysis);
  return rest;
}

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch {
        resolve(null);
      }
    });
  });
}

function validatePerson(body) {
  const errors = [];
  if (!body) return [{ field: 'body', message: 'invalid JSON' }];
  if (typeof body.name !== 'string' || body.name.trim().length < 8)
    errors.push({ field: 'name', message: 'must have at least 8 characters' });
  if (!Number.isInteger(body.age) || body.age < 18)
    errors.push({ field: 'age', message: 'must be an integer greater than or equal to 18' });
  if (typeof body.document !== 'string' || body.document.length < 11)
    errors.push({ field: 'document', message: 'must have at least 11 characters' });
  if (typeof body.income !== 'number' || !(body.income > 0))
    errors.push({ field: 'income', message: 'must be greater than 0' });
  if (typeof body.city !== 'string' || body.city.trim() === '')
    errors.push({ field: 'city', message: 'must not be empty' });
  return errors;
}

async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  if (req.method === 'GET' && path === '/analyses') {
    const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase();
    const matches = analyses
      .filter((a) => !search || a.name.toLowerCase().includes(search) || a.city.toLowerCase().includes(search))
      .sort((a, b) => b.created_at.localeCompare(a.created_at));

    // Broader searches scan more rows, so they take longer.
    await delay(250 + matches.length * 12 + Math.random() * 150);
    if (Math.random() < FAILURE_RATE) return send(res, 500, { message: 'Internal server error' });

    const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
    const items = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(toResponse);
    return send(res, 200, { items, page, total_pages: totalPages });
  }

  const detail = path.match(/^\/analyses\/([\w-]+)$/);
  if (req.method === 'GET' && detail) {
    await delay(200 + Math.random() * 300);
    const analysis = analyses.find((a) => a.id === detail[1]);
    if (!analysis) return send(res, 404, { message: 'Analysis not found' });
    return send(res, 200, toResponse(analysis));
  }

  if (req.method === 'POST' && path === '/analyses/person') {
    await delay(800 + Math.random() * 700);
    const body = await readBody(req);
    const errors = validatePerson(body);
    if (errors.length > 0) return send(res, 422, { errors });
    if (Math.random() < FAILURE_RATE) return send(res, 500, { message: 'Internal server error' });

    const analysis = {
      id: randomUUID().slice(0, 8),
      type: 'PERSON',
      name: body.name.trim(),
      age: body.age,
      document: body.document,
      income: body.income,
      city: body.city.trim(),
      status: 'PENDING',
      created_at: new Date().toISOString(),
      resolve_at: Date.now() + PENDING_SECONDS * 1000,
    };
    analyses.push(analysis);
    return send(res, 201, toResponse(analysis));
  }

  return send(res, 404, { message: 'Route not found' });
}

http
  .createServer((req, res) => {
    const startedAt = Date.now();
    res.on('finish', () => {
      const time = new Date().toISOString().slice(11, 19);
      console.log(`${time} ${req.method} ${req.url} -> ${res.statusCode} (${Date.now() - startedAt}ms)`);
    });
    handle(req, res).catch((error) => {
      console.error(error);
      send(res, 500, { message: 'Internal server error' });
    });
  })
  .listen(PORT, '0.0.0.0', () => {
    console.log(`Mock API listening on http://0.0.0.0:${PORT} (failure rate ${FAILURE_RATE})`);
  });
