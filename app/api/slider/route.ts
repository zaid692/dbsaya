import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
  
    const { type, id, newSrc } = await req.json();

   
    const filePath = path.join(process.cwd(), 'public', 'slider.json');

   
    const jsonText = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonText);

    if (type === 'background') {
      data.background.src = newSrc;
    } else if (type === 'video') {
      data.videos = data.videos.map((v: any) =>
        v.id === id ? { ...v, src: newSrc } : v
      );
    } else if (type === 'image') {
      data.images = data.images.map((img: any) =>
        img.id === id ? { ...img, src: newSrc } : img
      );
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Update failed:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
