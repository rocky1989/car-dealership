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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardMedia,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CarService from '../services/CarService';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    manufacturedYear: '',
    price: '',
    mileage: '',
    description: '',
    color: '',
    transmission: '',
    fuelType: '',
    carCondition: '',
    status: 'AVAILABLE',
    vin: '',
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const car = await CarService.getCarById(id);
        setFormData({
          make: car.make,
          model: car.model,
          manufacturedYear: car.manufacturedYear.toString(),
          price: car.price.toString(),
          mileage: car.mileage.toString(),
          description: car.description || '',
          color: car.color || '',
          transmission: car.transmission || '',
          fuelType: car.fuelType || '',
          carCondition: car.carCondition || '',
          status: car.status || 'AVAILABLE',
          vin: car.vin || '',
        });
        setExistingImages(car.images || []);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setNewImages([...newImages, ...newFiles]);
    }
  };

  const handleRemoveNewImage = (index) => {
    const updatedImages = [...newImages];
    updatedImages.splice(index, 1);
    setNewImages(updatedImages);
  };

  const handleRemoveExistingImage = (imageId) => {
    setImagesToDelete(prev => [...prev, imageId]);
    setExistingImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const carData = {
        ...formData,
        manufacturedYear: parseInt(formData.manufacturedYear),
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage),
        images: existingImages.filter(img => !imagesToDelete.includes(img.id)),
      };
      
      await CarService.updateCar(id, carData, newImages);
      navigate(`/car/${id}`);
    } catch (error) {
      console.error('Error updating car:', error);
      setError('Failed to update car details');
    } finally {
      setSubmitting(false);
    }
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
                value={formData.make}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Model"
                name="model"
                value={formData.model}
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
                value={formData.manufacturedYear}
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
                value={formData.price}
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
                value={formData.mileage}
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
                value={formData.color}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="VIN"
                name="vin"
                value={formData.vin}
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
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Existing Images
              </Typography>
              <Grid container spacing={2}>
                {existingImages.map((image) => (
                  <Grid item xs={12} sm={6} md={4} key={image.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={image.imageUrl}
                        alt={`Car Image ${image.id}`}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveExistingImage(image.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Add New Images
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
              {newImages.length > 0 && (
                <>
                  <List>
                    {newImages.map((image, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={image.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveNewImage(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {newImages.map((image, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="200"
                            image={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
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