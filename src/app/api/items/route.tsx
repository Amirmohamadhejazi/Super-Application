import { dataItems } from '@/app/data/data'; 
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
    return NextResponse.json({ data: dataItems }, { status: 200 });
}

// export async function POST(request: NextRequest) {
//     const body = await request.json();
//     // return NextResponse.json({ name: 'G7+', numbers: 1, brand: 'lg', id: dataItems.length + 1 });
//     return NextResponse.json(dataItems.length + 1);
// }
