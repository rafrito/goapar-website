import { NextResponse } from 'next/server';

export async function GET() {
    const productTypesApiUrl = process.env.PRODUCT_TYPES_API_URL;

    if (!productTypesApiUrl) {
        return NextResponse.json({ error: 'PRODUCT_TYPES_API_URL is not defined' }, { status: 500 });
    }

    try {
        const res = await fetch(productTypesApiUrl);
        if (!res.ok) {
            throw new Error(`Failed to fetch product types: ${res.statusText}`);
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}