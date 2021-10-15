import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Box } from '@mui/system';
import { Divider, IconButton, Modal as MuiModal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalData {
  title: string;
  content: React.ReactNode;
  onClose?: () => void;
}

interface ModalContextProps {
  modalData: ModalData | null;
  setModalData: React.Dispatch<React.SetStateAction<ModalData | null>>;
}

export const ModalContext = React.createContext<ModalContextProps>({
  modalData: null,
  setModalData: () => null,
});

const ModalContainer = styled(Box)`
  width: fit-content;
  min-width: 100px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalTitle = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalBody = styled(Box)``;

const Modal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { modalData } = useContext(ModalContext);

  const closeModal = useCallback(() => {
    if (modalData === null) return;

    setOpen(false);
    if (modalData.onClose) modalData.onClose();
  }, [modalData]);

  /**
   * If data exists or changes, the modal should be open
   */
  useEffect(() => {
    if (modalData) setOpen(true);
  }, [modalData]);

  return (
    <MuiModal open={open} onClose={closeModal}>
      <ModalContainer sx={{ backgroundColor: 'background.paper' }}>
        <ModalTitle px={4} py={2}>
          <Typography component={'h5'} variant={'h5'}>
            {modalData?.title}
          </Typography>
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </ModalTitle>
        <Divider />
        <ModalBody px={4} py={2}>
          {modalData?.content}
        </ModalBody>
      </ModalContainer>
    </MuiModal>
  );
};

export default Modal;

export const ModalProvider: React.FC = (props) => {
  const [modalData, setModalData] = useState<ModalData | null>(null);

  return (
    <ModalContext.Provider value={{ modalData, setModalData }}>
      {props.children}
    </ModalContext.Provider>
  );
};
