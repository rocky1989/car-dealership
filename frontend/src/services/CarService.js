import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cars';
const IMAGE_BASE_URL = 'http://localhost:8080/uploads';

const CarService = {
    getAllCars: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data.map(car => ({
                ...car,
                images: car.images?.map(image => ({
                    ...image,
                    imageUrl: image.imageFilename ? `${IMAGE_BASE_URL}/${image.imageFilename}` : null
                })) || []
            }));
        } catch (error) {
            console.error('Error fetching cars:', error);
            throw error;
        }
    },

    getCarById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            const car = response.data;
            return {
                ...car,
                images: car.images?.map(image => ({
                    ...image,
                    imageUrl: image.imageFilename ? `${IMAGE_BASE_URL}/${image.imageFilename}` : null
                })) || []
            };
        } catch (error) {
            console.error('Error fetching car:', error);
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

    addCar: async (carData, imageFiles) => {
        try {
            const formData = new FormData();
            formData.append('car', JSON.stringify(carData));
            if (imageFiles && imageFiles.length > 0) {
                imageFiles.forEach((file, index) => {
                    formData.append('images', file);
                });
            }
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding car:', error);
            throw error;
        }
    },

    updateCar: async (id, carData, imageFiles) => {
        try {
            const formData = new FormData();
            formData.append('car', JSON.stringify(carData));
            if (imageFiles && imageFiles.length > 0) {
                imageFiles.forEach((file, index) => {
                    formData.append('images', file);
                });
            }
            const response = await axios.put(`${API_URL}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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