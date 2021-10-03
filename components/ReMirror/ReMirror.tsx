import React from 'react';

import { ThemeProvider as ReMirrorThemeProvider, Remirror, useRemirror } from '@remirror/react';
import { AllStyledComponent } from '@remirror/styles/styled-components';

import { useHelpers } from '@remirror/react';
import { MarkdownEditor } from '@remirror/react-editors/markdown';

interface ReMirrorProps {}

const ReMirror: React.FC<ReMirrorProps> = (props) => {
  const { manager, state } = useRemirror({
    // extensions,

    // Set the initial content.
    content: '<p>Initial content</p>',

    // Place the cursor at the start of the document. This an also be set to
    // `end`, `all` or a numbered position.
    selection: 'end',

    // Set the string handler which means the content provided will be
    // automatically handled as html.
    // `markdown` is also available when the `MarkdownExtension`
    // is added to the editor.
    stringHandler: 'html',
  });

  // return (
  //   <ReMirrorThemeProvider>
  //     <AllStyledComponent>
  //       <Remirror manager={manager} initialContent={state} />
  //     </AllStyledComponent>
  //   </ReMirrorThemeProvider>
  // );

  return <MarkdownEditor placeholder="Start typing..." />;
};

export default ReMirror;
