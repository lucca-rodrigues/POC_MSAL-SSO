/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

interface IAuthContext {
  token: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  signOut: () => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  handleGlobalLoader: () => void;
  handleGlobalLoaderNavigation: () => void;
  // setUserToken: (token: string) => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  token: false,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  signOut: () => {},
  isLoading: true,
  setIsLoading: () => {},
  handleGlobalLoader: () => {},
  handleGlobalLoaderNavigation: () => {},
  // setUserToken: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { instance } = useMsal();

  const storageToken = window.localStorage.getItem('msal.account.keys');

  useMemo(() => {
    if (storageToken) {
      setIsAuthenticated(true);
      setToken(true);
    }
  }, [storageToken]);

  useEffect(() => {
    if (isAuthenticated) {
      handleGlobalLoader();
    }
  }, [isAuthenticated]);

  const handleGlobalLoader = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleGlobalLoaderNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const signOut = () => {
    handleGlobalLoader();
    localStorage.clear();
    instance.logoutRedirect();
    setTimeout(() => {
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        setIsAuthenticated,
        signOut,
        isLoading,
        setIsLoading,
        handleGlobalLoader,
        handleGlobalLoaderNavigation,
        // setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
