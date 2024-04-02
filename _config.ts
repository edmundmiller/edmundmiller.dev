import lume from 'lume/mod.ts';
import blog from 'blog/mod.ts';
import remark from 'lume/plugins/remark.ts';
import uniorg from 'npm:uniorg-parse';
import uniorg2rehype from 'npm:uniorg-rehype';
import extractKeywords from 'npm:uniorg-extract-keywords';
import rehypePrettyCode from 'npm:rehype-pretty-code@0.12.6';
import { transformerTwoslash } from 'npm:shikiji-twoslash@0.10.1';

const site = lume();

site
  // .use(blog())
  .use(
    remark({
      extensions: ['.org'],
      rehypePlugins: [
        uniorg,
        extractKeywords,
        uniorg2rehype,
        [
          rehypePrettyCode,
          {
            defaultLang: 'plaintext',
            keepBackground: false,
            theme: {
              // light: 'material-theme-lighter',
              // dark: 'material-theme-darker',
              light: 'github-light',
              dark: 'github-dark',
            },
            transformers: [
              // transformerNotationDiff(),
              transformerTwoslash({
                explicitTrigger: true,
              }),
            ],
          },
        ],
      ],
    }),
  );

export default site;
