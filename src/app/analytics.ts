declare global {
  interface Window {
    goatcounter?: { count(options: { event?: boolean; path: string; title: string }): void };
  }
}

const clean = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'unknown';
const titleFor = (element: Element, fallback: string) =>
  element.getAttribute('aria-label') ||
  element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120) ||
  fallback;
const track = (path: string, title: string) =>
  window.goatcounter?.count({ event: true, path, title });

export function installAnalytics() {
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const result = target.closest('#cactus__search a');
    if (result) {
      track('event:site-search:result-click', 'Site search result click');
      return;
    }
    const explicit = target.closest('[data-goatcounter-event]');
    if (explicit) {
      track(
        `event:cta:${clean(explicit.getAttribute('data-goatcounter-event')!)}`,
        titleFor(explicit, 'CTA click'),
      );
      return;
    }
    const link = target.closest('a[href]');
    if (!(link instanceof HTMLAnchorElement)) return;
    const url = new URL(link.href, location.href);
    if (
      url.protocol === 'mailto:' ||
      (/^https?:$/.test(url.protocol) && url.origin !== location.origin)
    ) {
      track(
        `event:outbound:${clean(url.protocol === 'mailto:' ? 'mailto' : url.hostname)}`,
        titleFor(link, link.href),
      );
    }
  });
}

export function trackPageView() {
  window.goatcounter?.count({ path: location.pathname + location.search, title: document.title });
}
