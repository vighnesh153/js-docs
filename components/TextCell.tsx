import React, { useState, useEffect, useRef, useContext } from 'react';

import Cell from 'models/Cell';
import { useFileContextActions } from 'store/contexts/FileContext';
import JsDocsAuthContext from 'contexts/AuthContext';

import RemirrorEditor, { StyledRemirrorText } from 'components/RemirrorEditor';

interface TextCellProps {
  cell: Cell;
}

const TextCell: React.FC<TextCellProps> = ({ cell }) => {
  const { isAdmin } = useContext(JsDocsAuthContext);

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
        <RemirrorEditor html={cell.content} onChange={(html) => updateCell(cell.id, html)} />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => (isAdmin ? setEditing(true) : null)}>
      <div className="card-content">
        <StyledRemirrorText
          // This class name is used in the text-editor-cell.scss file
          className={'view-only'}
          html={cell.content || 'Click to edit'}
        />
      </div>
    </div>
  );
};

export default TextCell;
