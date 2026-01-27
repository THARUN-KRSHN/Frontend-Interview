import type { Blog, NewBlog } from "@/types";

const API_URL = "http://localhost:3001/blogs";

export async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
}

export async function fetchBlog(id: string): Promise<Blog> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch blog");
    return res.json();
}

export async function createBlog(blog: NewBlog): Promise<Blog> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error("Failed to create blog");
    return res.json();
}
