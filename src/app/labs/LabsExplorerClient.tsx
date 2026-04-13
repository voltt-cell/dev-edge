'use client';

import React, { useState } from 'react';
import { Layers, Database, TerminalSquare, FlaskConical, ArrowRight, ArrowLeft } from 'lucide-react';
import { Lesson } from '@/lib/content';

// Import all lab wrappers to register them
import { InteractiveLab } from '@/components/lab/InteractiveLab';
import { ReactIntroLab } from '@/components/lab/frontend/react/ReactIntroLab';
import { UseStateLab } from '@/components/lab/frontend/react/UseStateLab';
import { UseEffectLab } from '@/components/lab/frontend/react/UseEffectLab';
import { UseRefLab } from '@/components/lab/frontend/react/UseRefLab';
import { UseReducerLab } from '@/components/lab/frontend/react/UseReducerLab';
import { DebounceShowcase } from '@/components/lab/frontend/react/DebounceShowcase';
import { LocalStorageLab } from '@/components/lab/frontend/react/LocalStorageLab';
import { ContextApiLab } from '@/components/lab/frontend/react/ContextApiLab';
import { UseMemoLab } from '@/components/lab/frontend/react/UseMemoLab';
import { UseCallbackLab } from '@/components/lab/frontend/react/UseCallbackLab';
import { ReactMemoLab } from '@/components/lab/frontend/react/ReactMemoLab';
import { UseTransitionLab } from '@/components/lab/frontend/react/UseTransitionLab';
import { SuspenseLab } from '@/components/lab/frontend/react/SuspenseLab';
import { ReactPortalsLab } from '@/components/lab/frontend/react/ReactPortalsLab';

const labRegistry: Record<string, React.ReactNode> = {
  'frontend/react/intro': <ReactIntroLab />,
  'frontend/react/hooks-usestate': <UseStateLab />,
  'frontend/react/hooks-useeffect': <UseEffectLab />,
  'frontend/react/hooks-useref': <UseRefLab />,
  'frontend/react/hooks-usereducer': <UseReducerLab />,
  'frontend/react/debounce': <DebounceShowcase />,
  'frontend/react/custom-hooks': <LocalStorageLab />,
  'frontend/react/context-api': <ContextApiLab />,
  'frontend/react/hooks-usememo': <UseMemoLab />,
  'frontend/react/hooks-usecallback': <UseCallbackLab />,
  'frontend/react/react-memo': <ReactMemoLab />,
  'frontend/react/hooks-usetransition': <UseTransitionLab />,
  'frontend/react/code-splitting-suspense': <SuspenseLab />,
  'frontend/react/portals': <ReactPortalsLab />,
};

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend': return <Layers className="h-5 w-5 text-emerald-400" />;
    case 'backend': return <Database className="h-5 w-5 text-cyan-400" />;
    case 'system-design': return <TerminalSquare className="h-5 w-5 text-purple-400" />;
    default: return <FlaskConical className="h-5 w-5 text-orange-400" />;
  }
};

const getGradient = (category: string) => {
  switch (category.toLowerCase()) {
    case 'frontend': return 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20';
    case 'backend': return 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20';
    case 'system-design': return 'from-purple-500/10 to-purple-500/5 border-purple-500/20';
    default: return 'from-orange-500/10 to-orange-500/5 border-orange-500/20';
  }
};

export function LabsExplorerClient({ lessons }: { lessons: Lesson[] }) {
  const [selectedLabPath, setSelectedLabPath] = useState<string | null>(null);

  const selectedLesson = selectedLabPath 
    ? lessons.find((l) => l.path === selectedLabPath) 
    : null;

  if (selectedLesson) {
    const LabComponent = labRegistry[selectedLesson.path];

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={() => setSelectedLabPath(null)}
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-all shadow-md mt-4 ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explorer
        </button>

        <div className="mb-6 flex flex-col gap-2">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4">
            <div className="p-3 rounded-xl bg-background border border-white/10 shadow-lg">
              {getIcon(selectedLesson.category)}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">
                {selectedLesson.technology} Lab
              </div>
              <h1 className="text-3xl font-bold">{selectedLesson.title}</h1>
            </div>
          </div>
        </div>

        {LabComponent ? (
          <InteractiveLab title="Interactive Session">
            {LabComponent}
          </InteractiveLab>
        ) : (
          <div className="my-12 flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/20 rounded-2xl bg-white/5">
            <FlaskConical className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-zinc-300">Lab Under Construction</h3>
            <p className="text-sm text-zinc-500 max-w-sm mt-2">
              The interactive lab for this topic is currently being built. Check back soon!
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500 mb-4">
          <FlaskConical className="h-3 w-3" />
          Interactive Lab Explorer
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          Explore All <span className="text-gradient">Labs</span>.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Dive into our collection of interactive labs designed to help you master complex engineering concepts through hands-on experimentation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <button 
            key={lesson.path}
            onClick={() => setSelectedLabPath(lesson.path)}
            className={`group relative flex flex-col text-left p-6 rounded-2xl border bg-gradient-to-br transition-all hover:scale-[1.02] hover:shadow-xl ${getGradient(lesson.category)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-background/50 border border-border/50">
                {getIcon(lesson.category)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-background/50 px-2 py-1 rounded">
                {lesson.technology}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
              {lesson.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-2">
              {lesson.description}
            </p>

            <div className="flex items-center text-xs font-bold text-emerald-500 group-hover:gap-2 transition-all mt-auto">
              START LAB <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
            </div>
          </button>
        ))}
      </div>

      {lessons.length === 0 && (
        <div className="text-center py-20 border border-dashed border-border/50 rounded-3xl">
          <p className="text-muted-foreground italic">No labs found in the content directory.</p>
        </div>
      )}
    </>
  );
}
