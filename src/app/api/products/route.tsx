import { dataItems } from '@/app/data/data';
import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
export async function GET(req: NextRequest) {
    return NextResponse.json(dataItems);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = schema.safeParse(body);

    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 });
    return dataItems.push({ ...body, id: dataItems.length + 1 }), NextResponse.json(dataItems, { status: 400 });
}
