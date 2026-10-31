import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Produce a standalone event document, outside the chapter site's React layout.
export const dynamic = 'force-static';

export async function GET() {
  const html = await readFile(
    path.join(process.cwd(), 'public', 'mtm', 'index.html'),
    'utf8',
  );
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
