import React, { useEffect, useState } from 'react';
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
import { useCarContext } from '../context/CarContext';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cars, loading, error } = useCarContext();
    const [car, setCar] = useState(null);

    useEffect(() => {
        if (cars && cars.length > 0) {
            const foundCar = cars.find(c => c.id === parseInt(id));
            if (foundCar) {
                setCar(foundCar);
            }
        }
    }, [cars, id]);

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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/cars/${id}/edit`)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate('/')}
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