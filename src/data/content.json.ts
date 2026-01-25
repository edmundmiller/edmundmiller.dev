export interface ContentItem {
  desc?: string;
  event: string;
  href?: string; // Talk/event page
  videoHref?: string; // Video recording
  title: string;
  medium: string;
  tags?: string[];
  date: string;
  location: string;
  transcript?: string;
}

// replace this data with whatever you want in your FAQ section
export const contentData: ContentItem[] = [
  {
    date: '2025-03-19',
    event: 'Seqera Webinar',
    location: 'Virtual',
    href: 'https://seqera.io/events/from-pipelines-to-interactive-analysis-closing-the-loop-with-seqera-studios/',
    title:
      'From Pipelines to Interactive Analysis: Closing the loop with Seqera Studios',
    medium: 'webinar',
    desc: 'Explore how Studios streamlines the entire data lifecycle, enabling seamless transition from pipelines to secure interactive analysis environments.',
    tags: ['Seqera', 'Studios', 'Nextflow', 'Interactive Analysis'],
  },
  {
    date: '2025-01-28',
    event: 'SLAS2025',
    location: 'San Diego',
    href: 'https://seqera.io/events/slas-2025-international-conference-and-exhibition/',
    videoHref: 'https://www.youtube.com/watch?v=tnF15h0PG1E',
    title:
      'Event-driven bioinformatics data processing with Nextflow on the Seqera Platform',
    medium: 'conference',
    desc: 'Modern biological applications such as sequencing or cell imaging generate vast amounts of data, necessitating scalable, reproducible, and easily deployable data processing. An introduction to Nextflow and Seqera Platform showcasing how they can help automate complex data processing pipelines.',
    tags: ['SLAS', 'Laboratory Automation', 'Nextflow', 'Seqera'],
  },
  {
    date: '2025-05-06', // Estimated date - Nextflow Summit Boston typically in May
    event: 'Nextflow Summit',
    location: 'Boston',
    href: 'https://summit.nextflow.io/2025/boston/agenda/seqera-fusion-x-nvidia-parabricks-for-accelerated-analysis/',
    videoHref: 'https://www.youtube.com/watch?v=s3Zj3zAWqm8',
    title: 'Seqera Fusion x NVIDIA Parabricks for accelerated analysis',
    medium: 'conference',
    desc: 'Parabricks is a set of GPU-accelerated analysis tools that now works with the Seqera Fusion file system. This presentation describes how to leverage these two systems together, potential use cases, as well as tips and tricks for implementing similar projects.',
    tags: ['Nextflow', 'Seqera', 'NVIDIA', 'Parabricks', 'Fusion'],
  },
  {
    date: '2022-10-14',
    event: 'Nextflow Summit',
    location: 'Barcelona',
    href: 'https://summit.nextflow.io/2022/program/oct-14-workflow-automation-using-the-aviti-benchtop-sequencing-system-and-nextflow-tower/',
    videoHref: 'https://www.youtube.com/watch?v=xbI6rWqQN6A',
    title:
      'Workflow automation: Using the Aviti benchtop sequencing system and Nextflow Tower',
    medium: 'conference',
    tags: ['Nextflow'],
  },
  {
    date: '2023-10-20',
    event: 'Nextflow Summit',
    location: 'Barcelona',
    href: 'https://summit.nextflow.io/2023/barcelona/agenda/summit/oct-20-nf-test-at-nf-core/',
    videoHref: 'https://youtu.be/XuoIH5mYsZE?si=wmkZTqoucrez_VmH',
    title: 'nf-test at nf-core: empowering scalable and streamlined testing',
    medium: 'conference',
    desc: 'The evolution of testing at nf-core: from the need for a testing framework, through pytest-workflow adoption, to nf-test for full pipelines, subworkflows and local modules. Highlights include snapshots, tags, CI configuration, and the transition from pytest-workflow to nf-test.',
    tags: ['Nextflow'],
  },
  {
    date: '2023-11-29',
    event: 'Nextflow Summit',
    location: 'Boston',
    href: 'https://summit.nextflow.io/2023/boston/agenda/summit/nov-29-database-uses/',
    videoHref: 'https://www.youtube.com/watch?v=GknH1u3NtGI',
    title:
      'Nextflow and database uses: powering data engineering, exploring DuckDB, and beyond',
    medium: 'conference',
    desc: 'A deep dive into Nextflow and database technologies. Exploring the evolving landscape of data engineering, the paradigm-shifting potential of DuckDB and Apache Arrow through biobear, and bridging the gap between file-based and database approaches for big data processing.',
    tags: ['Nextflow'],
  },
  // Juliacon 2023
  {
    date: '2023-07-26',
    event: 'Juliacon',
    href: 'https://pretalx.com/juliacon2023/talk/M9NFYN/',
    videoHref: 'https://www.youtube.com/watch?v=Q9eYgwvJfWE',
    title: 'Exploring the State of Machine Learning for Biological Data',
    medium: 'conference',
    location: 'Boston',
    desc: 'Exploring Julia for biological data analysis with BioJulia and Flux.jl. Discussion of challenges and opportunities using ML on high-dimensional, heterogeneous biological data, with examples of past and future applications.',
    tags: ['Julia', 'Machine Learning'],
  },
  {
    date: '2023-07-26',
    event: 'Juliacon',
    href: 'https://pretalx.com/juliacon2023/talk/GQWVNS/',
    videoHref: 'https://www.youtube.com/watch?v=egWrDz6RDRs',
    title: 'Unlocking the Power of Genomic Analysis in Julia',
    medium: 'conference',
    location: 'Boston',
    desc: 'Using Julia for genomic data analysis with IntervalTrees and GenomicFeatures. Covers challenges of large-scale genomic data, integrating multiple data types, and bridging file-based and database approaches.',
    tags: ['Julia', 'genomics'],
  },
  // nf-core
  {
    date: '2022-12-06',
    event: 'nf-core/bytesize',
    href: 'https://nf-co.re/events/2022/bytesize_nftest',
    videoHref: 'https://www.youtube.com/watch?v=K9B7JRkMpQ4',
    title: 'nf-test',
    location: 'Online',
    medium: 'online',
    tags: ['testing', 'nf-core'],
  },
  {
    date: '2022-11-01',
    event: 'nf-core/bytesize',
    href: 'https://nf-co.re/events/2022/bytesize_nascent',
    videoHref: 'https://www.youtube.com/watch?v=chayGGPTnfM',
    title: 'nascent',
    location: 'Online',
    medium: 'online',
    tags: ['genomics', 'nf-core'],
  },
  {
    date: '2021-06-15',
    event: 'nf-core/bytesize',
    href: 'https://nf-co.re/events/2021/bytesize-16-pytest-workflow',
    videoHref: 'https://www.youtube.com/watch?v=pjhscKyWH74',
    title: 'Pytest workflows/Github actions',
    location: 'Online',
    medium: 'online',
    tags: ['testing', 'nf-core'],
  },
  {
    date: '2023-04-20', // 2:00 – 3:00pm Denver time
    event: 'Bioinformatics Regional Resource',
    videoHref: 'https://drive.google.com/file/d/10UwuNCOHYcSkabAdmoQVCLfrF_N9OAXx/view',
    title: 'Using nf-core to create Nextflow workflows',
    location: 'Online',
    medium: 'online',
    tags: ['nf-core'],
    transcript:
      'https://docs.google.com/document/d/1hsXII7VlMMfetui-J91eC1dc2XycIGR9QXbAtd_gwkg',
  },
  // TODO Find that one that I did with Evan in August 2021
  // Other
  {
    date: '2022-08-03',
    event: 'Boston Debate League',
    videoHref: 'https://www.youtube.com/watch?v=ynYbuloRBzk',
    title: 'Intro to Biotech',
    location: 'Online',
    medium: 'online',
    tags: ['biotech', 'science-outreach'],
  },
];

export default contentData;
