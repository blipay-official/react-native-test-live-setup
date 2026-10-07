import { checkMockApi } from '../setupCheck';

describe('checkMockApi', () => {
  it('reports success when the mock API answers', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: true });

    await expect(checkMockApi('http://localhost:3000')).resolves.toEqual({ ok: true });
  });

  it('reports failure when the mock API is unreachable', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new TypeError('Network request failed'));

    await expect(checkMockApi('http://localhost:3000')).resolves.toEqual({
      ok: false,
      url: 'http://localhost:3000',
    });
  });
});
