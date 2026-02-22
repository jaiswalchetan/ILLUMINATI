
import React from 'react';
import { useERP } from '../context/ERPContext';
import { Project, BOQItem } from '../types';
import { 
  MapPin, Plus, Sparkles, Loader2, 
  ChevronRight, Info, History, BarChart3, 
  File, Download, Search, Calculator,
  Zap, Save, Trash2, ArrowRight, Percent,
  Construction, Users, Hammer, ArrowDown,
  TrendingUp, TrendingDown, Landmark
} from 'lucide-react';

type ProjectTab = 'Overview' | 'BOQ Master' | 'Budget vs Actual' | 'Tasks' | 'Files' | 'Reports';

const ProjectsModule: React.FC = () => {
  const { projects } = useERP();
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [activeTab, setActiveTab] = React.useState<ProjectTab>('Overview');
  const [editingItem, setEditingItem] = React.useState<Partial<BOQItem> | null>(null);

  React.useEffect(() => {
    if (!selectedProject && projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  /**
   * B. Auto Rate Formula Implementation:
   * 1. Base Cost = Material + Labour + Machinery
   * 2. Overhead = Base Cost × (Overhead % / 100)
   * 3. Subtotal = Base Cost + Overhead
   * 4. Profit = Subtotal × (Profit % / 100)
   * 5. Final Rate = Subtotal + Profit
   * 
   * C. Total BOQ Amount
   * Item Amount = Quantity × Final Rate
   */
  const calculateAutoRate = (item: Partial<BOQItem>) => {
    const material = Number(item.material_cost) || 0;
    const labour = Number(item.labour_cost) || 0;
    const machinery = Number(item.machinery_cost) || 0;
    const overheadPct = Number(item.overhead_percent) || 0;
    const profitPct = Number(item.profit_percent) || 0;
    const qty = Number(item.quantity) || 0;

    // Step 1: Base Cost
    const baseCost = material + labour + machinery;
    // Step 2: Overhead
    const overheadAmount = baseCost * (overheadPct / 100);
    // Step 3: Subtotal
    const subtotal = baseCost + overheadAmount;
    // Step 4: Profit
    const profitAmount = subtotal * (profitPct / 100);
    // Step 5: Final Rate
    const finalRate = subtotal + profitAmount;
    // C. Item Amount
    const totalAmount = finalRate * qty;

    return { baseCost, overheadAmount, subtotal, profitAmount, finalRate, totalAmount };
  };

  if (!selectedProject) return <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest">Initializing Project Engine...</div>;

  const projectTotalEstimate = selectedProject.boq?.reduce((sum, item) => {
    return sum + calculateAutoRate(item).totalAmount;
  }, 0) || 0;

  const renderBOQMaster = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 p-8 opacity-10"><Landmark className="w-40 h-40" /></div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-600/30"><Calculator className="w-8 h-8" /></div>
           <div>
              <h3 className="text-2xl font-black uppercase tracking-tight italic">BOQ Master Repository</h3>
              <p className="text-indigo-300 text-xs font-black uppercase tracking-widest mt-1">Strategic Rate Synthesis Layer</p>
           </div>
        </div>
        <div className="flex items-center gap-8 relative z-10">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Project Estimate</p>
              <p className="text-3xl font-black text-white italic tracking-tighter">₹{projectTotalEstimate.toLocaleString()}</p>
           </div>
           <button 
             onClick={() => setEditingItem({ 
               project_id: selectedProject.id, 
               item_name: '', unit: 'm3', quantity: 1, 
               material_cost: 0, labour_cost: 0, machinery_cost: 0, 
               overhead_percent: 10, profit_percent: 15 
             })}
             className="bg-white text-slate-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl"
           >
             <Plus className="w-4 h-4" /> Add Line Item
           </button>
        </div>
      </div>

      {editingItem && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="flex justify-between items-start mb-10">
               <div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Configuration Panel</h4>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Rate Analysis Definition</p>
               </div>
               <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Trash2 className="w-5 h-5 text-slate-400" /></button>
            </div>
            
            <div className="space-y-8">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description of Work</label>
                 <input 
                  type="text" 
                  value={editingItem.item_name}
                  onChange={e => setEditingItem({...editingItem, item_name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold focus:border-indigo-600 outline-none transition-all"
                  placeholder="e.g. Reinforced Cement Concrete M25 for Slabs..."
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Planned Quantity</label>
                    <input 
                      type="number" 
                      value={editingItem.quantity}
                      onChange={e => setEditingItem({...editingItem, quantity: Number(e.target.value)})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold focus:border-indigo-600 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UoM (Unit of Measure)</label>
                    <select 
                      value={editingItem.unit}
                      onChange={e => setEditingItem({...editingItem, unit: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm font-bold focus:border-indigo-600 outline-none"
                    >
                      <option>m3</option><option>m2</option><option>kg</option><option>MT</option><option>Nos</option><option>Running Meter</option><option>Lump Sum</option>
                    </select>
                  </div>
               </div>

               <div className="grid grid-cols-3 gap-8 pt-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2"><Construction className="w-3.5 h-3.5" /> Material Base</label>
                    <input type="number" value={editingItem.material_cost} onChange={e => setEditingItem({...editingItem, material_cost: Number(e.target.value)})} className="w-full bg-indigo-50/50 border border-indigo-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2"><Users className="w-3.5 h-3.5" /> Labour Base</label>
                    <input type="number" value={editingItem.labour_cost} onChange={e => setEditingItem({...editingItem, labour_cost: Number(e.target.value)})} className="w-full bg-amber-50/50 border border-amber-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-amber-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2"><Hammer className="w-3.5 h-3.5" /> Machinery Base</label>
                    <input type="number" value={editingItem.machinery_cost} onChange={e => setEditingItem({...editingItem, machinery_cost: Number(e.target.value)})} className="w-full bg-rose-50/50 border border-rose-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-rose-600" />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Percent className="w-3.5 h-3.5" /> Overhead %</label>
                    <input type="number" value={editingItem.overhead_percent} onChange={e => setEditingItem({...editingItem, overhead_percent: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Percent className="w-3.5 h-3.5" /> Profit Margin %</label>
                    <input type="number" value={editingItem.profit_percent} onChange={e => setEditingItem({...editingItem, profit_percent: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:border-indigo-600" />
                  </div>
               </div>

               <div className="pt-10 flex gap-6">
                  <button className="flex-1 bg-slate-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-slate-900/30 hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95">
                    <Save className="w-6 h-6" /> Commit Line Item
                  </button>
                  <button onClick={() => setEditingItem(null)} className="px-12 py-6 bg-slate-100 text-slate-500 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">Discard</button>
               </div>
            </div>
          </div>

          {/* Real-time Multi-Step Calculation Card */}
          <div className="bg-slate-900 rounded-[48px] text-white p-12 flex flex-col shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-125 transition-transform"><Sparkles className="w-40 h-40 text-indigo-400" /></div>
             <h4 className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-10 flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg"><Calculator className="w-5 h-5" /></div>
                Multi-Step Synthesis Logic
             </h4>

             <div className="flex-1 space-y-8">
                {(() => {
                   const res = calculateAutoRate(editingItem);
                   return (
                     <>
                        <div className="space-y-2 group">
                           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">1. Base Cost (M+L+M)</p>
                           <p className="text-3xl font-black tracking-tight italic group-hover:text-indigo-300 transition-colors">₹{res.baseCost.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-center -my-2"><ArrowDown className="w-6 h-6 text-indigo-500/50" /></div>
                        <div className="space-y-2 group">
                           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">2. Overhead Amount ({editingItem.overhead_percent}%)</p>
                           <p className="text-2xl font-black text-indigo-400 tracking-tight">₹{res.overheadAmount.toLocaleString()}</p>
                        </div>
                        <div className="space-y-2 group">
                           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">3. Subtotal (Base + OH)</p>
                           <p className="text-2xl font-black tracking-tight">₹{res.subtotal.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-center -my-2"><ArrowDown className="w-6 h-6 text-indigo-500/50" /></div>
                        <div className="space-y-2 group">
                           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">4. Profit Margin ({editingItem.profit_percent}%)</p>
                           <p className="text-2xl font-black text-emerald-400 tracking-tight">₹{res.profitAmount.toLocaleString()}</p>
                        </div>
                        <div className="pt-10 border-t border-white/10 mt-10">
                           <p className="text-[10px] text-indigo-300 font-black uppercase tracking-widest mb-2 italic">5. Final Computed Unit Rate</p>
                           <p className="text-5xl font-black tracking-tighter italic text-white">₹{res.finalRate.toLocaleString()}<span className="text-lg opacity-40 font-black">/{editingItem.unit}</span></p>
                        </div>
                        <div className="pt-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                           <p className="text-[10px] text-slate-500 font-black uppercase mb-2 tracking-widest">Line Item Valuation (Qty: {editingItem.quantity})</p>
                           <p className="text-3xl font-black text-indigo-500 tracking-tight italic">₹{res.totalAmount.toLocaleString()}</p>
                        </div>
                     </>
                   );
                })()}
             </div>
          </div>
        </div>
      )}

      {/* Main BOQ Ledger */}
      <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-10 py-8">Description of Work</th>
                <th className="px-10 py-8 text-center">Volume/Unit</th>
                <th className="px-10 py-8 text-right">Base (M+L+M)</th>
                <th className="px-10 py-8 text-center">Markup (OH+PR)</th>
                <th className="px-10 py-8 text-right">Unit Rate</th>
                <th className="px-10 py-8 text-right">Final Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {selectedProject.boq?.map(item => {
                const res = calculateAutoRate(item);
                return (
                  <tr key={item.id} className="hover:bg-slate-50 group font-bold transition-all duration-300">
                    <td className="px-10 py-8">
                       <p className="text-slate-900 text-base tracking-tight leading-tight">{item.item_name}</p>
                       <p className="text-[9px] text-slate-400 uppercase font-black mt-2 tracking-widest">SOR-CODE: 2024-SOR-{item.id}</p>
                    </td>
                    <td className="px-10 py-8 text-center">
                       <span className="text-slate-900 text-lg">{item.quantity}</span>
                       <span className="text-slate-400 ml-2 uppercase text-[11px] font-black">{item.unit}</span>
                    </td>
                    <td className="px-10 py-8 text-right text-slate-500 italic font-medium">₹{res.baseCost.toLocaleString()}</td>
                    <td className="px-10 py-8 text-center">
                       <div className="flex flex-col items-center">
                         <span className="text-indigo-600 text-xs font-black tracking-widest">{item.overhead_percent + item.profit_percent}%</span>
                         <div className="h-1.5 w-16 bg-slate-100 rounded-full mt-2.5 overflow-hidden ring-1 ring-slate-200">
                            <div className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: `${item.overhead_percent + item.profit_percent}%` }} />
                         </div>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right font-black text-slate-900 text-lg tracking-tight">₹{res.finalRate.toLocaleString()}</td>
                    <td className="px-10 py-8 text-right font-black text-indigo-600 italic text-xl tracking-tighter">₹{res.totalAmount.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
            {/* Table Footer: Total Project Estimate */}
            <tfoot className="bg-slate-50 border-t-2 border-slate-900">
              <tr className="font-black">
                <td colSpan={5} className="px-10 py-10 text-right uppercase tracking-widest text-slate-400 text-xs">Gross Project Estimate</td>
                <td className="px-10 py-10 text-right text-3xl italic tracking-tighter text-slate-900">₹{projectTotalEstimate.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-160px)]">
      {/* Sidebar - Portfolio Selection */}
      <div className="w-full lg:w-96 flex flex-col shrink-0">
        <div className="flex justify-between items-center mb-6 px-4">
           <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Portfolio</h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Asset Selection</p>
           </div>
           <button className="p-2.5 bg-slate-900 text-white rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95"><Plus className="w-6 h-6" /></button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 pr-3 custom-scrollbar">
          {projects.map(p => (
            <div 
              key={p.id} 
              onClick={() => { setSelectedProject(p); setActiveTab('Overview'); }}
              className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer relative overflow-hidden group ${
                selectedProject.id === p.id 
                  ? 'border-indigo-600 bg-white shadow-2xl ring-4 ring-indigo-50' 
                  : 'border-slate-100 bg-white hover:border-indigo-200 hover:shadow-lg'
              }`}
            >
              {selectedProject.id === p.id && <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-125 transition-transform"><Sparkles className="w-16 h-16 text-indigo-600" /></div>}
              <h3 className={`font-black text-lg uppercase mb-2 tracking-tight transition-colors ${selectedProject.id === p.id ? 'text-indigo-600' : 'text-slate-800'}`}>{p.name}</h3>
              <p className="text-[10px] text-slate-400 font-black flex items-center gap-1.5 uppercase tracking-widest"><MapPin className="w-3.5 h-3.5" /> {p.client_name}</p>
              <div className="mt-6">
                <div className="flex justify-between items-end mb-2">
                   <span className="text-[10px] font-black text-slate-400 uppercase">Progress</span>
                   <span className="text-xs font-black text-indigo-600 italic">{p.completion || 0}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden ring-1 ring-slate-200">
                  <div className="h-full bg-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: `${p.completion || 0}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-[56px] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <header className="p-10 border-b border-slate-100 bg-slate-50/40">
          <div className="flex justify-between items-start mb-12">
            <div>
               <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">{selectedProject.name}</h1>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-emerald-200">{selectedProject.status}</span>
               </div>
               <div className="flex gap-6 mt-4">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    <LANDMARK className="w-3.5 h-3.5" /> Site-ID: PRJ-{selectedProject.id.toString().padStart(4, '0')}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    <History className="w-3.5 h-3.5" /> Updated {new Date().toLocaleDateString()}
                 </div>
               </div>
            </div>
            <div className="flex gap-4">
              <button className="p-4 border-2 border-slate-100 rounded-[24px] hover:bg-white text-slate-400 transition-all hover:border-indigo-200 hover:text-indigo-600"><History className="w-6 h-6" /></button>
              <button className="p-4 bg-slate-900 text-white rounded-[24px] shadow-2xl hover:scale-105 active:scale-95 transition-all"><Plus className="w-6 h-6" /></button>
            </div>
          </div>
          
          <nav className="flex gap-10 overflow-x-auto scrollbar-hide border-b border-slate-100/50">
            {(['Overview', 'BOQ Master', 'Budget vs Actual', 'Tasks', 'Files', 'Reports'] as ProjectTab[]).map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`pb-5 text-[11px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                  activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]" />}
              </button>
            ))}
          </nav>
        </header>

        <section className="flex-1 overflow-y-auto p-12 bg-white custom-scrollbar">
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 group hover:border-indigo-200 transition-all">
                  <div className="flex justify-between items-start mb-4">
                     <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Contract Valuation</h4>
                     <Landmark className="w-5 h-5 text-indigo-400" />
                  </div>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter italic">₹{(selectedProject.budget / 100000).toFixed(1)}L</p>
               </div>
               <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 group hover:border-rose-200 transition-all">
                  <div className="flex justify-between items-start mb-4">
                     <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Accumulated Burn</h4>
                     <TrendingDown className="w-5 h-5 text-rose-400" />
                  </div>
                  <p className="text-3xl font-black text-rose-600 tracking-tighter italic">₹{((selectedProject.spent || 0) / 100000).toFixed(1)}L</p>
               </div>
               <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 group hover:border-indigo-200 transition-all">
                  <div className="flex justify-between items-start mb-4">
                     <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Portfolio Velocity</h4>
                     <TrendingUp className="w-5 h-5 text-indigo-400" />
                  </div>
                  <p className="text-3xl font-black text-indigo-600 tracking-tighter italic">{selectedProject.completion || 0}%</p>
               </div>
            </div>
          )}
          {activeTab === 'BOQ Master' && renderBOQMaster()}
          {activeTab === 'Budget vs Actual' && (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm col-span-2">
                    <div className="flex items-center gap-3 mb-10">
                       <BarChart3 className="w-6 h-6 text-indigo-600" />
                       <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 italic">Financial Variance Dashboard</h3>
                    </div>
                    <div className="space-y-10">
                        {[
                          { label: 'Structural Concrete', planned: 2500000, actual: 2800000 },
                          { label: 'Finishing & MEP', planned: 1500000, actual: 1200000 },
                          { label: 'Site Overhead', planned: 1000000, actual: 200000 }
                        ].map(item => (
                          <div key={item.label} className="space-y-4">
                            <div className="flex justify-between text-base font-black uppercase tracking-tight">
                              <span className="text-slate-800">{item.label}</span>
                              <span className={item.actual > item.planned ? 'text-rose-600' : 'text-emerald-600'}>
                                ₹{item.actual.toLocaleString()} <span className="text-[10px] text-slate-400">/ ₹{item.planned.toLocaleString()}</span>
                              </span>
                            </div>
                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative ring-1 ring-slate-200">
                              <div className="h-full bg-slate-200 absolute opacity-50" style={{ width: '100%' }} />
                              <div className={`h-full absolute transition-all duration-700 ${item.actual > item.planned ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]'}`} style={{ width: `${Math.min((item.actual / item.planned) * 100, 100)}%` }} />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl flex flex-col justify-between">
                     <div>
                        <div className="flex items-center gap-2 text-indigo-400 mb-2">
                           <Zap className="w-5 h-5" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Burn Rate Sentiment</span>
                        </div>
                        <h4 className="text-2xl font-black mb-6 tracking-tight">Financial Runway Optimal</h4>
                        <p className="text-slate-400 text-sm leading-relaxed italic">
                          Current spending patterns suggest 14% buffer retention. Cost-plus billing automation recommended for Q4 closure.
                        </p>
                     </div>
                     <button className="w-full py-5 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all">Audit Expenditures</button>
                  </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// Internal icon proxy for consistency
const LANDMARK = Landmark;

export default ProjectsModule;
