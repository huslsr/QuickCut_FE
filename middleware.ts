import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only handle /api/v1 routes
  if (request.nextUrl.pathname.startsWith('/api/v1')) {
    // Get the runtime API URL
    // PRIORITIZE Environment Variable, then toggle based on Environment, then fallback to localhost
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
                   (process.env.NODE_ENV === 'production' 
                     ? "https://quickcut-backend-omj57a5mba-uc.a.run.app/api/v1" 
                     : "http://localhost:8080/api/v1");
    
    if (!apiUrl) {
      console.error('❌ API_URL is not defined!');
      // Allow it to fail naturally or return an error
      // return new NextResponse(JSON.stringify({ error: 'Server Context: API_URL missing' }), { status: 500 });
    }

    // Construct the target URL
    // Incoming: /api/v1/articles
    // Target: https://backend.../api/v1/articles
    
    // We want to forward the path AS IS to the backend
    // If API_URL is "https://backend/api/v1", and path is "/api/v1/articles"
    // We simply want to replace the origin.
    
    // However, clean logic:
    // API_URL should be the base.
    // If API_URL = "https://backend.com/api/v1"
    // And path = "/api/v1/articles"
    // We should append the specific endpoint.
    
    // Actually, simply rewriting to the backend URL is easiest.
    // We need to strip /api/v1 from the path IF the backend API_URL already includes it?
    // My previous config: destination: `${API_URL}/:path*` where source was `/api/v1/:path*`
    // So if API_URL=".../api/v1", then destination=".../api/v1/articles".
    
    // In middleware:
    // request.url is full URL.
    // request.nextUrl.pathname is /api/v1/articles
    
    // We want to rewrite to: API_URL + (pathname suffix)
    
    // Let's assume API_URL is the BASE for /api/v1.
    // If API_URL = https://backend/api/v1
    // And request is /api/v1/foo
    // We want https://backend/api/v1/foo
    
    // So we invoke NextResponse.rewrite(new URL(targetUrl))
    
    const targetUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, apiUrl);
    // Wait, if apiUrl has a path component, 'new URL' constructor behavior is tricky.
    // URL('/bar', 'https://example.com/foo') -> 'https://example.com/bar' (It strips /foo).
    
    // Better string concatenation.
    const pathSuffix = request.nextUrl.pathname.replace('/api/v1', ''); // /articles
    const finalUrl = `${apiUrl}${pathSuffix}${request.nextUrl.search}`;
    
    console.log(`Middleware Proxy: ${request.nextUrl.pathname} -> ${finalUrl}`);
    
    return NextResponse.rewrite(new URL(finalUrl));
  }
}

export const config = {
  matcher: '/api/v1/:path*',
};
