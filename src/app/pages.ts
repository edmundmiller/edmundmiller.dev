import * as stylex from '@stylexjs/stylex';
import type { Html, HtmlBuilder } from 'foldkit/html';
import content from '../generated/content.json';
import type { ContentNode, ContentPage } from '../content/types';
import type { SiteMeta } from '../types';
import { menuLinks, siteConfig } from '../site.config';
import { contentData } from '../data/content.json';
import { getFormattedDate } from '../utils/date';
import { createAuthorInfo } from '../utils/github';
import { generateToc, type TocItem } from '../utils/generate-toc';
import landscape from '../assets/illustrations/sequence-landscape.webp?url';
import fieldNotes from '../assets/illustrations/field-notes.webp?url';
import { styles as home } from '../pages/_index.stylex';
import { styles as listing } from '../pages/posts/_posts.stylex';
import { styles as tagPage } from '../pages/tags/[tag]/_tag-posts.stylex';
import { styles as tagsStyle } from '../pages/tags/_index.stylex';
import { styles as preview } from '../components/blog/post-preview.stylex';
import { styles as paginator } from '../components/paginator.stylex';
import { styles as blog } from '../layouts/blog-post.stylex';
import { styles as about } from '../layouts/about.stylex';
import { styles as hero } from '../components/blog/hero.stylex';
import { styles as authorStyle } from '../components/author.stylex';
import { styles as toc } from '../components/blog/toc.stylex';
import { styles as tocHeading } from '../components/blog/toc-heading.stylex';
import { styles as callout } from '../components/admonition.stylex';
import { styles as footer } from '../components/layout/footer.stylex';
import { styles as speaking } from '../pages/_speaking.stylex';
import { styles as missing } from '../pages/_404.stylex';
import { styles as social } from '../components/social-list.stylex';
import { Message, type Model } from './model';
import type { Route } from './route';
import { cadenceView } from './widgets';
import { calloutPaths, socialPaths } from './page-icons';
import { styles as contentStyles } from './content.stylex';

type Child = Html | string;
type Styles = (stylex.CompiledStyles | boolean | null | undefined)[];

const { posts: allPosts, pages } = content as { posts: ContentPage[]; pages: ContentPage[] };
const posts = allPosts
  .filter((post) => !import.meta.env.PROD || !post.draft)
  .sort(
    (a, b) =>
      new Date(b.updatedDate ?? b.publishDate ?? 0).valueOf() -
      new Date(a.updatedDate ?? a.publishDate ?? 0).valueOf(),
  );
const tags = [...new Set(posts.flatMap((post) => post.tags))];
const tagged = (tag: string) => posts.filter((post) => post.tags.includes(tag));
const paginationPath = (base: string, page: number) => `${base}${page === 1 ? '' : `${page}/`}`;
const paths = (base: string, count: number) =>
  Array.from({ length: Math.max(1, Math.ceil(count / 10)) }, (_, i) => paginationPath(base, i + 1));
export const prerenderPaths: readonly string[] = [
  '/',
  '/tags/',
  '/speaking/',
  ...pages.map((page) => `/${page.id}/`),
  ...paths('/posts/', posts.length),
  ...posts.map((post) => `/posts/${post.id}/`),
  ...tags.flatMap((tag) => paths(`/tags/${tag}/`, tagged(tag).length)),
  '/404.html',
];

const notFoundMeta: SiteMeta = {
  title: 'Oops! You found a missing page!',
  description:
    'This page was not found. Use the site navigation to find Edmund Miller posts, talks, and bioinformatics notes.',
  robots: 'noindex, follow',
};
export function pageMetadata(route: Route): SiteMeta {
  switch (route._tag) {
    case 'Home':
      return {
        title: 'Bioinformatics Engineer — Nextflow & nf-core',
        description: siteConfig.description,
      };
    case 'Posts':
      return {
        title: 'Posts',
        description:
          'Posts by Edmund Miller about bioinformatics, genomics, Nextflow, nf-core, software engineering, Nix, Emacs, and reproducible workflows.',
      };
    case 'Tags':
      return {
        title: 'All Tags',
        description: "A list of all the topics I've written about in my posts",
      };
    case 'Tag':
      return {
        title: `Tag: ${route.tag}`,
        description: `View all posts with the tag - ${route.tag}`,
      };
    case 'Speaking':
      return {
        title: 'Speaking',
        description:
          'Conference talks by Edmund Miller about bioinformatics, nf-core, Nextflow, functional genomics, and reproducible scientific workflows.',
      };
    case 'Post':
    case 'Page': {
      const page =
        route._tag === 'Post'
          ? posts.find((p) => p.id === route.slug)
          : pages.find((p) => p.id === route.id);
      if (!page) return notFoundMeta;
      const article = route._tag === 'Post' || page.id === 'admonitions-demo';
      const articleDate = page.updatedDate ?? page.publishDate;
      return {
        title: page.title,
        description: page.description,
        ...(page.canonical ? { canonical: page.canonical } : {}),
        ...(page.robots ? { robots: page.robots } : {}),
        ...(article
          ? {
              ogImage: page.ogImage ?? `/og-image/${page.id}.png`,
              ...(articleDate ? { articleDate } : {}),
              author: page.author,
            }
          : {}),
      };
    }
    case 'NotFound':
      return notFoundMeta;
  }
}

