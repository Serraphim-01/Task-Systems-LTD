import { supabase } from '@/lib/supabase';
import { Rss } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export const metadata = {
  title: "Blogs",
  description: "Explore insights, trends, and stories from the world of technology.",
};


async function getBlogs() {
  const { data, error } = await supabase.from('blogs').select('*').order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  return data;
}

const BlogsPage = async () => {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            {blogs.map((blog: any) => (
              <div key={blog.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <Image src={blog.image_url} alt={blog.title} width={400} height={250} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-2">{blog.title}</h2>
                  <p className="text-muted-foreground text-sm mb-4">By {blog.author}</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {new Date(blog.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-foreground line-clamp-3">{blog.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12">
            <Rss className="h-24 w-24 text-primary/50 mb-6" />
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Fresh Content on the Way
            </h2>
            <p className="text-muted-foreground max-w-md">
              Our team is busy writing our next blog post. Check back soon for insightful articles and industry analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
