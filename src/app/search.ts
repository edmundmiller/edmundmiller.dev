import * as stylex from '@stylexjs/stylex';
import type { ChildAttribute, Html, HtmlBuilder } from 'foldkit/html';
import content from '../generated/content.json';
import { Message, type Model } from './model';
import { styles } from './search.stylex';

const tags = [...new Set(content.posts.flatMap((post) => post.tags))].sort();

export function searchView(
  model: Model,
  h: HtmlBuilder<Message>,
  title: ReadonlyArray<ChildAttribute> = [],
): Html {
  const cls = (style: stylex.StyleXStyles) => h.Class(stylex.props(style).className ?? '');
  return h.div(
    [h.Id('cactus__search'), cls(styles.root)],
    [
      h.label([...title, h.For('site-search-input')], ['Search']),
      h.input([
        h.Id('site-search-input'),
        h.Type('search'),
        h.Value(model.searchQuery),
        cls(styles.input),
        h.Autocomplete('off'),
        h.OnInput((query) => Message.ChangedSearchQuery({ query })),
      ]),
      h.label([h.For('site-search-tag')], ['Filter by tag']),
      h.select(
        [
          h.Id('site-search-tag'),
          cls(styles.input),
          h.Value(model.searchTag),
          h.OnChange((tag) => Message.ChangedSearchTag({ tag })),
        ],
        [
          h.option([h.Value('')], ['All tags']),
          ...tags.map((tag) => h.option([h.Value(tag)], [tag])),
        ],
      ),
      h.p(
        [h.Hidden(import.meta.env.PROD)],
        [
          'Search is available in production builds. Run pnpm build and pnpm preview to try it locally.',
        ],
      ),
      h.p(
        [h.Role('status'), h.Attribute('aria-live', 'polite')],
        [
          model.searchStatus === 'loading'
            ? 'Loading search…'
            : model.searchStatus === 'ready'
              ? `${model.searchTotal} results for ${model.searchQuery}`
              : '',
        ],
      ),
      h.p(
        [h.Role('alert'), h.Hidden(model.searchStatus !== 'failed')],
        ['Search could not load. Close and reopen to retry.'],
      ),
      h.ul(
        [cls(styles.results)],
        model.searchResults.map((result) =>
          h.keyed('li')(
            result.url,
            [cls(styles.result)],
            [
              h.a([h.Href(result.url), cls(styles.link)], [result.title]),
              // Pagefind returns escaped excerpts with <mark> highlighting from our built index.
              h.p([cls(styles.excerpt), h.InnerHTML(result.excerpt)], []),
            ],
          ),
        ),
      ),
    ],
  );
}
