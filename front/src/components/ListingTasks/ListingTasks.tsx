import { Box, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

interface ListingProps {
  key: number;
  description: string;
  actionConfirm: () => void;
}

const ListingTasks: React.FC<ListingProps> = ({ key, description, actionConfirm }) => {
  return (
    <Box
      key={key}
      style={{
        width: '30em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '.5rem',
        marginBottom: '1rem',
        borderRadius: '.5rem'
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="body1" padding={'.5rem 1rem'}>
          {description}
        </Typography>
        <Button>
          <EditIcon />
        </Button>
        <Button onClick={() => actionConfirm()}>
          <DeleteIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ListingTasks;