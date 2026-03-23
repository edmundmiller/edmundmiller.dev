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
    "title": "Homelab downtime update: The fight for DNS supremacy",
    "link": "https://xeiaso.net/notes/2026/dns-fight/",
    "summary": `Turns out everything DID NOT go offline somehow. Yay!`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "March 18, 2026"
  },
  
  {
    "title": "Making nf-core/configs strict syntax compliant",
    "link": "https://nf-co.re/blog/2026/configs-strict-syntax/",
    "summary": `Announcement and recommendations for updating nf-core/configs Nextflow strict syntax compliant`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "March 5, 2026"
  },
  
  {
    "title": "The cults of TDD and GenAI",
    "link": "https://drewdevault.com/2026/01/29/2026-01-29-Cult-of-TDD-and-LLMs.html",
    "summary": `I’ve gotten a lot of flack throughout my career over my disdain towards
test-driven development (TDD). I have met a lot of people who swear by it! And,
I have also met a lot of people who insisted that I adopt it, too, often with
the implied threat of appeal…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "January 29, 2026"
  },
  
];

export default openringData;
