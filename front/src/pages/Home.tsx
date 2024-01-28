/* eslint-disable @typescript-eslint/no-explicit-any */
import '../app.css'
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTask, deleteTask, getTasks, updateTask } from '../services/api.service';
import TaskType from '../types/TaskType';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserType from '../types/UserType';
import MenuAppBar from '../components/AppBar/AppBar';
import deepEqual from 'deep-equal';
import FormDialog from '../components/FormDialog/FormDialog';
import AlertComponent from '../components/AlertComponent/AlertComponent';

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
  const navigate = useNavigate()
  
  const [description, setDescription] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [currentDescription, setCurrentDescription] = useState('')
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  const [openDialog, setOpenDialog] = useState(false)
  const [alertState, setAlertState] = useState({
    actionShowAlert: false,
    message: '',
    typeAlert: '', // ou qualquer valor padrão desejado
  });
  
  const token = sessionStorage.getItem('authToken')
  const user = JSON.parse(localStorage.getItem('user')!) as UserType

  const handleOpenDialog = (task: TaskType) => {
    setOpenDialog(true)
    setCurrentDescription(task.description)
    setCurrentTask(task);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false)
  };

  const handleDescriptionChange = (value: string) => {
    setNewDescription(value)
  };

  const isEqual = (obj1: any, obj2: any): boolean => {
    return deepEqual(obj1, obj2)
  };
  
  const handleList = async () => {
    try {
      const data = await getTasks(user)
      if (!isEqual(data, tasks)) {
        setTasks(data)
      }
    } catch (error) {
      console.log(error, 'Fetch Tasks Error')
    }
  };
  
  useEffect(() => {
    if (!token || !user) {
      navigate('/')
    } else {
      // console.log('Token:', token);
      handleList()
    } return
  },[token, user, tasks])

  const handleEdit = async () => {
    try {
      if (currentTask) {
        const taskToUpdate: TaskType = {
          id: currentTask.id,
          user_id: user.id!,
          description: newDescription,
        };
        await updateTask(taskToUpdate)
      }
      setNewDescription('')
      setAlertState({
        actionShowAlert: true,
        message: 'Tarefa editada com sucesso!',
        typeAlert: 'success',
      });
    } catch (error) {
      console.log(error, 'Handle Edit Task')
      setAlertState({
        actionShowAlert: true,
        message: 'Erro so editar tarefa.',
        typeAlert: 'error',
      });
    }
  }
  
  const handleDelete = async (task: TaskType) => {
    try {     
      await deleteTask(task)
      handleList();
      setAlertState({
        actionShowAlert: true,
        message: 'Tarefa deletada com sucesso!',
        typeAlert: 'success',
      });
      return;
    } catch (error) {
      console.log(error, 'Handle Delete Task')
      setAlertState({
        actionShowAlert: true,
        message: 'Erro ao deletar tarefa.',
        typeAlert: 'error',
      });
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
                      <IconButton onClick={()=>handleOpenDialog(task)}>
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
      setDescription('')
      setAlertState({
        actionShowAlert: true,
        message: 'Tarefa criada com sucesso!',
        typeAlert: 'success',
      });
      return;
    } catch (error) {
      console.log(error, 'Submit Create Task');
      setAlertState({
        actionShowAlert: true,
        message: 'Erro ao criar tarefa',
        typeAlert: 'error',
      });
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} p={10} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Grid item>
          <MenuAppBar user={user}/>
        </Grid>
        <Grid item mb={3}>
          <Typography variant='h3' textAlign={'center'}>Task-In</Typography>
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
          <Box>
            <FormDialog 
              title="Editar Task"
              description={currentDescription}
              newDescription={newDescription}
              openValue={openDialog}
              onClose={handleCloseDialog}
              onSubmit={handleEdit}
              onDescriptionChange={handleDescriptionChange}
            />
            <AlertComponent
              alertState={alertState} 
              actionShowAlertFc={() => setAlertState({ ...alertState, actionShowAlert: false })}
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;