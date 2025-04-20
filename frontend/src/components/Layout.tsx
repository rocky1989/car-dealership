import React, { useState, useEffect } from 'react';
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
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

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

const SaiText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '2rem',
  background: 'linear-gradient(45deg, #FFD700, #FFFFFF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
});

const MotorsText = styled(Typography)({
  fontSize: '1rem',
  color: '#FFFFFF',
  lineHeight: 1,
});

const LogoContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Box component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
            <LogoContainer>
              <DirectionsCarIcon sx={{ fontSize: 40, color: '#FFD700' }} />
              <LogoContent>
                <SaiText>SAI</SaiText>
                <MotorsText>MOTORS</MotorsText>
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