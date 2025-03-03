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
    "title": "Yoke is really cool",
    "link": "https://xeiaso.net/blog/2025/yoke-k8s/",
    "summary": `Infrastructure as code, but actually`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "March 2, 2025"
  },
  
  {
    "title": "Maintainers Minutes: February 2025",
    "link": "https://nf-co.re/blog/2025/maintainers-minutes-2025-02-28/",
    "summary": `Keeping you informed of the latest maintainers discussions`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "February 28, 2025"
  },
  
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
  
];

export default openringData;
