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
    "title": "Add an LLM policy for rust-lang/rust",
    "link": "https://drewdevault.com/blog/LLM-policy-for-Rust/",
    "summary": `
            No comment on this PR may mention the following topics:Long-term social or economic impact of LLMsThe environmental impact of LLMsAnything to do with the copyright status of LLM outputMoral judgements about people who use LLMsWe have asked the…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "May 15, 2026"
  },
  
  {
    "title": "Amazonbot is finally respecting robots.txt",
    "link": "https://xeiaso.net/notes/2026/amazonbot-respecting-robots-txt/",
    "summary": `Thanks for giving me a viable business model Amazon!`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "May 14, 2026"
  },
  
  {
    "title": "Remembering My Mother",
    "link": "https://taehoonkim.org/news/2026/5/1/remembering-my-mother",
    "summary": `My mother passed away suddenly last Saturday, 4/25. There aren’t enough words that can capture all the grief that I am feeling and all my memories of her. But I want to share how one small incident in our shared lives has enormously impacted how I pursue …`,
    "source_title": "News - Functional Genomics Laboratory",
    "source_link": "https://taehoonkim.org/news/",
    "date": "May 1, 2026"
  },
  
];

export default openringData;
