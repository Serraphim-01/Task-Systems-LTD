import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface NavLink {
    name: string;
    href: string;
}

interface MediaNavProps {
    prev?: NavLink;
    next?: NavLink;
}

export function MediaNav({ prev, next }: MediaNavProps) {
    return (
        <div className="mt-16 pt-8 border-t border-border grid grid-cols-2 gap-4 md:gap-8">
            <div className="justify-self-start">
                {prev && (
                    <Link href={prev.href} className="block p-4 md:p-6 border rounded-lg hover:bg-muted/50 transition-colors h-full">
                        <div className="flex items-center gap-4">
                            <ArrowLeft className="h-6 w-6 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-muted-foreground">Previous</p>
                                <p className="text-lg font-semibold text-primary">{prev.name}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
            <div className="justify-self-end text-right">
                {next && (
                    <Link href={next.href} className="block p-4 md:p-6 border rounded-lg hover:bg-muted/50 transition-colors h-full">
                        <div className="flex items-center justify-end gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Next</p>
                                <p className="text-lg font-semibold text-primary">{next.name}</p>
                            </div>
                            <ArrowRight className="h-6 w-6 flex-shrink-0" />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}
