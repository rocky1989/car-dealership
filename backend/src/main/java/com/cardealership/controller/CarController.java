package com.cardealership.controller;

import com.cardealership.model.Car;
import com.cardealership.model.CarImage;
import com.cardealership.service.CarService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.math.BigDecimal;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {
    private static final Logger logger = LoggerFactory.getLogger(CarController.class);

    @Autowired
    private CarService carService;

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        logger.debug("GET /api/cars - Getting all cars");
        return ResponseEntity.ok(carService.getAllCars());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        logger.debug("GET /api/cars/{} - Getting car by ID", id);
        Optional<Car> car = carService.getCarById(id);
        return car.map(ResponseEntity::ok)
                .orElseGet(() -> {
                    logger.debug("Car with ID {} not found", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping
    public ResponseEntity<Car> addCar(
            @RequestPart("car") Car car,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        logger.debug("POST /api/cars - Adding new car: {}", car);
        Car savedCar = carService.saveCar(car, images);
        logger.debug("Car added successfully with ID: {}", savedCar.getId());
        return ResponseEntity.ok(savedCar);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(
            @PathVariable Long id,
            @RequestPart("car") Car car,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        logger.debug("PUT /api/cars/{} - Updating car: {}", id, car);
        Optional<Car> existingCar = carService.getCarById(id);
        if (existingCar.isPresent()) {
            car.setId(id);
            Car updatedCar = carService.updateCar(car, images);
            logger.debug("Car with ID {} updated successfully", id);
            return ResponseEntity.ok(updatedCar);
        }
        logger.debug("Car with ID {} not found for update", id);
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        logger.debug("DELETE /api/cars/{} - Deleting car", id);
        Optional<Car> car = carService.getCarById(id);
        if (car.isPresent()) {
            carService.deleteCar(id);
            logger.debug("Car with ID {} deleted successfully", id);
            return ResponseEntity.ok().build();
        }
        logger.debug("Car with ID {} not found for deletion", id);
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Car>> searchCars(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer minYear,
            @RequestParam(required = false) Integer maxYear,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        logger.debug("GET /api/cars/search - Searching cars with params: make={}, model={}, minYear={}, maxYear={}, minPrice={}, maxPrice={}",
                make, model, minYear, maxYear, minPrice, maxPrice);
        return ResponseEntity.ok(carService.searchCars(make, model, minYear, maxYear, minPrice, maxPrice));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Car>> getCarsByStatus(@PathVariable String status) {
        logger.debug("GET /api/cars/status/{} - Getting cars by status", status);
        return ResponseEntity.ok(carService.getCarsByStatus(status));
    }
} 