-- This file contains example SQL queries to retrieve data for Announcements, Blogs, and Events
-- from the Azure SQL database.

-- Note: In the application, these queries are broken down into multiple requests for simplicity.
-- These examples show how you could retrieve all data for a single item in one go using JOINs.

-- ##################
-- # ANNOUNCEMENTS  #
-- ##################

-- Query to retrieve a single announcement with all its sections and content
SELECT
    a.id AS announcement_id,
    a.title,
    a.short_description,
    a.image_path,
    a.document_path,
    a.links,
    a.created_at,
    s.id AS section_id,
    s.section_order,
    s.layout,
    c.id AS content_id,
    c.content_order,
    c.content_type,
    c.content
FROM
    announcements a
LEFT JOIN
    announcement_sections s ON a.id = s.announcement_id
LEFT JOIN
    announcement_section_content c ON s.id = c.section_id
WHERE
    a.id = 1; -- Replace 1 with the ID of the announcement you want to retrieve


-- ##################
-- #     BLOGS      #
-- ##################

-- Query to retrieve a single blog post with all its sections and content
SELECT
    b.id AS blog_id,
    b.title,
    b.short_description,
    b.author,
    b.image_path,
    b.document_path,
    b.links,
    b.published_at,
    s.id AS section_id,
    s.section_order,
    s.layout,
    c.id AS content_id,
    c.content_order,
    c.content_type,
    c.content
FROM
    blogs b
LEFT JOIN
    blog_sections s ON b.id = s.blog_id
LEFT JOIN
    blog_section_content c ON s.id = c.section_id
WHERE
    b.id = 1; -- Replace 1 with the ID of the blog post you want to retrieve


-- ##################
-- #     EVENTS     #
-- ##################

-- Query to retrieve a single event with all its sections and content
SELECT
    e.id AS event_id,
    e.title,
    e.short_description,
    e.time,
    e.date,
    e.location,
    e.image_path,
    e.document_path,
    e.links,
    e.created_at,
    s.id AS section_id,
    s.section_order,
    s.layout,
    c.id AS content_id,
    c.content_order,
    c.content_type,
    c.content
FROM
    events e
LEFT JOIN
    event_sections s ON e.id = s.event_id
LEFT JOIN
    event_section_content c ON s.id = c.section_id
WHERE
    e.id = 1; -- Replace 1 with the ID of the event you want to retrieve
