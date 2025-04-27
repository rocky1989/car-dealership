package com.cardealership.repository;

import com.cardealership.model.CarImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarImageRepository extends JpaRepository<CarImage, Long> {
    List<CarImage> findByCarIdOrderByDisplayOrderAsc(Long carId);
    void deleteByCarId(Long carId);
} 