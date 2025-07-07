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
  
  {
    "title": "Experimenting with Development containers",
    "link": "https://xeiaso.net/notes/2025/devcontainers/",
    "summary": `Development containers are cool and I want to see if they work out in practice.`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "June 30, 2025"
  },
  
  {
    "title": "nf-core/tools - 3.3",
    "link": "https://nf-co.re/blog/2025/tools-3_3/",
    "summary": `An nf-testic release`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "June 3, 2025"
  },
  
];

export default openringData;
