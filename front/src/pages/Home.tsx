/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAction, listTaskAction } from '../store/modules/tasksSlice';
import { Button, Grid, TextField, Typography, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { themeLight } from '../config/Theme/Theme';
import ListTasks from '../components/ListTasks/ListTasks';
// import TaskType from '../types/TaskType';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [description, setDescription] = useState('');
  const state = useSelector((state: RootState) => state.tasksReducer);
  const logedUser = useSelector((state: RootState)=> state.logedUserReducer); 
  
  useEffect(() => {
    const isUserLoged = !!logedUser.email;
    
    if(!isUserLoged){
      navigate('/');
      return;
    }
    if(logedUser.email){
      dispatch(listTaskAction({id: logedUser.email}));
    }
  }, [dispatch, logedUser, navigate]);


  const listTasks = useMemo(() => {
    
    if(state){
      return (<ListTasks data={state ?? []} />)
    }
      return (<Typography>Nenhum recado cadastrado</Typography>)
  },[state]);

  const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(logedUser){
      const taskToCreate = {
        userId: logedUser.email,
        description
      }   
      dispatch(createTaskAction(taskToCreate));
    }
    navigate('/');
    return;
  };

  return (
    <React.Fragment>
      <h1>Recados 3.0</h1>
      <Grid container spacing={2} width={'100%'} mb={2} pl={2} component={'form'}>
        <Grid item xl={8}>
          <TextField type='text' fullWidth label='Descrição do recado' sx={{
            borderRadius: 1,
            borderColor: `${themeLight.palette.secondary.main}`,
            background: `${themeLight.palette.primary.contrastText}`,
            '&:Mui-focused': {
              boxShadow: `${alpha(themeLight.palette.secondary.light, 0.25)} 0 0 0 0.2rem`,
              borderColor: themeLight.palette.secondary.light,
            }
          }}
          value={description}
          onChange={e => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xl={4}>
          <Button type='button' variant='contained' fullWidth sx={{
            height: '100%',
            background: `${themeLight.palette.secondary.dark}`,
            "&:hover":{
              background: `${themeLight.palette.primary.dark}`,
              color: `${themeLight.palette.primary.contrastText}`
            }
          }}
          onClick={()=>handleCreateTask}
          >Cadastrar</Button>
        </Grid>
      </Grid>
      {listTasks}
    </React.Fragment>
  );
};

export default Home;