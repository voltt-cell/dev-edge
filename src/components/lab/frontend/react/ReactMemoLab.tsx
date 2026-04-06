'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import { Layers, Zap, MousePointer2, RefreshCw } from 'lucide-react';

const DashboardCard = memo(({ id, active, onToggle }: { id: string, active: boolean, onToggle: (id: string) => void }) => {
  const renderCount = useRef(0);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    renderCount.current++;
    setFlashKey(prev => prev + 1);
  }, [active, onToggle]);

  return (
    <div key={flashKey} className={`p-4 rounded-xl border flex flex-col gap-3 relative overflow-hidden animate-render-flash ${active ? 'bg-indigo-500/10 border-indigo-500/40 shadow-lg shadow-indigo-500/10' : 'bg-white/5 border-white/10'}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Card {id}</span>
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-indigo-500 animate-pulse' : 'bg-white/10'}`} />
      </div>
      <button onClick={() => onToggle(id)} className={`w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${active ? 'bg-indigo-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}>
        {active ? 'Deactivate' : 'Activate'}
      </button>
      <div className="flex items-center gap-2 pt-2 border-t border-white/5">
        <RefreshCw className="h-3 w-3 text-indigo-400 animate-spin-slow" />
        <span className="text-[10px] text-white/40 font-medium">Re-rendered <span className="text-indigo-400 font-bold">{renderCount.current}</span> times</span>
      </div>
    </div>
  );
});

DashboardCard.displayName = 'DashboardCard';

export function ReactMemoLab() {
  const [activeId, setActiveId] = useState<string | null>('A');
  const [parentCount, setParentCount] = useState(0);

  const toggleActive = (id: string) => {
    setActiveId(prev => prev === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-6 text-white p-2">
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden text-center group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">Dashboard Controller</h3>
        <div className="flex items-center justify-center gap-4">
          <span className="text-2xl font-mono font-black text-white/60">{parentCount}</span>
          <button onClick={() => setParentCount(p => p + 1)} className="px-6 py-2 rounded-full bg-white text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
            Re-render Dashboard
          </button>
        </div>
        <p className="text-[10px] text-white/20 italic font-medium px-4">
          👇 Both cards use <code>React.memo</code>. Clicking "Re-render Dashboard" should only flash the parent, NOT the cards!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard id="A" active={activeId === 'A'} onToggle={toggleActive} />
        <DashboardCard id="B" active={activeId === 'B'} onToggle={toggleActive} />
      </div>

      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-[10px] leading-relaxed text-indigo-300 font-medium">
        🔔 <strong>Note:</strong> In this demo, the <code>onToggle</code> function is NOT memoized. <strong>Why aren't the cards flashing then?</strong> Because <code>ReactMemoLab</code> state changes recreate the function, but since I'm passing it down, you'll notice that <code>React.memo</code> shielding is only as strong as its props' stability!
      </div>
    </div>
  );
}
