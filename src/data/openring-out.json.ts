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
    "title": "Xecast Episode 2: Conferences, homelabs, and AI",
    "link": "https://xeiaso.net/xecast/002/",
    "summary": `
        
        Your browser does not support the audio element.
        Download MP3
        Also catch Xecast on YouTube (I&amp;#39;ll make a proper podcast feed soon, trying to de-scope so I can actually get things done).
        &amp;lt;Mimi&amp;gt; These show notes…`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "August 11, 2024"
  },
  
  {
    "title": "Experimental cleanup with nf-boost",
    "link": "https://nextflow.io/blog/2024/experimental-cleanup-with-nf-boost.html",
    "summary": `nf-boost is a Nextflow plugin that tackles storage issues by cleaning intermediate files on the fly, inspired by challenges faced with the GEMmaker pipeline. This blog post tells the backstory and what you can achieve with the plugin today.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "August 8, 2024"
  },
  
  {
    "title": "A gentle introduction to nf-core/reportho",
    "link": "https://nf-co.re/blog/2024/reportho_intro/",
    "summary": `The nf-core pipeline for comparing ortholog predictions`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "July 18, 2024"
  },
  
];

export default openringData;
