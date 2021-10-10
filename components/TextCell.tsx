import React, { useState, useEffect, useRef } from 'react';

import Cell from 'models/Cell';
import { useFileContextActions } from 'store/contexts/FileContext';

import MarkdownEditor, { MarkdownPreview } from 'components/MarkdownEditor';

interface TextCellProps {
  cell: Cell;
}

const TextCell: React.FC<TextCellProps> = ({ cell }) => {
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

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MarkdownEditor code={cell.content} onChange={(value) => updateCell(cell.id, value)} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MarkdownPreview code={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextCell;
