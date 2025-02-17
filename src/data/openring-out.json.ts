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
    "title": "A holistic perspective on intellectual property, part 1",
    "link": "https://drewdevault.com/2025/02/13/2025-02-13-On-intellectual-property.html",
    "summary": `I’d like to write about intellectual property in depth, in this first of a
series of blog posts on the subject. I’m not a philosopher, but philosophy is
the basis of reasonable politics so buckle up for a healthy Friday afternoon
serving of it.
To understand …`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "February 13, 2025"
  },
  
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
    "title": "Maintainers Minutes: January 2025",
    "link": "https://nf-co.re/blog/2025/maintainers-minutes-2025-01-31/",
    "summary": `Keeping you informed of the latest maintainers discussions`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "January 31, 2025"
  },
  
];

export default openringData;
