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
    "title": "Function calling in large language models",
    "link": "https://xeiaso.net/talks/2024/llm-function-calling/",
    "summary": `It&amp;#39;s hard to pay attention when your context goes out the window.`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "June 16, 2024"
  },
  
  {
    "title": "Fostering Bioinformatics Growth in Türkiye",
    "link": "https://nextflow.io/blog/2024/bioinformatics-growth-in-turkiye.html",
    "summary": `Kübra shares her first steps towards the establishment of a Nextflow community in Türkiye!`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "June 12, 2024"
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
