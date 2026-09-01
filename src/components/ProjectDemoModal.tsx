import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  ShoppingBag,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  BarChart3,
  ShieldCheck,
  Zap,
  Wifi,
  Share2,
  Lock,
  Search,
  Tag,
  MapPin,
  Printer,
  Calculator,
  Factory,
  Layers,
  FileCheck,
  Check,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project } from '../types';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto"
        >
          {/* Modal Header */}
          <div className="px-5 sm:px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{project.title}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Interactive Live Demo
                  </span>
                </div>
                <p className="text-xs text-slate-400">{project.subtitle}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
            {project.id === 'ingrezy' && <IngrezySimulator />}
            {project.id === 'autobillr' && <AutobillrSimulator />}
            {project.id === 'traceless' && <TracelessSimulator />}
            {project.id === 'campus-lost-found' && <CampusLostFoundSimulator />}
            {project.id === 'kalbhairav-digitals' && <KalbhairavSimulator />}
            {project.id === 'bluewings-polymer' && <BluewingsSimulator />}

            {/* General Project Key Highlights from Resume */}
            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Resume Specifications & Architecture
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {project.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <span className="text-xs text-slate-400 font-mono">Tech Stack:</span>
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// 1. INGREZY SIMULATOR
const IngrezySimulator: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState('Paneer Butter Masala');
  const [platform, setPlatform] = useState<'Swiggy Instamart' | 'Blinkit' | 'Flipkart Minutes'>('Swiggy Instamart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const recipesMap: Record<string, { servings: number; items: { name: string; qty: string; price: number }[] }> = {
    'Paneer Butter Masala': {
      servings: 3,
      items: [
        { name: 'Fresh Malai Paneer (200g)', qty: '1 pack', price: 95 },
        { name: 'Amul Salted Butter (100g)', qty: '1 pack', price: 58 },
        { name: 'Fresh Red Tomatoes (500g)', qty: '1 unit', price: 30 },
        { name: 'Fresh Heavy Cream (200ml)', qty: '1 unit', price: 65 },
        { name: 'Garam Masala & Kasuri Methi Pack', qty: '1 unit', price: 42 },
      ],
    },
    'Creamy Alfredo Pasta': {
      servings: 2,
      items: [
        { name: 'Durum Wheat Penne Pasta (500g)', qty: '1 pack', price: 110 },
        { name: 'Fresh Button Mushrooms (200g)', qty: '1 pack', price: 55 },
        { name: 'Garlic Bulbs (100g)', qty: '1 pack', price: 25 },
        { name: 'Amul Cooking Cream (250ml)', qty: '1 pack', price: 70 },
        { name: 'Parmesan & Mozzarella Blend (150g)', qty: '1 pack', price: 140 },
      ],
    },
    'Avocado Toast & Poached Egg': {
      servings: 2,
      items: [
        { name: 'Hass Avocados (2 units)', qty: '1 pack', price: 160 },
        { name: 'Artisanal Sourdough Bread Loaf', qty: '1 loaf', price: 90 },
        { name: 'Organic Farm Fresh Eggs (6 pcs)', qty: '1 pack', price: 75 },
        { name: 'Extra Virgin Olive Oil (100ml)', qty: '1 bottle', price: 130 },
        { name: 'Chilli Flakes & Oregano Grinder', qty: '1 unit', price: 50 },
      ],
    },
  };

  const currentRecipeData = recipesMap[selectedRecipe] || recipesMap['Paneer Butter Masala'];
  const totalAmount = currentRecipeData.items.reduce((sum, item) => sum + item.price, 0);

  const handleInjectCart = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrdered(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch (e) {
        // Safe fallback
      }
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 rounded-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <span className="font-bold text-sm text-cyan-300">
              "Order an item, ingredients will deliver."
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
            ⚡ 10-Minute Grocery Delivery Assistant
          </span>
        </div>
      </div>

      {/* Recipe Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">1. Select or Type Meal Idea:</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(recipesMap).map((recipeName) => (
            <button
              key={recipeName}
              onClick={() => {
                setSelectedRecipe(recipeName);
                setOrdered(false);
              }}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                selectedRecipe === recipeName
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {recipeName}
            </button>
          ))}
        </div>
      </div>

      {/* Target App Selector */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-xs text-slate-400 font-semibold">Target Platform:</span>
        {(['Swiggy Instamart', 'Blinkit', 'Flipkart Minutes'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`px-2.5 py-1 text-[11px] rounded font-mono transition-all ${
              platform === p
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Parsed Ingredients Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-3 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
          <span className="font-semibold text-cyan-400">Decomposed Raw Ingredients ({currentRecipeData.items.length} items)</span>
          <span>Estimated Total: ₹{totalAmount}</span>
        </div>

        <div className="space-y-1.5">
          {currentRecipeData.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-900/60">
              <span className="text-slate-200">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-mono">{item.qty}</span>
                <span className="text-emerald-400 font-mono font-semibold">₹{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Estimated delivery: <strong>9 mins</strong> to your location</span>
        </div>

        <button
          onClick={handleInjectCart}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Matching Instant Inventory...</span>
            </>
          ) : ordered ? (
            <>
              <Check className="w-3.5 h-3.5 text-slate-950" />
              <span>Dispatched to {platform} Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Inject {currentRecipeData.items.length} Ingredients to {platform}</span>
            </>
          )}
        </button>
      </div>

      {ordered && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Success!</strong> All items mapped to nearby {platform} dark stores. 1-click cart injection executed with zero user manual searching!
          </span>
        </div>
      )}
    </div>
  );
};

// 2. AUTOBILLR SIMULATOR
const AutobillrSimulator: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<'aws' | 'hardware' | 'saas'>('aws');
  const [isScanning, setIsScanning] = useState(false);
  const [extracted, setExtracted] = useState(true);

  const sampleInvoices = {
    aws: {
      name: 'Amazon Web Services Cloud Infrastructure',
      invoiceNo: 'INV-2026-8841',
      date: 'Aug 24, 2026',
      category: 'Cloud Hosting & Compute',
      taxGst: '$21.37 (18%)',
      total: '$140.12',
      items: [
        { desc: 'EC2 t4g.medium Instances (720 hrs)', amount: '$54.00' },
        { desc: 'Amazon S3 Standard Storage (1.2 TB)', amount: '$27.60' },
        { desc: 'Amazon CloudFront Data Transfer', amount: '$37.15' },
      ],
    },
    hardware: {
      name: 'Dell Commercial Servers & Components',
      invoiceNo: 'DEL-MH-99420',
      date: 'Aug 18, 2026',
      category: 'Office Hardware',
      taxGst: '₹7,322 (18%)',
      total: '₹48,000.00',
      items: [
        { desc: 'PowerEdge Enterprise Rack Server', amount: '₹38,000.00' },
        { desc: 'Gigabit Switch 24-Port Managed', amount: '₹10,000.00' },
      ],
    },
    saas: {
      name: 'GitHub Enterprise & Figma Workspace',
      invoiceNo: 'SUB-GH-4109',
      date: 'Aug 02, 2026',
      category: 'Software Subscriptions',
      taxGst: '$12.96 (18%)',
      total: '$85.00',
      items: [
        { desc: 'GitHub Team Plan (5 seats)', amount: '$40.00' },
        { desc: 'Figma Professional Workspace', amount: '$45.00' },
      ],
    },
  };

  const current = sampleInvoices[selectedInvoice];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setExtracted(true);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs">
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white">Select Sample Invoice to Parse:</span>
        </div>
        <div className="flex gap-1.5">
          {(['aws', 'hardware', 'saas'] as const).map((invKey) => (
            <button
              key={invKey}
              onClick={() => {
                setSelectedInvoice(invKey);
                handleScan();
              }}
              className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                selectedInvoice === invKey
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {invKey.toUpperCase()} Invoice
            </button>
          ))}
        </div>
      </div>

      {/* Extracted Card */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">
              {isScanning ? 'AI OCR Parsing In Progress...' : 'AI Extraction Verified'}
            </span>
            <h4 className="text-sm font-bold text-white">{current.name}</h4>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-slate-400">Inv #{current.invoiceNo}</span>
            <p className="text-xs text-slate-400">{current.date}</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="space-y-1">
          {current.items.map((it, idx) => (
            <div key={idx} className="flex justify-between text-xs py-1 px-2 rounded bg-slate-900/50">
              <span className="text-slate-300">{it.desc}</span>
              <span className="font-mono text-slate-100 font-semibold">{it.amount}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">Category: <strong className="text-cyan-300">{current.category}</strong></span>
          <div className="text-right">
            <span className="text-slate-400 mr-2">Tax: {current.taxGst}</span>
            <span className="text-emerald-400 font-bold font-mono text-sm">Total: {current.total}</span>
          </div>
        </div>
      </div>

      {/* Expense Insights Graphical Analytics */}
      <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <BarChart3 className="w-3.5 h-3.5" /> Company Expense Distribution Insights
          </span>
          <span className="text-[11px] font-mono text-slate-400">Real-time Graphical Visualizer</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-[10px] text-slate-400">Cloud Infrastructure</p>
            <p className="text-cyan-400 font-bold font-mono mt-0.5">48.5%</p>
          </div>
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-[10px] text-slate-400">Hardware & Assets</p>
            <p className="text-amber-400 font-bold font-mono mt-0.5">32.2%</p>
          </div>
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-[10px] text-slate-400">Software & Licenses</p>
            <p className="text-emerald-400 font-bold font-mono mt-0.5">19.3%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. TRACELESS SIMULATOR
const TracelessSimulator: React.FC = () => {
  const [roomId, setRoomId] = useState('TRACE-8921-X9');
  const [transferProgress, setTransferProgress] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);

  const startTransfer = () => {
    setIsStreaming(true);
    setTransferProgress(0);
    setTransferComplete(false);

    const interval = setInterval(() => {
      setTransferProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsStreaming(false);
          setTransferComplete(true);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/30 rounded-xl text-xs space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Serverless P2P WebRTC Direct Transfer
          </span>
          <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
            Zero Cloud Storage
          </span>
        </div>
        <p className="text-slate-400">
          Files are sliced into encrypted chunks and stream directly peer-to-peer between devices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Local Node (Sender)</span>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 text-xs">
            <p className="text-white font-medium">Dataset_Report_Q3.pdf (14.2 MB)</p>
            <p className="text-[10px] font-mono text-cyan-400 mt-1">SHA-256: e8f9...4b12 [Encrypted]</p>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Room Code: <strong className="font-mono text-emerald-300">{roomId}</strong></span>
            <button
              onClick={() => setRoomId(`TRACE-${Math.floor(1000 + Math.random() * 9000)}-${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}1`)}
              className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
            >
              Regenerate
            </button>
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-semibold">Remote Peer (Receiver)</span>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 text-xs">
            <p className="text-slate-300">Status: <strong className="text-emerald-400">Direct WebRTC DataChannel Connected</strong></p>
            <p className="text-[10px] font-mono text-slate-400 mt-1">Latency: 12ms • P2P Mesh Handshake OK</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span>Transfer Protocol: WebRTC DTLS/SCTP</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Stream Status</span>
          <span className="font-mono font-bold text-cyan-400">{transferProgress}% ({isStreaming ? '36.8 MB/s' : transferComplete ? 'Complete' : 'Idle'})</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${transferProgress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={startTransfer}
          disabled={isStreaming}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isStreaming ? 'Streaming P2P Packets...' : 'Simulate P2P Stream'}</span>
        </button>
      </div>
    </div>
  );
};

// 4. CAMPUS LOST & FOUND SIMULATOR
const CampusLostFoundSimulator: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [claimedId, setClaimedId] = useState<string | null>(null);

  const items = [
    { id: '1', type: 'found', title: 'TI-84 Plus Graphing Calculator', dept: 'Main Library 2nd Floor', date: 'Yesterday', icon: '🔢', finder: 'Pooja S. (CSE)' },
    { id: '2', type: 'lost', title: 'Blue DIET Campus Identity Card', dept: 'Cafeteria & Sports Hall', date: '2 days ago', icon: '🪪', finder: 'Aarav K. (Mechanical)' },
    { id: '3', type: 'found', title: 'Wireless Earbuds in Black Case', dept: 'Lab 4 - CS Dept', date: '3 days ago', icon: '🎧', finder: 'Lab Assistant' },
  ];

  const filtered = items.filter((it) => filter === 'all' || it.type === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs">
          <Search className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-white">Campus Recovery Feed</span>
        </div>
        <div className="flex gap-1">
          {(['all', 'lost', 'found'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 text-xs rounded uppercase font-mono font-medium transition-all ${
                filter === f ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((item) => (
          <div key={item.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{item.icon}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{item.title}</span>
                  <span
                    className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded ${
                      item.type === 'found' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" /> {item.dept} • Reported by {item.finder}
                </p>
              </div>
            </div>

            <button
              onClick={() => setClaimedId(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                claimedId === item.id
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300'
              }`}
            >
              {claimedId === item.id ? 'Claim Submitted ✓' : 'Claim Item'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. KALBHAIRAV SIMULATOR
const KalbhairavSimulator: React.FC = () => {
  const [product, setProduct] = useState('Flex Banner');
  const [sqft, setSqft] = useState(48);

  const rates: Record<string, number> = {
    'Flex Banner': 12,
    'Visiting Cards (1000 pcs)': 450,
    'Vinyl Glow Signboard': 85,
    'Acrylic 3D Letter Board': 180,
  };

  const estimated = rates[product] * (product.includes('Visiting') ? 1 : sqft);

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gradient-to-r from-orange-950/40 to-slate-950 border border-orange-500/30 rounded-xl text-xs flex items-center gap-2">
        <Printer className="w-4 h-4 text-orange-400 shrink-0" />
        <span className="text-slate-300">
          Commercial printing press client showcase application deployed for active customer inquiry capture.
        </span>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5 text-orange-400" /> Live Instant Print Quotation Estimator
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">Print Category:</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs outline-none"
            >
              {Object.keys(rates).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {!product.includes('Visiting') && (
            <div>
              <label className="text-slate-400 block mb-1">Area / Dimensions ({sqft} sq ft):</label>
              <input
                type="range"
                min="10"
                max="250"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-300">Estimated Production Quote:</span>
          <span className="text-lg font-bold font-mono text-orange-400">₹{estimated.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

// 6. BLUEWINGS SIMULATOR
const BluewingsSimulator: React.FC = () => {
  const [grade, setGrade] = useState('HDPE Extrusion Grade (BW-501)');
  const [tons, setTons] = useState(5);

  return (
    <div className="space-y-4">
      <div className="p-3 bg-gradient-to-r from-blue-950/40 to-slate-950 border border-blue-500/30 rounded-xl text-xs flex items-center gap-2">
        <Factory className="w-4 h-4 text-blue-400 shrink-0" />
        <span className="text-slate-300">
          Enterprise polymer production company website with technical specifications and industrial B2B catalog.
        </span>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
        <h4 className="font-bold text-white flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-400" /> Technical Polymer Specification Sheet
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-400 text-[11px]">Melt Flow Index (MFI)</span>
            <p className="font-mono text-cyan-300 font-semibold">0.35 g/10 min</p>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-400 text-[11px]">Tensile Strength at Yield</span>
            <p className="font-mono text-emerald-300 font-semibold">24 MPa</p>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-400 text-[11px]">Density @ 23°C</span>
            <p className="font-mono text-amber-300 font-semibold">0.952 g/cm³</p>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-800">
            <span className="text-slate-400 text-[11px]">ESCR (Condition B)</span>
            <p className="font-mono text-purple-300 font-semibold">&gt; 500 Hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};
