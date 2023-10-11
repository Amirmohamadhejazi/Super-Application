import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
    const dataItems = [
        {
            name: 'iphone 15',
            numbers: 5,
            brand: 'Apple',
            id: 0
        },
        {
            name: 'note 10',
            numbers: 10,
            brand: 'Samsung',
            id: 1
        },
        {
            name: 'pixel 5',
            numbers: 2,
            brand: 'Google',
            id: 2
        },
        {
            name: 'S10',
            numbers: 1,
            brand: 'Samsung',
            id: 3
        },
        {
            name: 'P50',
            numbers: 0,
            brand: 'Huawei',
            id: 4
        },
        {
            name: 'G7+',
            numbers: 1,
            brand: 'lg',
            id: 5
        }
    ];
    return NextResponse.json(dataItems);
}
