import './App.css';
import React, { Suspense, lazy } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import routes from '../routes/routes.tsx';
import AuthenticatedGuard from '../guards/AuthenticatedGuard.tsx';
import { AuthLayout } from '../layouts/AuthLayout.tsx';
import { SnackbarProvider } from 'notistack';

function App() {
    const LazyLoadingNotFound = lazy(
        () => import('../pages/NotFound/NotFound.tsx')
    );
    const Home = lazy(() => import('../pages/Home/Home.tsx'));
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<CircularProgress className="loading" />}>
                <SnackbarProvider>
                    <Router>
                        <Routes>
                            <Route element={<AuthLayout />}>
                                {routes.map((route, i) => {
                                    if (!route.protected) {
                                        return (
                                            <Route
                                                path={route.path}
                                                key={i}
                                                element={route.component}
                                            />
                                        );
                                    }
                                })}
                            </Route>
                            <Route
                                path="/home"
                                element={
                                    <AuthenticatedGuard>
                                        <Home />
                                    </AuthenticatedGuard>
                                }
                            />

                            {/* {routes.map((route, i) => {
              if (route.protected) {
                return (
                  <AuthenticatedGuard
                    key={i}
                    component={() => route.component}
                    path={route.path}
                  />
                );
              }
            })} */}
                            <Route
                                path="/*"
                                element={<LazyLoadingNotFound />}
                            />
                        </Routes>
                    </Router>
                </SnackbarProvider>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
