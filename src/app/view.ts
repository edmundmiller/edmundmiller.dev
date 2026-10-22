import * as stylex from '@stylexjs/stylex';
import { type Document, type HtmlBuilder } from 'foldkit/html';
import { menuLinks, siteConfig } from '../site.config';
import { styles as header } from '../components/layout/Header.stylex';
import { styles as search } from '../components/search.stylex';
import { styles as theme } from '../components/theme-toggle.stylex';
import { styles as skip } from '../components/skip-link.stylex';
import { styles as shell } from './shell.stylex';
import { Message, type Model } from './model';
import { pageView, footerView, pageMetadata } from './pages';
import { logoView } from './widgets';
import { searchView } from './search';

export const view = (model: Model, h: HtmlBuilder<Message>): Document => {
  const meta = pageMetadata(model.route);
  const canonical = meta.canonical ?? new URL(model.pathname, 'https://edmundmiller.dev').href;
  const classes = (...styles: stylex.StyleXStyles[]) =>
    h.Class(stylex.props(...styles).className ?? '');
  const icon = (path: string, className: string | undefined) =>
    h.svg(
      [
        h.Class(className ?? ''),
        h.Attribute('aria-hidden', 'true'),
        h.Attribute('viewBox', '0 0 24 24'),
        h.Attribute('fill', 'none'),
        h.Attribute('stroke', 'currentColor'),
        h.Attribute('stroke-width', '1.5'),
        h.Attribute('stroke-linecap', 'round'),
        h.Attribute('stroke-linejoin', 'round'),
      ],
      [h.path([h.Attribute('d', path)])],
    );
  return {
    title: `${meta.title} | ${siteConfig.title}`,
    canonical,
    ogUrl: canonical,
    lang: siteConfig.lang,
    body: h.div(
      [h.Id('site-app'), classes(shell.root), h.DataAttribute('ready', String(model.isReady))],
      [
        h.a([classes(skip.link), h.Href('#main')], ['skip to content']),
        h.header(
          [classes(header.header), h.Id('main-header')],
          [
            h.div(
              [classes(header.identity)],
              [
                h.a(
                  [
                    classes(header.homeLink),
                    h.Href('/'),
                    h.Attribute('aria-current', model.pathname === '/' ? 'page' : 'false'),
                  ],
                  [logoView(h), h.span([classes(header.name)], [siteConfig.title])],
                ),
                h.nav(
                  [
                    classes(header.navigation),
                    h.Id('navigation-menu'),
                    h.AriaLabel('Main menu'),
                    h.DataAttribute('open', String(model.isMenuOpen)),
                  ],
                  menuLinks.map((link) =>
                    h.a(
                      [
                        classes(header.menuLink),
                        h.Href(link.path),
                        h.Attribute(
                          'aria-current',
                          model.pathname === link.path ? 'page' : 'false',
                        ),
                      ],
                      [link.title],
                    ),
                  ),
                ),
              ],
            ),
            h.div(
              [classes(search.search)],
              [
                h.button(
                  [
                    classes(search.openButton),
                    h.Id('open-search'),
                    h.Type('button'),
                    h.AriaLabel('Search'),
                    h.Attribute('aria-haspopup', 'dialog'),
                    h.Attribute('aria-controls', 'site-search-dialog'),
                    h.DataAttribute('goatcounter-event', 'site-search-open'),
                    h.Disabled(!model.isReady),
                    h.OnClick(Message.RequestedSearch()),
                  ],
                  [
                    icon(
                      'M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0M21 21l-6-6',
                      stylex.props(search.searchIcon).className,
                    ),
                  ],
                ),
                h.dialog(
                  [
                    classes(search.dialog),
                    h.Id('site-search-dialog'),
                    h.AriaLabel('Search'),
                    h.OnCancel(Message.ClosedSearch()),
                  ],
                  [
                    h.div(
                      [classes(search.dialogFrame)],
                      [
                        h.button(
                          [
                            classes(search.closeButton),
                            h.Type('button'),
                            h.OnClick(Message.ClosedSearch()),
                          ],
                          ['Close'],
                        ),
                        searchView(model, h),
                      ],
                    ),
                  ],
                ),
              ],
            ),
            h.div(
              [classes(theme.toggle)],
              [
                h.button(
                  [
                    classes(theme.button),
                    h.Type('button'),
                    h.Role('switch'),
                    h.AriaLabel('Dark theme'),
                    h.Attribute('aria-checked', String(model.theme === 'dark')),
                    h.Disabled(!model.isReady),
                    h.OnClick(Message.ClickedTheme()),
                  ],
                  [
                    icon(
                      'M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12M22 12h1M12 2V1M12 23v-1M20 20l-1-1M20 4l-1 1M4 20l1-1M4 4l1 1M1 12h1',
                      stylex.props(theme.icon, theme.sunIcon).className,
                    ),
                    icon(
                      'M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3M17 4a2 2 0 0 0 2 2 2 2 0 0 0-2 2 2 2 0 0 0-2-2 2 2 0 0 0 2-2M19 11h2m-1-1v2',
                      stylex.props(theme.icon, theme.moonIcon).className,
                    ),
                  ],
                ),
              ],
            ),
            h.button(
              [
                classes(header.menuButton),
                h.Id('toggle-navigation-menu'),
                h.Type('button'),
                h.AriaLabel(model.isMenuOpen ? 'Close main menu' : 'Open main menu'),
                h.Attribute('aria-expanded', String(model.isMenuOpen)),
                h.Attribute('aria-controls', 'navigation-menu'),
                h.Disabled(!model.isReady),
                h.OnClick(Message.ClickedMenu()),
              ],
              [
                icon(
                  model.isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M3.75 9h16.5m-16.5 6.75h16.5',
                  stylex.props(header.menuIcon).className,
                ),
              ],
            ),
          ],
        ),
        h.main([h.Id('main'), h.Tabindex(-1)], [pageView(model, h)]),
        footerView(h),
      ],
    ),
  };
};
