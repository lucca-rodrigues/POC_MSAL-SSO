import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@contexts/auth/useAuthContext';
import { useGlobalContext } from '@contexts/globalContext/useGlobalContext';
import { RootTemplate } from '@components';
import { Box, CircularProgress } from '@mui/material';
import routes from './routes';
import NotFound from '@root/pages/not-found';
import { useMsal } from '@azure/msal-react';

export default function AppRoutes() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, setIsAuthenticated } = useAuth();
  const { theme } = useGlobalContext();
  const location = useLocation();
  const { instance } = useMsal();

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, location.pathname]);

  useEffect(() => {
    const checkAccount = async () => {
      const response = await instance.handleRedirectPromise();
      if (response && response.account) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      }
    };
    checkAccount();
  }, [instance, navigate]);

  if (isAuthenticated && isLoading) {
    return (
      <Box
        height="100%"
        width="100%"
        pt="40vh"
        margin="0 auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress
          size={100}
          sx={{
            color: theme?.defaultColor,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: '#E9E9E9',
      }}
    >
      <Routes>
        {routes.map(({ path, element, isPublicRoute }) => (
          <Route
            key={path}
            path={path}
            element={
              isPublicRoute || isAuthenticated ? (
                isPublicRoute && !isAuthenticated ? (
                  element
                ) : (
                  <RootTemplate>{element}</RootTemplate>
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}
