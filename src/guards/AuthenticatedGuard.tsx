import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

function AuthenticatedGuard(props) {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('token')) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default AuthenticatedGuard;
