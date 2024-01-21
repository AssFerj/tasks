import { Grid, Paper, Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import TaskIcon from '@mui/icons-material/Task';
import Copyright from '../components/Copyright/Copyright';
import LoginForm from '../components/LoginForm/LoginForm';

const Login: React.FC = () => {
  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <TaskIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Task-In
            </Typography>
            <LoginForm />
          </Box>
          <Copyright />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;