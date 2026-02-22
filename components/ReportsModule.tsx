
import React from 'react';
import { 
  ResponsiveContainer, LineChart, Line, AreaChart, Area, 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ComposedChart 
} from 'recharts';
import { 
  FileText, Download, TrendingUp, BarChart3, 
  PieChart as PieIcon, Activity, Package, 
  DollarSign, Landmark, ChevronRight, Sparkles,
  Zap, AlertTriangle, CheckCircle2, History,
  Calculator, User, Building, MapPin, Receipt,
  Warehouse, Calendar, Info
} from 'lucide-react';
import { useERP } from '../context/ERPContext';

type ReportTab = 'Executive' | 'Project' | 'Finance' | 'Procurement' | 'Billing' | 'Inventory' | 'CashFlow';

const ReportsModule: React.FC = () => {
  const { projects, invoices, vendors, materials, contractorBills, accounts } = useERP();
  const [activeTab, setActiveTab] = React.useState<ReportTab>('Executive');

  // --- MOCK DATA FOR ANALYTICS ENGINE ---
  const completionTrend = [
    { month: 'Jan', planned: 20, actual: 18 },
    { month: 'Feb', planned: 40, actual: 35 },
    { month: 'Mar', planned: 60, actual: 62 },
    { month: 'Apr', planned: 80, actual: 78 },
    { month: 'May', planned: 100, actual: 95 },
  ];

  const financialPerformance = [
    { month: 'Jan', revenue: 450, expense: 380, profit: 70 },
    { month: 'Feb', revenue: 520, expense: 410, profit: 110 },
    { month: 'Mar', revenue: 480, expense: 490, profit: -10 },
    { month: 'Apr', revenue: 610, expense: 380, profit: 230 },
  ];

  const vendorDistribution = [
    { name: 'UltraTech', value: 35, color: '#4f46e5' },
    { name: 'JSW Steel', value: 25, color: '#f59e0b' },
    { name: 'Kajaria', value: 20, color: '#10b981' },
    { name: 'Others', value: 20, color: '#94a3b8' },
  ];

  const materialConsumption = [
    { month: 'Jan', cement: 400, steel: 240, sand: 200 },
    { month: 'Feb', cement: 300, steel: 139, sand: 221 },
    { month: 'Mar', cement: 200, steel: 980, sand: 229 },
    { month: 'Apr', cement: 278, steel: 390, sand: 200 },
  ];

  const cashFlow = [
    { month: 'Jan', inflow: 1200, outflow: 800 },
    { month: 'Feb', inflow: 1500, outflow: 1100 },
    { month: 'Mar', inflow: 1300, outflow: 1400 },
    { month: 'Apr', inflow: 1800, outflow: 1200 },
  ];

  const COLORS = ['#4f46e5', '#f59e0b', '#10b981', '#94a3b8', '#ec4899'];

  const ReportHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{title}</h3>
        <p className="text-slate-500 text-sm font-medium mt-1 tracking-wide">{subtitle}</p>
      </div>
      <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">
        <Download className="w-4 h-4" /> Export Professional PDF
      </button>
    </div>
  );

  const StatGrid = ({ stats }: { stats: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:border-indigo-400 transition-all relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-500 text-indigo-600">{s.icon}</div>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 tracking-tighter italic">{s.value}</p>
            <span className={`text-[10px] font-black ${s.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
              {s.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 bg-white p-2 rounded-[32px] border border-slate-200 shadow-sm space-y-1">
          {(['Executive', 'Project', 'Finance', 'Procurement', 'Billing', 'Inventory', 'CashFlow'] as ReportTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-6 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between group ${
                activeTab === tab ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              {tab.replace(/([A-Z])/g, ' $1').trim()}
              <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === tab ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
          ))}
        </div>

        {/* Main Report Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'Executive' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <ReportHeader title="Management Executive Summary" subtitle="Consolidated Portfolio Intelligence Matrix • Q2 2024" />
              <StatGrid stats={[
                { label: 'Overall Portfolio Health', value: '92%', trend: '+4.2%', trendUp: true, icon: <Activity /> },
                { label: 'Total Portfolio Valuation', value: '₹124Cr', trend: 'Stable', trendUp: true, icon: <Landmark /> },
                { label: 'Net Operating Margin', value: '18.4%', trend: '-1.1%', trendUp: false, icon: <TrendingUp /> }
              ]} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 bg-white p-10 rounded-[56px] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-10">
                       <div>
                          <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs italic">Revenue vs Expense Synthesis</h4>
                          <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Portfolio Financial Integrity Audit</p>
                       </div>
                    </div>
                    <div className="h-80">
                       <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={financialPerformance}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                             <XAxis dataKey="name" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                             <YAxis fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                             <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }} />
                             <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={30} />
                             <Bar dataKey="expense" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={30} />
                             <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981' }} />
                          </ComposedChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="bg-slate-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between border border-white/5">
                    <div className="absolute top-0 right-0 p-12 opacity-5"><Sparkles className="w-48 h-48 text-indigo-400" /></div>
                    <div>
                       <div className="flex items-center gap-2 text-indigo-400 mb-6">
                          <Zap className="w-5 h-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Genius Strategic Insight</span>
                       </div>
                       <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-6 leading-tight">Optimizing Liquidity for Phase 3</h3>
                       <p className="text-slate-400 text-sm font-medium leading-relaxed italic mb-10">
                          Predictive model suggests a 12% rate surge in structural steel for Q3. Advancing procurement cycles by 15 days will preserve ₹8.4L in margin integrity.
                       </p>
                    </div>
                    <button className="w-full py-5 bg-indigo-600 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 active:scale-95">Deploy Strategy</button>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'Project' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <ReportHeader title="Project Performance Metrics" subtitle="Planned vs. Actual Completion Delta Analysis" />
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-sm">
                     <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-10 italic flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-600" /> Completion Velocity Trend
                     </h4>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={completionTrend}>
                              <defs>
                                <linearGradient id="colorPl" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorAc" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="month" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                              <YAxis fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                              <Tooltip contentStyle={{ borderRadius: '24px' }} />
                              <Area type="monotone" dataKey="planned" stroke="#4f46e5" strokeWidth={4} fill="url(#colorPl)" />
                              <Area type="monotone" dataKey="actual" stroke="#f59e0b" strokeWidth={4} fill="url(#colorAc)" />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-sm">
                     <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-10 italic flex items-center gap-2">
                        <PieIcon className="w-4 h-4 text-indigo-600" /> Portfolio Status Distribution
                     </h4>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie data={[
                                 { name: 'Completed', value: 30 },
                                 { name: 'Ongoing', value: 45 },
                                 { name: 'Delayed', value: 15 },
                                 { name: 'On Hold', value: 10 }
                              ]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={10} dataKey="value">
                                 {COLORS.map((color, i) => <Cell key={i} fill={color} />)}
                              </Pie>
                              <Tooltip />
                              <Legend verticalAlign="bottom" height={36}/>
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Finance' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <ReportHeader title="Financial Audit Interface" subtitle="Margin Analysis • Burn Deviation • Tax Integrity" />
               <div className="bg-white p-12 rounded-[56px] border border-slate-200 shadow-sm overflow-hidden group">
                  <div className="flex justify-between items-center mb-10">
                     <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest italic flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-indigo-600" /> Profit Margin Lifecycle (YTD)
                     </h4>
                  </div>
                  <div className="h-96">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={financialPerformance}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis dataKey="month" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                           <YAxis fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                           <Tooltip contentStyle={{ borderRadius: '24px' }} />
                           <Line type="monotone" dataKey="profit" stroke="#4f46e5" strokeWidth={6} dot={{ r: 6, fill: '#4f46e5' }} />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Procurement' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <ReportHeader title="Strategic Procurement Intelligence" subtitle="Vendor Performance • Spending Variance • Lifecycle Control" />
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-sm">
                     <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-10 italic">Vendor Market Concentration</h4>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie data={vendorDistribution} innerRadius={70} outerRadius={90} dataKey="value">
                                 {vendorDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                              </Pie>
                              <Tooltip />
                              <Legend verticalAlign="bottom" height={36}/>
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
                  <div className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-sm">
                     <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-10 italic">Monthly Sourcing Volume vs Budget</h4>
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={financialPerformance}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="month" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                              <YAxis fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                              <Tooltip contentStyle={{ borderRadius: '24px' }} />
                              <Bar dataKey="expense" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'Inventory' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <ReportHeader title="Material Logistics & Consumption" subtitle="Resource Burn Analysis • Stock Integrity Tracking" />
               <div className="bg-white p-12 rounded-[56px] border border-slate-200 shadow-sm">
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-10 italic flex items-center gap-2">
                    <Warehouse className="w-4 h-4 text-indigo-600" /> Material Consumption Trend (Grouped)
                  </h4>
                  <div className="h-96">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={materialConsumption}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis dataKey="month" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                           <YAxis fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                           <Tooltip contentStyle={{ borderRadius: '24px' }} />
                           <Legend verticalAlign="top" align="right" />
                           <Line type="monotone" dataKey="cement" stroke="#4f46e5" strokeWidth={3} dot={false} />
                           <Line type="monotone" dataKey="steel" stroke="#f59e0b" strokeWidth={3} dot={false} />
                           <Line type="monotone" dataKey="sand" stroke="#10b981" strokeWidth={3} dot={false} />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'CashFlow' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <ReportHeader title="Portfolio Cash Flow Matrix" subtitle="Capital Inflow Velocity • Disbursement Integrity" />
               <div className="bg-white p-12 rounded-[56px] border border-slate-200 shadow-sm">
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-10 italic flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-indigo-600" /> Monthly Capital Velocity (Stacked)
                  </h4>
                  <div className="h-96">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cashFlow}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                           <XAxis dataKey="month" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                           <YAxis fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                           <Tooltip contentStyle={{ borderRadius: '24px' }} />
                           <Bar dataKey="inflow" stackId="a" fill="#4f46e5" radius={[0, 0, 0, 0]} />
                           <Bar dataKey="outflow" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
          )}
          
          {/* Default/Empty States for Billing not implemented specifically in tabs but follows same pattern */}
          {activeTab === 'Billing' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <ReportHeader title="Billing & Receivables Dashboard" subtitle="Client Aging • Contractor Outstanding • Net Certified Values" />
               <div className="bg-white p-12 rounded-[56px] border border-slate-200 shadow-sm">
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-10 italic flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-indigo-600" /> Client Outstanding Ledger (Horizontal)
                  </h4>
                  <div className="h-96">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={[
                           { name: 'Emaar Properties', value: 4500000 },
                           { name: 'Nakheel Assets', value: 2800000 },
                           { name: 'Damac Corp', value: 1200000 },
                           { name: 'Meraas Dev', value: 800000 }
                        ]} margin={{ left: 60 }}>
                           <XAxis type="number" hide />
                           <YAxis dataKey="name" type="category" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} width={150} />
                           <Tooltip />
                           <Bar dataKey="value" fill="#4f46e5" radius={[0, 10, 10, 0]} barSize={30} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsModule;
