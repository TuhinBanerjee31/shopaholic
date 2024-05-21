import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//MIDDLEWARE FOR PROTECTING ROUTES
export function middleware(request: NextRequest) {
    //CURRENT PATH
    const path = request.nextUrl.pathname;

    //PUBLIC PATHS
    const isPublic = path === '/login' || path === '/signup' || path === '/verify' || path === '/unauthorized'

    //GETTING TOKEN IF AVAILABLE
    const token = request.cookies.get('token')?.value || '';

    //IF LOGGED-IN, THEN WE DON'T ALLOW TO ACCESS LOGIN && SIGNUP
    //AND REDIRECT TO HOME PATH
    if(isPublic && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    //IF NOT LOGGED-IN, THEN WE DON'T ALLOW TO ACCESS HOME PAGES
    //AND REDIRECT TO LOGIN PATH
    if(!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

//PATH MATCHING
export const config = {
    matcher: ['/', '/home', '/cart', '/login', '/signup', '/verify', '/unauthorized', '/search']
}