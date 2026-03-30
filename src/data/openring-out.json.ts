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
  
  {
    "title": "Homelab downtime update: The fight for DNS supremacy",
    "link": "https://xeiaso.net/notes/2026/dns-fight/",
    "summary": `Turns out everything DID NOT go offline somehow. Yay!`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "March 18, 2026"
  },
  
  {
    "title": "Making nf-core/configs strict syntax compliant",
    "link": "https://nf-co.re/blog/2026/configs-strict-syntax/",
    "summary": `Announcement and recommendations for updating nf-core/configs Nextflow strict syntax compliant`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "March 5, 2026"
  },
  
];

export default openringData;
