
// Fix: Added missing React import and useERP hook to resolve compilation errors
import React from 'react';
import { 
  Search, Filter, Plus, MoreVertical, 
  Phone, Mail, Calendar, DollarSign, 
  Sparkles, Loader2, ArrowRight, User,
  CheckCircle2, Clock, FileText, Send,
  Target, TrendingUp, BarChart3,
  UserPlus, Award, UserCheck, MessageSquare,
  History, X, ShoppingBag, Receipt, Save, Briefcase
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { useERP } from '../context/ERPContext';
import { Lead, LeadStatus } from '../types';

type CRMTab = 'Pipeline' | 'Leads' | 'Quotations' | 'Clients';

const CRMModule: React.FC = () => {
  const { leads, quotations, clients, convertLeadToProject, updateLead, addLead } = useERP();
  const [activeTab, setActiveTab] = React.useState<CRMTab>('Pipeline');
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiInsight, setAiInsight] = React.useState<string | null>(null);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newLead, setNewLead] = React.useState<Partial<Lead>>({
    name: '', company: '', value: 0, status: 'New', phone: ''
  });

  const handleGeniusInsight = async () => {
    setAiLoading(true);
    const context = `CRM Leads: ${JSON.stringify(leads)}. Analyze lead conversion probability and suggest top 3 priorities.`;
    const response = await geminiService.chatWithAssistant([], context);
    setAiInsight(response);
    setAiLoading(false);
  };

  const handleSaveLead = () => {
    if (!newLead.name || !newLead.company) return;
    addLead({ ...newLead, id: Date.now(), company_id: 1, created_at: new Date().toISOString().split('T')[0] } as Lead);
    setShowAddForm(false);
    setNewLead({ name: '', company: '', value: 0, status: 'New', phone: '' });
  };

  const renderPipeline = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="absolute right-0 top-0 p-8 opacity-5"><TrendingUp className="w-16 h-16 text-indigo-600" /></div>
           <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">Pipeline Potential</h4>
           <p className="text-4xl font-black text-slate-900 tracking-tighter italic">₹{(leads.reduce((a, b) => a + b.value, 0) / 10000000).toFixed(1)} Cr</p>
           <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase italic"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Growth Optimal</div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden">
           <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 italic">Active Leads</h4>
           <p className="text-4xl font-black text-slate-900 tracking-tighter">{leads.filter(l => l.status !== 'Closed Won' && l.status !== 'Closed Lost').length}</p>
           <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase italic"><Target className="w-4 h-4" /> Strategic Focus</div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl text-white flex flex-col justify-between relative overflow-hidden">
          <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
          <div>
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Genius Scoring</span>
            </div>
            <p className="text-sm font-medium italic text-slate-400 leading-relaxed mb-6">Real-time probability analysis for Q3 conversion enabled.</p>
          </div>
          <button onClick={handleGeniusInsight} disabled={aiLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50">
            {aiLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Optimize Strategy'}
          </button>
        </div>
        <div className="bg-emerald-600 p-8 rounded-[40px] shadow-2xl text-white relative overflow-hidden flex flex-col justify-between">
           <div className="absolute right-0 top-0 p-6 opacity-10"><Award className="w-16 h-16" /></div>
           <h4 className="text-[10px] font-black uppercase text-emerald-200 tracking-widest mb-1">Win Ratio</h4>
           <p className="text-4xl font-black tracking-tighter italic">24.2%</p>
           <div className="mt-6 text-[10px] font-black uppercase text-white tracking-widest bg-white/10 px-3 py-1 rounded-full w-fit">Exceeding Target</div>
        </div>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide">
        {(['New', 'Proposal', 'Negotiation', 'Closed Won'] as LeadStatus[]).map(stage => (
          <div key={stage} className="min-w-[340px] flex-shrink-0 space-y-6">
             <div className="flex items-center justify-between px-4">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${stage === 'Closed Won' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                   {stage}
                </h3>
                <span className="text-[10px] font-black text-slate-400 bg-white border border-slate-100 px-3 py-1 rounded-full shadow-sm">{leads.filter(l => l.status === stage).length}</span>
             </div>
             <div className="space-y-4">
               {leads.filter(l => l.status === stage).map(lead => (
                 <div key={lead.id} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                    {stage === 'Negotiation' && <div className="absolute top-0 right-0 p-4"><Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" /></div>}
                    <div className="flex justify-between items-start mb-4">
                       <h5 className="font-black text-slate-900 text-lg tracking-tight uppercase group-hover:text-indigo-600 transition-colors">{lead.company}</h5>
                       <button className="text-slate-200 hover:text-slate-400 transition-colors"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-8 flex items-center gap-2"><User className="w-4 h-4" /> {lead.name}</p>
                    <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                       <span className="text-lg font-black text-slate-900 italic tracking-tighter">₹{(lead.value / 10000000).toFixed(1)} Cr</span>
                       {(stage === 'Negotiation' || stage === 'Proposal') && (
                         <button onClick={() => convertLeadToProject(lead.id)} className="text-[9px] font-black uppercase bg-slate-950 text-white px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2">
                            <Rocket className="w-3.5 h-3.5" /> Convert
                         </button>
                       )}
                       {stage === 'Closed Won' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                    </div>
                 </div>
               ))}
               <button onClick={() => setShowAddForm(true)} className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-300 hover:border-indigo-200 hover:text-indigo-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all group">
                  <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" /> Quick Entry
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
             <Briefcase className="w-8 h-8 text-indigo-600" />
             Sales & CRM Hub
           </h2>
           <p className="text-slate-500 text-sm font-medium italic">High-velocity conversion tracking from lead to asset lifecycle.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-[24px] border border-slate-200 shadow-sm overflow-x-auto">
          {(['Pipeline', 'Leads', 'Quotations', 'Clients'] as CRMTab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-indigo-600'}`}>{tab}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === 'Pipeline' && renderPipeline()}
        {activeTab === 'Leads' && (
           <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                  <tr><th className="px-10 py-8">Lead Identity</th><th className="px-10 py-8">Point of Contact</th><th className="px-10 py-8 text-right">Potential Value</th><th className="px-10 py-8 text-center">Current Status</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold italic">
                   {leads.map(l => (
                     <tr key={l.id} className="hover:bg-slate-50 transition-colors font-bold italic">
                       <td className="px-10 py-6 uppercase tracking-tight">{l.company}</td>
                       <td className="px-10 py-6 text-slate-500 font-medium">{l.name}</td>
                       <td className="px-10 py-6 text-right font-black text-slate-900 italic">₹{l.value.toLocaleString()}</td>
                       <td className="px-10 py-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            l.status === 'Closed Won' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                          }`}>{l.status}</span>
                       </td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] w-full max-w-xl shadow-2xl p-12 space-y-10 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">New Prospect Entry</h3>
                    <p className="text-slate-500 text-sm font-medium">Capture high-intent interest for future development assets.</p>
                 </div>
                 <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-8 h-8" /></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company / Entity Name</label>
                    <input type="text" value={newLead.company} onChange={e => setNewLead({...newLead, company: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold" />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Name</label>
                       <input type="text" value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Potential Value (₹)</label>
                       <input type="number" value={newLead.value} onChange={e => setNewLead({...newLead, value: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold" />
                    </div>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={handleSaveLead} className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all">
                    <Save className="w-5 h-5" /> Initialize Prospect
                 </button>
                 <button onClick={() => setShowAddForm(false)} className="px-8 py-5 border border-slate-200 text-slate-500 rounded-[24px] text-xs font-black uppercase">Discard</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const Rocket = ({ className }: { className?: string }) => <TrendingUp className={className} />;

export default CRMModule;
