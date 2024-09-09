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
    "title": "LinkedIn collaborative articles confuse me",
    "link": "https://xeiaso.net/notes/2024/linkedin-collaborative-articles/",
    "summary": `Toss an insight to your algorithmic overlords`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "September 6, 2024"
  },
  
  {
    "title": "Maintainers Minutes: September 2024",
    "link": "https://nf-co.re/blog/2024/maintainers-minutes-2024-08-30/",
    "summary": `Keeping you informed of the latest maintainers discussions`,
    "source_title": "nf-core blog",
    "source_link": "https://nf-co.re/",
    "date": "August 30, 2024"
  },
  
  {
    "title": "Rust for Linux revisited",
    "link": "https://drewdevault.com/2024/08/30/2024-08-30-Rust-in-Linux-revisited.html",
    "summary": `
Ugh. Drew’s blogging about Rust again.

– You
I promise to be nice.
Two years ago, seeing the Rust-for-Linux project starting to get the ball
rolling, I wrote “Does Rust belong in the Linux kernel?”, penning a
conclusion consistent with Betteridge’s law of head…`,
    "source_title": "Drew DeVault&#39;s blog",
    "source_link": "https://drewdevault.com",
    "date": "August 30, 2024"
  },
  
];

export default openringData;
