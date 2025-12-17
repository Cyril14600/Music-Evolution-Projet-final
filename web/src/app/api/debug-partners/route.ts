import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
        const url = `${baseUrl}/api/partners?populate=*`;

        console.log('DEBUG API: Fetching', url);
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            return NextResponse.json({ error: 'Fetch failed', status: res.status, statusText: res.statusText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json({ url, data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}
