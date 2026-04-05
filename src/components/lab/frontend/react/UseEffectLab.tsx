'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, RotateCcw, Zap } from 'lucide-react';

export function UseEffectLab() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  const [logs, setLogs] = useState<{ id: number; msg: string; type: 'effect' | 'cleanup' }[]>([]);
  const logId = useRef(0);

  const addLog = (msg: string, type: 'effect' | 'cleanup') => {
    setLogs(prev => [{ id: logId.current++, msg, type }, ...prev].slice(0, 5));
  };

  // Effect that synchronizes with count
  useEffect(() => {
    addLog(`Effect running (count=${count})`, 'effect');
    
    return () => {
      addLog(`Cleanup running (count=${count})`, 'cleanup');
    };
  }, [count]); // Only run when count changes

  return (
    <div className="flex flex-col gap-6 text-white font-sans p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Controls */}
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Reactive State
          </h3>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5">
              <span className="text-xs text-white/60">Dependency (count)</span>
              <div className="flex items-center gap-3">
                <span className="text-xl font-mono font-bold text-emerald-400">{count}</span>
                <button 
                  onClick={() => setCount(c => c + 1)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black px-3 py-1 rounded text-xs font-bold transition-all"
                >
                  +1
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5">
              <span className="text-xs text-white/60">Independent (other)</span>
              <div className="flex items-center gap-3">
                <span className="text-xl font-mono font-bold text-white/40">{other}</span>
                <button 
                  onClick={() => setOther(c => c + 1)}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs font-bold transition-all"
                >
                  +1
                </button>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-white/30 italic leading-relaxed">
            Changing "count" triggers the effect because it's in the dependency array. 
            Changing "other" does NOT trigger the effect.
          </p>
        </div>

        {/* Console / Monitor */}
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-black/40 border border-white/10 overflow-hidden min-h-[200px]">
          <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Effect Monitor
          </h3>

          <div className="flex flex-col gap-2 flex-1">
            {logs.length > 0 ? logs.map(log => (
              <div 
                key={log.id} 
                className={`text-[10px] font-mono p-2 rounded border animate-in fade-in slide-in-from-right-2 ${
                  log.type === 'effect' 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{log.type.toUpperCase()}</span>
                  <span className="text-white/20">now</span>
                </div>
                <div className="mt-1 opacity-80">{log.msg}</div>
              </div>
            )) : (
              <div className="flex-1 flex items-center justify-center text-white/10 italic text-xs">
                Waiting for changes...
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setLogs([])}
            className="text-[10px] uppercase font-bold text-white/20 hover:text-white/40 mt-2 text-center"
          >
            Clear Monitor
          </button>
        </div>
      </div>
    </div>
  );
}
