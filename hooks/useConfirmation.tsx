import { useCallback, useContext } from 'react';

import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { ModalContext } from 'components/Modal';

interface ConfirmationProps {
  title?: string;
  message: string;
  onConfirm: () => void;
}

const useConfirmation = () => {
  const { setModalData } = useContext(ModalContext);

  const confirmation = useCallback(
    (args: ConfirmationProps) => {
      setModalData({
        title: args.title || 'Confirmation',
        content: ({ closeModal }) => (
          <Box width={500}>
            <Typography variant={'body1'} component={'p'}>
              {args.message}
            </Typography>
            <Box height={20} />
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Button
                variant={'contained'}
                onClick={() => {
                  closeModal();
                  args.onConfirm();
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        ),
      });
    },
    [setModalData]
  );

  return { confirmation };
};

export default useConfirmation;
