import assert from 'node:assert/strict';
import { test } from 'node:test';
import { legacyRedirectPath } from '../../src/redirects';

test('old seqera containers tag redirects to the hyphenated slug', () => {
  const encoded = new URL('https://edmundmiller.dev/tags/seqera%20containers/').pathname;
  assert.equal(legacyRedirectPath(encoded), '/tags/seqera-containers/');
  assert.equal(
    legacyRedirectPath(new URL('https://edmundmiller.dev/tags/seqera%20containers').pathname),
    '/tags/seqera-containers/',
  );
  assert.equal(legacyRedirectPath('/tags/seqera containers/'), '/tags/seqera-containers/');
  assert.equal(legacyRedirectPath('/tags/Seqera%20Containers/'), '/tags/seqera-containers/');
});

test('current and unrelated tag paths stay put', () => {
  assert.equal(legacyRedirectPath('/tags/seqera-containers/'), undefined);
  assert.equal(legacyRedirectPath('/tags/seqera/'), undefined);
  assert.equal(legacyRedirectPath('/posts/seqera%20containers/'), undefined);
  assert.equal(legacyRedirectPath('/tags/seqera%20containers/2/'), undefined);
  assert.equal(legacyRedirectPath('%'), undefined);
});
