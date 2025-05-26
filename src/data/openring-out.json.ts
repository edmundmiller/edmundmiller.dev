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
    "title": "Avoiding becoming the lone dependency peg with load-bearing anime",
    "link": "https://xeiaso.net/blog/2025/avoiding-becoming-peg-dependency/",
    "summary": `
        While working on Anubis (a Web AI Firewall Utility designed to stop rampant scraping from taking out web services), one question in particular keeps coming up:
        AoiWhy do you have an anime character in the challenge screen by default?
       …`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "May 23, 2025"
  },
  
  {
    "title": "nf-core supports now `main` branch names",
    "link": "https://nf-co.re/blog/2025/switching-master-to-main/",
    "summary": `Announcing the possibility to change a pipeline default branch to main`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "May 19, 2025"
  },
  
  {
    "title": "The British Airways position on various border disputes",
    "link": "https://drewdevault.com/2025/05/05/2025-05-05-BA-on-border-disputes.html",
    "summary": `My spouse and I are on vacation in Japan, spending half our time seeing the
sights and the other half working remotely and enjoying the experience of living
in a different place for a while. To get here, we flew on British Airways from
London to Tokyo, and I…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "May 5, 2025"
  },
  
];

export default openringData;
