# Phonebook Backend

A REST API built using Node.js and Express as part of the University of Helsinki Full Stack Open course.

## Exercises

| Exercise | Description |
|---|---|
| 3.1 | Implement an endpoint to retrieve all phonebook entries |
| 3.2 | Create an information endpoint displaying the current time and total number of entries |
| 3.3 | Retrieve an individual phonebook entry using its ID |
| 3.4 | Delete a phonebook entry using an HTTP DELETE request |
| 3.5 | Add new phonebook entries using HTTP POST requests and randomly generated IDs |
| 3.6 | Implement input validation, duplicate-name prevention, and error handling |

## Tech Stack

- Node.js
- Express.js
- JavaScript
- REST API
- Nodemon

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The server runs at:

`http://localhost:3001`

### 3. Start the server normally

```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/persons` | Retrieve all phonebook entries |
| GET | `/api/persons/:id` | Retrieve a single phonebook entry |
| POST | `/api/persons` | Add a new phonebook entry |
| DELETE | `/api/persons/:id` | Delete a phonebook entry |
| GET | `/info` | Display phonebook statistics and server time |

## Testing

API endpoints are tested using the Visual Studio Code REST Client extension with `requests.rest`.

## Note

Phonebook entries are currently stored in an in-memory array. Data resets to the initial hardcoded entries whenever the server restarts.