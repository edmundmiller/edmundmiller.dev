/** Space-slug tag URL that still receives Search Console impressions. */
const OLD_SEQERA_CONTAINERS_TAG = '/tags/seqera containers';

/** Hyphenated tag page created when tag slugs were normalized. */
const SEQERA_CONTAINERS_TAG = '/tags/seqera-containers/';

/**
 * Path to 301, if this request is the old Seqera Containers tag.
 * `pathname` is the encoded path from `URL`, including a trailing slash.
 */
export function legacyRedirectPath(pathname: string): string | undefined {
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return undefined;
  }
  const trimmed = decoded.length > 1 ? decoded.replace(/\/+$/, '') : decoded;
  if (trimmed.toLowerCase() !== OLD_SEQERA_CONTAINERS_TAG) return undefined;
  return SEQERA_CONTAINERS_TAG;
}
