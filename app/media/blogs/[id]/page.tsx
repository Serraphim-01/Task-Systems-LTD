import { supabase } from '@/lib/supabase';
import { Paperclip, ExternalLink, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export const revalidate = 60; // Revalidate every 60 seconds

async function getBlog(id: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }
  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    try {
        const blog = await getBlog(params.id);
        return {
            title: blog.title,
            description: blog.short_description,
        };
    } catch (error) {
        return {
            title: 'Blog Post Not Found',
            description: 'The requested blog post could not be found.',
        }
    }
}

const BlogDetailPage = async ({ params }: { params: { id:string } }) => {
  const blog = await getBlog(params.id);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const imageUrl = blog.image_path ? `${supabaseUrl}/storage/v1/object/public/images/${blog.image_path}` : null;
  const docUrl = blog.document_path ? `${supabaseUrl}/storage/v1/object/public/documents/${blog.document_path}` : null;

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link href="/media/blogs" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
        </Link>
        <article className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
          <header>
            <p className="text-sm text-muted-foreground mb-2">
              Published on {new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              {blog.author && ` by ${blog.author}`}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{blog.title}</h1>
            {blog.short_description && <p className="text-xl text-muted-foreground mb-4">{blog.short_description}</p>}
          </header>

          {imageUrl && (
            <div className="my-6">
                <Image src={imageUrl} alt={blog.title} width={800} height={450} className="rounded-md object-cover" unoptimized/>
            </div>
          )}

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.full_text }} />

          <footer className="mt-6 pt-6 border-t border-border">
            {docUrl && (
              <a href={docUrl} target="_blank" rel="noopener noreferrer" className="block mb-4 text-primary hover:underline font-semibold">
                <div className="inline-flex items-center gap-2">
                    <Paperclip className="h-5 w-5" />
                    Download Attached Document
                </div>
              </a>
            )}

            <div className="flex flex-wrap gap-3">
              {blog.links?.map((link: any, index: number) => (
                <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <span>{link.text}</span>
                </Link>
              ))}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;
