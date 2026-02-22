
import React from 'react';
import { useERP } from '../context/ERPContext';
import { Transaction, Project, Invoice } from '../types';
import { 
  TrendingUp, Plus, Sparkles, DollarSign, 
  Receipt, Filter, Search, X, FileText, 
  ArrowUpRight, ArrowDownRight, MoreVertical,
  Briefcase, Percent, Calendar, Calculator,
  CheckCircle2, AlertCircle, RefreshCw,
  Clock, Activity, BarChart3, ChevronRight,
  ShieldCheck, Banknote, Settings, Info
} from 'lucide-react';

type FinanceTab = 'Invoices' | 'Expenses' | 'Journal' | 'Reports';

const FinanceModule: React.FC = () => {
  const { invoices, accounts, journals, projects } = useERP();
  const [activeTab, setActiveTab] = React.useState<FinanceTab>('Invoices');

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Finance Hub</h2>
          <p className="text-slate-500 text-sm font-medium italic">General Ledger • Financial Auditing • GST Compliance</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {(['Invoices', 'Expenses', 'Journal', 'Reports'] as FinanceTab[]).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === 'Invoices' && (
           <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-500">
             <div className="p-8 bg-slate-50 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="relative w-full md:w-80">
                   <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input type="text" placeholder="Search invoices..." className="pl-11 pr-4 py-3 border border-slate-200 rounded-[20px] text-xs outline-none focus:border-indigo-500 w-full bg-white font-bold" />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                   <button className="flex-1 md:flex-none p-3 border border-slate-200 rounded-[20px] text-slate-400 hover:bg-white transition-all"><Filter className="w-5 h-5" /></button>
                   <button className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 transition-all hover:bg-black"><Plus className="w-4 h-4" /> New Invoice</button>
                </div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                    <tr>
                       <th className="px-8 py-6">Number</th>
                       <th className="px-8 py-6">Party Identity</th>
                       <th className="px-8 py-6 text-right">Value (₹)</th>
                       <th className="px-8 py-6">Status</th>
                       <th className="px-8 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map(inv => (
                      <tr key={inv.id} className="hover:bg-slate-50 group font-bold">
                        <td className="px-8 py-5 text-indigo-600 text-sm tracking-tight">{inv.invoiceNumber}</td>
                        <td className="px-8 py-5 text-slate-800 uppercase text-xs">{inv.partyName}</td>
                        <td className="px-8 py-5 text-right text-slate-900 font-black italic">₹{inv.total.toLocaleString()}</td>
                        <td className="px-8 py-5">
                           <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                              inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                           }`}>{inv.status}</span>
                        </td>
                        <td className="px-8 py-5 text-right"><button className="text-slate-300 hover:text-slate-600 p-2"><MoreVertical className="w-4 h-4" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>
        )}
        {activeTab === 'Journal' && (
          <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-500">
             <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest italic">General Journal (Double-Entry)</h4>
                <div className="flex gap-2">
                   <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Balanced</div>
                </div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                   <thead className="bg-slate-50/50 text-slate-500 font-black uppercase text-[10px] tracking-widest border-b border-slate-200">
                      <tr>
                         <th className="px-8 py-5">Date</th>
                         <th className="px-8 py-5">Particulars</th>
                         <th className="px-8 py-5 text-right">Debit (₹)</th>
                         <th className="px-8 py-5 text-right">Credit (₹)</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {journals.map(j => (
                        <tr key={j.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-8 py-5 text-slate-400 font-mono text-xs italic">{j.date}</td>
                           <td className="px-8 py-5">
                              <p className="font-black text-slate-900 uppercase tracking-tight text-xs">{j.debitAccount}</p>
                              <p className="text-[10px] text-slate-400 font-bold italic mt-0.5">To {j.creditAccount}</p>
                           </td>
                           <td className="px-8 py-5 text-right font-black text-slate-900 tracking-tighter italic">₹{j.amount.toLocaleString()}</td>
                           <td className="px-8 py-5 text-right font-black text-slate-900 tracking-tighter italic">₹{j.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceModule;
