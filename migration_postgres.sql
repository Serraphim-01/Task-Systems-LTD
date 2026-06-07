-- This script creates the tables for Announcements, Blogs, and Events in PostgreSQL.
-- It is adapted from the Azure SQL migration scripts and is ready to be executed in a PostgreSQL database.

-- Drop existing tables if they exist to avoid conflicts.
-- Drop in reverse order of creation to handle foreign key constraints
DROP TABLE IF EXISTS announcement_section_content CASCADE;
DROP TABLE IF EXISTS announcement_sections CASCADE;
DROP TABLE IF EXISTS announcements CASCADE;

DROP TABLE IF EXISTS blog_section_content CASCADE;
DROP TABLE IF EXISTS blog_sections CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;

DROP TABLE IF EXISTS event_section_content CASCADE;
DROP TABLE IF EXISTS event_sections CASCADE;
DROP TABLE IF EXISTS events CASCADE;

DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS page_descriptions CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS awards CASCADE;
DROP TABLE IF EXISTS certificates CASCADE;

-- Create the announcements table
CREATE TABLE announcements (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT,
    image_path TEXT,
    document_path TEXT,
    links JSONB,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the announcement_sections table
CREATE TABLE announcement_sections (
    id BIGSERIAL PRIMARY KEY,
    announcement_id BIGINT NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
    section_order INTEGER NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the announcement_section_content table
CREATE TABLE announcement_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES announcement_sections(id) ON DELETE CASCADE,
    content_order INTEGER NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the blogs table
CREATE TABLE blogs (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT,
    author TEXT,
    image_path TEXT,
    document_path TEXT,
    links JSONB,
    expires_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the blog_sections table
CREATE TABLE blog_sections (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    section_order INTEGER NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the blog_section_content table
CREATE TABLE blog_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES blog_sections(id) ON DELETE CASCADE,
    content_order INTEGER NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the events table
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT,
    "time" TEXT,
    "date" TIMESTAMP WITH TIME ZONE,
    location TEXT,
    image_path TEXT,
    document_path TEXT,
    links JSONB,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the event_sections table
CREATE TABLE event_sections (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    section_order INTEGER NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the event_section_content table
CREATE TABLE event_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES event_sections(id) ON DELETE CASCADE,
    content_order INTEGER NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the jobs table
CREATE TABLE jobs (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    type TEXT,
    department TEXT,
    apply_link TEXT,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Create the page_descriptions table
CREATE TABLE page_descriptions (
    id BIGSERIAL PRIMARY KEY,
    page_key VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the achievements table
CREATE TABLE achievements (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the awards table
CREATE TABLE awards (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the certificates table
CREATE TABLE certificates (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_announcements_expires_at ON announcements(expires_at);
CREATE INDEX idx_blogs_published_at ON blogs(published_at);
CREATE INDEX idx_events_date ON events("date");
CREATE INDEX idx_jobs_expires_at ON jobs(expires_at);

-- Create the directors table (if needed)
CREATE TABLE IF NOT EXISTS directors (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    bio TEXT,
    image_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the director_sections table (if needed)
CREATE TABLE IF NOT EXISTS director_sections (
    id BIGSERIAL PRIMARY KEY,
    director_id BIGINT NOT NULL REFERENCES directors(id) ON DELETE CASCADE,
    section_order INTEGER NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the director_section_content table (if needed)
CREATE TABLE IF NOT EXISTS director_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES director_sections(id) ON DELETE CASCADE,
    content_order INTEGER NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the management table (if needed)
CREATE TABLE IF NOT EXISTS management (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT,
    bio TEXT,
    image_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the management_sections table (if needed)
CREATE TABLE IF NOT EXISTS management_sections (
    id BIGSERIAL PRIMARY KEY,
    management_id BIGINT NOT NULL REFERENCES management(id) ON DELETE CASCADE,
    section_order INTEGER NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the management_section_content table (if needed)
CREATE TABLE IF NOT EXISTS management_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES management_sections(id) ON DELETE CASCADE,
    content_order INTEGER NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the partners table
CREATE TABLE IF NOT EXISTS partners (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    logo_path TEXT,
    website_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
