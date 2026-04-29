'use client';

import React, { useState, useDeferredValue, useMemo } from 'react';

// A slow list component that artificially delays rendering to simulate heavy work
const SlowList = React.memo(({ text }: { text: string }) => {
  // Simulate slow rendering by calculating a large array
  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 5000; i++) {
      list.push(
        <li key={i} className="py-1.5 border-b border-slate-800/50 text-slate-300 font-mono text-sm last:border-0">
          <span className="text-slate-500 mr-2">#{i.toString().padStart(4, '0')}</span>
          {text || 'Empty...'}
        </li>
      );
    }
    return list;
  }, [text]);

  return <ul className="mt-4 h-64 overflow-y-auto bg-slate-950/50 p-4 rounded-xl border border-slate-800 custom-scrollbar">{items}</ul>;
});

SlowList.displayName = 'SlowList';

export default function UseDeferredValueLab() {
  const [text, setText] = useState('');
  // Defer the text value. During fast typing, deferredText will lag behind text.
  const deferredText = useDeferredValue(text);
  
  // We can determine if the UI is currently lagging behind by comparing the two
  const isStale = text !== deferredText;

  return (
    <div className="flex flex-col gap-6 w-full text-slate-200 max-w-2xl mx-auto">
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
        <div className="mb-6 border-b border-emerald-500/20 pb-4">
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <span className="text-2xl">⏱️</span> useDeferredValue Demo
          </h3>
          <p className="text-sm text-emerald-100/70 mt-2">
            Type quickly in the input below. Notice how the input remains perfectly responsive, while the heavy list of 5,000 items updates slightly later when React has idle time.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type to filter..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-lg placeholder:text-slate-500"
            />
            {isStale && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Rendering...
              </div>
            )}
          </div>
          
          <div className="relative group">
            <div className={`transition-all duration-300 ${isStale ? 'opacity-50 blur-[1px]' : 'opacity-100 blur-0'}`}>
               <SlowList text={deferredText} />
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 0.5);
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.8);
        }
      `}} />
    </div>
  );
}
