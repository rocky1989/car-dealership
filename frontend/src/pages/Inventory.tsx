import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  imageUrl: string;
  status: string;
}

const Inventory: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cars/search', {
        params: {
          make: searchTerm,
          year: selectedYear,
        },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error searching cars:', error);
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/car/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Our Inventory
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search by Make or Model"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <MenuItem value="">All Years</MenuItem>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ height: '56px' }}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {cars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={car.imageUrl || 'https://via.placeholder.com/300x200'}
                alt={`${car.make} ${car.model}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {car.make} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {car.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mileage: {car.mileage.toLocaleString()} miles
                </Typography>
                <Typography variant="h6" color="primary">
                  ${car.price.toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleViewDetails(car.id)}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Inventory; 