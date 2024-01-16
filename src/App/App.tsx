import './App.css';
import React, { Suspense, lazy } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

function App() {
  const LazyLoadingLogin = lazy(() => import('../pages/Login/Login.tsx'));
  const LazyLoadingRegister = lazy(
    () => import('../pages/Register/Register.tsx')
  );
  const LazyLoadingNotFound = lazy(
    () => import('../pages/NotFound/NotFound.tsx')
  );
  const LazyLoadingFotgotPassword = lazy(
    () => import('../pages/ForgotPassword/ForgotPassword.tsx')
  );
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<CircularProgress className="loading" />}>
        <Routes>
          <Route path="/login" element={<LazyLoadingLogin />} />
          <Route path="/register" element={<LazyLoadingRegister />} />
          <Route
            path="/forgot-password"
            element={<LazyLoadingFotgotPassword />}
          />
          <Route path="/*" element={<LazyLoadingNotFound />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
