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
  
  interface DeleteDialogProps {
    title: string;
    openDeleteConfirm: boolean;
    cancelText?: string;
    confirmText?: string;
    itemDescription?: any;
    actionCloseDeleteConfirm: () => void;
    actionDeleteTask: (item: any) => void;
  }
  
  const DeleteDialog: React.FC<DeleteDialogProps> = ({
    title,
    openDeleteConfirm,
    cancelText,
    confirmText,
    itemDescription,
    actionCloseDeleteConfirm,
    actionDeleteTask
  }) => {
    return (
      <React.Fragment>
        <Dialog
          open={openDeleteConfirm}
          onClose={actionCloseDeleteConfirm}
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
            <Button onClick={actionCloseDeleteConfirm}>{cancelText}</Button>
            <Button onClick={actionDeleteTask} autoFocus>
              {confirmText}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };
  
  export default DeleteDialog;