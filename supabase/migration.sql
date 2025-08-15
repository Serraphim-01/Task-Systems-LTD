-- Instructions for Supabase setup:
-- 1. Go to the "Storage" section in your Supabase project.
-- 2. Create a new bucket named 'images'. Make it public.
-- 3. Create another new bucket named 'documents'. Make it public.
-- 4. Run the SQL below in the Supabase SQL Editor.

-- Drop existing tables if they exist, to start fresh
DROP TABLE IF EXISTS announcements, blogs, events, jobs, partners, announcement_sections, announcement_section_content, blog_sections, blog_section_content, event_sections, event_section_content CASCADE;

-- Create the announcements table with new fields
CREATE TABLE announcements (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT,
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
-- Create the jobs table with new fields
CREATE TABLE jobs (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT,
    type TEXT,
    department TEXT,
    apply_link TEXT,
    expires_at TIMESTAMPTZ
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

-- Create the announcement_sections table
CREATE TABLE announcement_sections (
    id BIGSERIAL PRIMARY KEY,
    announcement_id BIGINT NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the announcement_section_content table
CREATE TABLE announcement_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES announcement_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the blog_sections table
CREATE TABLE blog_sections (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the blog_section_content table
CREATE TABLE blog_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES blog_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the event_sections table
CREATE TABLE event_sections (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the event_section_content table
CREATE TABLE event_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES event_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcement_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcement_section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_section_content ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since security is handled by the Next.js admin check)
-- NOTE: This makes your tables publicly readable and writable by anyone with your anon key.
-- For production, you should use the `service_role` key on your server and have stricter policies.
CREATE POLICY "Enable public access" ON public.announcements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.blogs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.jobs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.partners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.announcement_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.announcement_section_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.blog_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.blog_section_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.event_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.event_section_content FOR ALL USING (true) WITH CHECK (true);


-- Storage Policies
-- These policies allow public access to the 'images' and 'documents' buckets.
-- Again, for production, you might want more restrictive policies.
CREATE POLICY "Enable public access on images" ON storage.objects FOR ALL
USING ( bucket_id = 'images' );

CREATE POLICY "Enable public access on documents" ON storage.objects FOR ALL
USING ( bucket_id = 'documents' );

-- Run the new migration for directors and management
\ir migrations/new_migration.sql
