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
    "title": "What&#39;s up with FUTO?",
    "link": "https://drewdevault.com/2025/10/22/2025-10-22-Whats-up-with-FUTO.html",
    "summary": `Some time ago, I noticed some new organization called FUTO popping up here and
there. I’m always interested in seeing new organizations that fund open source
popping up, and seeing as they claim several notable projects on their roster, I
explored their webs…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "October 22, 2025"
  },
  
  {
    "title": "nf-core core team retreat - September 2025",
    "link": "https://nf-co.re/blog/2025/retreat-2025/",
    "summary": `Updates from the nf-core core team retreat.`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "October 20, 2025"
  },
  
  {
    "title": "First look at the DGX Spark",
    "link": "https://xeiaso.net/blog/2025/dgx-spark-first-look/",
    "summary": `A local supercomputer between the size of a Mac mini and a Mac mini.`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "October 14, 2025"
  },
  
];

export default openringData;
