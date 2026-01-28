/**
 * @file BlogCard.tsx
 * @description Card component to display a summary of a blog post.
 * Used in the BlogList for navigating to details.
 */

import { memo } from "react";
import type { Blog } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
    /** The blog data object to display */
    blog: Blog;
    /** Whether this card is currently selected/active */
    selected: boolean;
    /** Callback function when the card is clicked */
    onSelect: (id: string) => void;
}

/**
 * BlogCard Component
 * Displays individual blog items in the list.
 * MEMOIZED to prevent unnecessary re-renders when other items are selected.
 */
export const BlogCard = memo(function BlogCard({ blog, selected, onSelect }: BlogCardProps) {
    return (
        <Card
            className={`cursor-pointer transition-all hover:shadow-md hover:border-primary/50 group ${selected ? 'border-primary shadow-md bg-accent/5' : ''}`}
            onClick={() => onSelect(blog.id)}
        >
            <CardHeader className="p-4">
                <div className="flex justify-between items-start gap-2">
                    <div className="space-y-1">
                        {/* Categories List - Limit to 2 for compact view */}
                        <div className="flex gap-2 flex-wrap mb-2">
                            {blog.category.slice(0, 2).map(cat => (
                                <Badge key={cat} variant="secondary" className="text-[10px] px-1.5 py-0">{cat}</Badge>
                            ))}
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">{blog.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-xs mt-1">
                            {blog.description}
                        </CardDescription>
                    </div>
                    {/* Thumbnail Image - Lazy loaded for performance */}
                    {blog.coverImage && (
                        <img
                            src={blog.coverImage}
                            alt=""
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0 bg-muted"
                            loading="lazy"
                            width={64}
                            height={64}
                            decoding="async"
                        />
                    )}
                </div>
            </CardHeader>
            <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between">
                <span>{new Date(blog.date).toLocaleDateString()}</span>
            </CardFooter>
        </Card>
    );
});
