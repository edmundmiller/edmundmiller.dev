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
    "title": "The Discourse has been Automated",
    "link": "https://xeiaso.net/notes/2026/the-discourse-has-been-automated/",
    "summary": `An AI agent submitted a PR to matplotlib, got rejected, and then wrote a callout blogpost attacking the maintainer. I have no idea how to feel about this.`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "February 12, 2026"
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
  
  {
    "title": "nf-core and AI",
    "link": "https://nf-co.re/blog/2026/statement-on-ai/",
    "summary": `Core team statement on AI within nf-core`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "January 14, 2026"
  },
  
];

export default openringData;
