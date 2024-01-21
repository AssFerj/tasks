import createTheme from '@mui/material/styles/createTheme';

export const themeLight = createTheme({
  palette: {
    primary: {
      light: '#64c1ff',
      main: '#0091ea',
      dark: '#0064b7',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffff56',
      main: '#ffea00',
      dark: '#c7b800',
      contrastText: '#ffffff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#ffffff'
    },
    warning: {
      light: '#ffb74d',
      main: '#ffa726',
      dark: '#f57c00',
      contrastText: '#ffffff'
    },
    info: {
      light: '#4fc3f7',
      main: '#29b6f6',
      dark: '#0288d1',
      contrastText: '#ffffff'
    },
    success: {
      light: '#81c784',
      main: '#66bb6a',
      dark: '#388e3c',
      contrastText: '#ffffff'
    },
    background: {
      default: '#ffffff'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
});

export const themeDark = createTheme({
  palette: {
    primary: {
      light: '#64c1ff',
      main: '#0091ea',
      dark: '#0064b7',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffff56',
      main: '#ffea00',
      dark: '#c7b800',
      contrastText: '#ffffff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#ffffff'
    },
    warning: {
      light: '#ffb74d',
      main: '#ffa726',
      dark: '#f57c00',
      contrastText: '#ffffff'
    },
    info: {
      light: '#4fc3f7',
      main: '#29b6f6',
      dark: '#0288d1',
      contrastText: '#ffffff'
    },
    success: {
      light: '#81c784',
      main: '#66bb6a',
      dark: '#388e3c',
      contrastText: '#ffffff'
    },
    background: {
      default: '#222222'
    }
  }
});