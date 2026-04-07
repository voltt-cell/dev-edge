/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold border border-emerald-500/50 bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-sm tracking-widest">
            DEV-EDGE
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/labs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Explore Labs
          </Link>

          {mounted && (
            <button
              onClick={() => {
                if (theme === "light") setTheme("dark");
                else if (theme === "dark") setTheme("system");
                else setTheme("light");
              }}
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground border border-border/50 text-foreground"
            >
              {theme === "light" && <Sun className="h-4 w-4" />}
              {theme === "dark" && <Moon className="h-4 w-4" />}
              {theme === "system" && <Laptop className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
