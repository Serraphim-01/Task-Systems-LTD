import { getDb } from '@/lib/azure';
import { Rss } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MediaNav } from '@/components/media-nav';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Blogs",
  description: "Explore insights, trends, and stories from the world of technology.",
};

async function getBlogs() {
  const db = await getDb();
  const result = await db.request().query`
    SELECT *
    FROM blogs
    WHERE expires_at IS NULL OR expires_at > GETDATE()
    ORDER BY published_at DESC
  `;
  return result.recordset;
}

const BlogsListPage = async () => {
  const blogs = await getBlogs();

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Blogs & Articles
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Explore insights, trends, and stories from the world of technology.
          </p>
        </div>

        {blogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog: any) => {
              const imageUrl = blog.image_path;
              return (
                <Link href={`/media/blogs/${blog.id}`} key={blog.id} className="bg-card border border-border rounded-lg overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow group">
                  <div className="relative w-full h-48 bg-muted">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={blog.title} layout="fill" className="object-cover" unoptimized/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Rss className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{blog.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        {new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        {blog.author && ` • By ${blog.author}`}
                    </p>
                    {blog.short_description && <p className="text-muted-foreground flex-grow line-clamp-3">{blog.short_description}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12 mt-16">
            <Rss className="h-24 w-24 text-primary/50 mb-6" />
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Fresh Content on the Way
            </h2>
            <p className="text-muted-foreground max-w-md">
              Our team is busy writing our next blog post. Check back soon for insightful articles and industry analysis.
            </p>
          </div>
        )}

        <MediaNav
          prev={{ name: 'Events', href: '/media/events' }}
          next={{ name: 'Announcements', href: '/media/announcements' }}
        />
      </div>
    </div>
  );
};

export default BlogsListPage;
