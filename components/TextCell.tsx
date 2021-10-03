import React, { useState, useEffect, useRef } from 'react';

import { ThemeProvider, Remirror, useRemirror } from '@remirror/react';
import { AllStyledComponent } from '@remirror/styles/styled-components';

import Cell from 'models/Cell';
import { useFileContextActions } from 'store/contexts/FileContext';

interface TextCellProps {
  cell: Cell;
}

const TextCell: React.FC<TextCellProps> = ({ cell }) => {
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

  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useFileContextActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  // if (editing) {
  //   return (
  //     <div className="text-editor" ref={ref}>
  //       <MDEditor value={cell.content} onChange={(value) => updateCell(cell.id, value || '')} />
  //     </div>
  //   );
  // }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <ThemeProvider>
          <AllStyledComponent>
            <Remirror manager={manager} initialContent={state} />
          </AllStyledComponent>
        </ThemeProvider>
        {/*<MDEditor.Markdown source={cell.content || 'Click to edit'} />*/}
      </div>
    </div>
  );
};

export default TextCell;
