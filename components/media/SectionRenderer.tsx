import Image from 'next/image';
import { parseRichText } from '@/lib/content-parser';

const TextContent = ({ content }: { content: any }) => (
    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: parseRichText(content.text) }} />
);

const ImageWithDescriptionContent = ({ content }: { content: any }) => {
    const imageUrl = content.image_path || content.image;
    if (!imageUrl) return null;

    return (
        <div className="space-y-4">
            <Image src={imageUrl} alt={content.description || 'Section image'} width={800} height={450} className="rounded-md object-cover" />
            {content.description && <p className="text-center text-muted-foreground">{content.description}</p>}
        </div>
    );
};

const ContentBlock = ({ block }: { block: any }) => {
    switch (block.content_type) {
        case 'text':
            return <TextContent content={block} />;
        case 'image_with_description':
            return <ImageWithDescriptionContent content={block} />;
        default:
            return null;
    }
};

const SectionRenderer = ({ sections }: { sections: any[] }) => {
    if (!sections) return null;

    // Sort sections and their content by order
    const sortedSections = [...sections].sort((a, b) => a.section_order - b.section_order);
    sortedSections.forEach(section => {
        const contentKey = Object.keys(section).find(key => key.endsWith('_section_content'));
        if (contentKey && section[contentKey]) {
            section[contentKey].sort((a: any, b: any) => a.content_order - b.content_order);
        }
    });

    return (
        <div className="mt-8 space-y-12">
            {sortedSections.map((section) => {
                const contentKey = Object.keys(section).find(key => key.endsWith('_section_content'));
                const content = contentKey ? section[contentKey] : [];

                return (
                    <section key={section.id} className="space-y-6">
                        <div className={section.layout === 'two_column' ? 'grid md:grid-cols-2 gap-8 items-stretch' : 'grid grid-cols-1 gap-8'}>
                            {content.map((block: any) => (
                                <div key={block.id} className="flex flex-col">
                                    <ContentBlock block={block} />
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default SectionRenderer;
