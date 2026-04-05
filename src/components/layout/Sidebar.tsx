"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Folder, FileText, ArrowLeft } from "lucide-react";
import { FileNode } from "@/lib/content";

export function Sidebar({ contentTree }: { contentTree: FileNode[] }) {
  const pathname = usePathname();
  
  // Get the current category from the pathname (e.g., 'frontend' from '/learn/frontend/react')
  const currentCategory = pathname.split('/')[2];

  // Filter the tree to only show the currently active category
  const activeTree = contentTree.filter(node => node.slug === currentCategory);

  function renderTree(nodes: FileNode[], level = 0) {
    if (!nodes) return null;
    return (
      <ul className={`flex flex-col space-y-1 ${level > 0 ? "ml-4 border-l border-border/50 pl-4 mt-2" : ""}`}>
        {nodes.map((node) => {
          if (node.type === "directory") {
            const isCategoryRoot = level === 0;
            return (
              <li key={node.path} className="flex flex-col">
                <div className={`flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground px-3 ${isCategoryRoot ? "mt-2 mb-2 text-lg" : "mt-4 mb-1"}`}>
                  <Folder className={`h-4 w-4 ${isCategoryRoot ? "text-emerald-400 h-5 w-5" : "text-emerald-500"}`} />
                  <span className="capitalize">{node.name.replace(/-/g, ' ')}</span>
                </div>
                {renderTree(node.children || [], level + 1)}
              </li>
            );
          } else {
            const href = `/learn/${node.path}`;
            const isActive = pathname === href;
            return (
              <li key={node.path}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-500 font-medium border border-emerald-500/20"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <FileText className="h-3.5 w-3.5 opacity-70" />
                  <span className="capitalize">{node.name.replace(/-/g, ' ')}</span>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    );
  }

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-border/50 py-6 pr-6 md:sticky md:block lg:py-8 max-w-[280px]">
      <Link 
        href="/" 
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all mb-4 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Link>
      
      <div className="flex flex-col">
        {renderTree(activeTree)}
      </div>
    </aside>
  );
}
