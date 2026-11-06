/** @jest-environment node */
import { createSafePdfBlob, MAX_DOCUMENT_BYTES } from './FileHelpers';

describe('safe PDF opening', () => {
  it('wraps a real PDF with a PDF MIME type and rejects disguised HTML', async () => {
    const pdf = new Blob(['%PDF-1.7\nexample'], { type: 'text/html' });
    const safe = await createSafePdfBlob(pdf);
    expect(safe?.type).toBe('application/pdf');
    expect(await safe?.text()).toBe('%PDF-1.7\nexample');

    const html = new Blob(['<script>alert(1)</script>'], { type: 'application/pdf' });
    expect(await createSafePdfBlob(html)).toBeNull();

    const withPreamble = new Blob(['\n%PDF-1.7\nexample'], { type: 'application/octet-stream' });
    expect((await createSafePdfBlob(withPreamble))?.type).toBe('application/pdf');
  });

  it('rejects an oversized PDF response and cancels the download', async () => {
    const cancel = jest.fn();
    const originalFetch = globalThis.fetch;
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      headers: { get: () => String(MAX_DOCUMENT_BYTES + 1) },
      body: { cancel },
    });
    try {
      expect(await createSafePdfBlob('https://example.com/huge.pdf')).toBeNull();
      expect(cancel).toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('rejects a URL returning HTML despite a PDF filename', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = jest.fn().mockResolvedValue(new Response('<script>alert(1)</script>'));
    try {
      expect(await createSafePdfBlob('https://example.com/invoice.pdf')).toBeNull();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
