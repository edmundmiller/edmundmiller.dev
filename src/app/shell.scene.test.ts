import * as Dialog from '@foldkit/ui/dialog';
import { Option } from 'effect';
import { Command, Mount, Subscription, click, expect, given, role, scene } from 'foldkit/scene';
import { fromString } from 'foldkit/url';
import { test } from 'vitest';
import { ApplyTheme, init, Message, PageEffects, update } from './model';
import { view } from './view';
import { MountLogo } from './widgets';

const articleUrl = Option.getOrThrow(
  fromString('https://edmundmiller.dev/posts/seqera-containers-part-1/'),
);
const initial = { ...init(articleUrl).model, isReady: true };

test('menu and search controls coordinate opening, closing, and query preservation', () => {
  scene(
    { update, view },
    given({ ...initial, searchQuery: 'nextflow' }),
    Mount.resolve(MountLogo, Message.CompletedMountLogo()),
    click(role('button', { name: 'Open main menu' })),
    expect(role('button', { name: 'Close main menu' })).toHaveAttr('aria-expanded', 'true'),
    Subscription.emit(Message.PressedEscape()),
    expect(role('button', { name: 'Open main menu' })).toHaveAttr('aria-expanded', 'false'),
    Command.expectNone(),
    click(role('button', { name: 'Open main menu' })),
    click(role('button', { name: 'Search' })),
    expect(role('button', { name: 'Open main menu' })).toHaveAttr('aria-expanded', 'false'),
    Command.resolve(Dialog.ShowDialog, Dialog.Message.SucceededShowDialog()),
    Mount.resolve(Dialog.AcquireResources, Dialog.Message.SucceededAcquireResources()),
    expect(role('searchbox', { name: 'Search' })).toHaveValue('nextflow'),
    click(role('button', { name: 'Close' })),
    Command.resolve(Dialog.CloseDialog, Dialog.Message.CompletedCloseDialog()),
    Mount.expectEnded(Dialog.AcquireResources),
    expect(role('searchbox', { name: 'Search' })).toBeAbsent(),
    Subscription.emit(Message.PressedEscape()),
    Command.expectNone(),
    click(role('button', { name: 'Search' })),
    Command.resolve(Dialog.ShowDialog, Dialog.Message.SucceededShowDialog()),
    Mount.resolve(Dialog.AcquireResources, Dialog.Message.SucceededAcquireResources()),
    expect(role('searchbox', { name: 'Search' })).toHaveValue('nextflow'),
    click(role('button', { name: 'Close' })),
    Command.resolve(Dialog.CloseDialog, Dialog.Message.CompletedCloseDialog()),
    Mount.expectEnded(Dialog.AcquireResources),
  );
});

test('callouts survive shell changes and same-page navigation but reset on leaving the page', () => {
  scene(
    { update, view },
    given(initial),
    Mount.resolve(MountLogo, Message.CompletedMountLogo()),
    click(role('button', { name: 'Timeline' })),
    expect(role('button', { name: 'Timeline' })).toHaveAttr('aria-expanded', 'false'),
    click(role('switch', { name: 'Dark theme' })),
    Command.resolve(ApplyTheme, Message.CompletedApplyTheme()),
    expect(role('button', { name: 'Timeline' })).toHaveAttr('aria-expanded', 'false'),
    // Routing notifications come from the runtime; actual link/history behavior stays in Playwright.
    Subscription.emit(Message.ChangedUrl({ url: articleUrl })),
    Command.resolveAllExact([
      PageEffects({ scroll: false, track: false }),
      Message.CompletedPageEffects(),
    ]),
    expect(role('button', { name: 'Timeline' })).toHaveAttr('aria-expanded', 'false'),
    click(role('button', { name: 'Open main menu' })),
    Subscription.emit(
      Message.ChangedUrl({
        url: Option.getOrThrow(fromString('https://edmundmiller.dev/about/')),
      }),
    ),
    Command.resolveAllExact([
      PageEffects({ scroll: false, track: true }),
      Message.CompletedPageEffects(),
    ]),
    expect(role('heading', { level: 1 })).toHaveText('About Edmund Miller'),
    expect(role('button', { name: 'Open main menu' })).toHaveAttr('aria-expanded', 'false'),
    expect(role('switch', { name: 'Dark theme' })).toBeChecked(),
    click(role('button', { name: 'Search' })),
    Command.resolve(Dialog.ShowDialog, Dialog.Message.SucceededShowDialog()),
    Mount.resolve(Dialog.AcquireResources, Dialog.Message.SucceededAcquireResources()),
    Subscription.emit(Message.ChangedUrl({ url: articleUrl })),
    Command.resolveAllExact(
      [Dialog.CloseDialog, Dialog.Message.CompletedCloseDialog()],
      [PageEffects({ scroll: false, track: true }), Message.CompletedPageEffects()],
    ),
    Mount.expectEnded(Dialog.AcquireResources),
    expect(role('button', { name: 'Timeline' })).toHaveAttr('aria-expanded', 'true'),
    Subscription.emit(Message.PressedEscape()),
    Command.expectNone(),
  );
});
