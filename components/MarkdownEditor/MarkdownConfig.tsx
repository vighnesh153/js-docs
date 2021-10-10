import 'katex/dist/katex.css';

import React from 'react';
import katex from 'katex';

const MarkdownConfig = {
  components: {
    code: ({ inline, children, className, ...props }: any) => {
      const txt = children[0] || '';
      if (inline) {
        if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
          const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
            throwOnError: false,
          });
          return <code dangerouslySetInnerHTML={{ __html: html }} />;
        }
        return <code>{txt}</code>;
      }
      if (
        typeof txt === 'string' &&
        typeof className === 'string' &&
        /^language-katex/.test(className.toLocaleLowerCase())
      ) {
        const html = katex.renderToString(txt, {
          throwOnError: false,
        });
        // console.log('props', txt, className, props);
        return <code dangerouslySetInnerHTML={{ __html: html }} />;
      }
      return <code className={String(className)}>{txt}</code>;
    },
  },
};

export default MarkdownConfig;
