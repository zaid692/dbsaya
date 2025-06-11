import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const { type, id, newSrc } = await req.json();

    const filePath = path.join(process.cwd(), 'public', 'summer.json');
    const jsonText = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonText);

    if (type === 'bannerImage') {
      data.bannerImage = newSrc;

    } else if (type === 'productImage') {
      data.products = data.products.map((product: any) =>
        product.id === id ? { ...product, image: newSrc } : product
      );

    } else if (type === 'productHoverImage') {
      data.products = data.products.map((product: any) =>
        product.id === id ? { ...product, hoverImage: newSrc } : product
      );

    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid type' },
        { status: 400 }
      );
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Update failed:', err);
    return NextResponse.json({ success: false,  }, { status: 500 });
  }
}
