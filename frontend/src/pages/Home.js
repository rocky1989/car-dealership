import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Rating,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cars');
        const availableCars = response.data.filter(car => car.status === 'AVAILABLE').slice(0, 3);
        setFeaturedCars(availableCars);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
        setError('Failed to load featured vehicles');
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Happy Customer',
      text: 'Found my dream car at an amazing price. The team was professional and made the process smooth.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'First-time Buyer',
      text: 'As a first-time car buyer, I was nervous, but the staff guided me through every step. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Michael Brown',
      role: 'Returning Customer',
      text: 'This is my third car from this dealership. They always have the best selection and prices.',
      rating: 5,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '60vh', sm: '70vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          px: { xs: 2, sm: 4 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 3 }}
          >
            Welcome to Sai Motors
          </Typography>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            paragraph 
            sx={{ mb: 4 }}
          >
            Your trusted destination for quality pre-owned vehicles
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/inventory')}
              sx={{ px: 4, py: 1.5 }}
              fullWidth={isMobile}
            >
              Browse Inventory
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/sell-car')}
              sx={{ 
                px: 4, 
                py: 1.5, 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
              fullWidth={isMobile}
            >
              Sell Your Car
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Quality Vehicles
                </Typography>
                <Typography>
                  We thoroughly inspect all vehicles to ensure they meet our high standards of quality and reliability.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Best Prices
                </Typography>
                <Typography>
                  Competitive pricing and flexible financing options to make your dream car affordable.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Expert Service
                </Typography>
                <Typography>
                  Our team of professionals is here to help you find the perfect car and provide excellent after-sales support.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Featured Vehicles Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
            Featured Vehicles
          </Typography>
          {loading ? (
            <Typography align="center">Loading featured vehicles...</Typography>
          ) : error ? (
            <Typography align="center" color="error">{error}</Typography>
          ) : featuredCars.length === 0 ? (
            <Typography align="center">No featured vehicles available at the moment.</Typography>
          ) : (
            <Grid container spacing={4}>
              {featuredCars.map((car) => (
                <Grid item key={car.id} xs={12} sm={6} md={4}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 6
                    }
                  }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={car.imageUrl || 'https://via.placeholder.com/300x200'}
                      alt={`${car.make} ${car.model}`}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {car.make} {car.model}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Year: {car.manufacturedYear}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Mileage: {car.mileage.toLocaleString()} miles
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                        ${car.price.toLocaleString()}
                      </Typography>
                      <Chip
                        label={car.status}
                        color={car.status === 'AVAILABLE' ? 'success' : 'error'}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => navigate(`/car/${car.id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          Customer Testimonials
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                <Typography variant="body1" paragraph sx={{ flexGrow: 1 }}>
                  "{testimonial.text}"
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.role}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 8,
          px: { xs: 2, sm: 4 }
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            align="center" 
            gutterBottom
          >
            Ready to Find Your Next Car?
          </Typography>
          <Typography 
            variant={isMobile ? 'body1' : 'h6'} 
            align="center" 
            paragraph 
            sx={{ mb: 4 }}
          >
            Browse our inventory or contact us today to schedule a test drive.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/inventory')}
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main', 
                '&:hover': { bgcolor: 'grey.100' },
                px: 4
              }}
              fullWidth={isMobile}
            >
              View Inventory
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                },
                px: 4
              }}
              fullWidth={isMobile}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 