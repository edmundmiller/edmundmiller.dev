const MARKDOWN_ACCEPT = /(?:^|,)\s*text\/markdown\s*(?:;|,|$)/i;

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const assetRequest = markdownRequest(request, url) ?? request;
    const response = await env.ASSETS.fetch(assetRequest);
    return withAgentDiscoveryHeaders(response);
  },
};

function markdownRequest(request: Request, url: URL): Request | undefined {
  if (request.method !== 'GET' && request.method !== 'HEAD') return;
  if (!MARKDOWN_ACCEPT.test(request.headers.get('Accept') ?? '')) return;
  if (url.pathname.endsWith('.md') || url.pathname.endsWith('.txt')) return;

  const markdownUrl = new URL(url);
  markdownUrl.pathname = markdownPath(url.pathname);
  return new Request(markdownUrl, request);
}

function markdownPath(pathname: string): string {
  if (pathname === '' || pathname === '/') return '/index.md';
  if (pathname.endsWith('/')) return `${pathname}index.md`;
  return `${pathname}/index.md`;
}

function withAgentDiscoveryHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.append('Link', '</llms.txt>; rel="alternate"; type="text/plain"');
  headers.append('Link', '</llms-full.txt>; rel="alternate"; type="text/plain"');
  headers.append('Link', '</sitemap-index.xml>; rel="sitemap"; type="application/xml"');
  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
}
