package com.cardealership.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String make;

    @Column(nullable = false)
    private String model;

    @Column(name = "manufactured_year", nullable = false)
    private Integer manufacturedYear;

    @Column(nullable = false)
    private BigDecimal price;

    @Column
    private Integer mileage;

    @Column
    private String color;

    @Column
    private String transmission;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "car_condition")
    private String carCondition;

    @Column
    private String status;

    @Column(unique = true)
    private String vin;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonManagedReference
    private List<CarImage> images = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void addImage(CarImage image) {
        images.add(image);
        image.setCar(this);
    }

    public void removeImage(CarImage image) {
        images.remove(image);
        image.setCar(null);
    }
} 