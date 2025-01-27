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
    "title": "GHSA-56w8-8ppj-2p4f: Bot protection bypass in Anubis",
    "link": "https://xeiaso.net/notes/2025/GHSA-56w8-8ppj-2p4f/",
    "summary": `Update your copy of Anubis, but it&amp;#39;s very minor`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "January 26, 2025"
  },
  
  {
    "title": "Join us to discuss transparency and governance at FOSDEM &#39;25",
    "link": "https://drewdevault.com/2025/01/23/2025-01-23-Transparency-and-governance-FOSDEM.html",
    "summary": `Good news: it appears that Jack Dorsey’s FOSDEM talk has been cancelled!
This is a follow up to two earlier posts, which you can read here: one and
two.
I say it “appears” so, because there has been no official statement from anyone
to that effect. There has …`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "January 23, 2025"
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
