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
    "title": "Why are cached input tokens cheaper with AI services?",
    "link": "https://xeiaso.net/notes/2026/why-llm-cached-token-cheaper/",
    "summary": `TL;DR: the GPU doesn&amp;#39;t have to math as hard`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "June 12, 2026"
  },
  
  {
    "title": "The circus freaks of open source",
    "link": "https://drewdevault.com/blog/Circus-freaks-of-FOSS/",
    "summary": `
            The masterwork of Terry A. Davis is his eclectic operating system, TempleOS, which he worked on until his tragic death in 2018. In terms of technical excellence, TempleOS rates well in some respects and poorly in others. For example, it earns …`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "June 5, 2026"
  },
  
  {
    "title": "Why parameters are strings all of a sudden",
    "link": "https://nf-co.re/blog/2026/parameter-types/",
    "summary": `A guide to mitigating typing issues in strict syntax`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "May 26, 2026"
  },
  
];

export default openringData;
