import SignIn from '@pages/signIn';
import Dashboard from '@pages/dashboard';

const routes = [
  { path: '/', element: <SignIn />, isPublicRoute: true },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/login', element: <SignIn />, isPublicRoute: true }, // Adicionado rota para login
];

export default routes;
