import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAll } from '../../store/modules/usersSlice';
import { logedUser } from '../../store/modules/userSlice';
import { useNavigate } from 'react-router-dom';
import AlertComponent from '../AlertComponent/AlertComponent';
import LogedUserType from '../../types/LoggedUserType';

export default function LoginForm() {
  const [logedEmail, setLogedEmail] = useState<string>('');
  const [logedPassword, setLogedPassword] = useState<string>('');
  const [logedChecked, setLogedChecked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const UsersRedux = useAppSelector(selectAll);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const findUser = UsersRedux.find(item => item.email === logedEmail && item.password === logedPassword);

  const handleUserEmail = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setLogedEmail(e.target.value);
  };

  const handleUserPassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setLogedPassword(e.target.value);
  };

  const handleUserRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogedChecked(e.target.checked);
  };

  useEffect(() => {
    handleClear();
  }, []);

  const handleClear = () => {
    setLogedEmail('');
    setLogedPassword('');
  };

  const handleAddLogedUser = (log: LogedUserType) => {
    if (findUser) {
      dispatch(logedUser(log));
      navigate('/home');
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <AlertComponent
          typeAlert="error"
          message="Usuário não cadastrado!"
          actionShowAlert={open}
          actionShowAlertFc={() => {
            setOpen(false);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={logedEmail}
          autoComplete="email"
          onChange={handleUserEmail}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          value={logedPassword}
          autoComplete="current-password"
          onChange={handleUserPassword}
        />
        <FormControlLabel
          control={<Checkbox checked={logedChecked} color="primary" onChange={handleUserRemember} required />}
          label="Lembrar acesso*"
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() =>
            handleAddLogedUser({
              name: findUser?.name,
              email: logedEmail,
              password: logedPassword,
              remember: logedChecked
            })
          }
        >
          Entrar
        </Button>
        <Grid container>
          <Grid item>
            Não tem uma conta?{' '}
            <Link href="/cadastro" variant="body2">
              Cadastre-se
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}