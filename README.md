# Dev-Edge: The Modern Developer Academy

Dev-Edge is a premium, interactive e-learning platform designed for software engineers. Instead of passive video watching, Dev-Edge focuses on "learning by doing" through **Interactive Labs** where you can break and rebuild complex concepts directly in your browser.

## 🚀 Key Features

- **Interactive MDX Lessons**: Rich technical content with embedded live React demonstrations.
- **Dynamic Category Explorer**: Automated discovery of learning paths (Frontend, Backend, System Design, DevOps).
- **Persistent State Tracking**: Custom hooks like `useLocalStorage` ensure your progress in labs is synced.
- **Premium Aesthetics**: A glassmorphic, dark-mode-first UI built with Tailwind CSS and Framer Motion.
- **Content Pipeline**: Automated lesson generation script for fast content scaling.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org)
- **Styling**: Tailwind CSS
- **Content**: MDX (via `next-mdx-remote`)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Runtime**: Node.js / pnpm

## 📁 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/content/`: Organizing MDX lessons (e.g., `/frontend/react/hooks.mdx`).
- `src/components/lab/`: Structured interactive components used inside MDX.
- `src/hooks/`: Custom technical hooks (e.g., `useLocalStorage`, `useDebounce`).
- `scripts/`: Development utilities including the content generator.

## ✍️ Adding New Content

We use a automated generator to maintain consistent structure for new lessons.

### Generate a New Lesson
```bash
npx tsx scripts/generator.ts [category] [technology] [lesson-slug]
```

**Example:**
```bash
npx tsx scripts/generator.ts frontend react use-callback
```
This creates a new MDX file at `src/content/frontend/react/use-callback.mdx`.

### Registering new Labs
1. Create your React component in `src/components/lab/[category]/[tech]/`.
2. Register it in the `components` object inside `src/app/learn/[...slug]/page.tsx`.
3. Use it in your MDX:
```mdx
<InteractiveLab title="My Lab">
  <MyNewComponent />
</InteractiveLab>
```

## 🚥 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Server
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the academy in action.
