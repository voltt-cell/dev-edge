/* eslint-disable react-hooks/purity */
'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Cpu, Zap, Search, RefreshCw, Layers } from 'lucide-react';

export function UseMemoLab() {
  const [search, setSearch] = useState('');
  const [isSlowEnabled, setIsSlowEnabled] = useState(false);
  const [unrelatedCount, setUnrelatedCount] = useState(0);
  
  // Simulated heavy list
  const largeList = useMemo(() => Array.from({ length: 1000 }, (_, i) => `Item #${i}`), []);

  // The "Expensive" calculation
  const filteredList = useMemo(() => {
    if (isSlowEnabled) {
      // Artificial delay to simulate heavy processing
      const start = performance.now();
      while (performance.now() - start < 100) {}
    }
    return largeList.filter(item => item.toLowerCase().includes(search.toLowerCase()));
  }, [search, isSlowEnabled, largeList]);

  return (
    <div className="flex flex-col gap-6 text-white p-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Control Section */}
        <div className="flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
          
          <div className="flex items-center justify-between relative z-10">
            <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2 uppercase tracking-tight">
              <Cpu className="h-4 w-4" />
              Logic Lab
            </h3>
            
            <button 
              onClick={() => setIsSlowEnabled(!isSlowEnabled)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
                isSlowEnabled 
                  ? 'bg-red-500/20 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                  : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isSlowEnabled ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">Slow Mode</span>
            </button>
          </div>

          <div className="flex flex-col gap-4 relative z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <input 
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-emerald-500/50 focus:outline-none transition-all"
              />
            </div>
            
            <button 
              onClick={() => setUnrelatedCount(c => c + 1)}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-black uppercase tracking-widest text-white/60 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className={`h-3 w-3 ${unrelatedCount > 0 ? 'animate-spin-once' : ''}`} />
              Update Unrelated State: {unrelatedCount}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-[11px] leading-relaxed text-emerald-300/60 transition-all">
            <p className="font-medium">
              {isSlowEnabled 
                ? "🚀 Even though 'Slow Mode' is ON, clicking the Unrelated button is INSTANT because useMemo skips the sorting logic!" 
                : "Enable 'Slow Mode' above to see how useMemo protects your UI from heavy calculations during independent updates."}
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex flex-col gap-4 p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Result List</span>
            <span className="text-[10px] font-mono text-emerald-400/60 uppercase">{filteredList.length} matches</span>
          </div>
          
          <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredList.slice(0, 5).map(item => (
              <div key={item} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/70">
                {item}
              </div>
            ))}
            {filteredList.length > 5 && (
              <div className="text-center py-2 text-[10px] text-white/20 italic font-mono">
                + {filteredList.length - 5} more items
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
