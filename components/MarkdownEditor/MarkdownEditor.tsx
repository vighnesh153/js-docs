import React from 'react';
import MDEditor from '@uiw/react-md-editor';

import MarkdownConfig from './MarkdownConfig';

`This is to display the
\`$$c = \\pm\\sqrt{a^2 + b^2}$$\`
 in one line
\`\`\`KaTeX
c = \\pm\\sqrt{a^2 + b^2}
\`\`\`
\`\`\`KaTeX
\\f\\relax{x} = \\int_{-\\infty}^\\infty
    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}
    \\,d\\xi
\`\`\`
`;

interface MarkdownEditorProps {
  code: string;
  onChange: (newVal: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props) => {
  return (
    <MDEditor
      value={props.code}
      onChange={(v) => props.onChange(v || '')}
      previewOptions={{ components: MarkdownConfig.components }}
    />
  );
};

export default MarkdownEditor;
