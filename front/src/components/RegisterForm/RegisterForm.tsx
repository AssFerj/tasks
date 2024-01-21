import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import UserType from '../../types/UserType';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/modules/usersSlice';
import { useNavigate } from 'react-router-dom';

export default function Registerform() {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [valid, setValid] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    user.name === '' ||
    user.email === '' ||
    user.password === '' ||
    user.confirmPassword === ''
      ? setValid(false)
      : setValid(true);
  }, [user]);

  useEffect(() => {
    if (user.password && user.confirmPassword && user.password !== user.confirmPassword) {
      setValid(false);
      setErrorPassword('Senhas não conferem!');
    } else {
      setErrorPassword('');
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    dispatch(addUser({ ...user }));
    handleClear();
    navigate('/');
  };

  const handleClear = () => {
    setUser({ name: '', email: '', password: '', confirmPassword: '', tasks: [] });
  };

  return (
    <Box component="form" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            required
            fullWidth
            type="text"
            id="name"
            name="name"
            label="Nome"
            autoFocus
            value={user.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            type="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={user.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="new-password"
            value={user.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            id="confirmPassword"
            error={errorPassword.length > 1}
            helperText={errorPassword}
            autoComplete="new-password"
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => handleSubmit()}
        disabled={!valid}
      >
        Cadastrar
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          Já tem uma conta?{' '}
          <Link href="/" variant="body2">
            Acesse
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}