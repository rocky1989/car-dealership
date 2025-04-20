import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cars';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const CacheService = {
    // Get cache from localStorage
    getCache: (key) => {
        const cachedData = localStorage.getItem(key);
        if (!cachedData) return null;
        
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    },

    // Set cache in localStorage
    setCache: (key, data) => {
        const cacheData = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
    },

    // Clear specific cache
    clearCache: (key) => {
        localStorage.removeItem(key);
    },

    // Clear all caches
    clearAll: () => {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('car_cache_')) {
                localStorage.removeItem(key);
            }
        });
    }
};

const CarService = {
    getAllCars: async () => {
        const cachedData = CacheService.getCache('car_cache_all');
        if (cachedData) {
            return cachedData;
        }
        try {
            const response = await axios.get(API_URL);
            CacheService.setCache('car_cache_all', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching cars:', error);
            throw error;
        }
    },

    getCarById: async (id) => {
        const cachedData = CacheService.getCache(`car_cache_${id}`);
        if (cachedData) {
            return cachedData;
        }
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            CacheService.setCache(`car_cache_${id}`, response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching car details:', error);
            throw error;
        }
    },

    searchCars: async (query) => {
        const cacheKey = `car_cache_search_${query.toLowerCase()}`;
        const cachedData = CacheService.getCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        try {
            const response = await axios.get(`${API_URL}/search?query=${query}`);
            CacheService.setCache(cacheKey, response.data);
            return response.data;
        } catch (error) {
            console.error('Error searching cars:', error);
            throw error;
        }
    },

    createCar: async (carData) => {
        try {
            const response = await axios.post(API_URL, carData);
            CacheService.clearAll();
            return response.data;
        } catch (error) {
            console.error('Error creating car:', error);
            throw error;
        }
    },

    updateCar: async (id, carData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, carData);
            CacheService.clearCache('car_cache_all');
            CacheService.clearCache(`car_cache_${id}`);
            // Clear all search caches
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('car_cache_search_')) {
                    CacheService.clearCache(key);
                }
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
            CacheService.clearCache('car_cache_all');
            CacheService.clearCache(`car_cache_${id}`);
            // Clear all search caches
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('car_cache_search_')) {
                    CacheService.clearCache(key);
                }
            });
        } catch (error) {
            console.error('Error deleting car:', error);
            throw error;
        }
    },

    // Clear all caches
    clearCache: () => {
        CacheService.clearAll();
    }
};

export default CarService; 