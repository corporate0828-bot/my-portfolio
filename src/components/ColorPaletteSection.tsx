import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Check,
  Copy,
  Sparkles,
  ShieldCheck,
  Eye,
  Sliders,
  Sun,
  Moon,
  Layers,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COLOR_TOKENS, PALETTE_THEMES } from '../data/portfolioData';
import { PaletteTheme } from '../types';

interface ColorPaletteSectionProps {
  currentTheme: PaletteTheme;
  onSelectTheme: (theme: PaletteTheme) => void;
}

export const ColorPaletteSection: React.FC<ColorPaletteSectionProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    try {
      confetti({ particleCount: 20, spread: 40, origin: { y: 0.85 } });
    } catch (e) {}
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="palette" className="py-20 relative bg-slate-950/70 border-t border-b border-slate-900 overflow-hidden">
      {/* Dynamic Ambient Background Glow based on current active theme */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] blur-[150px] rounded-full pointer-events-none -z-10 transition-all duration-700 opacity-20"
        style={{ backgroundColor: currentTheme.primary }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
              <Palette className="w-3.5 h-3.5" />
              <span>Design System & Accessibility Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Curated Professional Color Palette
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Engineered with mathematical contrast ratios compliant with <strong className="text-emerald-400">WCAG AA & AAA</strong> standards. Harmonizes deep obsidian foundations with electric intelligence accents and crisp typography.
            </p>
          </div>

          {/* Theme Selector Pill Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Active Theme:
            </span>
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              {PALETTE_THEMES.map((theme) => {
                const isActive = currentTheme.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onSelectTheme(theme)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-md border border-cyan-500/50'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-xs"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span>{theme.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Color Tokens Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {COLOR_TOKENS.map((token, idx) => (
            <motion.div
              key={token.hex + token.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 transition-all group flex flex-col justify-between relative shadow-lg"
            >
              <div>
                {/* Visual Swatch */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl shadow-inner border border-white/10 flex items-center justify-center font-mono text-xs font-bold transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: token.hex,
                        color: token.textColor,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono tracking-tight">
                        {token.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{token.role}</p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed my-2">
                  {token.description}
                </p>
              </div>

              {/* Bottom Specs & Copy Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-300 font-medium">
                    {token.wcagContrast}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyHex(token.hex)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 font-mono text-xs border border-slate-800 transition-colors cursor-pointer"
                  title="Click to copy HEX code"
                >
                  <span>{token.hex}</span>
                  {copiedHex === token.hex ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Accessibility & Architecture Note */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Accessible Design & Semantic Palette Rules
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  WCAG AA Compliant
                </span>
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                Color choices avoid pure <code className="text-cyan-300 font-mono">#000000</code> to prevent eye fatigue on OLED screens. High-contrast typography (<strong className="text-white">#F8FAFC</strong>) maintains a crisp <strong className="text-cyan-300">17.4:1 contrast ratio</strong> over deep backgrounds, while electric accents (<strong className="text-cyan-400">#06B6D4</strong> and <strong className="text-indigo-400">#6366F1</strong>) guide interactive focus smoothly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center -space-x-2">
              <span className="w-6 h-6 rounded-full border-2 border-slate-900 bg-[#090D16]" title="Obsidian Canvas #090D16" />
              <span className="w-6 h-6 rounded-full border-2 border-slate-900 bg-[#1E293B]" title="Slate Layer #1E293B" />
              <span className="w-6 h-6 rounded-full border-2 border-slate-900 bg-[#06B6D4]" title="Electric Cyan #06B6D4" />
              <span className="w-6 h-6 rounded-full border-2 border-slate-900 bg-[#6366F1]" title="Cobalt Indigo #6366F1" />
              <span className="w-6 h-6 rounded-full border-2 border-slate-900 bg-[#10B981]" title="Emerald Jade #10B981" />
              <span className="w-6 h-6 rounded-full border-2 border-slate-900 bg-[#F59E0B]" title="Amber Gold #F59E0B" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
