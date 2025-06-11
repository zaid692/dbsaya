import clientPromise from '@/lib/mongo';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      message: '✅ MongoDB connected successfully!',
      collections: collections.map((col) => col.name),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: '❌ MongoDB connection failed',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
