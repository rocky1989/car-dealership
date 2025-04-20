import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import axios from 'axios';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  color: string;
  transmission: string;
  fuelType: string;
  condition: string;
  status: string;
  vin: string;
  imageUrl: string;
}

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cars/${id}`);
      setCar(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching car details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!car) {
    return <Typography>Car not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={car.imageUrl || 'https://via.placeholder.com/600x400'}
              alt={`${car.make} ${car.model}`}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" gutterBottom>
              {car.make} {car.model}
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              ${car.price.toLocaleString()}
            </Typography>
            <Chip
              label={car.status}
              color={car.status === 'Available' ? 'success' : 'error'}
              sx={{ mb: 2 }}
            />
          </Box>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Vehicle Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Year
                </Typography>
                <Typography variant="body1">{car.year}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Mileage
                </Typography>
                <Typography variant="body1">{car.mileage.toLocaleString()} miles</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Color
                </Typography>
                <Typography variant="body1">{car.color}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Transmission
                </Typography>
                <Typography variant="body1">{car.transmission}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Fuel Type
                </Typography>
                <Typography variant="body1">{car.fuelType}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Condition
                </Typography>
                <Typography variant="body1">{car.condition}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  VIN
                </Typography>
                <Typography variant="body1">{car.vin}</Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1">{car.description}</Typography>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate(`/edit-car/${id}`)}
            >
              Edit Car
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/inventory')}
            >
              Back to Inventory
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarDetails; 