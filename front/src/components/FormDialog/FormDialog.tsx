import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface FormDialogProps {
  title: string;
  description: string;
  newDescription: string;
  openValue: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDescriptionChange: (value: string) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({
  title,
  description,
  newDescription,
  openValue,
  onClose,
  onSubmit,
  onDescriptionChange
}) => {

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={openValue} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="newDescription"
          name="newDescription"
          label="Nova Descrição"
          value={newDescription}
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Enviar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
