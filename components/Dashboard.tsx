
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Package, Activity, Zap, Sparkles, FileText, Loader2, X, LayoutDashboard, Download, Wifi, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import { geminiService } from '../services/geminiService';

const cashFlowData = [
  { month: 'Jan', inflow: 4500000, outflow: 3200000 },
  { month: 'Feb', inflow: 5200000, outflow: 4100000 },
  { month: 'Mar', inflow: 4800000, outflow: 4900000 },
  { month: 'Apr', inflow: 6100000, outflow: 3800000 },
  { month: 'May', inflow: 5800000, outflow: 4200000 },
  { month: 'Jun', inflow: 7200000, outflow: 4500000 },
];

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  trend: string; 
  trendUp: boolean;
  color: 'indigo' | 'emerald' | 'rose' | 'amber';
}> = ({ title, value, icon, trend, trendUp, color }) => {
  const colorMap = {
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    rose: 'text-rose-600 bg-rose-50 border-rose-100',
    amber: 'text-amber-600 bg-amber-50 border-amber-100',
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-125 transition-transform duration-500">{icon}</div>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl border ${colorMap[color]}`}>{icon}</div>
        <div className={`flex items-center text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {trend}
        </div>
      </div>
      <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{title}</h3>
      <p className="text-3xl font-black text-slate-800 tracking-tighter">{value}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { projects, accounts, materials, employees, companies, invoices } = useERP();
  const [reportLoading, setReportLoading] = React.useState(false);
  const [reportResult, setReportResult] = React.useState<string | null>(null);

  const handleGenerateReport = async () => {
    setReportLoading(true);
    const summaryData = {
      projectCount: projects.length,
      averageCompletion: projects.reduce((a, b) => a + b.completion, 0) / (projects.length || 1),
      totalAssets: accounts.filter(a => a.type === 'Asset').reduce((a, b) => a + b.balance, 0),
      inventoryAlerts: materials.filter(m => m.currentStock <= m.reorderLevel).length,
      staffCount: employees.length
    };
    const summary = await geminiService.generateExecutiveSummary(summaryData);
    setReportResult(summary);
    setReportLoading(false);
  };

  // Pie Chart Data
  const projectStats = [
    { name: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length, color: '#4f46e5' },
    { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length, color: '#10b981' },
    { name: 'Planned', value: projects.filter(p => p.status === 'Active').length, color: '#94a3b8' },
  ];

  // Bar Chart Data (Top 3 Companies by Revenue)
  const companyRev = companies.map(c => ({
    name: c.name.split(' ')[0],
    revenue: invoices.filter(i => i.company_id === c.id && i.status === 'Paid').reduce((s, inv) => s + inv.total, 0)
  })).sort((a,b) => b.revenue - a.revenue).slice(0, 3);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20"><LayoutDashboard className="w-6 h-6" /></div>
           <div>
            <div className="flex items-center gap-3">
               <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Command Center</h2>
               <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 font-black text-[9px] uppercase tracking-widest">
                  <Wifi className="w-3 h-3 animate-pulse" />
                  99.9% Uptime
               </div>
            </div>
            <p className="text-slate-500 text-sm font-medium">Holistic real-time visibility for business operations.</p>
          </div>
        </div>
        <button 
          onClick={handleGenerateReport}
          disabled={reportLoading}
          className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all hover:bg-indigo-700 disabled:opacity-50 group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          {reportLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span className="relative">Generate Genius Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Capital" value={`₹${(accounts.reduce((a, b) => a + (b.type === 'Asset' ? b.balance : 0), 0) / 10000000).toFixed(2)}Cr`} icon={<DollarSign className="w-6 h-6" />} trend="+4.2%" trendUp={true} color="indigo" />
        <StatCard title="Project Health" value={`${projects.filter(p => p.status === 'In Progress' || p.status === 'Active').length} Active`} icon={<Activity className="w-6 h-6" />} trend="Optimum" trendUp={true} color="emerald" />
        <StatCard title="Critical Stock" value={materials.filter(m => m.currentStock <= m.reorderLevel).length.toString()} icon={<Package className="w-6 h-6" />} trend="Urgent" trendUp={false} color="rose" />
        <StatCard title="Active Workforce" value={employees.length.toString()} icon={<Users className="w-6 h-6" />} trend="+2" trendUp={true} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm relative group overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-[10px] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" /> Capital Inflow vs Burn
              </h3>
              <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase">Trailing 6 Months Analysis</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} fontStyle="bold" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} fontStyle="bold" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/100000}L`} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', padding: '20px' }} formatter={(value: any) => [`₹${value.toLocaleString()}`, '']} />
                <Area type="monotone" dataKey="inflow" stroke="#4f46e5" strokeWidth={5} fillOpacity={1} fill="url(#colorInflow)" />
                <Area type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col justify-between">
           <div>
              <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-8 italic flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-indigo-600" /> Portfolio Mix
              </h4>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie 
                        data={projectStats} 
                        innerRadius={65} 
                        outerRadius={85} 
                        paddingAngle={10} 
                        dataKey="value"
                      >
                         {projectStats.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                   </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 space-y-3">
                 {projectStats.map(s => (
                   <div key={s.name} className="flex justify-between items-center text-[10px] font-black uppercase">
                      <span className="flex items-center gap-2 text-slate-500">
                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                         {s.name}
                      </span>
                      <span className="text-slate-900">{s.value} Projects</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
            <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-10 italic flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" /> Revenue Leaderboard
            </h4>
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={companyRev} layout="vertical" margin={{ left: 20 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={10} fontStyle="bold" width={80} />
                     <Tooltip cursor={{ fill: 'transparent' }} formatter={(v) => `₹${(Number(v)/100000).toFixed(1)}L`} />
                     <Bar dataKey="revenue" fill="#4f46e5" radius={[0, 8, 8, 0]} barSize={25} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="lg:col-span-2 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <Sparkles className="absolute -top-10 -right-10 w-48 h-48 text-white/5" />
            <div>
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Genius Strategic Advice</span>
              </div>
              <h3 className="text-3xl font-black mb-6 leading-tight tracking-tighter italic uppercase">Optimizing Liquidity for Phase 3</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium italic max-w-2xl">
                Multi-tenant data indicates that site-id <span className="text-white font-black">#SKT-2024</span> is experiencing a 14% drift in material burn rate compared to sector average. Deploying central stock audit could reclaim <span className="text-emerald-400 font-black">₹4.2L</span> in quarterly margin.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 w-full py-5 bg-indigo-600 hover:bg-indigo-50 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/30">Apply Operational Optimization</button>
         </div>
      </div>

      {reportResult && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
              <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
                 <div className="flex items-center gap-3"><FileText className="w-6 h-6" /><h2 className="text-2xl font-black tracking-tight uppercase">Strategic Intelligence Report</h2></div>
                 <button onClick={() => setReportResult(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-12 bg-white prose prose-slate max-w-none">
                 <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">{reportResult}</div>
              </div>
              <div className="p-8 border-t border-slate-100 flex justify-end gap-4 bg-slate-50">
                 <button onClick={() => setReportResult(null)} className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white transition-all">Close</button>
                 <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 flex items-center gap-2"><Download className="w-4 h-4" /> Download PDF</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;