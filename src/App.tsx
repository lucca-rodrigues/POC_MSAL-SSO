import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/useAuthContext';
import { GlobalProvider } from './contexts/globalContext/useGlobalContext';
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import { MsalProvider } from '@azure/msal-react';

import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function App() {
  const msalInstance = new PublicClientApplication(msalConfig);

  useEffect(() => {
    msalInstance.initialize();

    const activeAccount = msalInstance.getActiveAccount();

    if (!activeAccount) {
      // Account selection
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }
    }

    //set the account
    msalInstance.addEventCallback((event: EventMessage) => {
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const authenticationResult = event.payload as AuthenticationResult;
        const account = authenticationResult.account;
        msalInstance.setActiveAccount(account);
      }
    });

    //enable account storage event
    msalInstance.enableAccountStorageEvents();
  }, [msalInstance]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <GlobalProvider>
          <MsalProvider instance={msalInstance}>
            <AppRoutes />
          </MsalProvider>
        </GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
