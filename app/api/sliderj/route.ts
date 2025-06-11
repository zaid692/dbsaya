// app/api/sliderj/route.ts
export const runtime = 'nodejs';

import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'slider.json');

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return new Response(data, { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to read slider.json' }),
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
    return new Response(
      JSON.stringify({ message: 'slider.json updated successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update slider.json' }),
      { status: 500 }
    );
  }
}
