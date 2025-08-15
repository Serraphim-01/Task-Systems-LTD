import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionRenderer from '@/components/media/SectionRenderer';

export const revalidate = 60;

async function getDirector(id: string) {
    const { data, error } = await supabase
        .from('directors')
        .select(`
            *,
            director_sections (
                *,
                director_section_content (*)
            )
        `)
        .eq('id', id)
        .single();

    if (error || !data) {
        notFound();
    }
    return data;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    try {
        const director = await getDirector(params.id);
        return {
            title: director.name,
            description: `Details for ${director.name}, ${director.position}`,
        };
    } catch (error) {
        return {
            title: 'Director Not Found',
            description: 'The requested director could not be found.',
        }
    }
}

const DirectorDetailPage = async ({ params }: { params: { id: string } }) => {
    const director = await getDirector(params.id);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const imageUrl = director.image_path ? `${supabaseUrl}/storage/v1/object/public/images/${director.image_path}` : null;

    return (
        <div className="bg-background text-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <Link href="/discover-us" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-semibold">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Discover Us
                </Link>
                <article className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
                    <header className="flex flex-col md:flex-row gap-8 items-center">
                        {imageUrl && (
                            <div className="flex-shrink-0">
                                <Image src={imageUrl} alt={director.name} width={150} height={150} className="rounded-full object-cover shadow-lg" unoptimized />
                            </div>
                        )}
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">{director.name}</h1>
                            <p className="text-xl text-muted-foreground">{director.position}</p>
                            {director.company && <p className="text-md text-muted-foreground">{director.company}</p>}
                            {director.person_group && <p className="text-md text-muted-foreground">{director.person_group}</p>}
                        </div>
                    </header>

                    <div className="mt-8 border-t border-border pt-8">
                        <SectionRenderer sections={director.director_sections} />
                    </div>
                </article>
            </div>
        </div>
    );
};

export default DirectorDetailPage;
