import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Box } from '@mui/system';

import CodePreview from 'components/CodePreview';
import CodeEditor from 'components/CodeEditor';
import Resizable from 'components/Resizable';

import Cell from 'models/Cell';
// import { useActions } from '../hooks/use-actions';
// import { useTypedSelector } from '../hooks/use-typed-selector';
// import { useCumulativeCode } from '../hooks/use-cumulative-code';

const ProgressCover = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // const { updateCell, createBundle } = useActions();
  // const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  // const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Box
          className="progress-wrapper"
          sx={{
            height: '100%',
            flexGrow: 1,
            backgroundColor: 'white',
          }}
        >
          {!bundle || bundle.loading ? (
            <ProgressCover className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </ProgressCover>
          ) : (
            <CodePreview code={bundle.code} err={bundle.err} />
          )}
        </Box>
      </div>
    </Resizable>
  );
};

export default CodeCell;
