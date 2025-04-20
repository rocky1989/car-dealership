package com.cardealership.service.impl;

import com.cardealership.model.Car;
import com.cardealership.repository.CarRepository;
import com.cardealership.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.math.BigDecimal;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository carRepository;

    @Override
    @Cacheable(value = "cars", key = "'all'")
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @Override
    @Cacheable(value = "cars", key = "#id")
    public Car getCarById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));
    }

    @Override
    @Cacheable(value = "cars", key = "'search_' + #query")
    public List<Car> searchCars(String query) {
        return carRepository.findByMakeContainingIgnoreCaseOrModelContainingIgnoreCaseOrVinContainingIgnoreCase(
            query, query, query
        );
    }

    @Override
    @CacheEvict(value = "cars", allEntries = true)
    public Car createCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    @CacheEvict(value = "cars", allEntries = true)
    public Car updateCar(Long id, Car car) {
        Car existingCar = getCarById(id);
        existingCar.setMake(car.getMake());
        existingCar.setModel(car.getModel());
        existingCar.setManufacturedYear(car.getManufacturedYear());
        existingCar.setPrice(car.getPrice());
        existingCar.setMileage(car.getMileage());
        existingCar.setColor(car.getColor());
        existingCar.setTransmission(car.getTransmission());
        existingCar.setFuelType(car.getFuelType());
        existingCar.setCarCondition(car.getCarCondition());
        existingCar.setVin(car.getVin());
        existingCar.setStatus(car.getStatus());
        existingCar.setImageUrl(car.getImageUrl());
        return carRepository.save(existingCar);
    }

    @Override
    @CacheEvict(value = "cars", allEntries = true)
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    @Cacheable(value = "cars", key = "'search_' + #make + '_' + #model + '_' + #year + '_' + #minPrice + '_' + #maxPrice")
    public List<Car> searchCars(String make, String model, Integer year, BigDecimal minPrice, BigDecimal maxPrice) {
        return carRepository.findByMakeContainingIgnoreCaseAndModelContainingIgnoreCaseAndManufacturedYearAndPriceBetween(
            make, model, year, minPrice, maxPrice
        );
    }

    @Override
    @Cacheable(value = "cars", key = "'status_' + #status")
    public List<Car> getCarsByStatus(String status) {
        return carRepository.findByStatus(status);
    }
} 