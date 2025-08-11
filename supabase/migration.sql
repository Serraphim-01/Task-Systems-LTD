-- Instructions for Supabase setup:
-- 1. Go to the "Storage" section in your Supabase project.
-- 2. Create a new bucket named 'images'. Make it public.
-- 3. Create another new bucket named 'documents'. Make it public.
-- 4. Run the SQL below in the Supabase SQL Editor.

-- Drop existing tables if they exist, to start fresh
DROP TABLE IF EXISTS announcements, blogs, events, jobs, partners CASCADE;

-- Create the announcements table with new fields
CREATE TABLE announcements (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT,
    full_text TEXT NOT NULL,
    image_path TEXT, -- Stores the path to the uploaded image in Supabase Storage
    document_path TEXT, -- Stores the path to the uploaded document
    links JSONB, -- Stores an array of objects, e.g., [{"text": "Click here", "url": "https://example.com"}]
    expires_at TIMESTAMPTZ, -- The post will be hidden after this date
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the blogs table with new fields
CREATE TABLE blogs (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT,
    full_text TEXT NOT NULL,
    author TEXT,
    image_path TEXT,
    document_path TEXT,
    links JSONB,
    expires_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the events table with new fields
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT,
    full_text TEXT,
    "time" TEXT,
    "date" TIMESTAMPTZ,
    location TEXT,
    image_path TEXT,
    document_path TEXT,
    links JSONB,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the jobs table (schema remains unchanged for now)
CREATE TABLE jobs (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    type TEXT,
    department TEXT
);

-- Create the partners table with logo_path for uploaded images
CREATE TABLE partners (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    logo_path TEXT, -- Stores the path to the uploaded logo in Supabase Storage
    status TEXT,
    link TEXT,
    services TEXT[]
);
