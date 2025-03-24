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
    "title": "Spring cleaning 2025",
    "link": "https://nf-co.re/blog/2025/springcleaning/",
    "summary": `🧹`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "March 20, 2025"
  },
  
  {
    "title": "I&#39;m testing Anubis in prod",
    "link": "https://xeiaso.net/notes/2025/anubis-testing-prod/",
    "summary": `Please let me know what URL resolvers I just broke.`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "March 20, 2025"
  },
  
  {
    "title": "Please stop externalizing your costs directly into my face",
    "link": "https://drewdevault.com/2025/03/17/2025-03-17-Stop-externalizing-your-costs-on-me.html",
    "summary": `This blog post is expressing personal experiences and opinions and doesn’t
reflect any official policies of SourceHut.
Over the past few months, instead of working on our priorities at SourceHut, I
have spent anywhere from 20-100% of my time in any given wee…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "March 17, 2025"
  },
  
];

export default openringData;
