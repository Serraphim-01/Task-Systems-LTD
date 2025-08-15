-- Add company and group to directors and management
ALTER TABLE public.directors ADD COLUMN company TEXT;
ALTER TABLE public.directors ADD COLUMN person_group TEXT;

ALTER TABLE public.management ADD COLUMN company TEXT;
ALTER TABLE public.management ADD COLUMN person_group TEXT;

-- Create director_sections table
CREATE TABLE director_sections (
    id BIGSERIAL PRIMARY KEY,
    director_id BIGINT NOT NULL REFERENCES directors(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create director_section_content table
CREATE TABLE director_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES director_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create management_sections table
CREATE TABLE management_sections (
    id BIGSERIAL PRIMARY KEY,
    management_id BIGINT NOT NULL REFERENCES management(id) ON DELETE CASCADE,
    section_order INT NOT NULL,
    layout TEXT NOT NULL CHECK (layout IN ('one_column', 'two_column')),
    created_at TIMESTAMTz NOT NULL DEFAULT NOW()
);

-- Create management_section_content table
CREATE TABLE management_section_content (
    id BIGSERIAL PRIMARY KEY,
    section_id BIGINT NOT NULL REFERENCES management_sections(id) ON DELETE CASCADE,
    content_order INT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('text', 'image_with_description')),
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE public.director_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.director_section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.management_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.management_section_content ENABLE ROW LEVEL SECURITY;

-- Create policies for new tables
CREATE POLICY "Enable public access" ON public.director_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.director_section_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.management_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable public access" ON public.management_section_content FOR ALL USING (true) WITH CHECK (true);
