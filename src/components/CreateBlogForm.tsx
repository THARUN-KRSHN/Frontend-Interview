import { useState } from "react";
import { useCreateBlog } from "@/hooks/useBlogs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import type { NewBlog } from "@/types";

interface CreateBlogFormProps {
    onSuccess: (id?: string) => void;
    onCancel: () => void;
}

export function CreateBlogForm({ onSuccess, onCancel }: CreateBlogFormProps) {
    const { mutate, isPending } = useCreateBlog();

    const [formData, setFormData] = useState<NewBlog>({
        title: "",
        category: [],
        description: "",
        content: "",
        coverImage: "",
        date: new Date().toISOString(),
    });

    const [categoryInput, setCategoryInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCategoryAdd = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && categoryInput.trim()) {
            e.preventDefault();
            if (!formData.category.includes(categoryInput.trim())) {
                setFormData(prev => ({ ...prev, category: [...prev.category, categoryInput.trim()] }));
            }
            setCategoryInput("");
        }
    };

    const removeCategory = (cat: string) => {
        setFormData(prev => ({ ...prev, category: prev.category.filter(c => c !== cat) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ ...formData, date: new Date().toISOString() }, {
            onSuccess: () => {
                onSuccess();
            }
        });
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-start md:justify-center p-4 overflow-y-auto">
            <Card className="w-full max-w-2xl shadow-lg border-muted">
                <CardHeader>
                    <CardTitle className="text-2xl">Write a New Story</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">Title</label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter a captivating title..."
                                required
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="coverImage" className="text-sm font-medium">Cover Image URL</label>
                            <Input
                                id="coverImage"
                                name="coverImage"
                                placeholder="https://images.unsplash.com/..."
                                value={formData.coverImage}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium">Categories (Press Enter to add)</label>
                            <Input
                                id="category"
                                value={categoryInput}
                                onChange={(e) => setCategoryInput(e.target.value)}
                                onKeyDown={handleCategoryAdd}
                                placeholder="Tech, Design, Lifestyle..."
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.category.map(cat => (
                                    <span key={cat} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1">
                                        {cat}
                                        <button type="button" onClick={() => removeCategory(cat)} className="hover:text-destructive">&times;</button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">Short Description</label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="What is this story about?"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="h-20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">Content</label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Tell your story..."
                                required
                                value={formData.content}
                                onChange={handleChange}
                                className="min-h-[200px] font-serif text-lg leading-relaxed"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-muted/20 p-6">
                        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Publishing..." : "Publish Story"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
