# CA Monk - Blog Application Assignment (Completed)

This repository contains the completed Blog Application assignment, built with React, TypeScript, and modern frontend tooling.

> "I focused on writing self-documenting code supported by meaningful comments so that any developer can quickly understand, maintain, and extend the application."

## 🚀 Project Overview

The application is a fully functional blog platform featuring a responsive split-view, real-time data synchronization, and a polished user interface.

### Key Features Implemented

-   **Full CRUD Operations**:
    -   **Read**: View all blogs in a scrollable list and read detailed stories in a dedicated view.
    -   **Create**: Publish new stories with titles, covers, tags, and rich descriptions.
    -   **Update**: Edit existing stories with pre-filled forms.
    -   **Delete**: Remove stories with confirmation dialogs.
-   **State Management**: Powered by **TanStack Query (React Query v5)** for efficient caching, background updates, and optimistic UI.
-   **Modern UI/UX**:
    -   Built with **Tailwind CSS v4** and **shadcn/ui**.
    -   Responsive design that works seamlessly on Desktop, Tablet, and Mobile.
    -   Glassmorphism effects, smooth transitions, and refined typography.
    -   **Sonner** for toast notifications (Success/Error feedback).
-   **Code Quality**:
    -   Fully typed with **TypeScript**.
    -   Extensive **JSDoc** documentation for all components and hooks.
    -   Clean directory structure (`api`, `components`, `hooks`, `types`).

## 🛠️ Technology Stack

-   **Framework**: React 19 + Vite
-   **Language**: TypeScript
-   **State**: TanStack Query v5
-   **Styling**: Tailwind CSS v4, Lucide React (Icons)
-   **Components**: shadcn/ui (Radix UI primitives)
-   **Feedback**: Sonner (Toast notifications)
-   **Backend**: JSON Server (Mock API)

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1. Prerequisites
- Node.js (v18 or higher)
- Git

### 2. Implementation Steps

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd camonk-interview
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the Backend (JSON Server)**
    Runs on port `3001`.
    ```bash
    npm run server
    ```

4.  **Start the Frontend (Vite)**
    Runs on port `5173`.
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```bash
src/
├── api/          # API layer (fetch functions)
├── components/   # UI components (BlogCard, BlogDetail, BlogList, etc.)
│   └── ui/       # shadcn/ui reusable primitives
├── hooks/        # Custom React Query hooks (useBlogs, useCreateBlog, etc.)
├── lib/          # Utilities (cn helper)
├── types/        # TypeScript interfaces (Blog, NewBlog)
├── App.tsx       # Main layout and routing logic
└── index.css     # Global styles and Tailwind configuration
```

## 📝 functionality Walkthrough

### 1. Viewing Blogs
The left panel displays a list of all blog posts. Clicking a post opens the detailed view on the right. On mobile, this transitions to a full-screen view.

### 2. Creating a Post
Click the **+** button in the sidebar to open the "Write a New Story" form. You can add tags by pressing `Enter`.

### 3. Editing & Deleting
In the detailed view of a blog, you will find an **Edit** (pencil) and **Delete** (trash) button in the toolbar below the hero image.
-   **Edit**: Opens the form pre-filled with the story data.
-   **Delete**: Asks for confirmation before permanently removing the post.

---

## 🔍 Evaluation Criteria Checklist

-   ✅ **TanStack Query**: Implemented `useQuery` for fetching and `useMutation` for mutations, with automatic cache invalidation (`invalidateQueries`).
-   ✅ **Tailwind CSS**: Custom styling, typography adjustments, and responsive layouts using utility classes.
-   ✅ **shadcn/ui**: Used `Card`, `Button`, `Badge`, `Skeleton`, `Input`, `Textarea` components.
-   ✅ **Code Quality**: Strictly typed interfaces in `types/index.ts`; consistent file naming and architectural separation.
-   ✅ **Responsiveness**: Mobile-first design with hidden/block utility toggles for split-view layout.

---

*Original Assignment Instructions Below*

## Assignment Tasks (Reference)

You are required to build a blog application with the following features:

### Required Technologies
- ✅ **TanStack Query** - For server state management and data fetching
- ✅ **Tailwind CSS** - For styling
- ✅ **shadcn/ui** - For UI components

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blogs |
| GET | `/blogs/:id` | Get a specific blog by ID |
| POST | `/blogs` | Create a new blog |
| PATCH | `/blogs/:id` | Update a blog (Implemented) |
| DELETE | `/blogs/:id` | Delete a blog (Implemented) |

Good luck! 🚀
