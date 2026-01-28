/**
 * @file BlogDetail.tsx
 * @description Displays the full content of a selected blog post.
 * Handles fetching specific blog data, loading skeletons, and error states.
 */

import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useBlog, useDeleteBlog } from "@/hooks/useBlogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface BlogDetailProps {
    /** ID of the blog to fetch and display */
    id: string;
    /** Callback to go back to the list view (used mainly on mobile) */
    onBack?: () => void;
    /** Callback to edit the current blog */
    onEdit: (blog: any) => void;
}

/**
 * BlogDetail Component
 * Fetches and renders the details of a blog post.
 * Uses 'useBlog' hook for data fetching.
 */
export function BlogDetail({ id, onBack, onEdit }: BlogDetailProps) {
    // Data fetching hook - auto-triggers when 'id' changes
    const { data: blog, isLoading, isError } = useBlog(id);
    const { mutate: deleteBlogMutate, isPending: isDeleting } = useDeleteBlog();

    // Handle Delete
    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this story?")) {
            deleteBlogMutate(id, {
                onSuccess: () => {
                    toast.success("Story deleted successfully");
                    if (onBack) onBack();
                },
                onError: () => toast.error("Failed to delete story"),
            });
        }
    };

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
                <div className="relative w-full h-64 md:h-80 overflow-hidden group bg-muted">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover opacity-90"
                        onError={(e) => {
                            // Fallback image if source fails
                            (e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=No+Image';
                        }}
                    />

                    {/* Gradient Overlay for text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    {/* Back Button for Mobile - Top Left */}
                    {onBack && (
                        <div className="absolute top-4 left-4 z-20 md:hidden">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={onBack}
                                className="bg-background/80 hover:bg-background/90 backdrop-blur-md shadow-sm"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" /> Back
                            </Button>
                        </div>
                    )}

                    {/* Title and Metadata Overlay */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full z-10">
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {blog.category.map(cat => (
                                <Badge key={cat} className="bg-primary hover:bg-primary/90 text-primary-foreground border-none px-3 py-1 text-xs uppercase tracking-wider shadow-sm">
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-3 drop-shadow-sm leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex items-center justify-between text-muted-foreground font-medium text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <span>{new Date(blog.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                                <span>•</span>
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="px-6 md:px-10 py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Toolbar: Edit/Delete on the right */}
                    <div className="flex justify-end gap-3 border-b pb-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(blog)}
                                className="gap-2 text-muted-foreground hover:text-foreground"
                            >
                                <Edit className="h-4 w-4" /> Edit Story
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                            >
                                <Trash2 className="h-4 w-4" /> Delete
                            </Button>
                        </div>
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-base md:prose-p:text-lg prose-headings:font-bold">
                        {/* Featured Quote / Description Style - Matches user request */}
                        <div className="not-prose my-8 p-6 md:p-8 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-r-lg">
                            <p className="text-lg md:text-xl font-medium text-blue-900 dark:text-blue-100 italic leading-relaxed">
                                "{blog.description}"
                            </p>
                        </div>

                        {/* Main Body Content */}
                        <div className="mt-8 text-foreground/90 leading-8 whitespace-pre-wrap font-serif text-lg md:text-xl">
                            {blog.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
