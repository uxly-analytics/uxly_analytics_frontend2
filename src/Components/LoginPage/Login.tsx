import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import Header from "./LoginComponents/LoginHeader";

import "./LoginComponents/Login.css";

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();
const defaultTheme = createTheme({
  palette: {
    mode: 'dark', // Enabling dark mode ensures that text will be lighter (white in this case)
    text: {
      primary: '#ffffff', // Sets the primary text color to white
      secondary: 'rgba(255, 255, 255, 0.7)', // Secondary text color with some transparency
    },
    // ... any other color overrides
  },
  // ... any other theme customizations
});

export default function SignIn() {
  const { loginWithRedirect } = useAuth0();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className="app-container">
      <section className="header-section">
        <Header />
      </section>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'text.primary',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#eb5763' }}>
              <LockOutlinedIcon  />
            </Avatar>
            <Typography component="h1" variant="h5" color="white">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              {/* email and password fields are commented out because we are using Auth0 for authentication */}
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{
                  '& label.Mui-focused': { color: 'white' },
                  '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                    '& input': { color: 'white' },
                  },
                }}
              /> */}
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                  '& label.Mui-focused': { color: 'white' },
                  '& .MuiInput-underline:after': { borderBottomColor: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                    '& input': { color: 'white' },
                  },
                }}
              /> */}
              {/* <FormControlLabel
                control={
                  <Checkbox value="remember"
                    sx={{
                      color: 'grey', // Color when not checked
                      '&.Mui-checked': {
                        color: '#eb5763',
                      },
                    }}  
                  />}
                label="Accept terms and conditions"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // sx={{ mt: 3, mb: 2, backgroundColor: '#eb5763' }}
                sx={{
                  mt: 3, 
                  mb: 2, 
                  backgroundColor: '#eb5763', // Normal state background color
                  '&:hover': {
                    backgroundColor: '#A43C45', // Change to red on hover
                  },
                }}
                onClick={() => loginWithRedirect()}
              >
                Sign In
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}