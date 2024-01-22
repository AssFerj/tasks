import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { themeDark } from './config/Theme/Theme';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={themeDark}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  )
}

export default App
