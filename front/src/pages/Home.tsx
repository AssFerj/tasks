import '../app.css'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTask, deleteTask, getTasks } from '../services/api.service';
import TaskType from '../types/TaskType';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserType from '../types/UserType';

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
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([] as TaskType[]);
  const user = JSON.parse(localStorage.getItem('user')!) as UserType;
  const token = localStorage.getItem('authToken');

  const fetchTasks = async () => {
    try {
      const data = await getTasks(user);
      setTasks(data);
    } catch (error) {
      console.log(error, 'Fetch Tasks Error');
    }
  };
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  },[token, navigate])

  const handleEdit = (task: TaskType) => {
    navigate(`/edit/${task.id}`);
  }
  
  const handleDelete = async (task: TaskType) => {
    try {     
      const response = await deleteTask(task);
      setTasks(response);
      fetchTasks();
      return;
    } catch (error) {
      console.log(error, 'Handle Delete Task');
    }
  }

  const listTasks = useMemo(() => {
    
    if(tasks.length > 0){
      return (
        <TableContainer component={Paper} sx={{marginTop: 3}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell>Descrição da tarefa</StyledTableCell>
                  <StyledTableCell align="right">Ações</StyledTableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  {tasks.map(task => (
                  <StyledTableRow key={task.id}>
                  <StyledTableCell component="th" scope="row">
                      {task.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                      <IconButton onClick={()=>handleEdit(task)}>
                      <EditIcon/>
                      </IconButton>
                      <IconButton onClick={()=>handleDelete(task)}>
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
      return (<Typography mt={3}>Nenhuma tarefa cadastrada</Typography>)
  },[tasks]);

  const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const newTask = {
          user_id: user.id!,
          description
        }
        await createTask(newTask);
      return;
    } catch (error) {
      console.log(error, 'Submit Create Task');
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} p={10} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Grid item mb={3}>
          <Typography variant='h3' textAlign={'center'}>Tasks</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2} component={'form'} onSubmit={handleCreateTask}>
            <Grid item>
              <TextField type='text' fullWidth 
                label='Descrição do recado' 
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button type='submit' variant='contained' fullWidth 
                sx={{
                  height: '100%'
                }}
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