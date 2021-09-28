import React, { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
// import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    // const highlighter = new Highlighter(
    //   // @ts-ignore
    //   window.monaco,
    //   codeShift,
    //   monacoEditor
    // );
    // highlighter.highLightOnDidChangeModelContent(
    //   () => {},
    //   () => {},
    //   undefined,
    //   () => {}
    // );
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <Box
      className="editor-wrapper"
      sx={{
        position: 'relative',
        height: '100%',
        width: 'calc(100% - 10px)',
        '&:hover .button-format': {
          opacity: 1,
        },
      }}
    >
      <Button
        size={'small'}
        className="button-format"
        onClick={onFormatClick}
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          zIndex: 20,
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      >
        Format
      </Button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </Box>
  );
};

export default CodeEditor;
