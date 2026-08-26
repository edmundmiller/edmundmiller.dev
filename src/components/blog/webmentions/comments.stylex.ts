import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../styles/tokens.stylex';

export const styles = stylex.create({
  summary: {
    color: colors.accent2,
    marginBottom: 0,
  },
  list: {
    paddingInlineStart: 0,
    marginTop: 0,
  },
  comment: {
    marginBlock: 0,
    paddingBlock: '1.25rem',
    alignItems: 'flex-start',
    borderBlockStartColor: 'color-mix(in srgb, hsl(var(--theme-text)) 20%, transparent)',
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: {
      default: '1px',
      ':first-child': 0,
    },
    columnGap: '1.25rem',
    display: 'flex',
  },
  profileLink: {
    borderRadius: '9999px',
    overflow: 'hidden',
    boxShadow: {
      default: '0 0 0 2px hsl(var(--theme-text))',
      ':focus-visible': '0 0 0 4px hsl(var(--theme-link))',
      ':hover': '0 0 0 4px hsl(var(--theme-link))',
    },
    flexShrink: 0,
    outlineColor: 'transparent',
    outlineOffset: '2px',
    outlineStyle: 'solid',
    outlineWidth: '2px',
  },
  avatar: {
    marginBlock: 0,
    height: '3rem',
    width: '3rem',
  },
  avatarWithoutLink: {
    borderRadius: '9999px',
  },
  content: {
    flexBasis: 'auto',
    flexGrow: '1',
    flexShrink: '1',
    minWidth: 0,
  },
  commentHeader: {
    alignItems: 'center',
    columnGap: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  authorName: {
    marginBlock: 0,
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    color: colors.accent2,
    display: '-webkit-box',
    fontWeight: 600,
  },
  sourceLink: {
    color: {
      default: 'inherit',
      ':hover': colors.link,
    },
  },
  accessibleLabel: {
    margin: '-1px',
    padding: 0,
    borderWidth: 0,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    position: 'absolute',
    whiteSpace: 'nowrap',
    height: '1px',
    width: '1px',
  },
  sourceIcon: {
    height: '1.25rem',
    width: '1.25rem',
  },
  commentText: {
    marginBlockEnd: 0,
    marginBlockStart: '0.25rem',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
});
