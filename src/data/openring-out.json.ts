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
    "title": "What&#39;s new with Himitsu 0.9?",
    "link": "https://drewdevault.com/2025/08/08/2025-08-08-Whats-new-with-himitsu.html",
    "summary": `Last week, Armin and I worked together on the latest release of Himitsu, a
“secret storage manager” for Linux. I haven’t blogged about Himitsu since I
announced it three years ago, and I thought it would be nice to give you a
closer look at the latest releas…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "August 8, 2025"
  },
  
  {
    "title": "Maintainers Minutes: July 2025",
    "link": "https://nf-co.re/blog/2025/maintainers-minutes-2025-07-31/",
    "summary": `Keeping you informed of the latest maintainers discussions`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "July 31, 2025"
  },
  
  {
    "title": "TI-20250709-0001: IPv4 traffic failures for Techaro services",
    "link": "https://anubis.techaro.lol/blog/incident/TI-20250709-0001",
    "summary": `
        Techaro services were down for IPv4 traffic on July 9th, 2025. This blogpost is a report of what happened, what actions were taken to resolve the situation, and what actions are being done in the near future to prevent this problem. Enjoy this inc…`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "July 9, 2025"
  },
  
];

export default openringData;
