const FIRST_NAMES = [
  'Ana', 'Bruno', 'Carla', 'Diego', 'Eduarda', 'Felipe', 'Gabriela', 'Henrique', 'Isabela', 'João',
  'Larissa', 'Marcos', 'Natália', 'Otávio', 'Paula', 'Rafael', 'Sabrina', 'Thiago', 'Vanessa', 'Wesley',
];
const LAST_NAMES = ['Almeida', 'Barbosa', 'Cardoso', 'Duarte', 'Ferreira', 'Gomes', 'Lima', 'Moreira', 'Nunes', 'Souza'];
const COMPANIES = [
  'Borracharia Dois Irmãos', 'Padaria Pão de Ouro', 'Mercadinho Bom Preço', 'Oficina Mecânica Veloz',
  'Papelaria Ponto Certo', 'Restaurante Sabor Caseiro', 'Farmácia Vida Plena', 'Pet Shop Amigo Fiel',
];
const CITIES = ['São Paulo', 'Campinas', 'São Carlos', 'Ibitinga', 'Curitiba', 'Recife', 'Belo Horizonte', 'Salvador'];

const REANALYSIS_CASES = [
  { id: 'd029', name: 'Caio Trindade', document: '31415926535', income: 1200, ageDays: 29 },
  { id: 'd030', name: 'Helena Trindade', document: '27182818284', income: 1100, ageDays: 30 },
  { id: 'd035', name: 'Sofia Trindade', document: '16180339887', income: 1300, ageDays: 35 },
];

function digits(seed, length) {
  let value = '';
  for (let i = 0; i < length; i++) value += String((seed * 31 + i * 17 + seed * i) % 10);
  return value;
}

function seedAnalyses(pendingSeconds) {
  const now = Date.now();
  const analyses = [];

  for (let i = 0; i < 96; i++) {
    const isCompany = i % 6 === 5;
    const city = CITIES[(i * 5) % CITIES.length];
    const createdAt = new Date(now - (i + 1) * 9 * 60 * 60 * 1000).toISOString();
    const base = {
      id: `a${String(i + 1).padStart(3, '0')}`,
      city,
      created_at: createdAt,
      resolve_at: now + (pendingSeconds + i) * 1000,
    };

    const analysis = isCompany
      ? {
          ...base,
          type: 'COMPANY',
          name: COMPANIES[i % COMPANIES.length],
          document: digits(i, 14),
          revenue: 2000 + ((i * 1733) % 40000),
        }
      : {
          ...base,
          type: 'PERSON',
          name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 3 + Math.floor(i / 20)) % LAST_NAMES.length]}`,
          age: 18 + ((i * 7) % 50),
          document: digits(i, 11),
          income: 800 + ((i * 911) % 9000),
        };

    if (i % 9 === 0) {
      analysis.status = 'PENDING';
    } else {
      const income = analysis.type === 'PERSON' ? analysis.income : analysis.revenue / 4;
      analysis.status = income >= 1500 ? 'APPROVED' : 'DENIED';
      if (analysis.status === 'APPROVED') analysis.max_amount = Math.round(income * 3);
    }
    analyses.push(analysis);
  }

  for (const customer of REANALYSIS_CASES) {
    analyses.push({
      id: customer.id,
      type: 'PERSON',
      name: customer.name,
      age: 41,
      document: customer.document,
      income: customer.income,
      city: 'Ouro Preto',
      status: 'DENIED',
      created_at: new Date(now - (customer.ageDays * 24 + 2) * 60 * 60 * 1000).toISOString(),
      resolve_at: now,
    });
  }

  return analyses;
}

module.exports = { seedAnalyses };
