<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Dev-Edge Project Context

This file serves as the system architecture dictionary for AI Assistants. Read this file to immediately understand the application stack, routing, components, and conventions without having to scrape the file tree.

## Application Architecture

- **Stack:** Next.js 16.2.2 (App Router), React 19, Tailwind CSS v4, TypeScript, Lucide React.
- **Goal:** This is `Dev-Edge`, a premium, interactive technology learning platform. Think "Frontend Masters" crossed with a sleek, gamified interactive sandbox.
- **Aesthetics:** Deep dark mode default, premium glassmorphism (`bg-background/50 border border-white/5 backdrop-blur`), fluid animations (`framer-motion`), and heavy use of dynamic gradients (emerald to cyan).

## Content Architecture (Standard Operating Procedures)

The entire curriculum is driven by Markdown (MDX) and deeply linked custom React components.

1. **Routing:**
   - `/learn/[...slug]/page.tsx`: Dynamically renders MDX content mapped from `src/content/...`.
   - `/labs`: The "Interactive Lab Explorer." This page reads all content and presents isolated, interactive React environments without the surrounding reading material.

2. **File Structure rules for adding new content:**
   When adding a new learning topic, you MUST touch these items:
   - `src/content/frontend/react/<topic-name>.mdx` => Contains the markdown textual lesson. DO NOT add `order` in the frontmatter here.
   - `src/content/frontend/react/_meta.json` => Dictates ordering. Add your new topic's slug and explicit `order` index here.
   - `src/components/lab/frontend/react/<TopicLab>.tsx` => The actual TSX component implementing the interactive "Lab". Use `<InteractiveLab>` if it needs the classic MacOS window pane.

3. **Registries (CRITICAL FOR NEW LABS):**
   When you create a new lab component, it MUST be registered in TWO files to function:
   - `src/app/learn/[...slug]/page.tsx` => Add the component to the `components` map so `next-mdx-remote` can dynamically render `<YourLab />` inside MDX files.
   - `src/app/labs/LabsExplorerClient.tsx` => Add the component to `labRegistry` (e.g. `'frontend/react/your-topic': <YourLab />`) so the standalone Labs view can render it.

## Styling & Theme Rules

1. **Component Design:**
   - Avoid generic solid colors. Rely on `bg-white/5`, `border-white/10`, and `text-muted-foreground` for subtle structure.
   - Core interactive highlights should use specific emerald mappings: `text-emerald-400`, `bg-emerald-500/20`, etc.
   - Use `lucide-react` for all iconography.

2. **Tooling Nuances:**
   - Next.js 16 strictly enforces hooks purity (`react-hooks/purity`). If your interactive lab requires "fake loading" using `setTimeout` or `while` loops that manipulate un-memoized references, use `eslint-disable` to suppress strict linting rather than breaking the build.
   - Eslint ignores during build are NOT supported natively in `next.config.ts`. You must fix or suppress `eslint` warnings directly in the files.

## Useful Scripts
- `npm run dev`: Starts local server.
- `npm run create:content`: A utility script (`scripts/generator.ts`) to scaffold new components.
- `npm run lint && npm run build`: Verify production deployment locally.
