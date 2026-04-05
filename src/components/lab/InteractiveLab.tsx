'use client';

import React from 'react';

export function InteractiveLab({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="ml-4 text-xs font-mono text-white/50">{title}</div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
