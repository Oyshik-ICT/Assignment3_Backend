## Express Backend 

This project is an Express.js backend application for a hotel management system. It provides APIs for hotel and room management, including features like image upload, database integration, and CORS support.

### Features

- Hotel creation and retrieval
- Room creation and retrieval
- Image upload functionality
- PostgreSQL database integration
- CORS support for frontend integration

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (comes with Node.js)
- PostgreSQL database

### Setup Instructions

1. Clone the repository:
   ```sh
   git clone [repository-url]
   cd [repository-name]
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up your PostgreSQL database and update the connection details in `db.js`.

4. Create the necessary tables in your database. Use the provided SQL commands:
   ```sql
   CREATE TABLE IF NOT EXISTS Hotels (
       slug VARCHAR(255) PRIMARY KEY,
       images TEXT [],
       title VARCHAR(255) NOT NULL,
       description TEXT,
       guest_count INTEGER NOT NULL,
       bedroom_count INTEGER NOT NULL,
       bathroom_count INTEGER NOT NULL,
       amenities TEXT [],
       host_information JSONB,
       address VARCHAR(255) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL
   );

   CREATE TABLE IF NOT EXISTS Rooms (
       room_slug VARCHAR(255) PRIMARY KEY,
       hotel_slug VARCHAR(255) REFERENCES Hotels(slug),
       room_image TEXT [],
       room_title VARCHAR(255) NOT NULL,
       bedroom_count INTEGER NOT NULL
   );
   ```

5. Create an `uploads` directory in the project root:
   ```sh
   mkdir -p uploads/hotel1
   ```

### Running the Application

To start the server, run:

```sh
node server.js
```

The server will start on `http://localhost:3000`.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/hotels` | Create a new hotel |
| GET    | `/hotels/:slug` | Get details of a specific hotel |
| POST   | `/Limpa-Peru/unique-room` | Create a new room |
| GET    | `/hotels/:slug/rooms` | Get all rooms for a specific hotel |

### Configuration

- The server runs on port 3000 by default. You can change this in the `server.js` file.
- CORS is configured to allow requests from `http://localhost:5173`. Update this in `server.js` if your frontend runs on a different port.

### File Upload

- Images are stored in the `uploads/hotel1` directory.
- The application uses Multer for handling file uploads.

### Database

- The application uses a PostgreSQL database.
- Ensure your database connection details are correctly set up in `db.js`.

### Error Handling

- The application includes basic error handling. Check the console for any error logs.
