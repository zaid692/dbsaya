// app/api/summerj/route.ts
export const runtime = 'nodejs';

import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'summer.json');

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return new Response(data, { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to read summer.json' }),
      { status: 500 }
    );
  }
}
