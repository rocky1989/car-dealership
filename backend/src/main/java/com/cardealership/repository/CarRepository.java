package com.cardealership.repository;

import com.cardealership.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByMakeContainingIgnoreCase(String make);
    List<Car> findByModelContainingIgnoreCase(String model);
    List<Car> findByManufacturedYear(Integer manufacturedYear);
    List<Car> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    List<Car> findByStatus(String status);
    List<Car> findByMakeContainingIgnoreCaseOrModelContainingIgnoreCaseOrVinContainingIgnoreCase(
        String make, String model, String vin
    );

    List<Car> findByMakeContainingIgnoreCaseAndModelContainingIgnoreCaseAndManufacturedYearAndPriceBetween(
        String make, String model, Integer year, BigDecimal minPrice, BigDecimal maxPrice
    );
} 