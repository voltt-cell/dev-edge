'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function DebounceShowcase() {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500);

  const [events, setEvents] = useState<{ id: number; type: 'input' | 'debounce'; value: string }[]>([]);

  useEffect(() => {
    if (input) {
      setEvents((prev) => [...prev, { id: Date.now(), type: 'input' as const, value: input }].slice(-10));
    }
  }, [input]);

  useEffect(() => {
    if (debouncedInput) {
      setEvents((prev) => [...prev, { id: Date.now(), type: 'debounce' as const, value: debouncedInput }].slice(-10));
    }
  }, [debouncedInput]);

  return (
    <div className="flex flex-col gap-8 text-white">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/60">Type something fast:</label>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 font-mono text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
          placeholder="debouncing..."
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-red-500/10 p-4 border border-red-500/20">
          <h3 className="text-sm font-semibold text-red-400 mb-2">Raw Input</h3>
          <p className="font-mono text-xl">{input || '\u00A0'}</p>
        </div>
        <div className="rounded-lg bg-green-500/10 p-4 border border-green-500/20">
          <h3 className="text-sm font-semibold text-green-400 mb-2">Debounced (500ms)</h3>
          <p className="font-mono text-xl">{debouncedInput || '\u00A0'}</p>
        </div>
      </div>

      <div className="h-64 overflow-hidden rounded-lg bg-black/50 p-4 font-mono text-xs border border-white/5">
        <h3 className="mb-4 text-white/60">Event Timeline</h3>
        <ul className="flex flex-col gap-2">
          <AnimatePresence>
            {events.map((ev) => (
              <motion.li 
                key={ev.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={ev.type === 'debounce' ? 'text-green-400' : 'text-red-400 opacity-60'}
              >
                [{ev.type === 'debounce' ? 'EXECUTED' : 'CHANGED\u00A0 '}] {ev.value}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
