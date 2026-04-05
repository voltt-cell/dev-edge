'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Zap } from 'lucide-react';

export function ReactIntroLab() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-6 text-white font-sans p-2">
      <div className="flex flex-col gap-4 rounded-xl bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            React State Demo
          </h3>
          <div className="text-[10px] uppercase tracking-widest text-white/30">src/components/Counter.tsx</div>
        </div>

        <div className="flex flex-col items-center justify-center py-10 bg-black/40 rounded-lg border border-white/5 relative overflow-hidden">
          {/* Abstract background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-mono">Current State Value</div>
          <div className="text-6xl font-black text-emerald-400 font-mono tracking-tighter mb-6 relative">
            {count}
          </div>

          <div className="flex gap-4 relative z-10">
            <button 
              onClick={() => setCount(c => c + 1)}
              className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <Play className="h-4 w-4 fill-current" />
              Increment
            </button>
            <button 
              onClick={() => setCount(0)}
              className="bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 px-4 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-black/20 border border-white/5 font-mono text-xs leading-relaxed">
          <div className="text-emerald-500/60 mb-2">// How this works under the hood:</div>
          <div className="flex gap-2 mb-1">
            <span className="text-purple-400">const</span> 
            <span>[count, setCount] = </span>
            <span className="text-cyan-400">useState</span>(
            <span className="text-orange-400">0</span>
            );
          </div>
          <div className="text-white/30 italic">React watches "count" and automatically re-renders the UI whenever "setCount" is called.</div>
        </div>
      </div>
    </div>
  );
}
