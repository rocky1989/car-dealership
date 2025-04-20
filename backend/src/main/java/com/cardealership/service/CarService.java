package com.cardealership.service;

import com.cardealership.model.Car;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;
import java.math.BigDecimal;

public interface CarService {
    @Cacheable(value = "cars", key = "'all'")
    List<Car> getAllCars();

    @Cacheable(value = "cars", key = "#id")
    Car getCarById(Long id);

    @Cacheable(value = "cars", key = "'search_' + #query")
    List<Car> searchCars(String query);

    @CacheEvict(value = "cars", allEntries = true)
    Car createCar(Car car);

    @CacheEvict(value = "cars", allEntries = true)
    Car updateCar(Long id, Car car);

    @CacheEvict(value = "cars", allEntries = true)
    void deleteCar(Long id);

    List<Car> searchCars(String make, String model, Integer year, BigDecimal minPrice, BigDecimal maxPrice);
    List<Car> getCarsByStatus(String status);
} 