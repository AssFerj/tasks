import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
// import UserType from '../types/UserType';

const Edit: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [newDescription, setNewDescription] = useState('');
  const token = localStorage.getItem('authToken');
  // const user = JSON.parse(localStorage.getItem('user')!) as UserType;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } 
    console.log(params);
    
  },[token, navigate])
  
  const handleSetDescription = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewDescription(e.currentTarget.value);
  };

  const handleEditTask = () => {
    if(params.id){
      // const taskEdit = {
      //   id: params.id,
      //   userId: logedUser.id,
      //   newDescription
      // }
      // dispatch(editTaskAction(taskEdit));
      navigate('/home');
      return;
    }
  };

  return (
    <React.Fragment>
      <h1>Editar recado</h1>
      <Typography variant='body1'>{params.description}</Typography>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Digite a nova descrição"
        type={"text"}
        fullWidth
        variant="outlined"
        value={newDescription}
        onChange={e => handleSetDescription(e)}
      />
      <Button variant='contained' fullWidth
       onClick={handleEditTask}>Editar</Button>

    </React.Fragment>
  );
};

export default Edit;