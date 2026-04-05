import Link from 'next/link';
import { getAllLessons } from '@/lib/content';
import { Layers, Database, TerminalSquare, FlaskConical, ArrowRight } from 'lucide-react';

export default function LabsPage() {
  const lessons = getAllLessons();

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

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
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
            <Link 
              key={lesson.path}
              href={`/learn/${lesson.path}`}
              className={`group relative flex flex-col p-6 rounded-2xl border bg-gradient-to-br transition-all hover:scale-[1.02] hover:shadow-xl ${getGradient(lesson.category)}`}
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

              <div className="flex items-center text-xs font-bold text-emerald-500 group-hover:gap-2 transition-all">
                START LAB <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border/50 rounded-3xl">
            <p className="text-muted-foreground italic">No labs found in the content directory.</p>
          </div>
        )}
      </div>
    </div>
  );
}
