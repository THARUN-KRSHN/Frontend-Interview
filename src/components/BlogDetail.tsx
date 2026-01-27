import { useBlog } from "@/hooks/useBlogs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogDetailProps {
    id: string;
}

export function BlogDetail({ id }: BlogDetailProps) {
    const { data: blog, isLoading, isError } = useBlog(id);

    if (isLoading) {
        return (
            <div className="p-8 space-y-6 max-w-3xl mx-auto w-full">
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

    if (isError || !blog) {
        return (
            <div className="h-full flex items-center justify-center p-8 text-muted-foreground">
                Blog not found.
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-background min-h-full">
                <div className="relative w-full h-64 md:h-80 overflow-hidden group">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=No+Image';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <div className="flex gap-2 mb-4">
                            {blog.category.map(cat => (
                                <Badge key={cat} variant="default" className="bg-primary/90 hover:bg-primary backdrop-blur-sm border-none shadow-sm">
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2 drop-shadow-sm">{blog.title}</h1>
                        <p className="text-muted-foreground font-medium flex items-center gap-2">
                            {new Date(blog.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                        </p>
                    </div>
                </div>

                <div className="p-8 md:p-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <p className="text-xl leading-relaxed text-muted-foreground border-l-4 border-primary/50 pl-6 italic">
                            {blog.description}
                        </p>
                        <div className="mt-8 text-foreground/90 leading-8 whitespace-pre-wrap font-serif text-lg">
                            {blog.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
