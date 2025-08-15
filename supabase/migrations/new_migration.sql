-- Create the directors table
CREATE TABLE directors (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    image_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the management table
CREATE TABLE management (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    image_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for the new tables
ALTER TABLE public.directors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.management ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access
CREATE POLICY "Enable public access" ON public.directors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.management FOR ALL USING (true) WITH CHECK (true);
