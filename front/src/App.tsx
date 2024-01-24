import { CssBaseline } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRoutes />
    </Provider>
  )
}

export default App
