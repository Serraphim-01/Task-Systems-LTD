-- This script creates the tables for Announcements, Blogs, and Events in Azure SQL.
-- It is adapted from the Supabase migration scripts and is ready to be executed in an Azure SQL database.

-- Drop existing tables if they exist to avoid conflicts.
-- The CASCADE option is not available in Azure SQL in the same way, so we drop them in order.
-- Note: You might want to run these DROP statements selectively if you need to preserve data in some tables.
DROP TABLE IF EXISTS announcement_section_content;
DROP TABLE IF EXISTS announcement_sections;
DROP TABLE IF EXISTS announcements;

DROP TABLE IF EXISTS blog_section_content;
DROP TABLE IF EXISTS blog_sections;
DROP TABLE IF EXISTS blogs;

DROP TABLE IF EXISTS event_section_content;
DROP TABLE IF EXISTS event_sections;
DROP TABLE IF EXISTS events;

DROP TABLE IF EXISTS jobs;


-- Create the announcements table
CREATE TABLE announcements (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(MAX) NOT NULL,
    short_description NVARCHAR(MAX),
    image_path NVARCHAR(MAX),
    document_path NVARCHAR(MAX),
    links NVARCHAR(MAX), -- Storing JSON as string
    expires_at DATETIMEOFFSET,
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    CONSTRAINT CHK_announcements_links_IsJson CHECK (ISJSON(links) > 0)
);

-- Create the announcement_sections table
CREATE TABLE announcement_sections (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    announcement_id BIGINT NOT NULL FOREIGN KEY REFERENCES announcements(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout NVARCHAR(MAX) NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

-- Create the announcement_section_content table
CREATE TABLE announcement_section_content (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    section_id BIGINT NOT NULL FOREIGN KEY REFERENCES announcement_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type NVARCHAR(MAX) NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    CONSTRAINT CHK_announcement_section_content_content_IsJson CHECK (ISJSON(content) > 0)
);


-- Create the blogs table
CREATE TABLE blogs (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(MAX) NOT NULL,
    short_description NVARCHAR(MAX),
    author NVARCHAR(MAX),
    image_path NVARCHAR(MAX),
    document_path NVARCHAR(MAX),
    links NVARCHAR(MAX),
    expires_at DATETIMEOFFSET,
    published_at DATETIMEOFFSET DEFAULT SYSDATETIMEOFFSET(),
    CONSTRAINT CHK_blogs_links_IsJson CHECK (ISJSON(links) > 0)
);

-- Create the blog_sections table
CREATE TABLE blog_sections (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    blog_id BIGINT NOT NULL FOREIGN KEY REFERENCES blogs(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout NVARCHAR(MAX) NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

-- Create the blog_section_content table
CREATE TABLE blog_section_content (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    section_id BIGINT NOT NULL FOREIGN KEY REFERENCES blog_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type NVARCHAR(MAX) NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    CONSTRAINT CHK_blog_section_content_content_IsJson CHECK (ISJSON(content) > 0)
);


-- Create the events table
CREATE TABLE events (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(MAX) NOT NULL,
    short_description NVARCHAR(MAX),
    "time" NVARCHAR(MAX),
    "date" DATETIMEOFFSET,
    location NVARCHAR(MAX),
    image_path NVARCHAR(MAX),
    document_path NVARCHAR(MAX),
    links NVARCHAR(MAX),
    expires_at DATETIMEOFFSET,
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    CONSTRAINT CHK_events_links_IsJson CHECK (ISJSON(links) > 0)
);

-- Create the event_sections table
CREATE TABLE event_sections (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    event_id BIGINT NOT NULL FOREIGN KEY REFERENCES events(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout NVARCHAR(MAX) NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

-- Create the event_section_content table
CREATE TABLE event_section_content (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    section_id BIGINT NOT NULL FOREIGN KEY REFERENCES event_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type NVARCHAR(MAX) NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET(),
    CONSTRAINT CHK_event_section_content_content_IsJson CHECK (ISJSON(content) > 0)
);


-- Create the jobs table
CREATE TABLE jobs (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(MAX) NOT NULL,
    description NVARCHAR(MAX),
    location NVARCHAR(MAX),
    type NVARCHAR(MAX),
    department NVARCHAR(MAX),
    apply_link NVARCHAR(MAX),
    expires_at DATETIMEOFFSET
);
