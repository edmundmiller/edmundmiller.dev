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
    "title": "Make your Next.JS Docker images microscopic!",
    "link": "https://xeiaso.net/notes/2024/small-nextjs-images/",
    "summary": `Do standalone builds on Alpine`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "September 22, 2024"
  },
  
  {
    "title": "Migration from Biocontainers to Seqera Containers: Part 1",
    "link": "https://nf-co.re/blog/2024/seqera-containers-part-1/",
    "summary": `What Seqera Containers is and why we want to move to it.`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "September 17, 2024"
  },
  
  {
    "title": "Addressing Bioinformatics Core Challenges with Nextflow and nf-core",
    "link": "https://nextflow.io/blog/2024/addressing-bioinformatics-core-challenges.html",
    "summary": `From managing complex pipelines to optimizing resource utilization, Nextflow offers a range of benefits that can streamline workflows and improve productivity for bioinformatics core groups.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "September 11, 2024"
  },
  
];

export default openringData;
