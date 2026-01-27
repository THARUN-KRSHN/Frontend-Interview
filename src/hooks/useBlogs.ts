import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlogs, fetchBlog, createBlog } from "@/api/blogs";
import { NewBlog } from "@/types";

export function useBlogs() {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
    });
}

export function useBlog(id: string | null) {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlog(id!),
        enabled: !!id,
    });
}

export function useCreateBlog() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBlog: NewBlog) => createBlog(newBlog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
}
