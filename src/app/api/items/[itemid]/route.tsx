import { dataItems } from '@/app/data/data';
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest, { params }: { params: { itemid: string } }) {
    const filteredItems = dataItems.find((itemsData) => itemsData.id === +params.itemid);
    if (filteredItems) {
        return NextResponse.json(filteredItems);
    } else return NextResponse.json({ message: 'data not Found' }, { status: 502 });
}
