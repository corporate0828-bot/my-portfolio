import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, CornerDownLeft, Sparkles, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILL_CATEGORIES, EXPERIENCES_DATA } from '../data/portfolioData';

interface InteractiveTerminalProps {
  onOpenProjectDemo?: (projectId: string) => void;
  onOpenResume?: () => void;
}

interface CommandOutput {
  command: string;
  response: React.ReactNode;
  time: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  onOpenProjectDemo,
  onOpenResume,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getCurrentTime = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Initial welcome message
    setHistory([
      {
        command: 'welcome',
        time: getCurrentTime(),
        response: (
          <div className="space-y-1 text-slate-300 text-xs sm:text-sm">
            <p className="text-cyan-400 font-semibold flex items-center gap-2">
              <span>🚀 Nishant Pisal [AI Native Dev] Interactive Shell v2.4.0</span>
            </p>
            <p className="text-slate-400">
              Type <span className="text-emerald-400 font-mono">help</span> to see available commands or click quick action buttons below.
            </p>
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400 mt-2">
              <span className="text-cyan-300 font-semibold">⚡ Quick Fact:</span> Ranked{' '}
              <span className="text-amber-300 font-bold">#1 / 120</span> in CSE at DIET Satara & earned{' '}
              <span className="text-emerald-300 font-bold">24+ Google Developer Badges</span>.
            </div>
          </div>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();
    setCommandList((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    let resNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resNode = (
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="text-cyan-400 font-semibold">Available Shell Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 font-mono text-[12px]">
              <div><span className="text-emerald-400 font-bold">projects</span> - List flagship projects</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - Breakdown of tech stack</div>
              <div><span className="text-emerald-400 font-bold">experience</span> - View career & internships</div>
              <div><span className="text-emerald-400 font-bold">education</span> - Academics & DIET Rank #1</div>
              <div><span className="text-emerald-400 font-bold">certs</span> - Google Badges & Certifications</div>
              <div><span className="text-emerald-400 font-bold">ingrezy</span> - Launch Ingrezy demo info</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Direct email & phone</div>
              <div><span className="text-emerald-400 font-bold">resume</span> - Open full interactive resume</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear terminal window</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        resNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-cyan-400 font-semibold">⭐ Flagship Projects:</p>
            <div className="space-y-2">
              {PROJECTS_DATA.map((p) => (
                <div key={p.id} className="p-2 rounded bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">{p.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {p.category.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1">{p.subtitle}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {p.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'skills':
        resNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-cyan-400 font-semibold">🛠️ Technical Stack:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.categoryKey} className="p-2 rounded bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="text-amber-300 font-semibold">{cat.title}:</span>
                  <div className="flex flex-wrap gap-1 mt-1 font-mono text-[11px] text-slate-300">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'experience':
        resNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-cyan-400 font-semibold">💼 Work Experience:</p>
            {EXPERIENCES_DATA.map((exp) => (
              <div key={exp.id} className="p-2 rounded bg-slate-900 border border-slate-800 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-emerald-400">{exp.role} @ {exp.company}</span>
                  <span className="text-slate-400 text-[11px]">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-slate-300 mt-1 text-[11px] space-y-0.5">
                  {exp.highlights.slice(0, 2).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
      case 'rank':
        resNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-cyan-400 font-semibold">🎓 Education & Academic Honors:</p>
            <div className="p-2 rounded bg-slate-900 border border-cyan-500/30 text-xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">B.Tech in Computer Science & Engineering</span>
                <span className="text-amber-400 font-mono font-semibold">2023 – 2027</span>
              </div>
              <p className="text-slate-300">DIET Satara (Dnyanshree Institute of Engineering & Technology)</p>
              <p className="text-emerald-400 font-semibold">
                🏆 CGPA: 7.2 | Ranked #1 out of 120 students across 5 consecutive semesters
              </p>
              <p className="text-slate-400 text-[11px]">GATE 2026 Qualified — Score: 23.02</p>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-xs">
              <div className="flex justify-between">
                <span className="text-white font-bold">HSC (Class XII)</span>
                <span className="text-slate-400">2021 – 2023</span>
              </div>
              <p className="text-slate-300">RJCK Khandala (65.67% • Specialization in Information Technology)</p>
            </div>
          </div>
        );
        break;

      case 'certs':
      case 'certifications':
        resNode = (
          <div className="space-y-1.5 text-xs sm:text-sm">
            <p className="text-cyan-400 font-semibold">📜 Certifications & Badges:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                ⭐ <strong className="text-white">Google Developer Badges:</strong> 24 Badges
              </div>
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                ☁️ <strong className="text-white">AWS & GCP Certified:</strong> Cloud Architecture
              </div>
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                🐍 <strong className="text-white">MKCL Advance Python:</strong> Advanced OOP & Scripts
              </div>
              <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                🏛️ <strong className="text-white">Goldman Sachs / JP Morgan:</strong> Operations Job Sim
              </div>
            </div>
          </div>
        );
        break;

      case 'ingrezy':
        resNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-cyan-400 font-semibold">🛒 Ingrezy Quick-Commerce Extension:</p>
            <p className="text-slate-300">
              "Order an item, ingredients will deliver." AI recipe to 10-minute grocery cart injection for Swiggy Instamart, Blinkit, Flipkart Minutes.
            </p>
            {onOpenProjectDemo && (
              <button
                onClick={() => onOpenProjectDemo('ingrezy')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                <Play className="w-3 h-3" /> Launch Interactive Ingrezy Demo
              </button>
            )}
          </div>
        );
        break;

      case 'contact':
      case 'hire':
        resNode = (
          <div className="space-y-1 text-xs sm:text-sm font-mono">
            <p className="text-cyan-400 font-semibold font-sans">📫 Contact Nishant Pisal:</p>
            <p className="text-slate-300">Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-400 hover:underline">{PERSONAL_INFO.email}</a></p>
            <p className="text-slate-300">Phone: <a href={`tel:${PERSONAL_INFO.phone}`} className="text-emerald-400 hover:underline">{PERSONAL_INFO.phone}</a></p>
            <p className="text-slate-300">Portfolio: <a href={PERSONAL_INFO.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{PERSONAL_INFO.website}</a></p>
          </div>
        );
        break;

      case 'resume':
        if (onOpenResume) {
          onOpenResume();
        }
        resNode = (
          <div className="text-xs text-emerald-400">
            ✓ Opened full interactive resume modal.
          </div>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInput('');
        return;

      default:
        resNode = (
          <div className="text-xs text-rose-400 space-y-1">
            <p>Command not recognized: <span className="font-mono text-slate-200">"{rawCmd}"</span></p>
            <p className="text-slate-400">Type <span className="text-emerald-400 font-mono">help</span> to view supported commands.</p>
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: rawCmd,
        time: getCurrentTime(),
        response: resNode,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      if (commandList.length > 0) {
        const nextIdx = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInput(commandList[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandList.length) {
          setHistoryIndex(nextIdx);
          setInput(commandList[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    }
  };

  const copyShellOutput = () => {
    const textToCopy = history
      .map((h) => `$ ${h.command}\n${typeof h.response === 'string' ? h.response : ''}`)
      .join('\n\n');
    navigator.clipboard.writeText(textToCopy || 'Nishant Pisal Interactive Terminal');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-cyan-950/20 overflow-hidden transition-all duration-300 flex flex-col ${
        isExpanded ? 'h-[500px]' : 'h-[380px] sm:h-[420px]'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-xs font-mono text-slate-400">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>nishant@ai-native-studio:~</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Action Chips */}
          <div className="hidden md:flex items-center gap-1">
            {['help', 'projects', 'skills', 'rank'].map((btnCmd) => (
              <button
                key={btnCmd}
                onClick={() => handleCommand(btnCmd)}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
              >
                {btnCmd}
              </button>
            ))}
          </div>

          <button
            onClick={copyShellOutput}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Copy Shell"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs sm:text-sm select-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-cyan-400">⚡ nishant@dev:~$</span>
              <span className="text-white font-semibold">{item.command}</span>
              <span className="text-[10px] text-slate-500 ml-auto">{item.time}</span>
            </div>
            <div className="pl-4 text-slate-200">{item.response}</div>
          </div>
        ))}

        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Input Line */}
      <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-2">
        <span className="text-cyan-400 font-mono text-xs sm:text-sm font-semibold whitespace-nowrap">
          nishant@dev:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'projects', 'skills', 'rank'..."
          className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-100 font-mono placeholder:text-slate-600"
          spellCheck={false}
          autoComplete="off"
        />
        <button
          onClick={() => handleCommand(input)}
          className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors cursor-pointer"
          title="Run Command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
