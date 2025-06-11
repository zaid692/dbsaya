import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File | null = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = file.name;
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

  await writeFile(filePath, buffer);

  const fileUrl = `/uploads/${fileName}`;

  console.log(`✅ Uploaded ${file.name} → ${fileUrl}`);
  return NextResponse.json({ url: fileUrl });
}
