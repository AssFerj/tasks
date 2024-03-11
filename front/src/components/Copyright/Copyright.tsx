import { Typography, Link } from '@mui/material';

const Copyright = () => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
        {'Copyright © '}
        <Link color="inherit" href="https://assisjuniorwm.com.br">
          Assis Junior
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
};

export default Copyright;