import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            color="text.primary"
            gutterBottom
          >
            Welcome to Car Dealership
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Find your perfect car from our extensive collection of quality vehicles.
            We offer the best deals on new and used cars.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/inventory')}
              sx={{ mr: 2 }}
            >
              Browse Inventory
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/add-car')}
            >
              Sell Your Car
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography variant="h4" align="center" color="text.primary" gutterBottom>
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Quality Vehicles
                </Typography>
                <Typography>
                  We thoroughly inspect all vehicles to ensure they meet our high standards.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Best Prices
                </Typography>
                <Typography>
                  Competitive pricing and flexible financing options available.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Expert Service
                </Typography>
                <Typography>
                  Our team of professionals is here to help you find the perfect car.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 