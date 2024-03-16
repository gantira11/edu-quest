
import { lazy } from "react";



const Login = lazy(() => import('@features/authentication/pages/login'));

export const authenticationRoute = [
  {
    id: 'login-page',
    path: '/',
    component: Login,
    layout: 'base',
    permission: [],
  }
];
