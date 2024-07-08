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
    "title": "&#34;No way to prevent this&#34; say users of only language where this regularly happens",
    "link": "https://xeiaso.net/shitposts/no-way-to-prevent-this/CVE-2024-6387/",
    "summary": `
        In the hours following the release of CVE-2024-6387 for the project OpenSSH, site reliability workers
        and systems administrators scrambled to desperately rebuild and patch all their systems to fix a combination of memory unsafety and glibc&amp;…`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "July 1, 2024"
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
