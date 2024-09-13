import { useMsal, MsalAuthenticationTemplate, useIsAuthenticated } from '@azure/msal-react';
import { InteractionType, InteractionStatus } from '@azure/msal-browser';
import { Box, Button, Grid2 as Grid } from '@mui/material';
import Logo from '@assets/logo.png';
import ScreenBg from '@assets/bg_man.jpg';

export default function TemplatePage({ ...sharedProps }) {
  const { signIn, theme } = sharedProps;

  // const { inProgress } = useMsal();
  // const isAuthenticated = useIsAuthenticated();

  // if (!isAuthenticated && inProgress !== InteractionStatus.None) {
  //   return 'loading...';
  // }

  return (
    <Box
      minHeight="100vh"
      pt={30}
      sx={{
        backgroundImage: `url(${ScreenBg})`,
        backgroundSize: 'cover',
      }}
    >
      <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
        <Grid
          container
          spacing={4}
          margin="0 auto"
          borderRadius={4}
          maxWidth="500px"
          textAlign="center"
          p={4}
          sx={{
            background: '#fff',
            minHeight: '450px',
            minWidth: '350px',
            '& .MuiButtonBase-root': {
              color: theme?.defaulColor,
              background: '#fff!important',
              borderRadius: '20px',
            },
          }}
        >
          <Grid size={{ md: 12, sm: 12, lg: 12, xs: 12 }}>
            <img src={Logo} width="150px" data-testid="logo-image" />
          </Grid>
          <Grid size={{ md: 12, sm: 12, lg: 12, xs: 12 }} mt={-5}>
            <Button data-testid="signIn-button" size="medium" onClick={signIn}>
              Entrar
            </Button>
          </Grid>
        </Grid>
      </MsalAuthenticationTemplate>
    </Box>
  );
}
