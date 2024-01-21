import { Typography, Link } from '@mui/material';
import React from 'react';

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://curriculum-web-j3bj.vercel.app/index.html">
        Assis Junior
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;