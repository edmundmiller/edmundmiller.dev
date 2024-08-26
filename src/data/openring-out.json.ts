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
    "title": "Xecast Episode 3: The curse of the artist",
    "link": "https://xeiaso.net/xecast/003/",
    "summary": `Xe returns while on vacation where they built a new PC, made a SaaS to check web server headers, and re-evaluated how they think about complexity.`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "August 25, 2024"
  },
  
  {
    "title": "Maintainers Minutes: August 2024",
    "link": "https://nf-co.re/blog/2024/maintainers-minutes-2024-07-26/",
    "summary": `Keeping you informed of the latest maintainers discussions`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "August 14, 2024"
  },
  
  {
    "title": "Experimental cleanup with nf-boost",
    "link": "https://nextflow.io/blog/2024/experimental-cleanup-with-nf-boost.html",
    "summary": `nf-boost is a Nextflow plugin that tackles storage issues by cleaning intermediate files on the fly, inspired by challenges faced with the GEMmaker pipeline. This blog post tells the backstory and what you can achieve with the plugin today.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "August 8, 2024"
  },
  
];

export default openringData;
