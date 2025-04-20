# Car Dealership Management System

A full-stack web application for managing a car dealership's inventory, built with React.js and Spring Boot.

## Features

- Browse and search car inventory
- Add new cars to inventory
- Edit existing car details
- View detailed car information
- Responsive and modern UI
- SEO-friendly structure

## Tech Stack

### Frontend
- React.js with TypeScript
- Material-UI for components
- React Router for navigation
- Axios for API calls

### Backend
- Spring Boot
- Spring Data JPA
- H2 Database
- RESTful API

## Prerequisites

- Node.js (v14 or higher)
- Java JDK 17 or higher
- Maven

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend server will start on http://localhost:8080

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will start on http://localhost:3000

## API Endpoints

- `GET /api/cars` - Get all cars
- `GET /api/cars/{id}` - Get car by ID
- `POST /api/cars` - Create new car
- `PUT /api/cars/{id}` - Update car
- `DELETE /api/cars/{id}` - Delete car
- `GET /api/cars/search` - Search cars with filters

## SEO Considerations

The application includes several SEO-friendly features:

1. Semantic HTML structure
2. Proper meta tags
3. Descriptive URLs
4. Responsive design
5. Fast loading times
6. Structured data for car listings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 