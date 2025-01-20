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
    "title": "Block AI scrapers with Anubis",
    "link": "https://xeiaso.net/blog/2025/anubis/",
    "summary": `I got tired with all the AI scrapers that were bullying my git server, so I made a tool to stop them for good.`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "January 19, 2025"
  },
  
  {
    "title": "No billionaires at FOSDEM",
    "link": "https://drewdevault.com/2025/01/16/2025-01-16-No-Billionares-at-FOSDEM-please.html",
    "summary": `Jack Dorsey, former CEO of Twitter, ousted board member of BlueSky, and grifter
extraordinaire to the tune of a $5.6B net worth, is giving a keynote at
FOSDEM.
The FOSDEM keynote stage is one of the biggest platforms in the free software
community. Janson is …`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "January 16, 2025"
  },
  
  {
    "title": "nf-core/tools - 3.1.0",
    "link": "https://nf-co.re/blog/2024/tools-3_1_0/",
    "summary": `Everything is going crate`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "December 10, 2024"
  },
  
];

export default openringData;
