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
// import { useNavigate } from 'react-router-dom';
import { /*useEffect,*/ useState } from 'react';
// import { signIn } from '../services/api.service';
// import UserType from '../types/UserType';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://curriculum-web-j3bj.vercel.app/" sx={{
        "&:hover":{
          // color: `${theme.palette.primary.contrastText}`
        }
      }}>
        Assis Junior
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loggedUser, setLoggedUser] = useState<UserType>({});
  // const [token, setToken] = useState<string | null>('');
  
  // useEffect(() => {
  //   const logUser = async () => {
  //     setLoggedUser(await signIn({email, password}));
  //     console.log(loggedUser);
  //     if(loggedUser){
  //       const authToken = loggedUser.token
  //       setToken(authToken!)
  //       localStorage.setItem('token', authToken!)
  //       if(token){
  //         navigate('/home');
  //       } return
  //     }
  //   }
  //   logUser()
  // }, [email, loggedUser, navigate, password, token]);

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const logUser = {
    //   email,
    //   password
    // }
    // dispatch(loginAction(logUser));
    // return;
    try {
      if(email && password){
        // console.log(isLogged);
        
        // if(loggedUser){
        //   navigate('/home');
        // }
      }
    } catch (error) {
      console.log(error, 'Submit Login');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{height: '50%'/*, background: themeDark.palette.background.default,*/, p: 5, mt: '10%'}}>
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" /*color={themeDark.palette.primary.contrastText}*/>
          Tasks - Login
        </Typography>
        <Box component="form" onSubmit={submitLogin} noValidate sx={{ mt: 1 }}>
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
            // sx={{
            //   borderRadius: 1
            //   // borderColor: `${themeDark.palette.secondary.main}`,
            //   // background: `${themeDark.palette.primary.contrastText}`,
            //   // '&:Mui-focused': {
            //   //   boxShadow: `${alpha(themeDark.palette.secondary.light, 0.25)} 0 0 0 0.2rem`,
            //   //   borderColor: themeDark.palette.secondary.light,
            //   }
            // }}
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
            // sx={{
            //   borderRadius: 1,
            //   borderColor: `${themeDark.palette.secondary.main}`,
            //   background: `${themeDark.palette.primary.contrastText}`,
            //   '&:Mui-focused': {
            //     boxShadow: `${alpha(themeDark.palette.secondary.light, 0.25)} 0 0 0 0.2rem`,
            //     borderColor: themeDark.palette.secondary.light,
            //   }
            // }}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              // background: `${themeDark.palette.secondary.dark}`,
              // "&:hover":{
              //   background: `${themeDark.palette.primary.dark}`,
              //   color: `${themeDark.palette.primary.contrastText}`
              // }
            }}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/cadastro" variant="body2"
                sx={{
                  textDecoration: 'none',
                  // color: `${themeDark.palette.secondary.light}`,
                  "&:hover":{
                    // color: `${themeDark.palette.primary.contrastText}`
                  }
                }}
              >
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}