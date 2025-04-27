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
    Alert,
    Grid,
    useTheme,
    useMediaQuery,
    Chip,
    Paper,
    IconButton
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarService from '../services/CarService';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
        );
    };

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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
                            {car.images && car.images.length > 0 ? (
                                <>
                                    <Box
                                        component="img"
                                        src={car.images[currentImageIndex].imageUrl}
                                        alt={`${car.make} ${car.model}`}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                        }}
                                    />
                                    {car.images.length > 1 && (
                                        <>
                                            <IconButton
                                                onClick={handlePreviousImage}
                                                sx={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                                                    },
                                                }}
                                            >
                                                <ArrowBackIosIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={handleNextImage}
                                                sx={{
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                                                    },
                                                }}
                                            >
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </>
                                    )}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 16,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            display: 'flex',
                                            gap: 1,
                                        }}
                                    >
                                        {car.images.map((_, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    bgcolor: index === currentImageIndex ? 'primary.main' : 'grey.400',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => setCurrentImageIndex(index)}
                                            />
                                        ))}
                                    </Box>
                                </>
                            ) : (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: 'grey.200',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography color="text.secondary">No image available</Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            {car.make} {car.model}
                        </Typography>
                        <Typography variant="h5" color="primary" gutterBottom>
                            ${car.price.toLocaleString()}
                        </Typography>
                        <Chip
                            label={car.status}
                            color={car.status === 'AVAILABLE' ? 'success' : 'error'}
                            sx={{ mb: 2 }}
                        />
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Year
                                </Typography>
                                <Typography variant="body1">{car.manufacturedYear}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    Mileage
                                </Typography>
                                <Typography variant="body1">
                                    {car.mileage.toLocaleString()} miles
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" color="text.secondary">
                                    VIN
                                </Typography>
                                <Typography variant="body1">{car.vin}</Typography>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                            {isLoggedIn && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/edit-car/${id}`)}
                                    >
                                        Edit Car
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleDelete}
                                    >
                                        Delete Car
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
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default CarDetails; 