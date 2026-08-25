import * as stylex from '@stylexjs/stylex';

const desktop = '@media (min-width: 640px)';

const styles = stylex.create({
  header: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 112,
    paddingInlineStart: { default: 0, [desktop]: 72 },
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: { default: 'row', [desktop]: 'column' },
  },
  homeLink: {
    alignItems: 'center',
    display: { default: 'inline-flex', [desktop]: 'inline-block' },
    filter: { default: 'grayscale(1)', ':hover': 'none' },
    position: { default: 'static', [desktop]: 'relative' },
  },
  logo: {
    blockSize: { default: 40, [desktop]: 80 },
    insetInlineStart: { default: 'auto', [desktop]: -72 },
    inlineSize: { default: 24, [desktop]: 48 },
    marginInlineEnd: { default: 12, [desktop]: 0 },
    position: { default: 'static', [desktop]: 'absolute' },
  },
  name: {
    fontFamily: 'Geist Pixel Grid, Geist Pixel Square, ui-monospace, monospace',
    fontSize: { default: 20, [desktop]: 24 },
    fontWeight: 700,
    lineHeight: { default: '28px', [desktop]: '32px' },
  },
  navigation: {
    alignItems: { default: 'flex-end', [desktop]: 'center' },
    backdropFilter: { default: 'blur(8px)', [desktop]: 'none' },
    backgroundColor: { default: 'hsl(var(--theme-bg) / 0.85)', [desktop]: 'transparent' },
    borderRadius: { default: 6, [desktop]: 0 },
    boxShadow: {
      default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      [desktop]: 'none',
    },
    color: 'hsl(var(--theme-accent))',
    display: {
      default: 'none',
      [stylex.when.ancestor('[data-menu-open="true"]')]: 'flex',
      [desktop]: 'flex',
    },
    flexDirection: { default: 'column', [desktop]: 'row' },
    gap: { default: 16, [desktop]: 0 },
    insetInline: { default: -16, [desktop]: 'auto' },
    marginInlineStart: { default: 0, [desktop]: -16 },
    marginTop: { default: 0, [desktop]: 4 },
    paddingBlock: { default: 16, [desktop]: 0 },
    position: { default: 'absolute', [desktop]: 'static' },
    top: { default: 56, [desktop]: 'auto' },
    zIndex: {
      default: 'auto',
      [stylex.when.ancestor('[data-menu-open="true"]')]: 50,
      [desktop]: 'auto',
    },
  },
  navigationLink: {
    borderInlineStartColor: { default: 'transparent', [desktop]: 'hsl(var(--theme-accent))' },
    borderInlineStartStyle: { default: 'none', [desktop]: 'dashed' },
    borderInlineStartWidth: { default: 0, [desktop]: 1 },
    paddingBlock: { default: 16, [desktop]: 0 },
    paddingInline: 16,
    textDecorationLine: { default: 'none', ':hover': 'underline' },
  },
  firstNavigationLink: {
    borderInlineStartWidth: 0,
  },
  mobileButton: {
    blockSize: 28,
    display: { default: 'inline-block', [desktop]: 'none' },
    inlineSize: 28,
    marginInlineStart: 16,
    position: 'relative',
    visibility: { default: 'visible', [desktop]: 'hidden' },
  },
  icon: {
    blockSize: '100%',
    inlineSize: '100%',
    insetInlineStart: '50%',
    position: 'absolute',
    top: '50%',
    transitionDuration: '150ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  menuIcon: {
    opacity: {
      default: 1,
      [stylex.when.ancestor('[data-menu-open="true"]')]: 0,
    },
    transform: {
      default: 'translate(-50%, -50%) scale(1)',
      [stylex.when.ancestor('[data-menu-open="true"]')]: 'translate(-50%, -50%) scale(0)',
    },
  },
  closeIcon: {
    color: 'hsl(var(--theme-accent))',
    opacity: {
      default: 0,
      [stylex.when.ancestor('[data-menu-open="true"]')]: 1,
    },
    transform: {
      default: 'translate(-50%, -50%) scale(0)',
      [stylex.when.ancestor('[data-menu-open="true"]')]: 'translate(-50%, -50%) scale(1)',
    },
  },
});

function forAstro(props: ReturnType<typeof stylex.props>) {
  return { class: props.className };
}

export const headerStyleProps = {
  closeIcon: forAstro(stylex.props(styles.icon, styles.closeIcon)),
  container: forAstro(stylex.props(styles.container)),
  firstNavigationLink: forAstro(stylex.props(styles.navigationLink, styles.firstNavigationLink)),
  header: forAstro(stylex.props(stylex.defaultMarker(), styles.header)),
  homeLink: forAstro(stylex.props(styles.homeLink)),
  logo: forAstro(stylex.props(styles.logo)),
  menuIcon: forAstro(stylex.props(styles.icon, styles.menuIcon)),
  mobileButton: forAstro(stylex.props(styles.mobileButton)),
  name: forAstro(stylex.props(styles.name)),
  navigation: forAstro(stylex.props(styles.navigation)),
  navigationLink: forAstro(stylex.props(styles.navigationLink)),
};
