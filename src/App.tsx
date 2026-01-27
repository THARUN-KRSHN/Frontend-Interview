import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlogList } from './components/BlogList'
import { BlogDetail } from './components/BlogDetail'
import { CreateBlogForm } from './components/CreateBlogForm'

const queryClient = new QueryClient()

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

  const handleCreateSuccess = () => {
    setViewMode('detail')
    // Ideally select the new blog or stay empty
    setSelectedBlogId(null)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
        {/* Left Panel - Blog List */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-border h-full bg-muted/10">
          <BlogList
            onSelect={handleSelectBlog}
            onCreate={handleCreateNew}
            selectedId={selectedBlogId}
          />
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 h-full bg-background relative">
          {viewMode === 'create' ? (
            <CreateBlogForm
              onSuccess={handleCreateSuccess}
              onCancel={() => setViewMode('detail')}
            />
          ) : (
            selectedBlogId ? (
              <BlogDetail id={selectedBlogId} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Select a story to read</h3>
                  <p className="text-muted-foreground mt-2">Click on any blog post from the sidebar or write your own.</p>
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
