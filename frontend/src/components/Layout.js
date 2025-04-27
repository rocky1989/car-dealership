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
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MenuIcon from '@mui/icons-material/Menu';

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

const SaiText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: theme.breakpoints.down('sm') ? '1.5rem' : '2rem',
  background: 'linear-gradient(45deg, #FF0000, #FF3333)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
}));

const StyledCarIcon = styled(DirectionsCarIcon)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? '2rem' : '2.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #FF0000, #FF3333)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
}));

const Layout = ({ children, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Inventory', path: '/inventory' },
    ...(isLoggedIn ? [{ label: 'Add Car', path: '/add-car' }] : []),
  ];

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {menuItems.map((item) => (
        <Button 
          key={item.path} 
          color="inherit" 
          component={RouterLink} 
          to={item.path}
        >
          {item.label}
        </Button>
      ))}
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
  );

  const renderMobileMenu = () => (
    <>
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={handleMobileMenuToggle}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.path} 
              component={RouterLink} 
              to={item.path}
              onClick={handleMobileMenuToggle}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <ListItem 
            button 
            onClick={() => {
              if (isLoggedIn) {
                handleLogout();
              } else {
                handleLogin();
              }
              handleMobileMenuToggle();
            }}
          >
            <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );

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
          {isMobile ? renderMobileMenu() : renderDesktopMenu()}
        </StyledToolbar>
      </StyledAppBar>
      <Container 
        component="main" 
        sx={{ 
          flex: 1, 
          py: 4,
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 