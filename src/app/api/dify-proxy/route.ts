import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiKey = process.env.DIFY_API_KEY || 'app-7nBQvpz0HlwgbmMnyLSzSp7l';
    const difyUrl = process.env.NEXT_PUBLIC_DIFY_API_URL || 'https://dify-e9toe-u35360.vm.elestio.app/v1';
    
    const { path, method, payload } = body;
    
    const url = `${difyUrl}${path}`;
    
    const headers: HeadersInit = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': payload?.response_mode === 'streaming' ? 'text/event-stream' : 'application/json'
    };

    if (payload?.stream) {
      headers['X-Use-Stream'] = 'true';
    }
    
    const response = await fetch(url, {
      method: method || 'POST',
      headers,
      body: payload ? JSON.stringify(payload) : undefined
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    if (method === 'GET' || !payload?.response_mode || payload?.response_mode === 'blocking') {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      // Per le risposte in streaming
      const readableStream = response.body;
      if (!readableStream) {
        throw new Error('Response body is null');
      }
      
      return new NextResponse(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no',
          'Transfer-Encoding': 'chunked'
        }
      });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: (error as Error).message },
      { status: 500 }
    );
  }
}
