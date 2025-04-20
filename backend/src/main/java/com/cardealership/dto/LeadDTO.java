package com.cardealership.dto;

import lombok.Data;

@Data
public class LeadDTO {
    private String make;
    private String model;
    private Integer manufacturedYear;
    private Integer mileage;
    private String description;
    private String color;
    private String transmission;
    private String fuelType;
    private String condition;
    private String vin;
    private String ownerName;
    private String ownerEmail;
    private String ownerPhone;
    private String preferredContactTime;
    private Double askingPrice;
} 