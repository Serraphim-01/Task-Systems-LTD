import { getBlogs } from './actions';
import { BlogEditor } from './BlogEditor';
import { Suspense } from 'react';

async function Blogs() {
    const blogs = await getBlogs();
    return <BlogEditor blogs={blogs} />;
}

export default function BlogManager() {
  return (
    <Suspense fallback={<div>Loading blogs...</div>}>
      <Blogs />
    </Suspense>
  );
}
