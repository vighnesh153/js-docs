import React from 'react';
import MDEditor from '@uiw/react-md-editor';

import MarkdownConfig from './MarkdownConfig';

interface MarkdownPreviewProps {
  code: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = (props) => {
  return <MDEditor.Markdown source={props.code} components={MarkdownConfig.components} />;
};

export default MarkdownPreview;
