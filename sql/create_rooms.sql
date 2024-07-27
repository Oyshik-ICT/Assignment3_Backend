CREATE TABLE IF NOT EXISTS Rooms (
    room_slug VARCHAR(255) PRIMARY KEY,
    hotel_slug VARCHAR(255) REFERENCES Hotels(slug),
    room_image TEXT [],
    room_title VARCHAR(255) NOT NULL,
    bedroom_count INTEGER NOT NULL
);