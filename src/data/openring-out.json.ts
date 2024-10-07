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
    "title": "Migration from Biocontainers to Seqera Containers: Part 2",
    "link": "https://nf-co.re/blog/2024/seqera-containers-part-2/",
    "summary": `nf-core containers automation: how it&amp;#39;ll all work behind the curtain`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "October 2, 2024"
  },
  
  {
    "title": "You&#39;re probably not vulnerable to the CUPS CVE",
    "link": "https://xeiaso.net/notes/2024/cups-cve/",
    "summary": `Unless your servers can print for some reason`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "September 26, 2024"
  },
  
  {
    "title": "My Journey with Nextflow: From Exploration to Automation",
    "link": "https://nextflow.io/blog/2024/journey-from-exploration-to-automation.html",
    "summary": `From traditional scripting to streamlined automation: Dr. Pritam Kumar Panda shares his transformative journey with Nextflow, now a vital tool in his bioinformatics career at DKFZ, Heidelberg.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "September 25, 2024"
  },
  
];

export default openringData;
