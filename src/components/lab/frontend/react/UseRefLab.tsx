'use client';

import React, { useState, useRef } from 'react';
import { Play, Square, TimerReset, Flag } from 'lucide-react';

export function UseRefLab() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  };

  const stopTimer = () => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    if (isRunning) {
      setLaps((prev) => [...prev, time]);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
          Mutable Timers with useRef
        </h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          <code>useRef</code> lets us store the interval ID across renders without causing those renders. This makes it perfect for managing intervals and external connections!
        </p>
      </div>

      <div className="bg-background/50 border border-border/50 rounded-3xl p-8 shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-mono text-5xl md:text-6xl font-black text-white tracking-widest bg-black/20 p-6 rounded-2xl border border-white/5 shadow-inner">
            {formatTime(time)}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-semibold rounded-xl transition-all hover:scale-105"
            >
              <Play className="w-5 h-5" /> Start
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-xl transition-all hover:scale-105"
            >
              <Square className="w-5 h-5" /> Stop
            </button>
          )}

          <button
            onClick={recordLap}
            disabled={!isRunning}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:hover:scale-100 hover:scale-105"
          >
            <Flag className="w-5 h-5" /> Lap
          </button>

          <button
            onClick={resetTimer}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold rounded-xl transition-all hover:scale-105"
          >
            <TimerReset className="w-5 h-5" /> Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className="border-t border-white/10 pt-6">
            <h4 className="text-muted-foreground text-sm font-semibold mb-4 uppercase tracking-wider">Laps</h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
              {laps.map((lap, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg">
                  <span className="text-zinc-400 font-mono text-sm">Lap {idx + 1}</span>
                  <span className="font-mono font-semibold text-white">{formatTime(lap)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
