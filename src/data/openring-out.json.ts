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
  
  {
    "title": "Neurodivergence and accountability in free software",
    "link": "https://drewdevault.com/2024/09/25/2024-09-25-Neurodivergence-and-accountability-in-free-software.html",
    "summary": `In November of last year, I wrote Richard Stallman’s political discourse on
sex, which argues that Richard Stallman, the founder of and present-day
voting member of the board of directors of the Free Software Foundation (FSF),
endorses and advocates for a ha…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "September 25, 2024"
  },
  
];

export default openringData;
