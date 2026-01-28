/**
 * @file BlogDetail.tsx
 * @description Displays the full content of a selected blog post.
 * Handles fetching specific blog data, loading skeletons, and error states.
 */

import { ArrowLeft } from "lucide-react";
import { useBlog } from "@/hooks/useBlogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogDetailProps {
    /** ID of the blog to fetch and display */
    id: string;
    /** Callback to go back to the list view (used mainly on mobile) */
    onBack?: () => void;
}

/**
 * BlogDetail Component
 * Fetches and renders the details of a blog post.
 * Uses 'useBlog' hook for data fetching.
 */
export function BlogDetail({ id, onBack }: BlogDetailProps) {
    // Data fetching hook - auto-triggers when 'id' changes
    const { data: blog, isLoading, isError } = useBlog(id);

    // LOADING STATE: Show skeletons while data is being fetched
    if (isLoading) {
        return (
            <div className="p-8 space-y-6 max-w-3xl mx-auto w-full">
                {onBack && (
                    <Skeleton className="h-10 w-24 mb-4 md:hidden" />
                )}
                <Skeleton className="w-full h-64 rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-3/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        );
    }

    // ERROR STATE: specific UI if blog fetching fails
    if (isError || !blog) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-muted-foreground gap-4">
                <p>Blog not found.</p>
                {onBack && (
                    <Button variant="outline" onClick={onBack} className="md:hidden">Back to List</Button>
                )}
            </div>
        );
    }

    // SUCCESS STATE: Render blog content
    return (
        <div className="h-full overflow-y-auto bg-background">
            <div className="max-w-4xl mx-auto min-h-full pb-10">
                {/* Hero Section with Cover Image */}
                <div className="relative w-full h-64 md:h-80 overflow-hidden group">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            // Fallback image if source fails
                            (e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=No+Image';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30 opacity-80" />

                    {/* Back Button for Mobile */}
                    {onBack && (
                        <div className="absolute top-4 left-4 z-20 md:hidden">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={onBack}
                                className="bg-background/50 hover:bg-background/80 backdrop-blur-md border border-white/10 text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" /> Back
                            </Button>
                        </div>
                    )}

                    {/* Title and Metadata Overlay */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                        <div className="flex gap-2 mb-3 md:mb-4 flex-wrap">
                            {blog.category.map(cat => (
                                <Badge key={cat} variant="secondary" className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm border-none shadow-sm">
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-2 drop-shadow-sm leading-tight md:leading-tight">
                            {blog.title}
                        </h1>
                        <p className="text-muted-foreground font-medium flex items-center gap-2 text-sm md:text-base">
                            {new Date(blog.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-base md:prose-p:text-lg">
                        {/* Description / Subtitle */}
                        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground border-l-4 border-primary/50 pl-6 italic">
                            {blog.description}
                        </p>
                        {/* Main Body Content */}
                        <div className="mt-8 text-foreground/90 leading-7 md:leading-8 whitespace-pre-wrap font-serif text-base md:text-lg">
                            {blog.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
