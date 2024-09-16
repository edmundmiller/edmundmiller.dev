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
    "title": "I fixed the strawberry problem because OpenAI couldn&#39;t",
    "link": "https://xeiaso.net/blog/2024/strawberry/",
    "summary": `Remember kids: real winners cheat`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "September 13, 2024"
  },
  
  {
    "title": "Addressing Bioinformatics Core Challenges with Nextflow and nf-core",
    "link": "https://nextflow.io/blog/2024/addressing-bioinformatics-core-challenges.html",
    "summary": `From managing complex pipelines to optimizing resource utilization, Nextflow offers a range of benefits that can streamline workflows and improve productivity for bioinformatics core groups.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "September 11, 2024"
  },
  
  {
    "title": "Maintainers Minutes: September 2024",
    "link": "https://nf-co.re/blog/2024/maintainers-minutes-2024-08-30/",
    "summary": `Keeping you informed of the latest maintainers discussions`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "August 30, 2024"
  },
  
];

export default openringData;
