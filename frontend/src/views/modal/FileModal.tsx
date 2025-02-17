import { styled } from '@mui/material';
import Modal from '../../components/Modal/Modal';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useCallback } from 'react';

interface newImageModalProps {
  newFileUrl: string;
  toggle: () => void;
}

const ModalBodyContainer = styled('div')({
  height: 100,
  width: 500,
  padding: 20,
  display: 'flex',
  justifyContent: 'space-between',
});

const CopyIcon = styled(ContentCopyIcon)({
  '&:hover': {
    cursor: 'pointer',
  },
});
const FileModal = ({ toggle, newFileUrl }: newImageModalProps) => {
  const handleCopy = useCallback(
    async () => await navigator.clipboard.writeText(newFileUrl),
    [newFileUrl]
  );
  return (
    <Modal
      open={true}
      title={'Your new image!'}
      children={
        <ModalBodyContainer>
          <div>{newFileUrl}</div>
          <CopyIcon onClick={() => handleCopy()} />
        </ModalBodyContainer>
      }
      handleClose={() => toggle()}
    />
  );
};

export default FileModal;
