import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    TextField,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import CarService from '../services/CarService';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const data = await CarService.getAllCars();
                setCars(data);
            } catch (err) {
                setError('Failed to fetch cars. Please try again later.');
                console.error('Error fetching cars:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const filteredCars = cars.filter(car => 
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.manufacturedYear.toString().includes(searchQuery)
    );

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleViewDetails = (id) => {
        navigate(`/car/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/edit-car/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await CarService.deleteCar(id);
                setCars(cars.filter(car => car.id !== id));
            } catch (err) {
                console.error('Error deleting car:', err);
            }
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Search Cars"
                    value={searchQuery}
                    onChange={handleSearch}
                    sx={{ mb: 2 }}
                />
            </Box>
            <Grid container spacing={4}>
                {filteredCars.map((car) => (
                    <Grid item key={car.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={car.imageUrl || '/default-car.jpg'}
                                alt={`${car.make} ${car.model}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {car.make} {car.model}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Year: {car.manufacturedYear}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${car.price.toLocaleString()}
                                </Typography>
                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleViewDetails(car.id)}
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEdit(car.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(car.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CarList; 