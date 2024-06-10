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
    "title": "Overengineering this blog&#39;s preview site with Kubernetes",
    "link": "https://xeiaso.net/blog/2024/overengineering-preview-site/",
    "summary": `A small overview on how future-sight, my blog&amp;#39;s preview site server, is overengineered with the power of Kubernetes.`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "June 9, 2024"
  },
  
  {
    "title": "Can I still be a data engineer if I don’t know Python?",
    "link": "https://monimiller.com/blog/should-my-data-engineering-title-be-revoked-if-i-dont-know-python/",
    "summary": `A self-discovery into life, liberty, and the pursuit of data.`,
    "source_title": "Monica Miller - Data Girl in a Data World",
    "source_link": "https://monimiller.com/",
    "date": "May 29, 2024"
  },
  
  {
    "title": "Nextflow 24.04 - Release highlights",
    "link": "https://nextflow.io/blog/2024/nextflow-2404-highlights.html",
    "summary": `A highlight of some of the goodies that have just been released in the 24.04 stable release of Nextflow 24.04 stable.
`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "May 27, 2024"
  },
  
];

export default openringData;
