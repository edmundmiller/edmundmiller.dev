import * as Dialog from '@foldkit/ui/dialog';
import { Effect, Option, Schema, Stream } from 'effect';
import { Command, Render, Subscription, Update, type Runtime } from 'foldkit';
import { focus } from 'foldkit/dom';
import { defineMessageUnion } from 'foldkit/message';
import { UrlRequest, load, pushUrl } from 'foldkit/navigation';
import { Url, toString as urlToString } from 'foldkit/url';
import { Route, decodeUrlPart, isPagePath, routeFromPath } from './route';
import { trackPageView } from './analytics';

const Theme = Schema.Literals(['light', 'dark']);
const SearchResult = Schema.Struct({
  url: Schema.String,
  title: Schema.String,
  excerpt: Schema.String,
});
export const Model = Schema.Struct({
  route: Route,
  pathname: Schema.String,
  scrollOnNavigation: Schema.Boolean,
  theme: Theme,
  followsSystemTheme: Schema.Boolean,
  isReady: Schema.Boolean,
  isMenuOpen: Schema.Boolean,
  searchDialog: Dialog.Model,
  searchStatus: Schema.Literals(['idle', 'loading', 'ready', 'failed']),
  searchQuery: Schema.String,
  searchTag: Schema.String,
  searchResults: Schema.Array(SearchResult),
  searchTotal: Schema.Number,
  callouts: Schema.Record(Schema.String, Schema.Boolean),
  chartYear: Schema.NullOr(Schema.String),
  isHeroVisible: Schema.Boolean,
  copiedCode: Schema.NullOr(Schema.Struct({ id: Schema.String, succeeded: Schema.Boolean })),
});
export type Model = typeof Model.Type;

export const Message = defineMessageUnion({
  ClickedLink: { request: UrlRequest },
  ChangedUrl: { url: Url },
  CompletedNavigate: {},
  CompletedLoad: {},
  CompletedPageEffects: {},
  ClickedCallout: { id: Schema.String, expanded: Schema.Boolean },
  HoveredChartYear: { year: Schema.NullOr(Schema.String) },
  CompletedMountLogo: {},
  RequestedScrollTop: {},
  ChangedHeroVisibility: { visible: Schema.Boolean },
  ClickedCopyCode: { id: Schema.String, text: Schema.String },
  CompletedCopyCode: { id: Schema.String, succeeded: Schema.Boolean },
  ClickedMenu: {},
  PressedEscape: {},
  ClickedTheme: {},
  ChangedSystemTheme: { theme: Theme },
  CompletedReadTheme: { theme: Theme, followsSystemTheme: Schema.Boolean },
  CompletedApplyTheme: {},
  RequestedSearch: {},
  CompletedFocusSearch: {},
  GotSearchDialogMessage: { message: Dialog.Message },
  ChangedSearchQuery: { query: Schema.String },
  ChangedSearchTag: { tag: Schema.String },
  CompletedSearch: {
    query: Schema.String,
    tag: Schema.String,
    succeeded: Schema.Boolean,
    results: Schema.Array(SearchResult),
    total: Schema.Number,
  },
});
export type Message = typeof Message.Type;

const searchDialogFold = {
  read: (model: Model) => Option.some(model.searchDialog),
  write: (model: Model, searchDialog: Dialog.Model): Model => ({ ...model, searchDialog }),
  toParentMessage: (message: Dialog.Message): Message =>
    Message.GotSearchDialogMessage({ message }),
  foldOutMessage: Dialog.OutMessage.match<Update.Step<Model, Message>>({
    Opened: () => (model) => ({
      model: { ...model, isMenuOpen: false },
      commands:
        model.searchStatus === 'failed'
          ? [Search({ query: model.searchQuery, tag: model.searchTag })]
          : [],
    }),
    Closed: () => (model) => ({ model }),
  }),
};
const foldSearchDialog = Update.foldChild({ ...searchDialogFold, update: Dialog.update });
const openSearchDialog = Update.foldChildStep({ ...searchDialogFold, update: Dialog.open });
const closeSearchDialog = Update.foldChildStep({ ...searchDialogFold, update: Dialog.close });

const FocusSearch = Command.define('FocusSearch', {
  messages: [Message.CompletedFocusSearch],
  execute: focus('#site-search-input').pipe(
    // Closing or navigating before the DOM commit can remove the input.
    Effect.ignore,
    Effect.as(Message.CompletedFocusSearch()),
  ),
});

const Navigate = Command.define('Navigate', {
  args: { url: Schema.String },
  messages: [Message.CompletedNavigate],
  execute: ({ url }) => pushUrl(url).pipe(Effect.as(Message.CompletedNavigate())),
});
const CopyCode = Command.define('CopyCode', {
  args: { id: Schema.String, text: Schema.String },
  messages: [Message.CompletedCopyCode],
  execute: ({ id, text }) =>
    Effect.tryPromise(() => navigator.clipboard.writeText(text)).pipe(
      Effect.map(() => Message.CompletedCopyCode({ id, succeeded: true })),
      Effect.catch(() => Effect.succeed(Message.CompletedCopyCode({ id, succeeded: false }))),
    ),
});
const Load = Command.define('Load', {
  args: { href: Schema.String },
  messages: [Message.CompletedLoad],
  execute: ({ href }) => load(href).pipe(Effect.as(Message.CompletedLoad())),
});

