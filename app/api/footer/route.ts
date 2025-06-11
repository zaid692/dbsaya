// app/api/footer/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'app', 'data', 'footer.json');

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to load footer data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedData = await request.json();
    
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Update failed:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update footer data' },
      { status: 500 }
    );
  }
}