/**
 * @file App.tsx
 * @description Main application layout component.
 * Manages the split-view layout for BlogList and BlogDetail/Create components.
 * Handles top-level state for selected blog and view modes.
 * Wraps the application in QueryClientProvider for React Query context.
 */

import { useState, useCallback } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cn } from "@/lib/utils"
import { BlogList } from './components/BlogList'
import { BlogDetail } from './components/BlogDetail'
import { CreateBlogForm } from './components/CreateBlogForm'
import { Toaster } from "sonner"
import type { Blog } from "@/types"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour garbage collection
      retry: 1
    },
  },
})

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'detail' | 'create' | 'edit'>('detail')
  const [blogToEdit, setBlogToEdit] = useState<Blog | undefined>(undefined)

  // Memoize handlers to prevent passing new functions to child components on every render
  const handleSelectBlog = useCallback((id: string) => {
    setSelectedBlogId(id)
    setViewMode('detail')
  }, [])

  const handleCreateNew = useCallback(() => {
    setSelectedBlogId(null)
    setBlogToEdit(undefined)
    setViewMode('create')
  }, [])

  const handleEditBlog = useCallback((blog: Blog) => {
    setBlogToEdit(blog)
    setViewMode('edit')
  }, [])

  const handleBackToList = useCallback(() => {
    setSelectedBlogId(null)
    setBlogToEdit(undefined)
    setViewMode('detail')
  }, [])

  const handleCreateSuccess = useCallback((id?: string) => {
    setBlogToEdit(undefined)
    if (id) {
      setSelectedBlogId(id)
      setViewMode('detail')
    } else {
      setViewMode('detail')
    }
  }, [])

  const isContentActive = !!selectedBlogId || viewMode === 'create' || viewMode === 'edit'

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-background text-foreground overflow-hidden">

        {/* Left Panel - Blog List */}
        <div className={cn(
          "w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-border h-full bg-muted/10 transition-transform duration-300 will-change-transform",
          isContentActive ? "hidden md:block" : "block"
        )}>
          <BlogList
            onSelect={handleSelectBlog}
            onCreate={handleCreateNew}
            selectedId={selectedBlogId}
          />
        </div>

        {/* Right Panel - Content */}
        <div className={cn(
          "flex-1 h-full bg-background relative will-change-contents",
          !isContentActive ? "hidden md:block" : "block"
        )}>
          {viewMode === 'create' || viewMode === 'edit' ? (
            <CreateBlogForm
              initialData={blogToEdit}
              onSuccess={handleCreateSuccess}
              onCancel={handleBackToList}
            />
          ) : (
            selectedBlogId ? (
              <BlogDetail
                id={selectedBlogId}
                onBack={handleBackToList}
                onEdit={handleEditBlog}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 animate-in fade-in duration-500">
                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Select a story to read</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm mx-auto">Click on any blog post from the sidebar or write your own to get started.</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
