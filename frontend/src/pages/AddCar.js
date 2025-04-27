import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Card,
  CardMedia,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CarService from '../services/CarService';

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    manufacturedYear: '',
    mileage: '',
    price: '',
    status: 'AVAILABLE',
    vin: '',
    color: '',
    transmission: '',
    fuelType: '',
    carCondition: '',
    description: '',
    images: []
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.make) newErrors.make = 'Make is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.manufacturedYear) newErrors.manufacturedYear = 'Year is required';
    if (!formData.mileage) newErrors.mileage = 'Mileage is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.vin) newErrors.vin = 'VIN is required';
    if (!formData.color) newErrors.color = 'Color is required';
    if (!formData.transmission) newErrors.transmission = 'Transmission is required';
    if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
    if (!formData.carCondition) newErrors.carCondition = 'Condition is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const carData = {
        ...formData,
        manufacturedYear: parseInt(formData.manufacturedYear),
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage),
      };
      await CarService.addCar(carData, images);
      navigate('/inventory');
    } catch (error) {
      console.error('Error adding car:', error);
      setErrors({ submit: 'Failed to add car. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Car
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Make"
                name="make"
                value={formData.make}
                onChange={handleChange}
                error={!!errors.make}
                helperText={errors.make}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                error={!!errors.model}
                helperText={errors.model}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                name="manufacturedYear"
                type="number"
                value={formData.manufacturedYear}
                onChange={handleChange}
                error={!!errors.manufacturedYear}
                helperText={errors.manufacturedYear}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mileage"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleChange}
                error={!!errors.mileage}
                helperText={errors.mileage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="VIN"
                name="vin"
                value={formData.vin}
                onChange={handleChange}
                error={!!errors.vin}
                helperText={errors.vin}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                error={!!errors.color}
                helperText={errors.color}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.transmission}>
                <InputLabel>Transmission</InputLabel>
                <Select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  label="Transmission"
                >
                  <MenuItem value="AUTOMATIC">Automatic</MenuItem>
                  <MenuItem value="MANUAL">Manual</MenuItem>
                </Select>
                {errors.transmission && <FormHelperText>{errors.transmission}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.fuelType}>
                <InputLabel>Fuel Type</InputLabel>
                <Select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  label="Fuel Type"
                >
                  <MenuItem value="GASOLINE">Gasoline</MenuItem>
                  <MenuItem value="DIESEL">Diesel</MenuItem>
                  <MenuItem value="ELECTRIC">Electric</MenuItem>
                  <MenuItem value="HYBRID">Hybrid</MenuItem>
                </Select>
                {errors.fuelType && <FormHelperText>{errors.fuelType}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.carCondition}>
                <InputLabel>Condition</InputLabel>
                <Select
                  name="carCondition"
                  value={formData.carCondition}
                  onChange={handleChange}
                  label="Condition"
                >
                  <MenuItem value="NEW">New</MenuItem>
                  <MenuItem value="USED">Used</MenuItem>
                  <MenuItem value="CERTIFIED">Certified Pre-owned</MenuItem>
                </Select>
                {errors.carCondition && <FormHelperText>{errors.carCondition}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="AVAILABLE">Available</MenuItem>
                  <MenuItem value="SOLD">Sold</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                </Select>
                {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Car Images
              </Typography>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </Button>
              {errors.images && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {errors.images}
                </Typography>
              )}
              {images.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="200"
                          image={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/inventory')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {loading ? 'Adding...' : 'Add Car'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddCar; 