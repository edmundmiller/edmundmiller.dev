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
    "title": "Maintainers Minutes: August 2024",
    "link": "https://nf-co.re/blog/2024/maintainers-minutes-2024-07-26/",
    "summary": `Keeping you informed of the latest maintainers discussions`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "August 14, 2024"
  },
  
  {
    "title": "&#34;No way to prevent this&#34; say users of only language where this regularly happens",
    "link": "https://xeiaso.net/shitposts/no-way-to-prevent-this/CVE-2024-38063/",
    "summary": `
        In the hours following the release of CVE-2024-38063 for the project Microsoft Windows, site reliability workers
        and systems administrators scrambled to desperately rebuild and patch all their systems to fix a vulnerability where a speciall…`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
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
