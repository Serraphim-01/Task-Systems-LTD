import { getDb } from '@/lib/azure';
import { Trash2 } from 'lucide-react';
import { deleteBlog } from './actions';
import { Button } from '@/components/ui/button';

async function getBlogs() {
    const db = await getDb();
    const result = await db.request().query('SELECT id, title, image_path, document_path FROM blogs ORDER BY published_at DESC');
    return result.recordset;
}

export async function BlogList() {
    const blogs = await getBlogs();

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Existing Blog Posts</h3>
            <div className="border rounded-md">
                {blogs.map((item, index) => (
                    <div key={item.id} className={`flex items-center justify-between p-4 ${index < blogs.length - 1 ? 'border-b' : ''}`}>
                        <span className="truncate pr-4">{item.title}</span>
                        <form action={deleteBlog.bind(null, item.id, item.image_path ?? undefined, item.document_path ?? undefined)}>
                            <Button variant="ghost" size="icon" type="submit" aria-label="Delete blog post">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </form>
                    </div>
                ))}
                {blogs.length === 0 && <p className="p-4 text-sm text-muted-foreground">No blog posts found.</p>}
            </div>
        </div>
    );
}
