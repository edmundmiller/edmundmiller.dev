/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '@pagefind/default-ui' {
  declare class PagefindUI {
    constructor(arg: unknown);
  }
}

interface ImportMetaEnv {
  readonly WEBMENTION_API_KEY: string;
  readonly SITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
