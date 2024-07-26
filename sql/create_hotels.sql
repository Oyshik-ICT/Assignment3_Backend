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