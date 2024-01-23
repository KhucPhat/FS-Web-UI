import React, { Component } from 'react';
//-------------------------------------------------------------------

// User-services
const Login = React.lazy(() => import('../pages/Login/Login'));
const Register = React.lazy(() => import('../pages/Register/Register'));
const ForgotPassword = React.lazy(
  () => import('../pages/ForgotPassword/ForgotPassword')
);

const Home = React.lazy(() => import('../pages/Home/Home'));

const routes = [
  { path: '/login', component: <Login /> },
  { path: '/register', component: <Register /> },
  { path: '/forgot-password', component: <ForgotPassword /> },
  { path: '/', component: <Home />, protected: true },
];

export default routes;
