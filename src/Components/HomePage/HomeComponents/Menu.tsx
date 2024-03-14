import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './UserProfile';


export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth0();

  const theme = createTheme({
    typography: {
      // Tell MUI what the font-size on the html element is.
      subtitle1: {
          color: 'white',
          alignItems: 'center', textAlign: 'center',
      },
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginRight: -10, borderRadius:2}}>

         <Tooltip title="">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 50, height: 50, bgcolor: grey[900] }}>
                <MenuIcon />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}

        PaperProps={{
          elevation: 0,
          sx: {
            display: 'flex', alignItems: 'center', textAlign: 'center',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            bgcolor: grey[900] ,
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 24,
              width: 10,
              height: 10,
              bgcolor: grey[900],
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem >
                <Avatar /> <ThemeProvider theme={theme}>
          <Typography variant="subtitle1">
                  Account
                  </Typography> <Profile /> 
    </ThemeProvider>
        </MenuItem>
        <Divider />
        
        <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          <ThemeProvider theme={theme}>
          <Typography variant="subtitle1">
                Logout
          </Typography>
          </ThemeProvider>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}