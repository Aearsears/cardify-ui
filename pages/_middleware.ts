import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    console.log('Request to: ' + req.url);
    console.log(req.headers);
    console.log(req.method);
    console.log(req.body);

    return NextResponse.next();
}
