import Link from 'next/link';
import { Layers, Database, Sparkles, TerminalSquare } from 'lucide-react';

const paths = [
  {
    title: 'Frontend Engineering',
    description: 'Master the browser. Learn React, Vue, CSS architecture, and advanced UI state management.',
    icon: <Layers className="w-8 h-8 text-emerald-400 mb-4" />,
    link: '/learn/frontend/react/debounce',
    color: 'from-emerald-500/20 to-teal-900/40 border-emerald-500/20',
    tags: ['React', 'CSS', 'Performance'],
    comingSoon: false
  },
  {
    title: 'Backend Systems',
    description: 'Scale up your backend. Explore Node.js, databases, caching layers, and microservices.',
    icon: <Database className="w-8 h-8 text-cyan-400 mb-4" />,
    link: '#',
    color: 'from-cyan-500/20 to-blue-900/40 border-cyan-500/20',
    tags: ['Node.js', 'Postgres', 'Redis'],
    comingSoon: true
  },
  {
    title: 'System Design',
    description: 'Architect for millions. Distribute state, shard databases, and handle massive traffic spikes.',
    icon: <TerminalSquare className="w-8 h-8 text-purple-400 mb-4" />,
    link: '#',
    color: 'from-purple-500/20 to-indigo-900/40 border-purple-500/20',
    tags: ['Architecture', 'Scale', 'AWS'],
    comingSoon: true
  },
  {
    title: 'DevOps & Infra',
    description: 'Automate everything. Master Docker, Kubernetes, CI/CD pipelines, and cloud native patterns.',
    icon: <Layers className="w-8 h-8 text-orange-400 mb-4" />,
    link: '/learn/devops/docker/introduction',
    color: 'from-orange-500/20 to-red-900/40 border-orange-500/20',
    tags: ['Docker', 'K8s', 'CI/CD'],
    comingSoon: false
  }
];

export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-background font-sans text-foreground py-24">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 -left-[10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6 mx-4 max-w-6xl w-full">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          The Modern Developer Academy
        </div>

        <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
          Master Software Engineering <br className="hidden sm:block" />
          Through <span className="text-gradient inline-block">Interactive Labs</span>.
        </h1>

        <p className="max-w-[42rem] mt-4 text-lg text-muted-foreground sm:text-2xl leading-relaxed">
          Stop watching passive videos. Learn complex concepts by breaking them in a completely interactive development sandbox.
        </p>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-16 text-left">
          {paths.map((path) => (
            <Link
              href={path.link}
              key={path.title}
              className={`group relative flex flex-col p-8 rounded-2xl border bg-gradient-to-br backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl ${path.color} ${path.comingSoon ? 'cursor-not-allowed opacity-80' : ''}`}
            >
              {path.comingSoon && (
                <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-background/80 border border-border/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                  Coming Soon
                </div>
              )}
              {path.icon}
              <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
              <p className="text-muted-foreground mb-6 flex-1 text-sm">{path.description}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {path.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-background/50 border border-border/50 text-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
