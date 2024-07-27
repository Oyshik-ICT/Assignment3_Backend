const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 
const multer = require('multer');
const path = require('path');
const pool = require('./db');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Assuming your React app runs on this port
  credentials: true
}));
const port = 3000;

// Check database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected:', res.rows);
  }
});

// Middleware
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/hotel1');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to handle hotel creation with image upload
app.post('/hotels', upload.array('images', 5), async (req, res) => {
  try {
    const {
      slug,
      title,
      description,
      guest_count,
      bedroom_count,
      bathroom_count,
      amenities,
      host_information,
      address,
      latitude,
      longitude
    } = req.body;

    // Process uploaded images
    const imagePaths = req.files.map(file => file.path);

    // Insert data into the database
    const query = `
      INSERT INTO Hotels (
        slug, images, title, description, guest_count, bedroom_count,
        bathroom_count, amenities, host_information, address, latitude, longitude
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
      slug,
      imagePaths,
      title,
      description,
      parseInt(guest_count),
      parseInt(bedroom_count),
      parseInt(bathroom_count),
      amenities.split(','), // Assuming amenities are sent as comma-separated string
      JSON.parse(host_information), // Assuming host_information is sent as a JSON string
      address,
      parseFloat(latitude),
      parseFloat(longitude)
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Route to handle room creation with image upload
app.post('/Limpa-Peru/unique-room', upload.array('room_images', 5), async (req, res) => {
  try {
    const {
      room_slug,
      hotel_slug,
      room_title,
      bedroom_count
    } = req.body;

    // Process uploaded images for the room
    const roomImagePaths = req.files.map(file => file.path);

    // Insert room data into the database
    const query = `
      INSERT INTO Rooms (
        room_slug, hotel_slug, room_image, room_title, bedroom_count
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      room_slug,
      hotel_slug,
      roomImagePaths,
      room_title,
      parseInt(bedroom_count)
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/hotels/:slug/rooms', async (req, res) => {
  const { slug } = req.params;

  try {
    const query = `
      SELECT room_slug, room_image, room_title, bedroom_count
      FROM Rooms
      WHERE hotel_slug = $1
    `;
    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Rooms not found for this hotel' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving rooms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.get('/hotels/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const query = `
      SELECT 
        title, images,guest_count, bedroom_count, bathroom_count,
        host_information, description, amenities, address
      FROM Hotels 
      WHERE slug = $1
    `;
    const result = await pool.query(query, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json(result.rows[0]); // Send back the hotel details
  } catch (error) {
    console.error('Error retrieving hotel details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




