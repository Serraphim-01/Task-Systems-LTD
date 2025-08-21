import { getDb } from '@/lib/azure';
import { Trash2 } from 'lucide-react';
import { deleteJob } from './actions';
import { Button } from '@/components/ui/button';

async function getJobs() {
    const db = await getDb();
    const result = await db.request().query('SELECT id, title FROM jobs ORDER BY title ASC');
    return result.recordset;
}

export async function JobList() {
    const jobs = await getJobs();

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Existing Job Postings</h3>
            <div className="border rounded-md">
                {jobs.map((item, index) => (
                    <div key={item.id} className={`flex items-center justify-between p-4 ${index < jobs.length - 1 ? 'border-b' : ''}`}>
                        <span className="truncate pr-4">{item.title}</span>
                        <form action={deleteJob.bind(null, item.id)}>
                            <Button variant="ghost" size="icon" type="submit" aria-label="Delete job">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </form>
                    </div>
                ))}
                {jobs.length === 0 && <p className="p-4 text-sm text-muted-foreground">No jobs found.</p>}
            </div>
        </div>
    );
}
