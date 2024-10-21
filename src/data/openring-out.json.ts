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
    "title": "Docker builds over SSH",
    "link": "https://xeiaso.net/notes/2024/docker-build-over-ssh/",
    "summary": `Plan 9 clustering at home`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "October 18, 2024"
  },
  
  {
    "title": "Daisy-chaining workflows: the nf-cascade concept",
    "link": "https://nextflow.io/blog/2024/nf-cascade.html",
    "summary": `nf-cascade is a proof-of-concept Nextflow pipeline that demonstrates how multiple workflows, such as nf-core pipelines, can be seamlessly integrated and daisy-chained into a single workflow without modifying the original workflows.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "October 9, 2024"
  },
  
  {
    "title": "nf-core/tools - 3.0.0",
    "link": "https://nf-co.re/blog/2024/tools-3_0_0/",
    "summary": `What flavour of the nf-core template do you prefer?`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "October 7, 2024"
  },
  
];

export default openringData;
