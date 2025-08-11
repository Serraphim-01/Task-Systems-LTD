-- Create the announcements table
CREATE TABLE announcements (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the blogs table
CREATE TABLE blogs (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    image_url TEXT
);

-- Create the events table
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    date TIMESTAMPTZ,
    location TEXT,
    image_url TEXT
);

-- Create the jobs table
CREATE TABLE jobs (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    type TEXT,
    department TEXT
);

-- Create the partners table
CREATE TABLE partners (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    status TEXT,
    link TEXT,
    services TEXT[]
);
