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
    "title": "Xecast Episode 1: Origins and Techaro",
    "link": "https://xeiaso.net/xecast/001/",
    "summary": `
        
        Your browser does not support the audio element.
        Download MP3
        Also catch Xecast on YouTube (I&amp;#39;ll make a proper podcast feed soon, trying to de-scope so I can actually get things done).
        &amp;lt;Mimi&amp;gt; These show notes…`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "July 28, 2024"
  },
  
  {
    "title": "How I became a Nextflow Ambassador!",
    "link": "https://nextflow.io/blog/2024/how_i_became_a_nextflow_ambassador.html",
    "summary": `This blog describes my journey from bash to nextflow community.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "July 24, 2024"
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
