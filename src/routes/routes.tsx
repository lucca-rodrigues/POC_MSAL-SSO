import SignIn from '@pages/signIn';
import Dashboard from '@pages/dashboard';

const routes = [
  { path: '/', element: <SignIn />, isPublicRoute: true },
  { path: '/dashboard', element: <Dashboard />, isPublicRoute: false },
];

export default routes;
