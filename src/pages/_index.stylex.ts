import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const small = '@media (min-width: 640px)';

export const styles = stylex.create({
  introductionTitle: {
    color: colors.accent2,
    fontFamily: fonts.heading,
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: '2rem',
    marginBottom: '1.5rem',
  },
  introductionParagraph: {
    marginBottom: '1rem',
  },
  introductionClosing: {
    marginBottom: '1.5rem',
  },
  startHere: {
    padding: '1.5rem',
    borderColor: 'hsl(var(--theme-accent) / 0.3)',
    borderRadius: '0.5rem',
    borderStyle: 'solid',
    borderWidth: '1px',
    marginTop: '3rem',
  },
  sectionTitle: {
    color: colors.accent2,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: '1.75rem',
    marginBottom: '0.75rem',
  },
  startHereDescription: {
    marginBottom: '1rem',
  },
  startHereLinks: {
    gap: '0.75rem',
    display: 'flex',
    flexDirection: {
      default: 'column',
      [small]: 'row',
    },
    flexWrap: {
      default: 'nowrap',
      [small]: 'wrap',
    },
  },
  cactusLink: {
    backgroundPosition: 'bottom',
    backgroundImage: {
      default:
        'linear-gradient(transparent, transparent 5px, hsl(var(--theme-text)) 5px, hsl(var(--theme-text)))',
      ':hover':
        'linear-gradient(transparent, transparent 4px, hsl(var(--theme-link)) 4px, hsl(var(--theme-link)))',
    },
    backgroundRepeat: 'repeat-x',
    backgroundSize: '100% 6px',
  },
  posts: {
    marginTop: '4rem',
  },
  cadence: {
    borderBlockStyle: 'dashed',
    paddingBlock: '1.25rem',
    borderBlockColor: 'hsl(var(--theme-text) / 0.3)',
    borderBlockWidth: '1px',
    marginBottom: '2.5rem',
  },
  cadenceCaption: {
    color: 'hsl(var(--theme-text) / 0.7)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginBottom: '0.75rem',
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
  },
  post: {
    columnGap: '0.5rem',
    display: 'flex',
    flexDirection: {
      default: 'column',
      [small]: 'row',
    },
  },
  allPostsLink: {
    alignItems: 'center',
    columnGap: '0.25rem',
    display: 'inline-flex',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginTop: '1.5rem',
  },
  openringSpacing: {
    marginTop: '4rem',
  },
});
