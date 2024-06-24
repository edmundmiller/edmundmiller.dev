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
    "title": "MIME, RSS, and existential torment",
    "link": "https://xeiaso.net/blog/2024/fixing-rss-mailcap/",
    "summary": `TL;DR: how I fixed my RSS feed by installing mailcap so I don&amp;#39;t get tormented by mimes`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "June 23, 2024"
  },
  
  {
    "title": "Reflecting on a Six-Month Collaboration: Insights from a Nextflow Ambassador",
    "link": "https://nextflow.io/blog/2024/reflecting-ambassador-collaboration.html",
    "summary": `Cristina Tuñi reflects on a collaboration that emerged after her contact was found in the Nextflow Ambassador page.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "June 19, 2024"
  },
  
  {
    "title": "Can I still be a data engineer if I don’t know Python?",
    "link": "https://monimiller.com/blog/should-my-data-engineering-title-be-revoked-if-i-dont-know-python/",
    "summary": `A self-discovery into life, liberty, and the pursuit of data.`,
    "source_title": "Monica Miller - Data Girl in a Data World",
    "source_link": "https://monimiller.com/",
    "date": "May 29, 2024"
  },
  
];

export default openringData;
