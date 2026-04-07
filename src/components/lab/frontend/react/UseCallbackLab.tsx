/* eslint-disable react-hooks/refs, react/no-unescaped-entities */
'use client';

import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import { RefreshCw, Zap, Layers, Sparkles } from 'lucide-react';

const Child = memo(({ onIncrement, count, title, stable }: { onIncrement: () => void, count: number, title: string, stable: boolean }) => {
  const renderCount = useRef(0);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    renderCount.current++;
    setFlashKey(prev => prev + 1);
  }, [count, onIncrement]);

  return (
    <div key={flashKey} className={`p-5 rounded-2xl border flex flex-col gap-4 relative overflow-hidden animate-render-flash ${stable ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
      <div className={`absolute top-0 right-0 px-2 py-1 text-[10px] font-black uppercase tracking-widest ${stable ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
        {stable ? 'Stable' : 'Unstable'}
      </div>
      <div className="flex flex-col">
        <span className="text-[12px] text-white/40 uppercase font-black tracking-widest">{title}</span>
        <span className="text-[10px] text-white/20 italic font-medium">{stable ? 'Receives same function' : 'Function is new every render'}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-mono font-black text-white">{count}</span>
        <button onClick={onIncrement} className={`px-4 py-2 rounded-xl text-xs font-black shadow-lg transition-all active:scale-95 ${stable ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-amber-500 text-black shadow-amber-500/20'}`}>
          INCREMENT
        </button>
      </div>
      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
        <RefreshCw className={`h-3 w-3 ${stable ? 'text-emerald-500' : 'text-amber-500'} animate-spin-slow`} />
        <span className="text-[11px] text-white/50 font-medium">Re-rendered <span className={stable ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>{renderCount.current}</span> times</span>
      </div>
    </div>
  );
});

Child.displayName = 'Child';

export function UseCallbackLab() {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const stableIncrement = useCallback(() => {
    setChildCount(c => c + 1);
  }, []);

  const unstableIncrement = () => {
    setChildCount(c => c + 1);
  };

  return (
    <div className="flex flex-col gap-8 text-white p-2">
      <div className="flex flex-col gap-4 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden group items-center text-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
        <div className="flex flex-col items-center">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Parent Simulator</h2>
          <span className="text-[2xl] font-mono font-black mt-2 text-white">{parentCount}</span>
        </div>
        <button onClick={() => setParentCount(p => p + 1)} className="px-8 py-3 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
          Re-render Parent
        </button>
        <div className="mt-4 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 max-w-sm">
          <p className="text-[11px] text-violet-300 font-medium leading-relaxed">
            👆 Click to update Parent. Notice how the <span className="text-amber-400 font-bold italic">Unstable</span> child flashes even though its count hasn't changed!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Child title="With useCallback" count={childCount} onIncrement={stableIncrement} stable={true} />
        <Child title="Without useCallback" count={childCount} onIncrement={unstableIncrement} stable={false} />
      </div>
    </div>
  );
}
