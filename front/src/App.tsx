import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './store/store';
import { themeLight } from './config/Theme/Theme';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <ThemeProvider theme={themeLight}>
          <AppRoutes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
