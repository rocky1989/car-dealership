package com.cardealership.controller;

import com.cardealership.dto.LeadDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public ResponseEntity<?> createLead(@RequestBody LeadDTO lead) {
        try {
            sendEmailNotification(lead);
            return ResponseEntity.ok("Your car details have been submitted successfully. We will contact you soon!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error submitting car details: " + e.getMessage());
        }
    }

    private void sendEmailNotification(LeadDTO lead) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("dealer@saimotors.com"); // Replace with actual dealer email
        message.setSubject("New Car Selling Inquiry - " + lead.getMake() + " " + lead.getModel());
        
        String emailContent = String.format(
            "New Car Selling Inquiry Received:\n\n" +
            "Car Details:\n" +
            "Make: %s\n" +
            "Model: %s\n" +
            "Year: %d\n" +
            "Mileage: %d\n" +
            "Color: %s\n" +
            "Condition: %s\n" +
            "Asking Price: ₹%.2f\n\n" +
            "Owner Details:\n" +
            "Name: %s\n" +
            "Email: %s\n" +
            "Phone: %s\n" +
            "Preferred Contact Time: %s\n\n" +
            "Please contact the owner as soon as possible.",
            lead.getMake(),
            lead.getModel(),
            lead.getManufacturedYear(),
            lead.getMileage(),
            lead.getColor(),
            lead.getCondition(),
            lead.getAskingPrice(),
            lead.getOwnerName(),
            lead.getOwnerEmail(),
            lead.getOwnerPhone(),
            lead.getPreferredContactTime()
        );
        
        message.setText(emailContent);
        mailSender.send(message);
    }
} 