import { siteConfig } from '../site.config';
import { pageMetadata } from './pages';
import { routeFromPath } from './route';

export function metadataTags(pathname: string): Record<string, string | undefined> {
  const meta = pageMetadata(routeFromPath(pathname));
  const canonical = meta.canonical ?? new URL(pathname, 'https://edmundmiller.dev').href;
  const image = new URL(meta.ogImage ?? '/social-card.png', 'https://edmundmiller.dev').href;
  return {
    title: `${meta.title} | ${siteConfig.title}`,
    description: meta.description ?? siteConfig.description,
    author: siteConfig.author,
    robots: meta.robots,
    'og:type': meta.articleDate ? 'article' : 'website',
    'og:title': meta.title,
    'og:description': meta.description ?? siteConfig.description,
    'og:site_name': siteConfig.title,
    'og:locale': siteConfig.ogLocale,
    'og:image': image,
    'og:image:width': '1200',
    'og:image:height': '630',
    'article:author': meta.articleDate ? siteConfig.author : undefined,
    'article:published_time': meta.articleDate,
    'twitter:card': 'summary_large_image',
    'twitter:url': canonical,
    'twitter:title': meta.title,
    'twitter:description': meta.description ?? siteConfig.description,
    'twitter:image': image,
  };
}

export function updatePageMetadata(pathname: string) {
  for (const [key, value] of Object.entries(metadataTags(pathname))) {
    const attribute = key.includes(':') ? 'property' : 'name';
    const existing = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (value === undefined) {
      existing?.remove();
      continue;
    }
    const element = existing ?? document.createElement('meta');
    element.setAttribute(attribute, key);
    element.content = value;
    if (!existing) document.head.append(element);
  }
}

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char]!,
  );
