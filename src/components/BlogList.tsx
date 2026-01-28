/**
 * @file BlogList.tsx
 * @description Renders a scrollable list of blog posts.
 * Provides controls for creating a new post and selecting an existing one.
 */

import { Plus } from "lucide-react";
import { useBlogs } from "@/hooks/useBlogs";
import type { Blog } from "@/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogCard } from "@/components/BlogCard";

interface BlogListProps {
    /** Callback when a blog is selected */
    onSelect: (id: string) => void;
    /** Callback when the create button is clicked */
    onCreate: () => void;
    /** Currently selected blog ID for highlighting */
    selectedId: string | null;
}

/**
 * BlogList Component
 * Fetches and displays all blogs using 'useBlogs' hook.
 */
export function BlogList({ onSelect, onCreate, selectedId }: BlogListProps) {
    const { data: blogs, isLoading, isError } = useBlogs();

    // LOADING STATE: Show skeletons for list items
    if (isLoading) {
        return (
            <div className="space-y-4 p-4">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                </div>
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    // ERROR STATE
    if (isError) {
        return (
            <div className="p-8 text-center text-destructive">
                <p>Failed to load blogs. Please try again later.</p>
            </div>
        );
    }

    // SUCCESS STATE
    return (
        <div className="h-full flex flex-col">
            {/* Header: Title and Create Button */}
            <div className="p-4 border-b flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full transform font-sans">
                <h2 className="text-xl font-bold tracking-tight">Recent Posts</h2>
                <Button size="icon" onClick={onCreate} title="Create New Post" aria-label="Create New Post">
                    <Plus className="h-5 w-5" />
                </Button>
            </div>

            {/* Scrollable List Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {blogs?.map((blog: Blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        selected={selectedId === blog.id}
                        onSelect={onSelect}
                    />
                ))}
                {blogs?.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        No blogs found. Create one!
                    </div>
                )}
            </div>
        </div>
    );
}
