package com.cardealership.service;

import com.cardealership.model.Car;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface CarService {
    @Cacheable(value = "cars", key = "'all'")
    List<Car> getAllCars();

    @Cacheable(value = "cars", key = "#id")
    Optional<Car> getCarById(Long id);

    @CacheEvict(value = "cars", allEntries = true)
    Car saveCar(Car car, List<MultipartFile> images);

    @CacheEvict(value = "cars", allEntries = true)
    void deleteCar(Long id);

    @Cacheable(value = "cars", key = "'search_' + #make + '_' + #model + '_' + #minYear + '_' + #maxYear + '_' + #minPrice + '_' + #maxPrice")
    List<Car> searchCars(String make, String model, Integer minYear, Integer maxYear, Double minPrice, Double maxPrice);

    @Cacheable(value = "cars", key = "'status_' + #status")
    List<Car> getCarsByStatus(String status);

    @CacheEvict(value = "cars", key = "#car.id")
    Car updateCar(Car car, List<MultipartFile> newImages);

    @CacheEvict(value = "cars", key = "#id")
    Car updateCarImages(Long id, List<MultipartFile> images);
} 