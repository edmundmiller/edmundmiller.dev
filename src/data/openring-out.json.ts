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
  
  {
    "title": "What is the soul of a game?",
    "link": "https://xeiaso.net/videos/2024/soul-of-game/",
    "summary": `A video essay about Pikmin`,
    "source_title": "Xe Iaso&#39;s blog",
    "source_link": "https://xeiaso.net/",
    "date": "August 30, 2024"
  },
  
  {
    "title": "Moving toward better support through the Community forum",
    "link": "https://nextflow.io/blog/2024/better-support-through-community-forum-2024.html",
    "summary": `Announcing a wave of improvements to the Community forum, including a sleeker design, better navigation and a one-size-fits-all category for support questions.`,
    "source_title": "Nextflow Blog",
    "source_link": "https://nextflow.io/",
    "date": "August 28, 2024"
  },
  
];

export default openringData;
