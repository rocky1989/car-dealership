-- Drop existing data
DELETE FROM user_roles;
DELETE FROM roles;
DELETE FROM users;

-- Insert roles
INSERT INTO roles (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO roles (id, name) VALUES (2, 'ROLE_ADMIN');

-- Insert admin user (password is 'admin123' encoded with BCrypt)
INSERT INTO users (id, username, email, password, full_name, created_at, updated_at)
VALUES (1, 'admin', 'admin@cardealership.com', 
        '$2a$10$dXJ3SW6G7P50lGmMkkmwe.vEU.30dEIgtzl7zhNJlfuThvxXURBZS',
        'System Administrator', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Assign admin role to admin user
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2);

-- Insert sample cars
INSERT INTO cars (make, model, manufactured_year, price, mileage, description, color, transmission, fuel_type, car_condition, status, vin, image_url, created_by, created_at, updated_at)
VALUES 
('Toyota', 'Camry', 2020, 25000.00, 15000, 'Well-maintained sedan with excellent fuel efficiency', 'Silver', 'Automatic', 'Gasoline', 'Excellent', 'AVAILABLE', 'ABC123XYZ456789DE', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO cars (make, model, manufactured_year, price, mileage, description, color, transmission, fuel_type, car_condition, status, vin, image_url, created_by, created_at, updated_at)
VALUES 
('Honda', 'CR-V', 2021, 32000.00, 8000, 'Spacious SUV with advanced safety features', 'Blue', 'Automatic', 'Gasoline', 'Like New', 'AVAILABLE', 'DEF456UVW789012GH', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO cars (make, model, manufactured_year, price, mileage, description, color, transmission, fuel_type, car_condition, status, vin, image_url, created_by, created_at, updated_at)
VALUES 
('Ford', 'Mustang', 2019, 45000.00, 20000, 'Powerful sports car with premium features', 'Red', 'Manual', 'Gasoline', 'Good', 'AVAILABLE', 'GHI789RST123456JK', 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 