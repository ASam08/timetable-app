CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS timetable_sets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    owner_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS timetable_blocks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    timetable_set_id UUID NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    day_of_week VARCHAR(10) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_timetable_sets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,    
    user_id UUID NOT NULL,
    timetable_set_id UUID NOT NULL
);
