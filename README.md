# Sensor WebSocket Application

## Description

This application is a WebSocket server that receives temperature and humidity data from sensors, stores the data in MongoDB, and provides endpoints to retrieve the stored data.

## Setup

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd sensor-websocket-app

   ```

2. Start the application using Docker Compose:
   docker-compose up --build
3. The application will be available at http://localhost:3000.
