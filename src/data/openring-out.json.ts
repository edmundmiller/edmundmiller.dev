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
    "title": "My first deploys for a new Kubernetes cluster",
    "link": "https://xeiaso.net/notes/2024/essential-k8s/",
    "summary": `This is documentation for myself, but you may enjoy it too`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "November 3, 2024"
  },
  
  {
    "title": "Announcing: Weekly Helpdesk",
    "link": "https://nf-co.re/blog/2024/helpdesk/",
    "summary": `A weekly drop-in sessions to connect and work together.`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "October 28, 2024"
  },
  
  {
    "title": "Daisy-chaining workflows: the nf-cascade concept",
    "link": "https://nextflow.io/blog/2024/nf-cascade.html",
    "summary": `nf-cascade is a proof-of-concept Nextflow pipeline that demonstrates how multiple workflows, such as nf-core pipelines, can be seamlessly integrated and daisy-chained into a single workflow without modifying the original workflows.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "October 9, 2024"
  },
  
];

export default openringData;
