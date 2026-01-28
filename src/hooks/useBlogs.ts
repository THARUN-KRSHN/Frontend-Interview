/**
 * @file useBlogs.ts
 * @description Custom React Query hooks for managing Blog data.
 * Encapsulates data fetching, caching, and mutation logic.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlogs, fetchBlog, createBlog, updateBlog, deleteBlog } from "@/api/blogs";
import type { NewBlog } from "@/types";

/**
 * Hook to fetch the list of all blogs.
 * @returns Query result object containing data (Blog[]), loading state, and error state.
 * 
 * Query Key: ["blogs"]
 * Usage: Used in the main blog list view.
 */
export function useBlogs() {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
        // Default staleTime can be configured globally or here if needed
    });
}

/**
 * Hook to fetch details of a specific blog.
 * @param {string | null} id - The ID of the blog to fetch. passing null disables the query.
 * @returns Query result object containing the Blog data.
 * 
 * Query Key: ["blog", id]
 * Enabled: Only runs when 'id' is truthy.
 */
export function useBlog(id: string | null) {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlog(id!),
        enabled: !!id, // Prevent fetching if no ID is selected
    });
}

/**
 * Hook to create a new blog post.
 * Handles the mutation and automatic invalidation of the blog list cache.
 * @returns Mutation result object including the 'mutate' function.
 * 
 * Invalidation: Invalidates ["blogs"] query key on success to refresh the list.
 */
export function useCreateBlog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBlog: NewBlog) => createBlog(newBlog),
        onSuccess: () => {
            // Invalidate and refetch the blogs list to show the new entry immediately
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}

/**
 * Hook to update an existing blog post.
 * @returns Mutation result object.
 * 
 * Invalidation: Invalidates ["blogs"] and specific ["blog", id] to refresh data.
 */
export function useUpdateBlog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<NewBlog> }) => updateBlog(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            queryClient.invalidateQueries({ queryKey: ["blog", variables.id] });
        },
    });
}

/**
 * Hook to delete a blog post.
 * @returns Mutation result object.
 * 
 * Invalidation: Invalidates ["blogs"] list.
 */
export function useDeleteBlog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteBlog(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}
