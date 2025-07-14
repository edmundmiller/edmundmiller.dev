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
    "title": "TI-20250709-0001: IPv4 traffic failures for Techaro services",
    "link": "https://anubis.techaro.lol/blog/incident/TI-20250709-0001",
    "summary": `
        Techaro services were down for IPv4 traffic on July 9th, 2025. This blogpost is a report of what happened, what actions were taken to resolve the situation, and what actions are being done in the near future to prevent this problem. Enjoy this inc…`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "July 9, 2025"
  },
  
  {
    "title": "Meet the new meta.yml",
    "link": "https://nf-co.re/blog/2025/modules-meta-yml/",
    "summary": `Changes to the structure of the meta.yml file for nf-core modules`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "July 7, 2025"
  },
  
  {
    "title": "Just speak the truth",
    "link": "https://drewdevault.com/2025/06/30/Speak-the-truth.html",
    "summary": `Today, we’re looking at two case studies in how to respond when reactionaries
appear in your free software community.
Exhibit A

It is a technical decision.
The technical reason is that the security team does not have the bandwidth to
provide lifecycle maintena…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "June 30, 2025"
  },
  
];

export default openringData;
