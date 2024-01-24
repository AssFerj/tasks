import '../app.css'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAction, listTaskAction } from '../store/modules/tasksSlice';
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [description, setDescription] = useState('');
  const state = useSelector((state: RootState) => state.tasksReducer);
  const logedUser = useSelector((state: RootState)=> state.logedUserReducer); 
  
  useEffect(() => {
    const isUserLoged = !!logedUser.id;
    
    if(!isUserLoged){
      navigate('/');
      return;
    }
    if(logedUser.id){
      dispatch(listTaskAction({id: logedUser.id}));
    }
  }, [dispatch, logedUser, navigate]);


  const listTasks = useMemo(() => {
    
    if(state.length > 0){
      return (
        <TableContainer component={Paper} sx={{marginTop: 3}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell>Descrição do Recado</StyledTableCell>
                  <StyledTableCell align="right">Ações</StyledTableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  {state.map(task => (
                  <StyledTableRow key={task.id}>
                  <StyledTableCell component="th" scope="row">
                      {task.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                      <IconButton /*onClick={()=>handleEdit(task.id)}*/>
                      <EditIcon/>
                      </IconButton>
                      <IconButton /*onClick={()=>handleDelete(task.id)}*/>
                      <DeleteIcon/>
                      </IconButton>
                  </StyledTableCell>
                  </StyledTableRow>
                  ))}
              </TableBody>
          </Table>
        </TableContainer>
      )
    }
      return (<Typography mt={3}>Nenhum recado cadastrado</Typography>)
  },[state]);

  const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(logedUser){
      const taskToCreate = {
        userId: logedUser.id!,
        description
      }   
      dispatch(createTaskAction(taskToCreate));
    }
    navigate('/');
    return;
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} p={10} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Grid item mb={3}>
          <Typography variant='h3' textAlign={'center'}>Recados</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <TextField type='text' fullWidth 
                label='Descrição do recado' 
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button type='button' variant='contained' fullWidth 
                sx={{
                  height: '100%'
                }}
                onClick={()=>handleCreateTask}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {listTasks}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;