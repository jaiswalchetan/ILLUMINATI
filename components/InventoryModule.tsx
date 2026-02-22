
import React from 'react';
import { useERP } from '../context/ERPContext';
import { Material, StockLog } from '../types';
import { 
  Warehouse, Package, Truck, Plus, 
  Search, Filter, MapPin, MoreVertical,
  CheckCircle2, Clock, AlertTriangle, ArrowRight, X, Save, History, TrendingUp, TrendingDown
} from 'lucide-react';

type InventoryTab = 'Stock' | 'Stock Logs' | 'Purchase Orders' | 'Vendors';

const InventoryModule: React.FC = () => {
  const { materials, stockLogs, addStockLog } = useERP();
  const [activeTab, setActiveTab] = React.useState<InventoryTab>('Stock');
  const [showLogForm, setShowLogForm] = React.useState(false);
  const [newLog, setNewLog] = React.useState<Partial<StockLog>>({
    materialId: 0, quantity: 0, type: 'Inward', date: new Date().toISOString().split('T')[0]
  });

  const handleSaveLog = () => {
    if (!newLog.materialId || !newLog.quantity) return;
    const mat = materials.find(m => m.id === Number(newLog.materialId));
    addStockLog({
      ...newLog,
      id: Date.now().toString(),
      materialName: mat?.name || 'Unknown'
    } as StockLog);
    setShowLogForm(false);
  };

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
             <Warehouse className="w-8 h-8 text-indigo-600" />
             Logistics Hub
           </h2>
           <p className="text-slate-500 text-sm font-medium italic">Global inventory audit & site distribution control.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-[24px] border border-slate-200 shadow-sm overflow-x-auto">
          {(['Stock', 'Stock Logs', 'Purchase Orders', 'Vendors'] as InventoryTab[]).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === 'Stock' && (
           <div className="space-y-6">
             <div className="flex justify-between items-center bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
                <div className="relative w-80">
                   <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input type="text" placeholder="Search inventory pool..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold focus:border-indigo-600" />
                </div>
                <button onClick={() => setShowLogForm(true)} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-all"><Plus className="w-4 h-4" /> Record Inward/Outward</button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {materials.map(mat => (
                 <div key={mat.id} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:border-indigo-400 transition-all group relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:scale-125 transition-transform"><Package className="w-20 h-20 text-indigo-600" /></div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 font-black text-xl">
                         {mat.name.substring(0, 1).toUpperCase()}
                      </div>
                      <div>
                         <h4 className="font-black text-slate-900 text-lg leading-tight uppercase tracking-tighter italic">{mat.name}</h4>
                         <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1 italic">{mat.category}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Available Pool</p>
                          <p className={`text-4xl font-black tracking-tighter italic ${mat.currentStock <= mat.reorderLevel ? 'text-rose-500' : 'text-slate-900'}`}>{mat.currentStock} <span className="text-xs opacity-40 font-bold uppercase">{mat.unit}</span></p>
                       </div>
                       <div className="text-right">
                          {mat.currentStock <= mat.reorderLevel && (
                             <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse border border-rose-100">Low Stock</span>
                          )}
                       </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                       <span>Rate: ₹{mat.avgCost}</span>
                       <button className="text-indigo-600 flex items-center gap-1">Update <ArrowRight className="w-3 h-3" /></button>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        )}

        {activeTab === 'Stock Logs' && (
           <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-500">
              <div className="p-8 border-b border-slate-100 bg-slate-50/20 flex justify-between items-center">
                 <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest italic flex items-center gap-2"><History className="w-4 h-4" /> Stock Ledger History</h4>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                       <tr>
                          <th className="px-10 py-6">Timestamp</th>
                          <th className="px-10 py-6">Material</th>
                          <th className="px-10 py-6 text-center">Type</th>
                          <th className="px-10 py-6 text-right">Quantity</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold">
                       {stockLogs.map(log => (
                          <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                             <td className="px-10 py-5 text-slate-400 font-mono italic text-xs">{log.date}</td>
                             <td className="px-10 py-5 text-slate-900 uppercase tracking-tight">{log.materialName}</td>
                             <td className="px-10 py-5 text-center">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto ${
                                   log.type === 'Inward' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                                }`}>
                                   {log.type === 'Inward' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                   {log.type}
                                </span>
                             </td>
                             <td className="px-10 py-5 text-right font-black italic text-lg tracking-tighter">
                                {log.type === 'Inward' ? '+' : '-'}{log.quantity}
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}
      </div>

      {showLogForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] w-full max-w-xl shadow-2xl p-12 space-y-10 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Inventory Transaction</h3>
                    <p className="text-slate-500 text-sm font-medium italic">Record physical stock movement into or out of central stores.</p>
                 </div>
                 <button onClick={() => setShowLogForm(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-8 h-8" /></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Material Asset</label>
                    <select value={newLog.materialId} onChange={e => setNewLog({...newLog, materialId: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:border-indigo-600 appearance-none outline-none">
                       <option value={0}>Choose Material...</option>
                       {materials.map(m => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
                    </select>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</label>
                      <input type="number" value={newLog.quantity} onChange={e => setNewLog({...newLog, quantity: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Type</label>
                      <select value={newLog.type} onChange={e => setNewLog({...newLog, type: e.target.value as any})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold appearance-none outline-none">
                         <option>Inward</option>
                         <option>Outward</option>
                      </select>
                   </div>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={handleSaveLog} className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all">
                    <Save className="w-5 h-5" /> Commit Log
                 </button>
                 <button onClick={() => setShowLogForm(false)} className="px-8 py-5 border border-slate-200 text-slate-500 rounded-[24px] text-xs font-black uppercase">Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default InventoryModule;
