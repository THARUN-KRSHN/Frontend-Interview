import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cn } from "@/lib/utils"
import { BlogList } from './components/BlogList'
import { BlogDetail } from './components/BlogDetail'
import { CreateBlogForm } from './components/CreateBlogForm'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'detail' | 'create'>('detail')

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id)
    setViewMode('detail')
  }

  const handleCreateNew = () => {
    setSelectedBlogId(null)
    setViewMode('create')
  }

  const handleBackToList = () => {
    setSelectedBlogId(null)
    setViewMode('detail')
  }

  const handleCreateSuccess = () => {
    setViewMode('detail')
    setSelectedBlogId(null)
  }

  // Determine visibility states for mobile responsiveness
  // Mobile: Show Logic:
  // - If creating: Show Form (Hide List)
  // - If selected: Show Detail (Hide List)
  // - Else: Show List (Hide Detail/Form)
  // Desktop: Show List + (Detail/Form/Empty)

  const isContentActive = !!selectedBlogId || viewMode === 'create'

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-background text-foreground overflow-hidden">

        {/* Left Panel - Blog List 
            Hidden on mobile if content is active.
            Always visible on md+
        */}
        <div className={cn(
          "w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-border h-full bg-muted/10 transition-all duration-300",
          isContentActive ? "hidden md:block" : "block"
        )}>
          <BlogList
            onSelect={handleSelectBlog}
            onCreate={handleCreateNew}
            selectedId={selectedBlogId}
          />
        </div>

        {/* Right Panel - Content 
            Hidden on mobile if NO content is active.
            Always visible on md+ (showing empty state if needed)
        */}
        <div className={cn(
          "flex-1 h-full bg-background relative",
          !isContentActive ? "hidden md:block" : "block"
        )}>
          {viewMode === 'create' ? (
            <CreateBlogForm
              onSuccess={handleCreateSuccess}
              onCancel={handleBackToList}
            />
          ) : (
            selectedBlogId ? (
              <BlogDetail
                id={selectedBlogId}
                onBack={handleBackToList}
              />
            ) : (
              /* Empty State - Desktop Only usually, but technically visible on mobile if logic failed (it won't) */
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
    </QueryClientProvider>
  )
}

export default App
