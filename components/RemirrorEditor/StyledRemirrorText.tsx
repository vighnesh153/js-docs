/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import React from 'react';

import { styled } from '@mui/material/styles';
import { EditorComponent, Remirror, ThemeProvider, useRemirror } from '@remirror/react';
import { AllStyledComponent } from '@remirror/styles/emotion';

import { FloatingLinkToolbar } from './extensions';
import { useExtensions } from './util';

export const StyledRichText = styled('div')(({ theme }) => ({
  '&&&&': {
    '*': {
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightLight,
      color: theme.palette.text.primary,
      lineHeight: 1.5,
    },

    h1: { ...theme.typography.h1 },
    h2: { ...theme.typography.h2 },
    h3: { ...theme.typography.h3 },
    h4: { ...theme.typography.h4 },
    h5: { ...theme.typography.h5 },
    h6: { ...theme.typography.h6 },

    strong: { fontWeight: theme.typography.fontWeightBold },

    em: { fontStyle: 'italic' },

    u: { textDecoration: 'underline' },

    ul: { listStyle: 'disc' },

    ol: { listStyle: 'decimal' },

    s: { textDecoration: 'line-through' },

    a: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
}));

interface Props {
  html: string;
  placeholder?: string;
  className?: string;
}

const StyledRemirrorText: React.FC<Props> = (props) => {
  const extensions = useExtensions({
    placeholder: props.placeholder,
  });

  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
  });

  return (
    <StyledRichText className={props.className}>
      <AllStyledComponent>
        <ThemeProvider>
          <Remirror manager={manager} initialContent={props.html}>
            <EditorComponent />
            <FloatingLinkToolbar />
          </Remirror>
        </ThemeProvider>
      </AllStyledComponent>
    </StyledRichText>
  );
};

export default StyledRemirrorText;