export const PageEffects = Command.define('PageEffects', {
  args: { scroll: Schema.Boolean, track: Schema.Boolean },
  messages: [Message.CompletedPageEffects],
  execute: ({ scroll, track }) =>
    Effect.gen(function* () {
      yield* Render.afterCommit;
      // Keep document side effects out of the deterministic view and server render.
      const { updatePageMetadata } = yield* Effect.promise(() => import('./metadata'));
      updatePageMetadata(location.pathname);
      if (track) trackPageView();
      if (scroll) {
        const target = location.hash
          ? document.getElementById(decodeUrlPart(location.hash.slice(1)))
          : document.getElementById('main');
        if (location.hash) target?.scrollIntoView();
        else window.scrollTo({ top: 0, behavior: 'instant' });
        target?.focus({ preventScroll: true });
      }
      return Message.CompletedPageEffects();
    }),
});

const ReadTheme = Command.define('ReadTheme', {
  messages: [Message.CompletedReadTheme],
  execute: Effect.sync(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {
      /* Storage may be unavailable. */
    }
    const followsSystemTheme = saved !== 'light' && saved !== 'dark';
    const theme =
      saved === 'light' || saved === 'dark'
        ? saved
        : matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
    return Message.CompletedReadTheme({ theme, followsSystemTheme });
  }),
});
export const ApplyTheme = Command.define('ApplyTheme', {
  args: { theme: Theme, persist: Schema.Boolean },
  messages: [Message.CompletedApplyTheme],
  execute: ({ theme, persist }) =>
    Effect.sync(() => {
      document.documentElement.dataset.theme = theme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          'content',
          `hsl(${getComputedStyle(document.body).getPropertyValue('--theme-bg')})`,
        );
      if (persist) {
        try {
          localStorage.setItem('theme', theme);
        } catch {
          /* The document still changes. */
        }
      }
      return Message.CompletedApplyTheme();
    }),
});

interface Pagefind {
  search(
    query: string,
    options: { filters: Record<string, string> },
  ): Promise<{
    results: { data(): Promise<{ url: string; meta: { title: string }; excerpt: string }> }[];
  }>;
}
export const Search = Command.define('Search', {
  args: { query: Schema.String, tag: Schema.String },
  messages: [Message.CompletedSearch],
  execute: ({ query, tag }) =>
    Effect.tryPromise(async () => {
      const path = '/pagefind/pagefind.js';
      const pagefind: Pagefind = await import(/* @vite-ignore */ path);
      const response = await pagefind.search(query, { filters: tag ? { tag } : {} });
      const results = await Promise.all(
        response.results.map(async (result) => {
          const data = await result.data();
          return { url: data.url, title: data.meta.title, excerpt: data.excerpt };
        }),
      );
      return Message.CompletedSearch({
        query,
        tag,
        results,
        total: results.length,
        succeeded: true,
      });
    }).pipe(
      Effect.catch(() =>
        Effect.succeed(
          Message.CompletedSearch({
            query,
            tag,
            results: [],
            total: 0,
            succeeded: false,
          }),
        ),
      ),
    ),
});

export const init: Runtime.RoutingApplicationInit<Model, Message> = (url) => ({
  model: {
    route: routeFromPath(url.pathname),
    pathname: url.pathname,
    scrollOnNavigation: false,
    theme: 'light',
    followsSystemTheme: true,
    isReady: false,
    isMenuOpen: false,
    searchDialog: Dialog.init({ id: 'site-search-dialog', focusSelector: '#site-search-input' }),
    searchStatus: 'idle',
    searchQuery: '',
    searchTag: '',
    searchResults: [],
    searchTotal: 0,
    callouts: {},
    chartYear: null,
    isHeroVisible: true,
    copiedCode: null,
  },
  commands: [ReadTheme(), PageEffects({ scroll: false, track: false })],
});

function searchUpdate(model: Model, query: string, tag: string): Update.Return<Model, Message> {
  const shouldSearch = import.meta.env.PROD && query.trim().length > 0;
  return {
    model: {
      ...model,
      searchQuery: query,
      searchTag: tag,
      searchStatus: shouldSearch ? 'loading' : 'idle',
      searchResults: [],
      searchTotal: 0,
    },
    commands: shouldSearch ? [Search({ query, tag })] : [],
  };
}

