/* eslint-disable @typescript-eslint/no-unused-vars */
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TaskIcon from '@mui/icons-material/Task';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserType from '../../types/UserType';
import { signOut } from '../../services/api.service';

interface MenuProps {
  user: UserType
}

export default function MenuAppBar({user}: MenuProps) {
  const [auth, setAuth] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    signOut()
    navigate('/')
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <TaskIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task-In
          </Typography>
          {auth ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" mr={1}>
                Olá!
              </Typography>
              <Typography variant="body1" fontWeight={600} mr={1}>
                {user.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                sx={{ mt: 7, ml: 2 }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Sair</MenuItem>
              </Menu>
            </Box>
          ):(
            <>{setAuth(false)}</>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}