import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { InteractiveLab } from '@/components/lab/InteractiveLab';
import { DebounceShowcase } from '@/components/lab/frontend/react/DebounceShowcase';
import { LocalStorageLab } from '@/components/lab/frontend/react/LocalStorageLab';
import { ReactIntroLab } from '@/components/lab/frontend/react/ReactIntroLab';
import { ContextApiLab } from '@/components/lab/frontend/react/ContextApiLab';
import { UseEffectLab } from '@/components/lab/frontend/react/UseEffectLab';
import { UseMemoLab } from '@/components/lab/frontend/react/UseMemoLab';
import { UseCallbackLab } from '@/components/lab/frontend/react/UseCallbackLab';
import { ReactMemoLab } from '@/components/lab/frontend/react/ReactMemoLab';
import { UseStateLab } from '@/components/lab/frontend/react/UseStateLab';
import { UseRefLab } from '@/components/lab/frontend/react/UseRefLab';
import { UseReducerLab } from '@/components/lab/frontend/react/UseReducerLab';
import { UseTransitionLab } from '@/components/lab/frontend/react/UseTransitionLab';
import { SuspenseLab } from '@/components/lab/frontend/react/SuspenseLab';

const components = {
  InteractiveLab,
  DebounceShowcase,
  LocalStorageLab,
  ReactIntroLab,
  ContextApiLab,
  UseEffectLab,
  UseMemoLab,
  UseCallbackLab,
  ReactMemoLab,
  UseStateLab,
  UseRefLab,
  UseReducerLab,
  UseTransitionLab,
  SuspenseLab,
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'src/content', ...slug) + '.mdx';

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContent);

    return (
      <div className="flex flex-col bg-background p-4 md:p-8">
        <div className="mx-auto w-full max-w-4xl prose prose-neutral dark:prose-invert prose-emerald">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6 font-sans">
            {data.title || 'Lesson'}
          </h1>
          <p className="text-xl text-muted-foreground mb-12 border-b border-border/50 pb-8 tracking-wide font-sans">
            {data.description}
          </p>
          <div className="mdx-content">
            <MDXRemote source={content} components={components} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center max-w-md text-center p-8 border border-destructive/20 bg-destructive/10 rounded-xl">
          <h1 className="text-xl font-semibold text-destructive mb-2">Lesson not found.</h1>
          <p className="text-sm text-muted-foreground">The content you are looking for might have been moved or doesn't exist.</p>
        </div>
      </div>
    );
  }
}
