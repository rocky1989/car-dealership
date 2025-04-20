import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cars';

const CarService = {
    getAllCars: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching cars:', error);
            throw error;
        }
    },

    getCarById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching car details:', error);
            throw error;
        }
    },

    searchCars: async (query) => {
        try {
            const response = await axios.get(`${API_URL}/search?query=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching cars:', error);
            throw error;
        }
    },

    createCar: async (carData) => {
        try {
            const response = await axios.post(API_URL, carData);
            return response.data;
        } catch (error) {
            console.error('Error creating car:', error);
            throw error;
        }
    },

    updateCar: async (id, carData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, carData);
            return response.data;
        } catch (error) {
            console.error('Error updating car:', error);
            throw error;
        }
    },

    deleteCar: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error('Error deleting car:', error);
            throw error;
        }
    }
};

export default CarService; 