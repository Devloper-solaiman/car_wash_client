import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';

export const AuthRoutes = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
];
