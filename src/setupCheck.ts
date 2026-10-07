import { config } from '@/common/config';

export type MockApiStatus = { ok: true } | { ok: false; url: string };

export async function checkMockApi(url = config.apiUrl): Promise<MockApiStatus> {
  try {
    const response = await fetch(`${url}/analyses?page=1`);
    return response.ok ? { ok: true } : { ok: false, url };
  } catch {
    return { ok: false, url };
  }
}
