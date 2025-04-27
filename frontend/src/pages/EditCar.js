import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Card,
  CardMedia,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CarService from '../services/CarService';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const car = await CarService.getCarById(id);
        setCar(car);
        setLoading(false);
      } catch (err) {
        setError('Failed to load car details');
        setLoading(false);
        console.error('Error fetching car details:', err);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const newFiles = Array.from(e.target.files);
        
        // Update backend with the new files
        const updatedCar = await CarService.updateCarImages(id, newFiles);
        
        // Update UI with the updated car images
        setCar(prev => ({
          ...prev,
          images: updatedCar.images
        }));
      } catch (error) {
        console.error('Error updating images:', error);
        setError('Failed to update images');
      }
    }
  };

  const handleDeleteImage = (index) => {
    if (car && car.images) {
      const imageToDelete = car.images[index];
      setDeletedImages(prev => [...prev, imageToDelete]);
      setCar(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Filter out File objects from images array
      const carData = {
        ...car,
        manufacturedYear: parseInt(car.manufacturedYear),
        price: parseFloat(car.price),
        mileage: parseFloat(car.mileage),
        images: car.images.filter(img => !(img instanceof File))
      };

      // Update car details
      const updatedCar = await CarService.updateCar(id, carData);
      
      // If there are deleted images, update the car again to remove them
      if (deletedImages.length > 0) {
        const finalCar = await CarService.getCarById(id);
        const updatedImages = finalCar.images.filter(img => 
          !deletedImages.some(deleted => deleted.id === img.id)
        );
        await CarService.updateCar(id, { ...finalCar, images: updatedImages });
      }

      navigate(`/car/${id}`);
    } catch (err) {
      console.error('Error updating car:', err);
      setError('Failed to update car. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getImageUrl = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image.image_data || image.imageUrl;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Edit Car
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Make"
                name="make"
                value={car.make}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Model"
                name="model"
                value={car.model}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Year"
                name="manufacturedYear"
                type="number"
                value={car.manufacturedYear}
                onChange={handleChange}
                inputProps={{ min: 1900, max: new Date().getFullYear() }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Price (₹)"
                name="price"
                type="number"
                value={car.price}
                onChange={handleChange}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Mileage"
                name="mileage"
                type="number"
                value={car.mileage}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Color"
                name="color"
                value={car.color}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Transmission</InputLabel>
                <Select
                  name="transmission"
                  value={car.transmission}
                  onChange={handleChange}
                  label="Transmission"
                >
                  <MenuItem value="AUTOMATIC">Automatic</MenuItem>
                  <MenuItem value="MANUAL">Manual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Fuel Type</InputLabel>
                <Select
                  name="fuelType"
                  value={car.fuelType}
                  onChange={handleChange}
                  label="Fuel Type"
                >
                  <MenuItem value="GASOLINE">Gasoline</MenuItem>
                  <MenuItem value="DIESEL">Diesel</MenuItem>
                  <MenuItem value="ELECTRIC">Electric</MenuItem>
                  <MenuItem value="HYBRID">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select
                  name="carCondition"
                  value={car.carCondition}
                  onChange={handleChange}
                  label="Condition"
                >
                  <MenuItem value="NEW">New</MenuItem>
                  <MenuItem value="USED">Used</MenuItem>
                  <MenuItem value="CERTIFIED">Certified Pre-owned</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={car.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="AVAILABLE">Available</MenuItem>
                  <MenuItem value="SOLD">Sold</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="VIN"
                name="vin"
                value={car.vin}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={car.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Car Images
              </Typography>
              <Grid container spacing={2}>
                {car.images.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={getImageUrl(image)}
                        alt={`Car Image ${index + 1}`}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(`/car/${id}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting}
                  startIcon={submitting ? <CircularProgress size={20} /> : null}
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditCar; 