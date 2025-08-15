import Image from 'next/image';

const TextContent = ({ content }: { content: any }) => (
    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content.text }} />
);

const ImageWithDescriptionContent = ({ content }: { content: any }) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/images/${content.image}`;
    return (
        <div className="space-y-4">
            <Image src={imageUrl} alt={content.description || 'Blog section image'} width={800} height={450} className="rounded-md object-cover" unoptimized/>
            {content.description && <p className="text-center text-muted-foreground">{content.description}</p>}
        </div>
    );
};

const ContentBlock = ({ block }: { block: any }) => {
    switch (block.content_type) {
        case 'text':
            return <TextContent content={block.content} />;
        case 'image_with_description':
            return <ImageWithDescriptionContent content={block.content} />;
        default:
            return null;
    }
};

const SectionRenderer = ({ sections }: { sections: any[] }) => {
    // Sort sections and their content by order
    const sortedSections = [...sections].sort((a, b) => a.section_order - b.section_order);
    sortedSections.forEach(section => {
        section.blog_section_content.sort((a: any, b: any) => a.content_order - b.content_order);
    });

    return (
        <div className="mt-8 space-y-12">
            {sortedSections.map((section) => (
                <section key={section.id} className="space-y-6">
                    <div className={section.layout === 'two_column' ? 'grid md:grid-cols-2 gap-8' : 'grid grid-cols-1 gap-8'}>
                        {section.blog_section_content.map((block: any) => (
                            <div key={block.id}>
                                <ContentBlock block={block} />
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default SectionRenderer;
