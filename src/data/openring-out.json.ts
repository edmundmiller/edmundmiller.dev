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
    "title": "Experimenting with Development containers",
    "link": "https://xeiaso.net/notes/2025/devcontainers/",
    "summary": `Development containers are cool and I want to see if they work out in practice.`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "June 30, 2025"
  },
  
  {
    "title": "Unionize or die",
    "link": "https://drewdevault.com/2025/06/09/2025-06-09-Unionize-or-die.html",
    "summary": `Tech workers have long resisted the suggestion that we should be organized into
unions. The topic is consistently met with a cold reception by tech workers when
it is raised, and no big tech workforce is meaningfully organized. This is a
fatal mistake – and …`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "June 9, 2025"
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
