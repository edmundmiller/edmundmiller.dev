import { Schema } from 'effect';
import { defineRouteUnion } from 'foldkit/route';
import content from '../generated/content.json';

export const Route = defineRouteUnion({
  Home: {},
  Posts: { page: Schema.Number },
  Tags: {},
  Tag: { tag: Schema.String, page: Schema.Number },
  Post: { slug: Schema.String },
  Page: { id: Schema.String },
  Speaking: {},
  NotFound: { path: Schema.String },
});
export type Route = typeof Route.Type;

export function decodeUrlPart(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function routeFromPath(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return Route.Home();
  if (path === '/speaking') return Route.Speaking();
  if (path === '/tags') return Route.Tags();
  const pageId = decodeUrlPart(path.slice(1));
  if (content.pages.some((page) => page.id === pageId)) {
    return Route.Page({ id: pageId });
  }
  const listing = path.match(/^\/posts(?:\/(\d+))?$/);
  if (listing) return Route.Posts({ page: Number(listing[1] ?? 1) });
  const post = path.match(/^\/posts\/(.+)$/);
  if (post) return Route.Post({ slug: decodeUrlPart(post[1]!) });
  const tag = path.match(/^\/tags\/([^/]+)(?:\/(\d+))?$/);
  if (tag) return Route.Tag({ tag: decodeUrlPart(tag[1]!), page: Number(tag[2] ?? 1) });
  return Route.NotFound({ path: pathname });
}

/** Assets and feeds must remain document requests, not client-side page routes. */
export function isPagePath(pathname: string): boolean {
  return !/\.[^/]+$/.test(pathname);
}
