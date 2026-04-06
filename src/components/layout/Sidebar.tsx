"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Folder, FileText, ArrowLeft, MoreHorizontal } from "lucide-react";
import { FileNode } from "@/lib/content";

export function Sidebar({ contentTree }: { contentTree: FileNode[] }) {
  const pathname = usePathname();
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  // Get the current category from the pathname (e.g., 'frontend' from '/learn/frontend/react')
  const currentCategory = pathname.split('/')[2];

  // Filter the tree to only show the currently active category
  const activeTree = contentTree.filter(node => node.slug === currentCategory);

  // Initialize all directory paths as expanded by default
  useEffect(() => {
    const allPaths = new Set<string>();
    function collectPaths(nodes: FileNode[]) {
      nodes.forEach(node => {
        if (node.type === "directory") {
          allPaths.add(node.path);
          if (node.children) collectPaths(node.children);
        }
      });
    }
    collectPaths(activeTree);
    setExpandedPaths(allPaths);
  }, [contentTree, currentCategory]);

  const togglePath = (path: string) => {
    setExpandedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  function renderTree(nodes: FileNode[], level = 0) {
    if (!nodes) return null;
    return (
      <ul className={`flex flex-col space-y-0.5 ${level > 0 ? "ml-4 border-l border-border/50 pl-4 mt-1 mb-2" : ""}`}>
        {nodes.map((node) => {
          if (node.type === "directory") {
            const isCategoryRoot = level === 0;
            const isExpanded = expandedPaths.has(node.path);
            
            return (
              <li key={node.path} className="flex flex-col">
                <button
                  onClick={() => togglePath(node.path)}
                  className={`flex items-center justify-between w-full text-left transition-all group ${
                    isCategoryRoot 
                      ? "mt-4 mb-2 py-1 pr-3" 
                      : "mt-3 mb-1 py-1 pr-3 hover:bg-accent/50 rounded-lg"
                  }`}
                >
                  <div className={`flex items-center gap-2 font-black tracking-tight text-foreground ${
                    isCategoryRoot ? "text-lg uppercase" : "text-sm"
                  }`}>
                    <Folder className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                      isCategoryRoot ? "text-emerald-400 h-5 w-5" : "text-emerald-500/70"
                    }`} />
                    <span className={isCategoryRoot ? "bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60" : ""}>
                      {node.name.replace(/-/g, ' ')}
                    </span>
                  </div>
                  {!isCategoryRoot && (
                    <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ${
                      isExpanded ? "rotate-90" : ""
                    }`} />
                  )}
                </button>
                
                <div className={`grid transition-all duration-300 ease-in-out ${
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}>
                  <div className="overflow-hidden">
                    {renderTree(node.children || [], level + 1)}
                  </div>
                </div>
              </li>
            );
          } else {
            const href = `/learn/${node.path}`;
            const isActive = pathname === href;
            return (
              <li key={node.path}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all relative group ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-emerald-500/20"
                      : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 w-1 h-4 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  )}
                  <FileText className={`h-3.5 w-3.5 transition-colors ${isActive ? 'text-emerald-400' : 'opacity-40 group-hover:opacity-70'}`} />
                  <span className="capitalize">{node.name.replace(/-/g, ' ')}</span>
                  {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    );
  }

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-white/5 py-6 pr-6 md:sticky md:block lg:py-8 min-w-[280px] max-w-[340px] scrollbar-hide">
      <Link 
        href="/" 
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-sm font-black text-white/40 hover:text-white hover:bg-white/[0.05] hover:border-white/10 transition-all mb-8 group tracking-widest uppercase"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Home Studio
      </Link>
      
      <div className="flex flex-col px-1">
        {renderTree(activeTree)}
      </div>
    </aside>
  );
}
