'use client';

import React, { useState, useTransition } from 'react';
import { Search, Loader2 } from 'lucide-react';

// Generate a massive list of mock items
const massiveList = Array.from({ length: 20000 }, (_, i) => `Interactive Item ${i + 1}`);

export function UseTransitionLab() {
  const [query, setQuery] = useState('');
  const [deferredQuery, setDeferredQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Urgent update (keeps typing snappy)
    setQuery(value);
    
    // Non-urgent update (heavy filtering operation)
    startTransition(() => {
      setDeferredQuery(value);
    });
  };

  const filteredList = massiveList.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6 p-6 max-h-[600px]">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
          Concurrent UI with useTransition
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto text-sm">
          Try typing in the search box. The input remains fully responsive even while React is working hard to filter {massiveList.length.toLocaleString()} items in the background!
        </p>
      </div>

      <div className="relative w-full max-w-lg mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-white placeholder:text-muted-foreground"
          placeholder="Search items..."
          value={query}
          onChange={handleSearch}
        />
        {isPending && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-emerald-400">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center max-w-lg mx-auto w-full text-xs text-muted-foreground uppercase tracking-widest px-2">
        <span>Displaying {filteredList.length} items</span>
        {isPending && <span className="text-emerald-500 font-bold animate-pulse">Rendering...</span>}
      </div>

      <div className="w-full max-w-lg mx-auto border border-white/5 bg-black/20 rounded-xl p-4 overflow-y-auto h-[300px] custom-scrollbar shadow-inner">
        {filteredList.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            No items match your search.
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredList.map((item) => (
              <li 
                key={item} 
                className="py-2 px-3 bg-white/5 rounded-lg border border-white/5 text-sm text-zinc-300 transition-colors hover:bg-white/10"
              >
                {/* Highlight matched text */}
                {deferredQuery ? (
                  <>
                    {item.split(new RegExp(`(${deferredQuery})`, 'gi')).map((part, i) =>
                      part.toLowerCase() === deferredQuery.toLowerCase() ? (
                        <span key={i} className="bg-emerald-500/30 text-emerald-300 rounded px-0.5">{part}</span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
