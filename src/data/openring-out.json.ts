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
    "link": "https://xeiaso.net/shitposts/no-way-to-prevent-this/CVE-2025-0725/",
    "summary": `
        In the hours following the release of CVE-2025-0725 for the project curl, site reliability workers
        and systems administrators scrambled to desperately rebuild and patch all their systems to fix a buffer overflow involving malformed gzip str…`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "February 5, 2025"
  },
  
  {
    "title": "Join us to discuss transparency and governance at FOSDEM &#39;25",
    "link": "https://drewdevault.com/2025/01/23/2025-01-23-Transparency-and-governance-FOSDEM.html",
    "summary": `Good news: it appears that Jack Dorsey’s FOSDEM talk has been cancelled!
This is a follow up to two earlier posts, which you can read here: one and
two.
I say it “appears” so, because there has been no official statement from anyone
to that effect. There has …`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "January 23, 2025"
  },
  
  {
    "title": "nf-core/tools - 3.1.0",
    "link": "https://nf-co.re/blog/2024/tools-3_1_0/",
    "summary": `Everything is going crate`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "December 10, 2024"
  },
  
];

export default openringData;
