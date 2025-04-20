import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import CarService from '../services/CarService';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                setLoading(true);
                const data = await CarService.getCarById(id);
                setCar(data);
            } catch (err) {
                setError('Failed to fetch car details');
                console.error('Error fetching car details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await CarService.deleteCar(id);
                navigate('/inventory');
            } catch (err) {
                setError('Failed to delete car');
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

    if (!car) {
        return (
            <Container>
                <Alert severity="warning" sx={{ mt: 2 }}>
                    Car not found
                </Alert>
            </Container>
        );
    }

    const isLoggedIn = localStorage.getItem('authToken') !== null;

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="400"
                    image={car.imageUrl || '/default-car.jpg'}
                    alt={`${car.make} ${car.model}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {car.make} {car.model}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Year: {car.manufacturedYear}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Price: ${car.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Mileage: {car.mileage.toLocaleString()} miles
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Color: {car.color}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Transmission: {car.transmission}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Fuel Type: {car.fuelType}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Condition: {car.carCondition}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        VIN: {car.vin}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Status: {car.status}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        {isLoggedIn && (
                            <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(`/edit-car/${id}`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </>
                        )}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate('/inventory')}
                        >
                            Back to List
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CarDetails; 