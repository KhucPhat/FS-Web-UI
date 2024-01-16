import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function AuthenticatedGuard(props: any) {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (!localStorage.getItem('token')) {
          return <Navigate to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default AuthenticatedGuard;
