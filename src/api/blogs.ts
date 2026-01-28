/**
 * @file blogs.ts
 * @description API layer for handling Blog-related network requests.
 * Contains functions to fetch list of blogs, fetch a single blog details, and create a new blog.
 */

import type { Blog, NewBlog } from "@/types";

const API_URL = "http://localhost:3001/blogs";

/**
 * Fetches all blogs from the server.
 * @returns {Promise<Blog[]>} A promise resolving to an array of Blog objects.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
}

/**
 * Fetches a specific blog by its ID.
 * @param {string} id - The unique identifier of the blog to fetch.
 * @returns {Promise<Blog>} A promise resolving to the Blog object.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchBlog(id: string): Promise<Blog> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch blog");
    return res.json();
}

/**
 * Creates a new blog post.
 * @param {NewBlog} blog - The blog data to create (excluding ID).
 * @returns {Promise<Blog>} A promise resolving to the created Blog object including its new ID.
 * @throws {Error} If the creation request fails.
 */
export async function createBlog(blog: NewBlog): Promise<Blog> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
    });
    if (!res.ok) throw new Error("Failed to create blog");
    return res.json();
}
