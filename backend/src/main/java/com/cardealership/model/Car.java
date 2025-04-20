package com.cardealership.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

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

    @Column(nullable = false)
    private Integer manufacturedYear;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer mileage;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private String transmission;

    @Column(nullable = false)
    private String fuelType;

    @Column(nullable = false)
    private String carCondition;

    @Column(nullable = false)
    private String status; // Available, Sold, Reserved

    @Column(nullable = false)
    private String vin;

    @Column
    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
} 