const pool = require('../db');
const fs = require('fs');
const path = require('path');

const createTables = async () => {
  const hotelsSql = fs.readFileSync(path.join(__dirname, '../sql/create_hotels.sql'), 'utf8');
  const roomsSql = fs.readFileSync(path.join(__dirname, '../sql/create_rooms.sql'), 'utf8');

  try {
    await pool.query(hotelsSql);
    await pool.query(roomsSql);
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    pool.end();
  }
};

createTables();
