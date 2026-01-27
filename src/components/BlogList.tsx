import { Plus } from "lucide-react";
import { useBlogs } from "@/hooks/useBlogs";
import type { Blog } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogListProps {
    onSelect: (id: string) => void;
    onCreate: () => void;
    selectedId: string | null;
}

export function BlogList({ onSelect, onCreate, selectedId }: BlogListProps) {
    const { data: blogs, isLoading, isError } = useBlogs();

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

    if (isError) {
        return (
            <div className="p-8 text-center text-destructive">
                <p>Failed to load blogs. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
                <h2 className="text-xl font-bold tracking-tight">Recent Posts</h2>
                <Button size="icon" onClick={onCreate} title="Create New Post" aria-label="Create New Post">
                    <Plus className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {blogs?.map((blog: Blog) => (
                    <Card
                        key={blog.id}
                        className={`cursor-pointer transition-all hover:shadow-md hover:border-primary/50 group ${selectedId === blog.id ? 'border-primary shadow-md bg-accent/5' : ''}`}
                        onClick={() => onSelect(blog.id)}
                    >
                        <CardHeader className="p-4">
                            <div className="flex justify-between items-start gap-2">
                                <div className="space-y-1">
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
                                {blog.coverImage && (
                                    <img src={blog.coverImage} alt="" className="w-16 h-16 object-cover rounded-md flex-shrink-0 bg-muted" />
                                )}
                            </div>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between">
                            <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </CardFooter>
                    </Card>
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
