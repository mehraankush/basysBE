# Medical Records Management System - Backend

This backend is part of the **Medical Records Management System** designed to manage patient records, medical history, treatments, and prior authorization requests. It provides a RESTful API to handle CRUD operations for patients and authorization requests, and it connects to a **MongoDB** database for data storage.

## Features

- Store and manage patient details and treatments.
- Track prior authorization requests with statuses: pending, approved, or denied.
- RESTful API for handling patient and authorization operations.
- Paginated patient listing for efficient retrieval of large datasets.


## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing patient records.
- **Mongoose**: MongoDB ORM for schema modeling and database interactions.
- **Postman**: API testing and debugging.

## Project Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 16+)
- **MongoDB** (local or cloud-based)

### Steps

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/mehraankush/basysBE.git
   cd basysBE
   
Install the dependencies:
   ```bash
          npm install
          npm run dev
   ```

##.env
```bash
    MONGODB_URI=mongodb://localhost:27017/medical-db
```

# API Endpoints

## Patient Endpoints

### Get All Patients (Paginated):

- **URL**: `/api/patients`
- **Method**: `GET`
- **Query Params**: `page`, `limit`, `status`
- **Description**: Retrieves a paginated list of patients, filtered by status (pending, approved, denied) if provided.

### Get Patients Count by Status:

- **URL**: `/api/patients/status`
- **Method**: `GET`
- **Description**: Retrieves the count of patients based on authorization request status (Pending, Approved, Denied).

### Create New Patient:

- **URL**: `/api/patients`
- **Method**: `POST`
- **Description**: Adds a new patient record to the database.


### Delete Patient:

- **URL**: `/api/patients/:id`
- **Method**: `DELETE`
- **Description**: Deletes a patient record from the database.

## Authorization Request Endpoints

### Submit Prior Authorization:

- **URL**: `/api/authorization`
- **Method**: `POST`
- **Description**: Submits a new authorization request for a patient treatment.

### Get All Authorization Requests:

- **URL**: `/api/authorization`
- **Method**: `GET`
- **Description**: Retrieves a list of all prior authorization requests.

