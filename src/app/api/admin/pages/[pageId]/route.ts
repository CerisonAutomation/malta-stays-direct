import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Simple file-based storage for CMS page data.
// In production, replace with a database (Supabase, PlanetScale, etc.).
const DATA_DIR = path.join(process.cwd(), '.puck-data');

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {}
}

function getFilePath(pageId: string) {
  // Sanitize pageId to prevent path traversal
  const safe = pageId.replace(/[^a-zA-Z0-9-_]/g, '_');
  return path.join(DATA_DIR, `${safe}.json`);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { pageId: string } }
) {
  try {
    await ensureDir();
    const filePath = getFilePath(params.pageId);
    const raw = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(raw));
  } catch {
    // Return empty Puck data if the page hasn't been saved yet
    return NextResponse.json({ content: [], root: {} }, { status: 200 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { pageId: string } }
) {
  try {
    const body = await req.json();
    await ensureDir();
    const filePath = getFilePath(params.pageId);
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[api/admin/pages]', err);
    return NextResponse.json({ error: 'Failed to save page data.' }, { status: 500 });
  }
}
