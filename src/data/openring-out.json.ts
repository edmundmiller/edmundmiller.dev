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
    "title": "Why are my pipeline download tests failing?",
    "link": "https://nf-co.re/blog/2025/refurbushing-the-pipeline-download/",
    "summary": `Refurbishing the pipeline downloads command`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "August 28, 2025"
  },
  
  {
    "title": "Final Fantasy 14 on macOS with a 36 key keyboard",
    "link": "https://xeiaso.net/notes/2025/xiv-mac/",
    "summary": `Saving Eorzea with as few keys as possible`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "August 24, 2025"
  },
  
  {
    "title": "Embedding Wren in Hare",
    "link": "https://drewdevault.com/2025/08/20/2025-08-20-Hare-and-Wren.html",
    "summary": `I’ve been on the lookout for a scripting language which can be neatly embedded
into Hare programs. Perhaps the obvious candidate is Lua – but I’m not
particularly enthusiastic about it. When I was evaluating the landscape of tools
which are “like Lua, but no…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "August 20, 2025"
  },
  
];

export default openringData;
