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
    "link": "https://xeiaso.net/shitposts/no-way-to-prevent-this/CVE-2023-52656/",
    "summary": `
        In the hours following the release of CVE-2023-52656 for the project The Linux kernel, site reliability workers
        and systems administrators scrambled to desperately rebuild and patch all their systems to fix a somewhat vague &amp;#34;exploitable…`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "May 26, 2024"
  },
  
  {
    "title": "Writing a Unix clone in about a month",
    "link": "https://drewdevault.com/2024/05/24/2024-05-24-Bunnix.html",
    "summary": `I needed a bit of a break from “real work” recently, so I started a new
programming project that was low-stakes and purely recreational. On April 21st,
I set out to see how much of a Unix-like operating system for x86_64 targets
that I could put together in …`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "May 24, 2024"
  },
  
  {
    "title": "Open call for new Nextflow Ambassadors closes June 14",
    "link": "https://nextflow.io/blog/2024/ambassador-second-call.html",
    "summary": `We&amp;#39;ve been recruiting more volunteers to the Nextflow Ambasador program and the applications close in June 14. This post is an official reminder for those interested in applying! ;)`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "May 17, 2024"
  },
  
];

export default openringData;
