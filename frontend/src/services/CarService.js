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

    addCar: async (carData) => {
        try {
            // Process the image array
            if (carData.images && carData.images.length > 0) {
                carData.images = await Promise.all(
                    carData.images.map(async (image) => {
                        if (image instanceof File) {
                            return { image_data: await convertFileToBase64(image) };
                        }
                        return image;
                    })
                );
            }

            const response = await axios.post(API_URL, carData);
            return response.data;
        } catch (error) {
            console.error('Error adding car:', error);
            throw error;
        }
    },

    updateCar: async (id, carData) => {
        try {
            const formData = new FormData();
            
            // Add car data as JSON
            const carJson = {
                ...carData,
                images: carData.images ? carData.images.filter(img => !(img instanceof File)) : []
            };
            formData.append('car', new Blob([JSON.stringify(carJson)], { type: 'application/json' }));
            
            // Add images if they exist
            if (carData.images && carData.images.length > 0) {
                carData.images.forEach((image) => {
                    if (image instanceof File) {
                        formData.append('images', image);
                    }
                });
            }

            const response = await axios.put(`${API_URL}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating car:', error);
            throw error;
        }
    },

    processImage: async (file) => {
        try {
            return { image_data: await convertFileToBase64(file) };
        } catch (error) {
            console.error('Error processing image:', error);
            throw error;
        }
    },

    updateCarImages: async (id, images) => {
        try {
            const formData = new FormData();
            
            // Add each file to FormData
            images.forEach((image) => {
                if (image instanceof File) {
                    formData.append('images', image);
                }
            });

            // Send the request with FormData
            const response = await axios.put(`${API_URL}/${id}/images`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating car images:', error);
            throw error;
        }
    },

    deleteCarImage: async (id, imageIndex) => {
        try {
            // Get current car data
            const car = await CarService.getCarById(id);
            
            // Remove the image at the specified index
            car.images.splice(imageIndex, 1);

            // Update the car with the modified image array
            const response = await axios.put(`${API_URL}/${id}`, car);
            return response.data;
        } catch (error) {
            console.error('Error deleting car image:', error);
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

// Helper function to convert file to base64
const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

// Helper function to get image URL from blob
const getImageUrl = (image) => {
    if (image.image_data) {
        return image.image_data;
    }
    return null;
};

export { getImageUrl };
export default CarService; 