export const update = (model: Model, message: Message) =>
  Message.match<Update.Return<Model, Message>>(message, {
    ClickedLink: ({ request }) =>
      UrlRequest.match<Update.Return<Model, Message>>(request, {
        Internal: ({ url }) => ({
          model: { ...model, scrollOnNavigation: true },
          commands: [
            isPagePath(url.pathname)
              ? Navigate({ url: urlToString(url) })
              : Load({ href: urlToString(url) }),
          ],
        }),
        External: ({ href }) => ({ model, commands: [Load({ href })] }),
      }),
    ChangedUrl: ({ url }) =>
      Update.combine(model, [
        closeSearchDialog,
        (current) => ({
          model: {
            ...current,
            route: routeFromPath(url.pathname),
            pathname: url.pathname,
            isMenuOpen: false,
            scrollOnNavigation: false,
            callouts: url.pathname === model.pathname ? model.callouts : {},
            chartYear: null,
            isHeroVisible: url.pathname === model.pathname ? model.isHeroVisible : true,
            copiedCode: null,
          },
          commands: [
            PageEffects({
              scroll: model.scrollOnNavigation,
              track: url.pathname !== model.pathname,
            }),
          ],
        }),
      ]),
    ClickedCallout: ({ id, expanded }) => ({
      model: { ...model, callouts: { ...model.callouts, [id]: expanded } },
    }),
    HoveredChartYear: ({ year }) => ({ model: { ...model, chartYear: year } }),
    ChangedHeroVisibility: ({ visible }) => ({
      model: visible === model.isHeroVisible ? model : { ...model, isHeroVisible: visible },
    }),
    ClickedCopyCode: ({ id, text }) => ({ model, commands: [CopyCode({ id, text })] }),
    CompletedCopyCode: ({ id, succeeded }) => ({
      model: { ...model, copiedCode: { id, succeeded } },
    }),
    RequestedScrollTop: () => ({
      model: { ...model, scrollOnNavigation: true },
      commands: [Navigate({ url: model.pathname })],
    }),
    ClickedMenu: () => ({ model: { ...model, isMenuOpen: !model.isMenuOpen } }),
    PressedEscape: () => ({ model: { ...model, isMenuOpen: false } }),
    CompletedReadTheme: ({ theme, followsSystemTheme }) => ({
      model: { ...model, theme, followsSystemTheme, isReady: true },
      commands: [ApplyTheme({ theme, persist: false })],
    }),
    ClickedTheme: () => {
      const theme = model.theme === 'light' ? 'dark' : 'light';
      return {
        model: { ...model, theme, followsSystemTheme: false },
        commands: [ApplyTheme({ theme, persist: true })],
      };
    },
    ChangedSystemTheme: ({ theme }) =>
      model.followsSystemTheme
        ? { model: { ...model, theme }, commands: [ApplyTheme({ theme, persist: false })] }
        : { model },
    RequestedSearch: () =>
      model.searchDialog.isOpen ? { model, commands: [FocusSearch()] } : openSearchDialog(model),
    GotSearchDialogMessage: ({ message: dialogMessage }) => foldSearchDialog(model, dialogMessage),
    ChangedSearchQuery: ({ query }) => searchUpdate(model, query, model.searchTag),
    ChangedSearchTag: ({ tag }) => searchUpdate(model, model.searchQuery, tag),
    CompletedSearch: ({ query, tag, succeeded, results, total }) =>
      query === model.searchQuery && tag === model.searchTag
        ? {
            model: {
              ...model,
              searchStatus: succeeded ? 'ready' : 'failed',
              searchResults: results,
              searchTotal: total,
            },
          }
        : { model },
    CompletedNavigate: () => ({ model }),
    CompletedLoad: () => ({ model }),
    CompletedPageEffects: () => ({ model }),
    CompletedMountLogo: () => ({ model }),
    CompletedApplyTheme: () => ({ model }),
    CompletedFocusSearch: () => ({ model }),
  });

export const subscriptions = Subscription.make<Model, Message>()((entry) => ({
  scroll: entry(
    {},
    {
      modelToDependencies: () => ({}),
      dependenciesToStream: () =>
        Stream.fromEventListener(window, 'scroll').pipe(
          Stream.map(
            () => (document.getElementById('blog-hero')?.getBoundingClientRect().bottom ?? 1) > 0,
          ),
          Stream.map((visible) => Message.ChangedHeroVisibility({ visible })),
        ),
    },
  ),
  keyboard: entry(
    {},
    {
      modelToDependencies: () => ({}),
      dependenciesToStream: () =>
        Stream.fromEventListener<KeyboardEvent>(window, 'keydown').pipe(
          Stream.filter(
            (event) =>
              !event.defaultPrevented &&
              (event.key === 'Escape' ||
                (event.key === '/' &&
                  !event.ctrlKey &&
                  !event.metaKey &&
                  !event.altKey &&
                  !(
                    event.target instanceof Element &&
                    event.target.closest('input, textarea, select, [contenteditable]')
                  ))),
          ),
          Stream.map((event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              return Message.PressedEscape();
            }
            event.preventDefault();
            return Message.RequestedSearch();
          }),
        ),
    },
  ),
  systemTheme: entry(
    {},
    {
      modelToDependencies: () => ({}),
      dependenciesToStream: () =>
        Stream.fromEventListener<MediaQueryListEvent>(
          matchMedia('(prefers-color-scheme: dark)'),
          'change',
        ).pipe(
          Stream.map((event) =>
            Message.ChangedSystemTheme({ theme: event.matches ? 'dark' : 'light' }),
          ),
        ),
    },
  ),
}));
