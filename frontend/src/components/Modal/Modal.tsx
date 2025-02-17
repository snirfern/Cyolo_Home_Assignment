import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { ReactNode } from 'react';
import CustomButton from '../CustomButton/CustomButton';

interface CustomModalProps {
  open: boolean;
  title: string;
  text?: string;
  loading?: boolean;
  approveButtonText?: string;
  withFooter?: boolean;
  handleApprove?: () => void;
  handleClose: () => void;
  customStyle?: { [key: string]: string };
  children?: ReactNode;
}

const CustomModal = ({
  handleClose,
  handleApprove,
  open,
  title,
  approveButtonText = 'Approve',
  loading = false,
  withFooter = false,
  children,
}: CustomModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id={`${title}-alert-dialog-title`}>{title}</DialogTitle>

      {children && <DialogContent>{children}</DialogContent>}

      {withFooter && (
        <DialogActions style={{ padding: 20 }}>
          <CustomButton
            variant="outlined"
            color="error"
            onClick={handleClose}
            text="Cancel"
            data-cy="ModalCancelButton"
          />
          <CustomButton
            data-cy="ModalSubmitButton"
            loading={loading}
            variant="outlined"
            onClick={() => {
              if (handleApprove) {
                handleApprove();
              }
            }}
            text={approveButtonText}
          />
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomModal;
