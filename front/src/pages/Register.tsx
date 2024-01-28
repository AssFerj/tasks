/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUser } from '../services/api.service';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://curriculum-web-j3bj.vercel.app/">
        Assis Junior
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitregister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUser({name, email, password})
      navigate('/');
      return;
    } catch (error) {
      console.log(error, 'Submit Register');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{height: '50%', p: 5, mt: '8%'}}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Task-In - Cadastro
        </Typography>
        <Box component="form" onSubmit={submitregister} noValidate sx={{ mt: 2 }}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <TextField
                sx={{marginRight: 1}}
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
                autoComplete="name"
                type='text'
                autoFocus
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            type='email'
            autoFocus
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            cadastrar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Já tem uma conta? Entrar"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
