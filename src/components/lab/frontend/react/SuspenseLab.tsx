'use client';

import React, { useState, Suspense, lazy } from 'react';
import { Loader2, Box, RefreshCw, BarChart3, PieChart, Activity } from 'lucide-react';

// Simulated "Heavy" components that would normally be separate files.
// We use a custom lazy initializer to simulate network delay.
const HeavyAnalytics = lazy(() => 
  new Promise<{ default: React.ComponentType }>(resolve => 
    setTimeout(() => resolve({ default: () => (
      <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-700">
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <BarChart3 className="w-8 h-8 mb-2" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Revenue</span>
          <span className="text-2xl font-black tabular-nums">+24.5%</span>
        </div>
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <PieChart className="w-8 h-8 mb-2" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Usage</span>
          <span className="text-2xl font-black tabular-nums">12.4k</span>
        </div>
        <div className="col-span-2 p-5 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-between text-zinc-300">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1 opacity-50">Heartbeat</p>
              <p className="text-base font-bold tracking-tight">Systems Nominal</p>
            </div>
          </div>
          <div className="text-sm font-mono text-emerald-400/80 bg-emerald-400/10 px-2 py-1 rounded">99.99%</div>
        </div>
      </div>
    )}), 2000)
  )
);

function Skeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="h-32 rounded-xl bg-white/[0.03] border border-white/[0.05] animate-pulse flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-emerald-500/20 animate-spin" />
      </div>
      <div className="h-32 rounded-xl bg-white/[0.03] border border-white/[0.05] animate-pulse" />
      <div className="col-span-2 h-20 rounded-xl bg-white/[0.03] border border-white/[0.05] animate-pulse" />
    </div>
  );
}

export function SuspenseLab() {
  const [loadCount, setLoadCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6 w-full max-w-2xl mx-auto">
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 font-black tracking-tight uppercase">
          Bundles & Suspense
        </h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
          In large React apps, we split our code into smaller chunks. Click below to simulate loading a <span className="text-white font-semibold">"Heavy Module"</span> and see how the Suspense boundary handles the gap.
        </p>
      </div>

      <div className="w-full bg-zinc-950/50 border border-white/[0.08] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3 text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/5 text-[10px] font-mono font-bold uppercase tracking-widest">
            <Box className="w-3.5 h-3.5" />
            Chunks: 4 / 48
          </div>
          <button
            onClick={() => setLoadCount(prev => prev + 1)}
            className="group/btn flex items-center gap-2.5 px-6 py-2.5 bg-emerald-500 text-black rounded-full transition-all font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
          >
            <RefreshCw className="w-3.5 h-3.5 transition-transform group-hover/btn:rotate-180 duration-500" />
            Reload Module
          </button>
        </div>

        <div className="relative min-h-[220px]">
          <Suspense key={loadCount} fallback={<Skeleton />}>
            <HeavyAnalytics />
          </Suspense>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 p-5 rounded-3xl flex items-start gap-4 shadow-inner">
        <div className="mt-1 p-2 bg-emerald-500/20 rounded-xl">
          <Activity className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-sm">
          <span className="font-black text-emerald-400 uppercase tracking-[0.2em] text-[10px] block mb-2">Production Context</span>
          <p className="text-zinc-400 leading-relaxed font-medium">
            This is the standard for modern dashboards. By using <code className="text-emerald-300">lazy()</code>, companies reduce their initial load time by several megabytes, serving features only as an <strong className="text-white">"On-Demand"</strong> bundle.
          </p>
        </div>
      </div>
    </div>
  );
}
