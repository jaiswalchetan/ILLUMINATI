
import React from 'react';
import { useERP } from '../context/ERPContext';
import { 
  Database, ShieldCheck, Download, Trash2, 
  RefreshCcw, HardDrive, Key, Server,
  Lock, Activity, Cloud, Globe, Cpu,
  ShieldAlert, AlertTriangle, Save
} from 'lucide-react';

const SettingsModule: React.FC = () => {
  const { resetDatabase, exportDatabase, accounts, projects } = useERP();
  const [activeTab, setActiveTab] = React.useState<'Database' | 'RBAC' | 'Security'>('Database');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
             <Database className="w-8 h-8 text-indigo-600" />
             System Console
           </h2>
           <p className="text-slate-500 text-sm font-medium italic">Database Provisioning • Encryption Layer • RBAC Matrix</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-[24px] border border-slate-200 shadow-sm overflow-x-auto">
          {(['Database', 'RBAC', 'Security'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Database' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
                 <div className="flex justify-between items-start mb-10">
                    <div>
                       <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Persistent Storage Logic</h3>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1 italic">Simulation Layer: Indexed LocalStore Persistence</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                       <Activity className="w-4 h-4" /> Operational
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Portfolio Assets</p>
                       <p className="text-3xl font-black text-slate-900 tracking-tighter">{projects.length} Entries</p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Capital Ledger</p>
                       <p className="text-3xl font-black text-slate-900 tracking-tighter">₹{(accounts.reduce((a,b)=>a+b.balance,0)/10000000).toFixed(2)}Cr</p>
                    </div>
                 </div>

                 <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row gap-4">
                    <button 
                      onClick={exportDatabase}
                      className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all"
                    >
                       <Download className="w-5 h-5" /> Export DB Backup
                    </button>
                    <button 
                      onClick={resetDatabase}
                      className="flex-1 bg-rose-50 border border-rose-100 text-rose-600 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-rose-100 transition-all"
                    >
                       <Trash2 className="w-5 h-5" /> Wipe & Re-seed Mock Data
                    </button>
                 </div>
              </div>

              <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute right-0 top-0 p-10 opacity-5 group-hover:scale-110 transition-transform"><Cpu className="w-48 h-48" /></div>
                 <h4 className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6 italic">Database Statistics</h4>
                 <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                       <span>Table Space (Rows)</span>
                       <span className="text-white">~1,240 Simulated</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500" style={{ width: '40%' }} />
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium italic mt-4">
                      Persistence is currently optimized for browser storage. Switch to PostgreSQL RDS for high-volume enterprise production.
                    </p>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-indigo-600 p-10 rounded-[48px] text-white shadow-2xl flex flex-col justify-between h-full">
                 <div>
                    <h3 className="text-2xl font-black mb-2 tracking-tight uppercase italic">Cloud Sync Engine</h3>
                    <p className="text-indigo-100/70 text-sm leading-relaxed mb-10 italic">
                      Automated daily snapshots are pushed to simulated S3 buckets to ensure zero data loss.
                    </p>
                 </div>
                 <div className="space-y-4">
                    <div className="p-6 bg-white/10 rounded-3xl border border-white/10 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Cloud className="w-6 h-6" />
                          <span className="text-xs font-black uppercase">AWS Backup</span>
                       </div>
                       <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <button className="w-full py-5 bg-white text-indigo-900 rounded-[24px] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                       Initialize Sync Handshake
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'RBAC' && (
        <div className="bg-white rounded-[56px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Access Authority Matrix</h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Role-Based Access Control (RBAC) System v3.2</p>
            </div>
            <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Hierarchy
            </button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                   <tr>
                      <th className="px-10 py-8">Module Resource</th>
                      <th className="px-10 py-8 text-center">Super Admin</th>
                      <th className="px-10 py-8 text-center">Manager</th>
                      <th className="px-10 py-8 text-center">Engineer</th>
                      <th className="px-10 py-8 text-center">Accountant</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {['Projects', 'Finance', 'Inventory', 'HR', 'CRM', 'Security'].map(module => (
                     <tr key={module} className="hover:bg-slate-50 transition-colors">
                        <td className="px-10 py-6 font-black text-slate-900 uppercase tracking-tight italic">{module}</td>
                        <td className="px-10 py-6 text-center"><ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                        <td className="px-10 py-6 text-center"><ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                        <td className="px-10 py-6 text-center"><div className="w-2 h-2 bg-slate-200 rounded-full mx-auto" /></td>
                        <td className="px-10 py-6 text-center">{module === 'Finance' || module === 'Projects' ? <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto" /> : <div className="w-2 h-2 bg-slate-200 rounded-full mx-auto" />}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsModule;
