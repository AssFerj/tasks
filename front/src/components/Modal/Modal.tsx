/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography,
    DialogActions,
    Button
  } from '@mui/material';
  import React from 'react';
  
  interface ModalProps {
    title: string;
    openModal: boolean;
    cancelText?: string;
    confirmText?: string;
    itemDescription?: any;
    actionCloseModal: () => void;
    actionDeleteTask: (item: any) => void;
  }
  
  const Modal: React.FC<ModalProps> = ({
    title,
    openModal,
    cancelText,
    confirmText,
    itemDescription,
    actionCloseModal,
    actionDeleteTask
  }) => {
    return (
      <React.Fragment>
        <Dialog
          open={openModal}
          onClose={actionCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="body1">{itemDescription}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={actionCloseModal}>{cancelText}</Button>
            <Button onClick={actionDeleteTask} autoFocus>
              {confirmText}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };
  
  export default Modal;