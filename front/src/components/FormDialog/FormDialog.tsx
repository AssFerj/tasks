import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TaskType from '../../types/TaskType';

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: { newDescription: string }) => void;
  task: TaskType
}

const FormDialog: React.FC<FormDialogProps> = ({ open, onClose, onSubmit, task }) => {
  const [newDescription, setNewDescription] = React.useState('');

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ newDescription });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Task - {task.description}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edite os detalhes da task abaixo:
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="newDescription"
            name="newDescription"
            label="Nova descrição de tarefa"
            type="text"
            fullWidth
            variant="standard"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">
          Editar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
