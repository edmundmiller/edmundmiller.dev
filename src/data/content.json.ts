export interface ContentItem {
  desc?: string;
  event: string;
  href: string;
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
    href: 'https://www.youtube.com/watch?v=tnF15h0PG1E',
    title:
      'Event-driven bioinformatics data processing with Nextflow on the Seqera Platform',
    medium: 'conference',
    tags: ['SLAS', 'Laboratory Automation', 'Nextflow', 'Seqera'],
  },
  {
    date: '2025-05-06', // Estimated date - Nextflow Summit Boston typically in May
    event: 'Nextflow Summit',
    location: 'Boston',
    href: 'https://summit.nextflow.io/2025/boston/agenda/seqera-fusion-x-nvidia-parabricks-for-accelerated-analysis/',
    title: 'Seqera Fusion x NVIDIA Parabricks for accelerated analysis',
    medium: 'conference',
    tags: ['Nextflow', 'Seqera', 'NVIDIA', 'Parabricks', 'Fusion'],
  },
  {
    date: '2022-10-14',
    event: 'Nextflow Summit',
    location: 'Barcelona',
    href: 'https://summit.nextflow.io/2022/program/oct-14-workflow-automation-using-the-aviti-benchtop-sequencing-system-and-nextflow-tower/',
    title:
      'Workflow automation: Using the Aviti benchtop sequencing system and Nextflow Tower',
    medium: 'conference',
    tags: ['Nextflow'],
  },
  {
    date: '2023-10-20',
    event: 'Nextflow Summit',
    location: 'Barcelona',
    href: 'https://youtu.be/XuoIH5mYsZE?si=wmkZTqoucrez_VmH',
    title: 'nf-test at nf-core: empowering scalable and streamlined testing',
    medium: 'conference',
    tags: ['Nextflow'],
  },
  {
    date: '2023-11-29',
    event: 'Nextflow Summit',
    location: 'Boston',
    href: 'https://summit.nextflow.io/boston/agenda/summit/nov-29-database-uses/',
    title:
      'Nextflow and database uses: powering data engineering, exploring DuckDB, and beyond',
    medium: 'conference',
    tags: ['Nextflow'],
  },
  // Juliacon 2023
  {
    date: '2023-07-26',
    event: 'Juliacon',
    href: 'https://www.youtube.com/watch?v=Q9eYgwvJfWE&pp',
    title: 'Exploring the State of Machine Learning for Biological Data',
    medium: 'conference',
    location: 'Boston',
    tags: ['Julia', 'Machine Learning'],
  },
  {
    date: '2023-07-26',
    event: 'Juliacon',
    href: 'https://www.youtube.com/watch?v=egWrDz6RDRs',
    title: 'Unlocking the Power of Genomic Analysis in Julia',
    medium: 'conference',
    location: 'Boston',
    tags: ['Julia', 'genomics'],
  },
  // nf-core
  {
    date: '2022-12-06',
    event: 'nf-core/bytesize',
    href: 'https://www.youtube.com/watch?v=K9B7JRkMpQ4',
    title: 'nf-test',
    location: 'Online',
    medium: 'online',
    tags: ['testing', 'nf-core'],
  },
  {
    date: '2022-11-01',
    event: 'nf-core/bytesize',
    href: 'https://www.youtube.com/watch?v=chayGGPTnfM',
    title: 'nascent',
    location: 'Online',
    medium: 'online',
    tags: ['genomics', 'nf-core'],
  },
  {
    date: '2021-06-15',
    event: 'nf-core/bytesize',
    href: 'https://www.youtube.com/watch?v=pjhscKyWH74',
    title: 'Pytest workflows/Github actions',
    location: 'Online',
    medium: 'online',
    tags: ['testing', 'nf-core'],
  },
  {
    date: '2023-04-20', // 2:00 – 3:00pm Denver time
    event: 'Bioinformatics Regional Resource',
    href: 'https://drive.google.com/file/d/10UwuNCOHYcSkabAdmoQVCLfrF_N9OAXx/view',
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
    href: 'https://www.youtube.com/watch?v=ynYbuloRBzk',
    title: 'Intro to Biotech',
    location: 'Online',
    medium: 'online',
    tags: ['biotech', 'science-outreach'],
  },
];

export default contentData;