export function footerView(h: HtmlBuilder<Message>): Html {
  const c = (...s: Styles) => h.Class(stylex.props(...s).className ?? '');
  return h.footer(
    [c(footer.footer)],
    [
      h.img([c(footer.illustration), h.Src(fieldNotes), h.Alt(''), h.Attribute('loading', 'lazy')]),
      h.div(
        [c(footer.copyright)],
        [
          `© ${siteConfig.author} ${new Date().getFullYear()}.`,
          h.span([c(footer.credit)], [' Foldkit · Cactus']),
        ],
      ),
      h.nav(
        [c(footer.navigation), h.AriaLabel('More on this site')],
        menuLinks.map((link) => h.a([c(footer.navigationLink), h.Href(link.path)], [link.title])),
      ),
    ],
  );
}

export function pageView(model: Model, h: HtmlBuilder<Message>): Html {
  const c = (...s: Styles) => h.Class(stylex.props(...s).className ?? '');
  const semantic = (name: string, ...s: Styles) =>
    h.Class(`${name} ${stylex.props(...s).className ?? ''}`);
  const lineIcon = (path: string, style: stylex.CompiledStyles) =>
    h.svg(
      [
        c(style),
        h.Attribute('viewBox', '0 0 24 24'),
        h.Attribute('aria-hidden', 'true'),
        h.Attribute('fill', 'none'),
        h.Attribute('stroke', 'currentColor'),
        h.Attribute('stroke-width', '1.5'),
        h.Attribute('stroke-linecap', 'round'),
        h.Attribute('stroke-linejoin', 'round'),
      ],
      [h.path([h.Attribute('d', path)])],
    );
  const tagIcon = (style: stylex.CompiledStyles) =>
    lineIcon(
      'M7.859 6H5.025A2.025 2.025 0 0 0 3 8.025v2.834c0 .537 .213 1.052 .593 1.432l6.116 6.116a2.025 2.025 0 0 0 2.864 0l2.834-2.834a2.025 2.025 0 0 0 0-2.864L9.29 6.593A2.025 2.025 0 0 0 7.859 6M17.573 18.407l2.834-2.834a2.025 2.025 0 0 0 0-2.864L13.29 5.593M6 9h-.01',
      style,
    );
  const icon = (path: string, style: stylex.CompiledStyles) =>
    h.svg(
      [
        c(style),
        h.Attribute('viewBox', '0 0 24 24'),
        h.Attribute('fill', 'currentColor'),
        h.Attribute('aria-hidden', 'true'),
      ],
      [h.path([h.Attribute('d', path)])],
    );
  const date = (value: string, long = false) =>
    h.time(
      [h.Attribute('datetime', value)],
      [getFormattedDate(value, long ? { month: 'long' } : undefined)],
    );
  const codeText = (body: readonly ContentNode[]): string =>
    body
      .map((node) =>
        node.type === 'text'
          ? node.value
          : codeText(node.children) +
            (node.type === 'element' && node.attributes.class?.split(' ').includes('ec-line')
              ? '\n'
              : ''),
      )
      .join('');
  const nodes = (body: readonly ContentNode[], path = ''): Child[] =>
    body.map((node, index): Child => {
      if (node.type === 'text') return node.value;
      const nodePath = `${path}.${index}`;
      if (node.type === 'element') {
        const pre =
          node.tag === 'figure'
            ? node.children.find((child) => child.type === 'element' && child.tag === 'pre')
            : undefined;
        const id = `${model.pathname}:${nodePath}`;
        return h.keyed(node.tag)(
          index,
          Object.entries(node.attributes).map(([name, value]) => h.Attribute(name, value)),
          [
            ...nodes(node.children, nodePath),
            ...(pre
              ? [
                  h.button(
                    [
                      c(contentStyles.copy),
                      h.Type('button'),
                      h.AriaLabel('Copy code'),
                      h.Disabled(!model.isReady),
                      h.OnClick(Message.ClickedCopyCode({ id, text: codeText([pre]) })),
                    ],
                    [
                      model.copiedCode?.id === id
                        ? model.copiedCode.succeeded
                          ? 'Copied'
                          : 'Copy failed'
                        : 'Copy code',
                    ],
                  ),
                ]
              : []),
          ],
        );
      }
      const expanded =
        !model.isReady || !node.collapsible || (model.callouts[node.id] ?? !node.collapsed);
      const title = node.title || node.kind.charAt(0).toUpperCase() + node.kind.slice(1);
      return h.div(
        [
          c(callout.container, callout[`${node.kind}Container`]),
          h.DataAttribute('type', node.kind),
        ],
        [
          h.div(
            [c(callout.header)],
            [
              h.div(
                [c(callout.icon, callout[`${node.kind}Icon`])],
                [icon(calloutPaths[node.kind], callout.iconGraphic)],
              ),
              h.div(
                [c(callout.body)],
                [
                  node.collapsible
                    ? h.button(
                        [
                          c(callout.toggle, callout[`${node.kind}Title`]),
                          h.Type('button'),
                          h.Attribute('aria-expanded', String(expanded)),
                          h.Attribute('aria-controls', node.id),
                          h.Disabled(!model.isReady),
                          h.OnClick(Message.ClickedCallout({ id: node.id, expanded: !expanded })),
                        ],
                        [
                          title,
                          h.svg(
                            [
                              c(callout.chevron),
                              h.DataAttribute('expanded', String(expanded)),
                              h.Attribute('viewBox', '0 0 24 24'),
                              h.Attribute('aria-hidden', 'true'),
                            ],
                            [
                              h.path([
                                h.Attribute('d', 'm6 9 6 6 6-6'),
                                h.Attribute('fill', 'none'),
                                h.Attribute('stroke', 'currentColor'),
                              ]),
                            ],
                          ),
                        ],
                      )
                    : h.div([c(callout.staticTitle, callout[`${node.kind}Title`])], [title]),
                  h.div(
                    [
                      h.Id(node.id),
                      c(callout.content, node.collapsible && callout.contentCollapsible),
                      h.DataAttribute('expanded', String(expanded)),
                    ],
                    [h.div([h.Class('prose')], nodes(node.children, nodePath))],
                  ),
                ],
              ),
            ],
          ),
        ],
      );
    });
  const postPreview = (post: ContentPage, heading = true) => [
    h.time(
      [
        semantic('dt-published', preview.date),
        h.Attribute('datetime', post.updatedDate ?? post.publishDate ?? ''),
      ],
      [getFormattedDate(post.updatedDate ?? post.publishDate ?? '')],
    ),
    h.keyed(heading ? 'h2' : 'div')(
      post.id,
      [],
      [
        ...(post.draft ? [h.span([c(preview.draft)], ['(Draft) '])] : []),
        h.a([semantic('p-name', preview.titleLink), h.Href(`/posts/${post.id}/`)], [post.title]),
      ],
    ),
    h.q([semantic('p-summary', preview.description)], [post.description]),
  ];
  const pagination = (base: string, page: number, count: number, isTag: boolean) =>
    h.nav(
      [c(paginator.navigation), h.AriaLabel('Pagination')],
      [
        ...(page > 1
          ? [
              h.a(
                [c(paginator.previousLink), h.Href(paginationPath(base, page - 1))],
                [`← Previous ${isTag ? 'Tags' : 'Posts'}`],
              ),
            ]
          : []),
        ...(page * 10 < count
          ? [
              h.a(
                [c(paginator.nextLink), h.Href(paginationPath(base, page + 1))],
                [`Next ${isTag ? 'Tags' : 'Posts'} →`],
              ),
            ]
          : []),
      ],
    );
  const tocItem = (item: TocItem): Html =>
    h.li(
      [c(item.depth > 2 && tocHeading.childItem)],
      [
        h.a(
          [
            c(
              tocHeading.anchor,
              item.depth > 2 ? tocHeading.childAnchor : tocHeading.sectionAnchor,
            ),
            h.Href(`#${item.slug}`),
            h.AriaLabel(`Scroll to section: ${item.text}`),
          ],
          [h.span([c(tocHeading.marker)], ['#']), item.text],
        ),
        ...(item.children.length ? [h.ul([], item.children.map(tocItem))] : []),
      ],
    );
  const article = (page: ContentPage, isPost: boolean): Html => {
    const headings = isPost ? generateToc(page.headings) : [];
    return h.div(
      [],
      [
        h.div(
          [c(blog.shell)],
          [
            ...(headings.length
              ? [
                  h.aside(
                    [c(toc.navigation)],
                    [
                      h.h2([c(toc.heading)], ['Table of Contents']),
                      h.ul([c(toc.sectionList)], headings.map(tocItem)),
                    ],
                  ),
                ]
              : []),
            h.article(
              [semantic('h-entry', blog.article), h.DataAttribute('pagefind-body', '')],
              [
                h.div(
                  [h.Id('blog-hero')],
                  [
                    ...(page.coverImage
                      ? [
                          h.div(
                            [c(hero.cover)],
                            [
                              h.img([
                                c(hero.coverImage),
                                h.Src(page.coverImage.src),
                                h.Alt(page.coverImage.alt),
                                h.Attribute('width', String(page.coverImage.width)),
                                h.Attribute('height', String(page.coverImage.height)),
                              ]),
                            ],
                          ),
                        ]
                      : []),
                    h.h1([semantic('p-name', hero.title)], [page.title]),
                    h.div(
                      [c(hero.metaRow)],
                      [
                        h.p(
                          [c(hero.published)],
                          [
                            ...(page.publishDate ? [date(page.publishDate, true)] : []),
                            ...(isPost ? [` / ${page.readingTime}`] : []),
                          ],
                        ),
                        ...(page.updatedDate
                          ? [
                              h.span(
                                [c(hero.updated)],
                                ['Last Updated: ', date(page.updatedDate, true)],
                              ),
                            ]
                          : []),
                      ],
                    ),
                    ...(page.author.length
                      ? [
                          h.div(
                            [c(hero.authors)],
                            [
                              lineIcon(
                                'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0',
                                hero.authorIcon,
                              ),
                              h.span(
                                [c(hero.authorLabel)],
                                [page.author.length === 1 ? 'Author:' : 'Authors:'],
                              ),
                              h.div(
                                [c(hero.authorList)],
                                page.author.map((username, i) => {
                                  const author = createAuthorInfo(username);
                                  return h.div(
                                    [c(hero.authorItem)],
                                    [
                                      h.div(
                                        [c(authorStyle.author)],
                                        [
                                          h.a(
                                            [
                                              c(authorStyle.profileLink, authorStyle.textSmall),
                                              h.Href(author.githubUrl),
                                              h.Attribute('target', '_blank'),
                                              h.Attribute('rel', 'noopener noreferrer'),
                                            ],
                                            [`@${username}`],
                                          ),
                                          ...(author.displayName !== username
                                            ? [
                                                h.span(
                                                  [
                                                    c(
                                                      authorStyle.displayName,
                                                      authorStyle.textSmall,
                                                    ),
                                                  ],
                                                  [`(${author.displayName})`],
                                                ),
                                              ]
                                            : []),
                                        ],
                                      ),
                                      ...(i < page.author.length - 1
                                        ? [
                                            h.span(
                                              [c(hero.conjunction)],
                                              [
                                                page.author.length === 2
                                                  ? 'and'
                                                  : i === page.author.length - 2
                                                    ? ', and'
                                                    : ',',
                                              ],
                                            ),
                                          ]
                                        : []),
                                    ],
                                  );
                                }),
                              ),
                            ],
                          ),
                        ]
                      : []),
                    ...(page.canonical
                      ? [
                          h.div(
                            [c(hero.canonical)],
                            [
                              lineIcon(
                                'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
                                hero.authorIcon,
                              ),
                              h.span(
                                [c(hero.canonicalText)],
                                [
                                  'Originally published at: ',
                                  h.a(
                                    [
                                      c(hero.cactusLink),
                                      h.Href(page.canonical),
                                      h.Attribute('target', '_blank'),
                                      h.Attribute('rel', 'noopener noreferrer'),
                                    ],
                                    [new URL(page.canonical).hostname],
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ]
                      : []),
                    ...(page.tags.length
                      ? [
                          h.div(
                            [c(hero.tags)],
                            [
                              tagIcon(hero.tagIcon),
                              ...page.tags.flatMap((tag, i) => [
                                h.a(
                                  [
                                    semantic('p-category', hero.tagLink),
                                    h.Href(`/tags/${tag}/`),
                                    h.DataAttribute('pagefind-filter', 'tag'),
                                  ],
                                  [tag],
                                ),
                                ...(i < page.tags.length - 1 ? [', '] : []),
                              ]),
                            ],
                          ),
                        ]
                      : []),
                  ],
                ),
                h.div(
                  [h.Class(`prose ${stylex.props(blog.prose).className ?? ''}`)],
                  [h.div([h.Class('e-content')], nodes(page.body))],
                ),
              ],
            ),
          ],
        ),
        h.button(
          [
            c(blog.backToTop),
            h.Id('to-top-btn'),
            h.DataAttribute('show', String(!model.isHeroVisible)),
            h.AriaLabel('Back to Top'),
            h.Type('button'),
            h.Disabled(!model.isReady),
            h.OnClick(Message.RequestedScrollTop()),
          ],
          [icon('m4.5 15.75 7.5-7.5 7.5 7.5-1.5 1.5-6-6-6 6z', blog.backToTopIcon)],
        ),
      ],
    );
  };
  const route = model.route;
  switch (route._tag) {
    case 'Home': {
      const years = new Map<string, number>();
      posts.forEach((post) => {
        const year = String(new Date(post.publishDate ?? '').getFullYear());
        years.set(year, (years.get(year) ?? 0) + 1);
      });
      return h.div(
        [],
        [
          h.section(
            [],
            [
              h.h1(
                [c(home.introductionTitle)],
                ['Bioinformatics engineer working on Nextflow & nf-core'],
              ),
              h.p(
                [c(home.introductionParagraph)],
                [
                  "Hello — I'm ",
                  h.a(
                    [
                      h.Href('https://edmundmiller.dev/'),
                      h.Class('h-card'),
                      h.Attribute('rel', 'me'),
                    ],
                    ['Edmund Miller'],
                  ),
                  ", a Bioinformatics Engineer at Seqera and nf-core core team member. I earned a PhD in Molecular and Cell Biology (functional genomics) at UT Dallas. I got into bioinformatics after realizing I didn't have golden hands at the bench during undergrad.",
                ],
              ),
              h.p(
                [c(home.introductionParagraph)],
                [
                  'That taste of programming got me dabbling in writing smart contracts and web apps. Through my research experience I acquired a taste for processing data with reproducible, high-throughput workflows.',
                ],
              ),
              h.p(
                [c(home.introductionClosing)],
                [
                  'I saw the light in March 2020 when I found ',
                  h.a([h.Href('https://nf-co.re/')], ['nf-core']),
                  ' and tossed aside the reptilian workflow manager for ',
                  h.a([h.Href('https://www.nextflow.io/')], ['Nextflow']),
                  ". I love a good crossover episode of technologies and I'm always trying to push the envelope.",
                ],
              ),
              socialView(h),
            ],
          ),
          h.img([
            c(home.illustration),
            h.Src(landscape),
            h.Alt(
              'Colorful genomic reads and coverage peaks becoming Texas hills and a limestone creek.',
            ),
          ]),
          h.section(
            [c(home.startHere), h.Attribute('aria-labelledby', 'start-here')],
            [
              h.h2([c(home.sectionTitle), h.Id('start-here')], ['Start here']),
              h.p(
                [c(home.startHereDescription)],
                [
                  "If you're here for bioinformatics tooling, reproducible workflows, or Emacs-shaped developer ergonomics, these are the best next steps.",
                ],
              ),
              h.div(
                [c(home.startHereLinks)],
                (
                  [
                    ['posts', 'Read the technical posts'],
                    ['speaking', 'See conference talks'],
                    ['about', "Learn what I'm working on"],
                  ] as const
                ).map(([id, text]) =>
                  h.a(
                    [
                      c(home.cactusLink),
                      h.Href(`/${id}/`),
                      h.DataAttribute('goatcounter-event', `home-start-${id}`),
                    ],
                    [text],
                  ),
                ),
              ),
            ],
          ),
          h.section(
            [c(home.posts), h.AriaLabel('Blog post list')],
            [
              h.h2([c(home.sectionTitle)], ['Posts']),
              h.figure(
                [c(home.cadence)],
                [
                  h.figcaption([c(home.cadenceCaption)], ['Writing cadence · posts per year']),
                  cadenceView(
                    [...years]
                      .map(([year, count]) => ({ year, posts: count }))
                      .sort((a, b) => a.year.localeCompare(b.year)),
                    model.chartYear,
                    h,
                  ),
                ],
              ),
              h.ul(
                [c(home.postList)],
                posts.slice(0, 10).map((post) => h.li([c(home.post)], postPreview(post, false))),
              ),
              h.a(
                [c(home.cactusLink, home.allPostsLink), h.Href('/posts/')],
                ['View all posts ', h.span([h.Attribute('aria-hidden', 'true')], ['→'])],
              ),
            ],
          ),
          h.section([c(home.openringSpacing)], []),
        ],
      );
    }
    case 'Posts':
    case 'Tag': {
      const isTag = route._tag === 'Tag';
      const data = isTag ? tagged(route.tag) : posts;
      const base = isTag ? `/tags/${route.tag}/` : '/posts/';
      if (
        !Number.isInteger(route.page) ||
        route.page < 1 ||
        route.page > Math.max(1, Math.ceil(data.length / 10)) ||
        (isTag && !tags.includes(route.tag))
      )
        break;
      const list = h.section(
        [h.AriaLabel('Blog post list'), h.Class('h-feed')],
        [
          h.ul(
            [c(isTag ? tagPage.postList : listing.postList)],
            data
              .slice((route.page - 1) * 10, route.page * 10)
              .map((post) => h.li([c(isTag ? tagPage.post : listing.post)], postPreview(post))),
          ),
          pagination(base, route.page, data.length, isTag),
        ],
      );
      return h.div(
        [],
        [
          h.h1(
            [c(isTag ? tagPage.pageTitle : listing.pageTitle)],
            isTag
              ? [
                  h.a([c(tagPage.tagsLink), h.Href('/tags/')], ['Tags']),
                  h.span([c(tagPage.separator)], ['→']),
                  h.span([c(tagPage.tagName)], [`#${route.tag}`]),
                ]
              : ['Posts'],
          ),
          isTag
            ? list
            : h.div(
                [c(listing.pageGrid)],
                [
                  list,
                  h.aside(
                    [],
                    [
                      h.h2([c(listing.sidebarHeading)], [tagIcon(listing.tagIcon), 'Tags']),
                      h.ul(
                        [c(listing.tagList)],
                        tags.map((tag) =>
                          h.li(
                            [],
                            [
                              h.a(
                                [
                                  c(listing.tagLink),
                                  h.Href(`/tags/${tag}/`),
                                  h.AriaLabel(`View all posts with the tag: ${tag}`),
                                ],
                                [tag],
                              ),
                            ],
                          ),
                        ),
                      ),
                      h.span(
                        [c(listing.allTags)],
                        [h.a([c(listing.allTagsLink), h.Href('/tags/')], ['View all →'])],
                      ),
                    ],
                  ),
                ],
              ),
        ],
      );
    }
    case 'Tags':
      return h.div(
        [],
        [
          h.h1([c(tagsStyle.pageTitle)], ['Tags']),
          h.ul(
            [c(tagsStyle.tagList)],
            [...tags]
              .sort((a, b) => tagged(b).length - tagged(a).length)
              .map((tag) =>
                h.li(
                  [c(tagsStyle.tag)],
                  [
                    h.a(
                      [
                        c(tagsStyle.tagLink),
                        h.Href(`/tags/${tag}/`),
                        h.Attribute('title', `View posts with the tag: ${tag}`),
                      ],
                      [`#${tag}`],
                    ),
                    h.span(
                      [c(tagsStyle.count)],
                      [`- ${tagged(tag).length} Post${tagged(tag).length > 1 ? 's' : ''}`],
                    ),
                  ],
                ),
              ),
          ),
        ],
      );
    case 'Post': {
      const post = posts.find((p) => p.id === route.slug);
      if (post) return article(post, true);
      break;
    }
    case 'Page': {
      const page = pages.find((p) => p.id === route.id);
      if (page)
        return page.id === 'admonitions-demo'
          ? article(page, false)
          : h.div(
              [c(about.content)],
              [
                h.div(
                  [h.Class(`prose ${stylex.props(about.prose).className ?? ''}`)],
                  nodes(page.body),
                ),
              ],
            );
      break;
    }
    case 'Speaking':
      return h.div(
        [c(speaking.page)],
        [
          h.div(
            [c(speaking.content)],
            [
              h.div(
                [],
                [
                  h.h1([c(speaking.pageTitle)], ['My Conference Talks']),
                  h.p(
                    [c(speaking.introduction)],
                    ["A collection of talks I've given at various conferences."],
                  ),
                ],
              ),
              h.section(
                [h.AriaLabel('Talk list'), h.Class('h-feed')],
                [
                  h.div(
                    [c(speaking.talkList)],
                    [...contentData]
                      .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
                      .map((talk) =>
                        h.div(
                          [c(speaking.talk)],
                          [
                            h.div(
                              [c(speaking.talkMeta)],
                              [
                                h.time(
                                  [c(speaking.metadata), h.Attribute('datetime', talk.date)],
                                  [getFormattedDate(talk.date)],
                                ),
                                ...(talk.videoHref
                                  ? [
                                      h.a(
                                        [c(speaking.videoLink), h.Href(talk.videoHref)],
                                        ['Watch Video'],
                                      ),
                                    ]
                                  : []),
                              ],
                            ),
                            h.div(
                              [c(speaking.talkContent)],
                              [
                                h.h2(
                                  [c(speaking.talkTitle, !talk.href && speaking.talkTitleText)],
                                  talk.href
                                    ? [
                                        h.a(
                                          [c(speaking.talkTitleLink), h.Href(talk.href)],
                                          [talk.title],
                                        ),
                                      ]
                                    : [talk.title],
                                ),
                                h.p([c(speaking.event)], [`${talk.event}, ${talk.location}`]),
                                ...(talk.desc ? [h.p([c(speaking.description)], [talk.desc])] : []),
                              ],
                            ),
                          ],
                        ),
                      ),
                  ),
                ],
              ),
            ],
          ),
        ],
      );
    case 'NotFound':
      break;
  }
  return h.div(
    [],
    [
      h.h1([c(missing.pageTitle)], ['404 | Oops something went wrong']),
      h.p([c(missing.guidance)], ['Please use the navigation to find your way back']),
      h.div(
        [c(missing.imageContainer)],
        [
          h.img([
            h.Src('https://libraryofjuggling.com/JugglingGifs/3balltricks/bostonmess.gif'),
            h.Alt('A juggler doing the boston mess pattern'),
            h.Attribute('loading', 'eager'),
          ]),
        ],
      ),
    ],
  );
}

function socialView(h: HtmlBuilder<Message>): Html {
  const c = (...s: Styles) => h.Class(stylex.props(...s).className ?? '');
  const links = [
    ['GitHub', 'https://github.com/edmundmiller', true],
    ['Mastodon', 'https://genomic.social/@emiller', true],
    ['Matrix', 'https://matrix.to/#/@emiller:beeper.com', false],
    ['Discord', 'https://discordapp.com/users/EdmundM', false],
    ['email', 'mailto:hello@edmundmiller.dev', true],
  ] as const;
  return h.div(
    [c(social.socialList)],
    [
      h.p([], ['Find me on']),
      h.ul(
        [c(social.links)],
        links.map(([name, url, me]) =>
          h.li(
            [c(social.item)],
            [
              h.a(
                [
                  c(social.link),
                  h.Href(url),
                  h.Attribute('target', '_blank'),
                  h.Attribute('rel', `noopener noreferrer ${me ? 'me authn' : ''}`),
                  h.DataAttribute('goatcounter-event', `social-${name.toLowerCase()}`),
                ],
                [
                  h.svg(
                    [
                      c(social.icon),
                      h.Attribute('viewBox', '0 0 24 24'),
                      h.Attribute('aria-hidden', 'true'),
                    ],
                    [
                      h.path([
                        h.Attribute('fill', 'currentColor'),
                        h.Attribute('d', socialPaths[name]),
                      ]),
                    ],
                  ),
                  h.span([c(social.accessibleLabel)], [name]),
                ],
              ),
            ],
          ),
        ),
      ),
    ],
  );
}
