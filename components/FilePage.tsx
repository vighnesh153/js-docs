import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import GlobalsContext from 'contexts/GlobalsContext';

interface FilePageProps {
  isPrivate: boolean;
}

const FilePage: React.FC<FilePageProps> = (props) => {
  const router = useRouter();
  const { file_id } = router.query;

  const globalsContext = useContext(GlobalsContext);

  useEffect(() => {
    if (!file_id) return;

    const file = {
      id: `${file_id || ''}`,
      isPrivate: props.isPrivate,
    };

    // Set the file as open
    const match = globalsContext.openFiles.filter((f) => f.id === file.id);
    if (match.length === 0) {
      globalsContext.setOpenFiles((prev) => [...prev, file]);
    }

    // Set the file as focussedFile
    if (globalsContext.focussedFile?.id !== file.id) {
      globalsContext.setFocussedFile(file);
    }

    // Set the file as focussedNode
    if (globalsContext.focussedNodeId !== file.id) {
      globalsContext.setFocussedNodeId(file.id);
    }
  }, [file_id, props.isPrivate]);

  return null;
};

export default FilePage;
