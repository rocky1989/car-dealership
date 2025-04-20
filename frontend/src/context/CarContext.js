import React, { createContext, useContext, useState, useEffect } from 'react';
import CarService from '../services/CarService';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [initialized, setInitialized] = useState(false);

    // Initialize cars data
    useEffect(() => {
        const initializeCars = async () => {
            if (!initialized) {
                try {
                    setLoading(true);
                    const data = await CarService.getAllCars();
                    setCars(data);
                    setInitialized(true);
                } catch (err) {
                    setError('Failed to fetch cars. Please try again later.');
                    console.error('Error fetching cars:', err);
                } finally {
                    setLoading(false);
                }
            }
        };

        initializeCars();
    }, [initialized]);

    // Update cars after modifications
    const updateCars = async () => {
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

    const value = {
        cars,
        loading,
        error,
        updateCars,
        initialized
    };

    return (
        <CarContext.Provider value={value}>
            {children}
        </CarContext.Provider>
    );
};

export const useCarContext = () => {
    const context = useContext(CarContext);
    if (!context) {
        throw new Error('useCarContext must be used within a CarProvider');
    }
    return context;
}; 