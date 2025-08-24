import { getRoDb } from '@/lib/azure';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionRenderer from '@/components/media/SectionRenderer';

export const revalidate = 60;

async function getManagement(id: string) {
    const db = await getRoDb();
    const managementResult = await db.request().input('id', id).query('SELECT * FROM management WHERE id = @id');
    const management = managementResult.recordset[0];

    if (!management) {
        notFound();
    }

    const sectionsResult = await db.request().input('management_id', id).query('SELECT * FROM management_sections WHERE management_id = @management_id');
    const sections = sectionsResult.recordset;

    for (const section of sections) {
        const contentResult = await db.request().input('section_id', section.id).query('SELECT * FROM management_section_content WHERE section_id = @section_id');
        section.management_section_content = contentResult.recordset.map((content: any) => {
            if (typeof content.content === 'string') {
                try {
                    content.content = JSON.parse(content.content);
                } catch (e) {
                    console.error("Failed to parse content JSON", e);
                }
            }
            return content;
        });
    }

    management.management_sections = sections;

    return management;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    try {
        const management = await getManagement(params.id);
        return {
            title: management.name,
            description: `Details for ${management.name}, ${management.position}`,
        };
    } catch (error) {
        return {
            title: 'Management Person Not Found',
            description: 'The requested management person could not be found.',
        }
    }
}

const ManagementDetailPage = async ({ params }: { params: { id: string } }) => {
    const management = await getManagement(params.id);
    const imageUrl = management.image_path;

    return (
        <div className="bg-background text-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-semibold">
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>
                <article className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
                    <header className="flex flex-col md:flex-row gap-8 items-center">
                        {imageUrl && (
                            <div className="flex-shrink-0">
                                <Image src={imageUrl} alt={management.name} width={150} height={150} className="rounded-full object-cover shadow-lg" unoptimized />
                            </div>
                        )}
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">{management.name}</h1>
                            <p className="text-xl text-muted-foreground">{management.position}</p>
                            {management.company && <p className="text-md text-muted-foreground">{management.company}</p>}
                            {management.person_group && <p className="text-md text-muted-foreground">{management.person_group}</p>}
                        </div>
                    </header>

                    <div className="mt-8 border-t border-border pt-8">
                        <SectionRenderer sections={management.management_sections} />
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ManagementDetailPage;
