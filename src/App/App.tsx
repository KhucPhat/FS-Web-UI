import './App.css';
import React, { Suspense, lazy } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import routes from '../routes/routes.tsx';
import AuthenticatedGuard from '../guards/AuthenticatedGuard.tsx';

function App() {
  const LazyLoadingNotFound = lazy(
    () => import('../pages/NotFound/NotFound.tsx')
  );
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<CircularProgress className="loading" />}>
        <Router>
          <Routes>
            {routes.map((route, i) => {
              if (!route.protected) {
                return (
                  <Route path={route.path} key={i} element={route.component} />
                );
              }
            })}

            {routes.map((route, i) => {
              if (route.protected) {
                return (
                  <AuthenticatedGuard
                    key={i}
                    component={() => route.component}
                    path={route.path}
                  />
                );
              }
            })}
            <Route path="/*" element={<LazyLoadingNotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
