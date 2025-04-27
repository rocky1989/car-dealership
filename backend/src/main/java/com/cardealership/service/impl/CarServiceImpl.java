package com.cardealership.service.impl;

import com.cardealership.model.Car;
import com.cardealership.model.CarImage;
import com.cardealership.repository.CarRepository;
import com.cardealership.service.CarService;
import com.cardealership.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements CarService {
    private static final Logger logger = LoggerFactory.getLogger(CarServiceImpl.class);

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    @Transactional(readOnly = true)
    public List<Car> getAllCars() {
        logger.debug("Getting all cars from repository");
        return carRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Car> getCarById(Long id) {
        logger.debug("Getting car by ID: {}", id);
        return carRepository.findById(id);
    }

    @Override
    @Transactional
    public Car saveCar(Car car, List<MultipartFile> images) {
        logger.debug("Saving car: {} with {} images", car, images != null ? images.size() : 0);
        
        // Handle images if provided
        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                try {
                    String filename = fileStorageService.storeFile(image);
                    CarImage carImage = new CarImage();
                    carImage.setImageUrl(filename);
                    carImage.setCar(car);
                    car.getImages().add(carImage);
                } catch (IOException e) {
                    logger.error("Error saving image: {}", e.getMessage());
                    throw new RuntimeException("Failed to save image: " + e.getMessage());
                }
            }
        }
        
        return carRepository.save(car);
    }

    @Override
    @Transactional
    public Car updateCar(Car car, List<MultipartFile> newImages) {
        logger.debug("Updating car: {} with {} new images", car, newImages != null ? newImages.size() : 0);
        
        // Handle new images
        if (newImages != null && !newImages.isEmpty()) {
            for (MultipartFile image : newImages) {
                try {
                    String filename = fileStorageService.storeFile(image);
                    CarImage carImage = new CarImage();
                    carImage.setImageUrl(filename);
                    carImage.setCar(car);
                    car.getImages().add(carImage);
                } catch (IOException e) {
                    logger.error("Error saving image: {}", e.getMessage());
                    throw new RuntimeException("Failed to save image: " + e.getMessage());
                }
            }
        }
        
        return carRepository.save(car);
    }

    @Override
    @Transactional
    public void deleteCar(Long id) {
        logger.debug("Deleting car with ID: {}", id);
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));
        
        // Delete all associated images
        for (CarImage image : car.getImages()) {
            try {
                fileStorageService.deleteFile(image.getImageUrl());
            } catch (IOException e) {
                logger.error("Error deleting image file: {}", e.getMessage());
            }
        }
        
        carRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Car> searchCars(String make, String model, Integer minYear, Integer maxYear, Double minPrice, Double maxPrice) {
        logger.debug("Searching cars with params: make={}, model={}, minYear={}, maxYear={}, minPrice={}, maxPrice={}",
                make, model, minYear, maxYear, minPrice, maxPrice);
        return carRepository.findByMakeContainingAndModelContainingAndManufacturedYearBetweenAndPriceBetween(
                make != null ? make : "",
                model != null ? model : "",
                minYear != null ? minYear : 1900,
                maxYear != null ? maxYear : 2100,
                minPrice != null ? minPrice : 0.0,
                maxPrice != null ? maxPrice : Double.MAX_VALUE
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<Car> getCarsByStatus(String status) {
        logger.debug("Getting cars by status: {}", status);
        return carRepository.findByStatus(status);
    }
} 