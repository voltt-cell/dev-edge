'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChevronDown, Code, CheckCircle } from 'lucide-react';

// --- COMPOUND COMPONENT IMPLEMENTATION ---

// 1. Create Context
interface AccordionContextType {
  activeItem: string | null;
  toggleItem: (value: string) => void;
}
const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// 2. Parent Component
function Accordion({ children, className = '' }: { children: ReactNode, className?: string }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (value: string) => {
    setActiveItem(prev => prev === value ? null : value);
  };

  return (
    <AccordionContext.Provider value={{ activeItem, toggleItem }}>
      <div className={`border border-slate-700/50 rounded-xl overflow-hidden bg-slate-900/50 divide-y divide-slate-700/50 ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// 3. Child Component - Item Context
interface AccordionItemContextType {
  value: string;
}
const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

function AccordionItem({ children, value }: { children: ReactNode, value: string }) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className="flex flex-col group">
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

// 4. Child Component - Header/Trigger
function AccordionHeader({ children }: { children: ReactNode }) {
  const context = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!context || !itemContext) {
    throw new Error('Accordion components must be used within Accordion');
  }

  const { activeItem, toggleItem } = context;
  const { value } = itemContext;
  const isOpen = activeItem === value;

  return (
    <button
      onClick={() => toggleItem(value)}
      className="flex items-center justify-between px-5 py-4 w-full text-left text-slate-200 font-medium hover:bg-slate-800/50 transition-colors focus:outline-none"
    >
      <span>{children}</span>
      <ChevronDown
        className={`w-4 h-4 text-emerald-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

// 5. Child Component - Content/Panel
function AccordionPanel({ children }: { children: ReactNode }) {
  const context = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!context || !itemContext) {
    throw new Error('Accordion components must be used within Accordion');
  }

  const { activeItem } = context;
  const { value } = itemContext;
  const isOpen = activeItem === value;

  if (!isOpen) return null;

  return (
    <div className="px-5 py-4 text-sm text-slate-400 bg-slate-900/30 animate-in slide-in-from-top-2 fade-in duration-200">
      {children}
    </div>
  );
}

// Optional: Assign sub-components to the main component for a cleaner API (Accordion.Item)
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;


// --- LAB DEMONSTRATION ---

export function CompoundComponentsLab() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full text-slate-200 max-w-2xl mx-auto">

      <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6 border-b border-emerald-500/20 pb-4">
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Highly Expressive Accordion
          </h3>
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg transition-colors border border-emerald-500/30"
          >
            <Code className="w-4 h-4" /> {showCode ? 'Hide Source' : 'View API Code'}
          </button>
        </div>

        {showCode ? (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm font-mono overflow-x-auto text-emerald-300">
            <pre>{`// Look how clean and expressive this is!
// No messy "items" array prop.
// You have full control over the markup.

<Accordion>
  <Accordion.Item value="item-1">
    <Accordion.Header>Why use Compound Components?</Accordion.Header>
    <Accordion.Panel>To avoid massive "prop-drilling" and allow UI flexibility.</Accordion.Panel>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.Header>Can I add custom icons here?</Accordion.Header>
    <Accordion.Panel>
      <div className="flex gap-2">
         🚀 Yes! Because you control the children elements!
      </div>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>`}</pre>
          </div>
        ) : (
          <div className="w-full">
            <p className="text-sm text-emerald-100/70 mb-6">
              Interact with the accordion below. Notice how the parent <code>&lt;Accordion&gt;</code> manages the state of which item is open, and seamlessly shares it with the <code>&lt;Accordion.Header&gt;</code> and <code>&lt;Accordion.Panel&gt;</code> using React Context!
            </p>

            <Accordion className="shadow-lg">
              <Accordion.Item value="react">
                <Accordion.Header>Why use Compound Components?</Accordion.Header>
                <Accordion.Panel>
                  <p>Compound components allow you to build expressive, declarative APIs. Instead of passing massive configuration objects as props (like <code>{`items={[{title: '...', content: '...'}]}`}</code>), you let developers compose the UI exactly how they want using explicit child components.</p>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="structure">
                <Accordion.Header>How does State sharing work?</Accordion.Header>
                <Accordion.Panel>
                  <p>The parent <code>&lt;Accordion&gt;</code> component creates a React Context. It holds the <code>activeItem</code> state. The child components (Header, Panel) consume this context invisibly behind the scenes. This is known as "Implicit State Sharing".</p>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="flexibility">
                <Accordion.Header>Total Markup Flexibility</Accordion.Header>
                <Accordion.Panel>
                  <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-lg border border-slate-700/50 text-emerald-300">
                    <span className="text-xl">🎨</span>
                    <div>
                      {
                        "Because the consumer writes out the JSX elements, they can easily wrap titles in <h3> tags, add custom icons, or inject arbitrary layouts without the library author needing to add support for it via messy props like renderHeaderIcon={() => ...}!"
                      }
                    </div>                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
