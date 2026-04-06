'use client';

import React, { useState, useEffect } from 'react';
import { Database, Save, RotateCcw, Trash2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function LocalStorageLab() {
  const [key, setKey] = useState('dev_edge_name');
  const [value, setValue] = useState('');
  const [storedValue, setStoredValue] = useLocalStorage<string | null>(key, null);
  const [logs, setLogs] = useState<{ id: string; action: string; time: string }[]>([]);

  // Function to log actions
  const addLog = (action: string) => {
    setLogs(prev => [{ id: `${Date.now()}-${Math.random()}`, action, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 5));
  };

  // Sync the local input value with the stored value when key changes or storedValue updates
  useEffect(() => {
    setValue(storedValue || '');
    addLog(`Key: "${key}" initialized/updated`);
  }, [key, storedValue]);

  const handleSave = () => {
    setStoredValue(value);
    addLog(`Stored "${value}" in "${key}"`);
  };

  const handleClear = () => {
    setStoredValue(null);
    setValue('');
    addLog(`Cleared "${key}"`);
  };

  return (
    <div className="flex flex-col gap-6 text-white font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
            <Save className="h-4 w-4" />
            Writer (The Hook)
          </h3>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-white/40">Storage Key</label>
            <input 
              type="text" 
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-sm font-mono outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-white/40">Value to Store</label>
            <textarea 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-md px-3 py-1.5 text-sm font-mono outline-none focus:border-emerald-500/50 min-h-[80px] resize-none"
              placeholder="Type something to persist..."
            />
          </div>

          <div className="flex gap-2 mt-2">
            <button 
              onClick={handleSave}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold py-2 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              Update Storage
            </button>
            <button 
              onClick={handleClear}
              className="bg-white/10 hover:bg-red-500/20 hover:text-red-400 px-3 py-2 rounded-md transition-all text-white/60"
              title="Delete from storage"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Browser Local Storage
          </h3>
          
          <div className="flex-1 flex flex-col justify-center items-center gap-2 py-8 bg-black/20 rounded-lg border border-white/5 border-dashed">
            {storedValue !== null ? (
              <>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Currently Stored:</span>
                <span className="text-2xl font-mono font-bold text-emerald-400 break-all px-4 text-center">
                  "{storedValue}"
                </span>
              </>
            ) : (
              <span className="text-white/30 italic text-sm">Storage is empty for this key</span>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-white/40">Recent Activity</span>
              <RotateCcw className="h-3 w-3 text-white/20 cursor-pointer hover:text-white/40" onClick={() => setLogs([])} />
            </div>
            <div className="flex flex-col gap-1">
              {logs.length > 0 ? logs.map(log => (
                <div key={log.id} className="text-[9px] font-mono flex justify-between bg-white/5 px-2 py-1 rounded">
                  <span className="text-white/70">{log.action}</span>
                  <span className="text-white/30">{log.time}</span>
                </div>
              )) : (
                <div className="text-[9px] text-white/20 italic text-center py-1">No activity yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
