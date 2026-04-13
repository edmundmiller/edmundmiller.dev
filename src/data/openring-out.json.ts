export interface OpenringItem {
  title: string;
  link: string;
  summary: string;
  source_title: string;
  source_link: string;
  date: string;
}

export const openringData: OpenringItem[] =
[
  
  {
    "title": "Introducing nf-core docs version 2",
    "link": "https://nf-co.re/blog/2026/docs-v2/",
    "summary": `Announcing the new nf-core docs: rebuilt, restructured, and shipped`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "April 10, 2026"
  },
  
  {
    "title": "Claude Code won April Fools Day this year",
    "link": "https://xeiaso.net/notes/2026/claude-code-wins-april-fools/",
    "summary": `They gave people a heckin tamagochi, what&amp;#39;s not to like?`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "April 1, 2026"
  },
  
  {
    "title": "tar: a slop-free alternative to rsync",
    "link": "https://drewdevault.com/2026/03/28/2026-03-28-rsync-without-rsync.html",
    "summary": `So apparently rsync is slop now. When I heard, I wanted to drop a quick
note on my blog to give an alternative: tar. It doesn’t do everything that rsync
does, in particular identifying and skipping up-to-date files, but tar + ssh can
definitely accomodate th…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "March 28, 2026"
  },
  
];

export default openringData;
