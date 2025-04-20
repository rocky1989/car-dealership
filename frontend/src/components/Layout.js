import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  styled,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
});

const LogoContent = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
});

const SaiText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '2rem',
  background: 'linear-gradient(45deg, #FF0000, #FF3333)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
});

const StyledCarIcon = styled(DirectionsCarIcon)({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #FF0000, #FF3333)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
});

const Layout = ({ children, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Box component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
            <LogoContainer>
              <StyledCarIcon />
              <LogoContent>
                <SaiText>Sai Motors</SaiText>
              </LogoContent>
            </LogoContainer>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/inventory">
              Inventory
            </Button>
            {isLoggedIn && (
              <Button color="inherit" component={RouterLink} to="/add-car">
                Add Car
              </Button>
            )}
            {isLoggedIn ? (
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 