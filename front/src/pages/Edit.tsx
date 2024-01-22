import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import { /*useDispatch,*/ useSelector } from 'react-redux';
import { RootState } from '../store/store';
// import { editTaskAction } from '../store/modules/tasksSlice';
// import TaskType from '../types/TaskType';
// import { themeLight } from '../config/Theme/Theme';
import { Typography, alpha } from '@mui/material';
import { themeLight } from '../config/Theme/Theme';

const Edit: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [newDescription, setNewDescription] = useState('');
  const state = useSelector((state: RootState) => state.tasksReducer);
  const logedUser = useSelector((state: RootState)=> state.logedUserReducer); 
  const taskToEdit = state.find(task =>task.id === params.id);
  
  // console.log(logedUser);
  
  useEffect(() => {
    const isUserLoged = !!logedUser.id;
    
    if(!isUserLoged){
      navigate('/');
      return;
    }
  }, [logedUser, navigate]);
  
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
      <Typography variant='body1'>{taskToEdit?.description}</Typography>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Digite a nova descrição"
        type={"text"}
        fullWidth
        variant="outlined"
        sx={{
          borderRadius: 1,
          color: themeLight.palette.secondary.contrastText,
          borderColor: `${themeLight.palette.secondary.main}`,
          background: `${themeLight.palette.primary.contrastText}`,
          '&:Mui-focused': {
            boxShadow: `${alpha(themeLight.palette.secondary.light, 0.25)} 0 0 0 0.2rem`,
            borderColor: themeLight.palette.secondary.light,
          }
        }}
        value={newDescription}
        onChange={e => handleSetDescription(e)}
      />
      <Button variant='contained' fullWidth sx={{
        marginTop: 2,
        background: `${themeLight.palette.secondary.dark}`,
        "&:hover":{
          background: `${themeLight.palette.primary.dark}`,
          color: `${themeLight.palette.primary.contrastText}`
        }
      }} onClick={handleEditTask}>Editar</Button>

    </React.Fragment>
  );
};

export default Edit;