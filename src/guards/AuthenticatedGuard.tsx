import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthenticatedGuard({ children }: any) {
  if (!localStorage.getItem('access_token')) {
    return <Navigate to="/login" />;
  }
  if (
    localStorage.getItem('access_token') &&
    (window.location.pathname === '/login' ||
      window.location.pathname === '/register' ||
      window.location.pathname === '/forgot-password')
  ) {
    return <Navigate to="/home" />;
  }
  return children;
}

export default AuthenticatedGuard;
