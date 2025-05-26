# Jokes Backend API Documentation

## Overview
This is a Hapi.js-based backend API for a jokes application that provides random jokes, allows adding new jokes, and generates joke inspiration using AI.

## Base URL
```
http://localhost:3001
```

## Authentication
No authentication required for any endpoints.

## CORS
The API supports CORS with:
- Origin: `*` (all origins allowed)
- Headers: `Content-Type`, `Authorization`

---

## Endpoints

### 1. Health Check
**GET** `/`

Returns a simple hello world message to verify the server is running.

#### Response
```json
{
  "message": "Hello, world!"
}
```

#### Postman Setup
- Method: `GET`
- URL: `http://localhost:3001/`
- Headers: None required

---

### 2. Get Lucky Number
**GET** `/lucky-number`

Generates a random number between 1 and 100.

#### Response
```json
{
  "luckyNumber": 42
}
```

#### Postman Setup
- Method: `GET`
- URL: `http://localhost:3001/lucky-number`
- Headers: None required

---

### 3. Get Random Joke
**GET** `/jokes`

Returns a random joke from the jokes database.

#### Response
```json
{
  "question": "Kenapa cicak bisa nempel di dinding?",
  "answer": "Karena pakai lem cicak!"
}
```

#### Error Response (No jokes available)
```json
{
  "question": "No jokes available!",
  "answer": ""
}
```

#### Postman Setup
- Method: `GET`
- URL: `http://localhost:3001/jokes`
- Headers: None required

---

### 4. Add New Joke
**POST** `/jokes`

Adds a new joke to the jokes database.

#### Request Body
```json
{
  "question": "Kenapa programmer suka ngopi?",
  "answer": "Biar bisa Java script!"
}
```

#### Success Response
```json
{
  "success": true,
  "message": "Joke added successfully!"
}
```

#### Error Response (Missing fields)
Status Code: `400`
```json
{
  "success": false,
  "message": "Both question and answer are required"
}
```

#### Postman Setup
- Method: `POST`
- URL: `http://localhost:3001/jokes`
- Headers: 
  - `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "question": "Your joke question here",
  "answer": "Your joke answer here"
}
```

---

### 5. Get Joke Inspiration
**GET** `/jokes/inspiration`

Uses AI (Groq API) to generate 3 new Indonesian dad jokes.

#### Success Response
```json
{
  "success": true,
  "jokes": [
    {
      "question": "Kenapa ayam tidak bisa main sepak bola?",
      "answer": "Karena kalau tendang bola, kakinya patah!"
    },
    {
      "question": "Apa bedanya kopi dengan programmer?",
      "answer": "Kalau kopi bisa jadi dingin, kalau programmer jadi pusing!"
    },
    {
      "question": "Kenapa cicak takut sama gecko?",
      "answer": "Karena gecko sudah branded!"
    }
  ]
}
```

#### Error Response
Status Code: `500`
```json
{
  "success": false,
  "message": "Failed to get joke inspiration"
}
```

#### Error Response (AI Service Issue)
```json
{
  "success": false,
  "message": "No response from AI"
}
```

#### Postman Setup
- Method: `GET`
- URL: `http://localhost:3001/jokes/inspiration`
- Headers: None required

#### Notes
- This endpoint requires a valid `GROQ_API_KEY` environment variable
- The AI generates Indonesian "dad jokes" (jokes bapak-bapak)
- Response time may vary depending on AI service

---

## Setup Instructions

### Prerequisites
1. Node.js installed
2. NPM or Yarn package manager

### Installation
1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
```bash
npm install
```

### Environment Variables
Create a `.env` file in the backend directory:
```
GROQ_API_KEY=your_groq_api_key_here
```

### Running the Server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
node index.js
```

The server will start on `http://localhost:3001`

---

## Postman Collection Import

To import all these endpoints into Postman at once, you can create a collection with the following structure:

### Collection: Jokes Backend API

**Variables:**
- `baseUrl`: `http://localhost:3001`

**Requests:**

1. **Health Check**
   - GET: `{{baseUrl}}/`

2. **Get Lucky Number**
   - GET: `{{baseUrl}}/lucky-number`

3. **Get Random Joke**
   - GET: `{{baseUrl}}/jokes`

4. **Add New Joke**
   - POST: `{{baseUrl}}/jokes`
   - Body: Raw JSON
   ```json
   {
     "question": "Sample question?",
     "answer": "Sample answer!"
   }
   ```

5. **Get Joke Inspiration**
   - GET: `{{baseUrl}}/jokes/inspiration`

---

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing required fields)
- `500` - Internal Server Error (AI service issues, file system errors)

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Data Storage

- Jokes are stored in a text file: `backend/jokes/jokes.txt`
- Format: `Question # Answer` (one joke per line)
- New jokes are appended to this file

---

## Dependencies

- `@hapi/hapi`: Web server framework
- `dotenv`: Environment variable management
- `fs`: File system operations (Node.js built-in)
- `path`: Path utilities (Node.js built-in)
- `https`: HTTPS requests (Node.js built-in)
