export interface OpenringItem {
  title: string;
  link: string;
  summary: string;
  source_title: string;
  source_link: string;
  date: string;
}

export const openringData: OpenringItem[] = [
  {
    title:
      '&#34;No way to prevent this&#34; say users of only language where this regularly happens',
    link: 'https://xeiaso.net/shitposts/no-way-to-prevent-this/memory-safety/CVE-2026-8461/',
    summary: `
        In the hours following the release of CVE-2026-8461 for the project FFmpeg, site reliability workers
        and systems administrators scrambled to desperately rebuild and patch all their systems to fix an out-of-bounds write in the MagicYUV decod…`,
    source_title: 'Xe Iaso&#39;s blog',
    source_link: 'https://xeiaso.net/',
    date: 'June 25, 2026',
  },

  {
    title: 'Introducing the nf-core newsletter',
    link: 'https://nf-co.re/blog/2026/newsletter-launch/',
    summary: `Community news, pipeline releases and events, gathered once a month and emailed to you if you want it`,
    source_title: 'nf-core blog',
    source_link: 'https://nf-co.re/',
    date: 'June 23, 2026',
  },

  {
    title: 'The circus freaks of open source',
    link: 'https://drewdevault.com/blog/Circus-freaks-of-FOSS/',
    summary: `
            The masterwork of Terry A. Davis is his eclectic operating system, TempleOS, which he worked on until his tragic death in 2018. In terms of technical excellence, TempleOS rates well in some respects and poorly in others. For example, it earns …`,
    source_title: 'Drew DeVault&#39;s blog',
    source_link: 'https://drewdevault.com',
    date: 'June 5, 2026',
  },
];

export default openringData;
