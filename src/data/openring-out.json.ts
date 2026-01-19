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
    "title": "Tormentmaxxing &#39;simple requests&#39;",
    "link": "https://xeiaso.net/notes/2026/tormentmaxxing-simple-requests/",
    "summary": `Automating the full lifecycle of &amp;#39;quick&amp;#39; requests with Claude Code slash commands`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "January 15, 2026"
  },
  
  {
    "title": "nf-core and AI",
    "link": "https://nf-co.re/blog/2026/statement-on-ai/",
    "summary": `Core team statement on AI within nf-core`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "January 14, 2026"
  },
  
  {
    "title": "Redesigning my microkernel from the ground up",
    "link": "https://drewdevault.com/2026/01/12/2026-01-12-Hermes-from-the-ground-up.html",
    "summary": `As you may recall, circa 2022-2023 I was working on a
microkernel written in Hare named Helios. Helios was largely inspired by and
modelled after the design of seL4 and was my first
major foray into modern OS development that was serious enough to get to a
so…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "January 12, 2026"
  },
  
];

export default openringData;
