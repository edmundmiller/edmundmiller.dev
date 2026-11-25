import assert from 'node:assert/strict';
import test from 'node:test';
import { ESLint } from 'eslint';

const eslint = new ESLint();
const filePath = 'src/app/design-contract.stylex.ts';

test('design tokens and established layout/accessibility spacing are allowed', async () => {
  const [result] = await eslint.lintText(
    `import * as stylex from '@stylexjs/stylex';
     import { colors, effects, spacing } from '../styles/tokens.stylex';
     export const styles = stylex.create({
       control: {
         margin: 'auto',
         padding: spacing.page,
         borderColor: 'transparent',
         gap: { default: '0.5rem', '@media (min-width: 640px)': '1rem' },
         backgroundColor: colors.background,
         backgroundImage: effects.cactusUnderline,
         boxShadow: { default: 'none', ':focus-visible': effects.controlRing },
         color: { default: 'inherit', ':hover': colors.link },
         outlineColor: 'currentColor',
       },
       hiddenLabel: { margin: '-1px', padding: 0 },
       offCanvasToc: { marginInlineEnd: '-8rem' },
     });`,
    { filePath },
  );
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
  assert.equal(result.warningCount, 0, JSON.stringify(result.messages));
});

test('design violations fail lint, including nested conditions and indirect literals', async (t) => {
  for (const declaration of [
    "color: '#21201c'",
    "backgroundColor: 'rgb(1 2 3)'",
    "borderInlineStartColor: 'red'",
    "color: { default: colors.text, ':hover': '#fff' }",
    "borderColor: { default: colors.text, '@media (min-width: 640px)': '#fff' }",
    "color: 'hsl(var(--theme-text))'",
    "boxShadow: '0 0 0 2px #a1a1aa'",
    "backgroundImage: 'linear-gradient(red, blue)'",
    "padding: '13px'",
    "padding: 'auto'",
    "padding: '-1px'",
    'paddingInline: 13',
    "gap: '0.8125rem'",
    "rowGap: { default: '1rem', '@media (min-width: 640px)': '13px' }",
    "marginInlineEnd: { default: 0, ':hover': '13px' }",
    'color: rawColor',
    'padding: rawSpace',
  ]) {
    await t.test(declaration, async () => {
      const [result] = await eslint.lintText(
        `import * as stylex from '@stylexjs/stylex';
         import { colors } from '../styles/tokens.stylex';
         const rawColor = '#21201c';
         const rawSpace = '13px';
         export const styles = stylex.create({ control: { ${declaration} } });`,
        { filePath },
      );
      assert.equal(result.fatalErrorCount, 0, JSON.stringify(result.messages));
      assert.ok(
        result.messages.some(
          (message) => message.ruleId === '@stylexjs/valid-styles' && message.severity === 2,
        ),
        JSON.stringify(result.messages),
      );
    });
  }
});
