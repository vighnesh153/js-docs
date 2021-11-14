/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import '@remirror/styles/all.css';

import React, { FC, useEffect } from 'react';

import { useHelpers } from '@remirror/react';

import { EditorComponent, Remirror, ThemeProvider, Toolbar, useRemirror } from '@remirror/react';

import { FloatingLinkToolbar } from './extensions';
import { StyledRichText } from './StyledRemirrorText';
import { toolbarItems, useExtensions } from './util';

import { AllStyledComponent } from '@remirror/styles/emotion';

export interface MarkdownEditorProps {
  placeholder?: string;
  initialContent?: string;
  autoFocus?: number;
}

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
const PureRemirrorEditor: FC<MarkdownEditorProps> = (props) => {
  const extensions = useExtensions({
    placeholder: props.placeholder,
  });

  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
  });

  return (
    <AllStyledComponent>
      <ThemeProvider>
        <Remirror
          manager={manager}
          autoFocus={props.autoFocus}
          initialContent={props.initialContent}
        >
          <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar" />
          <EditorComponent />
          <FloatingLinkToolbar />
          {props.children}
        </Remirror>
      </ThemeProvider>
    </AllStyledComponent>
  );
};

const RemirrorEditorStateTracker: React.FC<{
  update: (html: string) => void;
}> = (props) => {
  const { getHTML } = useHelpers(true);
  const html = getHTML();

  useEffect(() => {
    props.update(html);
  }, [html]);

  return null;
};

interface RemirrorEditorProps {
  html?: string;
  onChange?: (html: string) => void;
}

const RemirrorEditor: React.FC<RemirrorEditorProps> = (props) => {
  return (
    <StyledRichText>
      <PureRemirrorEditor initialContent={props.html || ''} placeholder={'Start writing here...'}>
        <RemirrorEditorStateTracker
          update={(html) => {
            if (html !== props.html && props.onChange) {
              props.onChange(html);
            }
          }}
        />
      </PureRemirrorEditor>
    </StyledRichText>
  );
};

export default RemirrorEditor;
