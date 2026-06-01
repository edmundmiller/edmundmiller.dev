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
    "title": "Dancing mad with sandboxing",
    "link": "https://xeiaso.net/blog/2026/dancing-mad-sandboxing/",
    "summary": `Kefka is a Go-native shell sandbox with coreutils, Python via WebAssembly, and more. Learn the works of madness that went into making this happen!`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "May 28, 2026"
  },
  
  {
    "title": "Why parameters are strings all of a sudden",
    "link": "https://nf-co.re/blog/2026/parameter-types/",
    "summary": `A guide to mitigating typing issues in strict syntax`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "May 26, 2026"
  },
  
  {
    "title": "New blog design",
    "link": "https://drewdevault.com/blog/New-design/",
    "summary": `
            I redesigned my blog! I decided to put some more personality into it this time, after over a decade of the minimalist style. This short post is just an excuse to show up in your feed reader so you can go look at it. Cheers!Also: I’m trying out…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "May 20, 2026"
  },
  
];

export default openringData;
