import React from 'react';
import dynamic from 'next/dynamic';

const ReMirror = dynamic(() => import('../components/ReMirror'), { ssr: false });

const RichTextEditorPlayground: React.FC = (props) => {
  return <ReMirror />;
};

export default RichTextEditorPlayground;
