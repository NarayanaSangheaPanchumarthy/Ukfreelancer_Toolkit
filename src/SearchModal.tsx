import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import Fuse from 'fuse.js';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  tools: { title: string; description: string; tag: string; icon: any }[];
  navItems: string[];
}

export default function SearchModal({ isOpen, onClose, onNavigate, tools, navItems }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      setQuery('');
    }
  }, [isOpen, onClose]);

  const toolsFuse = useMemo(() => new Fuse(tools, {
    keys: ['title', 'description', 'tag'],
    threshold: 0.3,
    distance: 100,
    ignoreLocation: true
  }), [tools]);

  const navItemsFuse = useMemo(() => new Fuse(navItems.map(item => ({ name: item })), {
    keys: ['name'],
    threshold: 0.3,
    distance: 100,
    ignoreLocation: true
  }), [navItems]);

  if (!isOpen) return null;

  const filteredTools = query.trim() !== '' 
    ? toolsFuse.search(query).map(result => result.item)
    : [];

  const filteredNavItems = query.trim() !== ''
    ? navItemsFuse.search(query).map(result => result.item.name)
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-slate-900/40 backdrop-blur-sm print:hidden">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex items-center p-4 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tools, pages, and calculators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-lg text-slate-800 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors ml-3 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 flex-1">
          {query.trim() === '' ? (
            <div className="text-center py-12 text-slate-500">
              <Search className="w-8 h-8 mx-auto mb-3 text-slate-300" />
              <p>Type to start searching...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNavItems.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Pages & Sections</h3>
                  <div className="space-y-1">
                    {filteredNavItems.map(item => (
                      <button
                        key={item}
                        onClick={() => {
                          onNavigate(item);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors text-left group"
                      >
                        <span className="font-semibold text-slate-700 group-hover:text-slate-900">{item}</span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredTools.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Tools</h3>
                  <div className="space-y-2">
                    {filteredTools.map((tool, idx) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            // If a tool is listed, we probably navigate to its tab or corresponding section.
                            // Some tools might not have dedicated tabs, so we might navigate to "Planning Tools" etc.
                            // If it matches exactly navItems, we can do it.
                            if (navItems.includes(tool.title)) {
                              onNavigate(tool.title);
                            } else {
                              // Just go to Home for now or related category if possible.
                              // Our tab system maps title mostly where it is available.
                              onNavigate(tool.title); 
                            }
                            onClose();
                          }}
                          className="w-full flex items-start p-3 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 rounded-lg transition-all text-left"
                        >
                          <div className="w-10 h-10 bg-slate-50 rounded flex items-center justify-center shrink-0 mr-4 border border-slate-200">
                            <Icon className="w-5 h-5 text-slate-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-slate-800 text-sm">{tool.title}</span>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-white px-2 py-0.5 border border-slate-200 rounded-full">
                                {tool.tag}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">{tool.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {filteredNavItems.length === 0 && filteredTools.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <p>No results found for "{query}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
