import { Option } from 'effect';
import { Command, given, message, model, story } from 'foldkit/story';
import { fromString } from 'foldkit/url';
import { expect, test } from 'vitest';
import { ApplyTheme, init, Message, update } from './model';

const initial = init(Option.getOrThrow(fromString('https://edmundmiller.dev/'))).model;

test('system theme follows preferences until a manual choice overrides it', () => {
  story(
    update,
    given(initial),
    message(Message.ChangedSystemTheme({ theme: 'dark' })),
    Command.expectExact(ApplyTheme({ theme: 'dark', persist: false })),
    Command.resolve(ApplyTheme, Message.CompletedApplyTheme()),
    model((state) => {
      expect(state.theme).toBe('dark');
      expect(state.followsSystemTheme).toBe(true);
    }),
    message(Message.ClickedTheme()),
    Command.expectExact(ApplyTheme({ theme: 'light', persist: true })),
    Command.resolve(ApplyTheme, Message.CompletedApplyTheme()),
    message(Message.ChangedSystemTheme({ theme: 'dark' })),
    Command.expectNone(),
    model((state) => {
      expect(state.theme).toBe('light');
      expect(state.followsSystemTheme).toBe(false);
    }),
  );
});

test.each([
  { query: 'emacs', tag: 'nixos' },
  { query: 'nextflow', tag: 'emacs' },
])('ignores a stale search response for $query / $tag', ({ query, tag }) => {
  const current = {
    ...initial,
    searchQuery: 'nextflow',
    searchTag: 'nixos',
    searchStatus: 'loading' as const,
  };
  const results = [{ url: '/posts/example/', title: 'Current result', excerpt: 'Matching text' }];
  story(
    update,
    given(current),
    message(Message.CompletedSearch({ query, tag, results, total: 1, succeeded: true })),
    model((state) => expect(state).toEqual(current)),
    message(
      Message.CompletedSearch({
        query: 'nextflow',
        tag: 'nixos',
        results,
        total: 1,
        succeeded: true,
      }),
    ),
    model((state) => {
      expect(state.searchStatus).toBe('ready');
      expect(state.searchResults).toEqual(results);
      expect(state.searchTotal).toBe(1);
    }),
  );
});
