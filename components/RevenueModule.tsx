
import React from 'react';
import { useERP } from '../context/ERPContext';
import { 
  TrendingUp, IndianRupee, PieChart as PieIcon, BarChart3, 
  ArrowUpRight, ArrowDownRight, Target, Activity,
  Wallet, Briefcase, ChevronRight, CheckCircle2,
  Sparkles, Filter, Search, Download, Info,
  Banknote, Scale, Landmark, Gauge, ArrowRight,
  FileText, History, Calculator, Receipt, ShieldCheck,
  Zap, Calendar, LayoutDashboard, Database, 
  Globe, Coins, Boxes, AlertTriangle, TrendingDown
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, BarChart, Bar, Cell, 
  Legend, ComposedChart, Line, PieChart as RePieChart, Pie
} from 'recharts';
import { geminiService } from '../services/geminiService';

const RevenueModule: React.FC = () => {
  const { projects, employees, contractorBills, invoices, accounts, companies } = useERP();
  const [activeView, setActiveView] = React.useState<'Portfolio_Summary' | 'Performance_Leaderboard' | 'GST_Cashflow'>('Portfolio_Summary');
  const [isGeneratingReport, setIsGeneratingReport] = React.useState(false);

  // --- MULTI-TENANT ANALYTICS ENGINE ---
  const totalProjects = projects.length;
  const activeProjectsCount = projects.filter(p => p.status === 'Active' || p.status === 'In Progress').length;
  const completedProjectsCount = projects.filter(p => p.status === 'Completed').length;
  
  const totalPortfolioValue = projects.reduce((sum, p) => sum + (p.contract_value || p.budget * 1.25), 0);
  const totalRevenue = invoices.filter(inv => inv.status === 'Paid' || inv.status === 'Sent').reduce((sum, inv) => sum + inv.total, 0);
  
  const totalContractorExpense = contractorBills.reduce((sum, bill) => sum + bill.bill_amount, 0);
  const totalPayrollExpense = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const totalExpenses = totalContractorExpense + totalPayrollExpense;
  
  const netProfit = totalRevenue - totalExpenses;
  const portfolioMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  
  const cashFlowPosition = accounts.filter(a => a.type === 'Asset').reduce((sum, a) => sum + a.balance, 0);
  const gstPayable = totalRevenue * 0.18;

  // Pie Chart: Expenditure Breakdown
  const expenseBreakdown = [
    { name: 'Contractors', value: totalContractorExpense, color: '#4f46e5' },
    { name: 'Payroll', value: totalPayrollExpense, color: '#f59e0b' },
    { name: 'Overheads', value: totalExpenses * 0.1, color: '#10b981' },
  ];

  // Bar Chart: Company-wise Net Profit (Leaderboard)
  const companyProfitData = companies.map(company => {
    const cRevenue = invoices.filter(inv => inv.company_id === company.id && (inv.status === 'Paid' || inv.status === 'Sent')).reduce((s, i) => s + i.total, 0);
    const cExpenses = contractorBills.filter(bill => projects.find(p => p.id === bill.project_id)?.company_id === company.id).reduce((s, b) => s + b.bill_amount, 0);
    return {
      name: company.name.split(' ')[0],
      profit: cRevenue - cExpenses
    };
  }).sort((a,b) => b.profit - a.profit);

  const trendData = [
    { name: 'Jan', revenue: totalRevenue * 0.7, expense: totalExpenses * 0.65, profit: 12 },
    { name: 'Feb', revenue: totalRevenue * 0.85, expense: totalExpenses * 0.75, profit: 15 },
    { name: 'Mar', revenue: totalRevenue * 0.9, expense: totalExpenses * 0.8, profit: 10 },
    { name: 'Apr', revenue: totalRevenue, expense: totalExpenses, profit: 18 },
  ];

  const handleGenerateCEOReport = async () => {
    setIsGeneratingReport(true);
    const portfolioData = {
      totalRevenue,
      totalExpenses,
      netProfit,
      portfolioMargin,
      totalProjects,
      activeProjectsCount,
      cashFlowPosition
    };
    const summary = await geminiService.generateExecutiveSummary(portfolioData);
    alert("AI Executive Summary Generated. Check Console for Markdown.");
    console.log(summary);
    setIsGeneratingReport(false);
  };

  const StatBlock = ({ label, value, subValue, icon, color = 'indigo', isCurrency = true }: any) => (
    <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-400 transition-all">
      <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-500 text-${color}-600`}>{icon}</div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-black text-slate-900 tracking-tighter italic">
          {isCurrency ? `₹${(value / 10000000).toFixed(2)}Cr` : value}
        </p>
      </div>
      <p className="text-[11px] font-bold text-slate-400 uppercase mt-2">{subValue}</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
             <LayoutDashboard className="w-8 h-8 text-indigo-600" />
             Portfolio Command Center
           </h2>
           <p className="text-slate-500 text-sm font-medium italic">Unified Financial Intelligence • Multi-Tenant Portfolio Guard</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex bg-white p-1.5 rounded-[24px] border border-slate-200 shadow-sm overflow-x-auto">
            {(['Portfolio_Summary', 'Performance_Leaderboard', 'GST_Cashflow'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveView(tab)}
                className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeView === tab ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-indigo-600'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
          <button 
            onClick={handleGenerateCEOReport}
            disabled={isGeneratingReport}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {isGeneratingReport ? <Activity className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-indigo-400" />}
            AI Audit
          </button>
        </div>
      </div>

      {activeView === 'Portfolio_Summary' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBlock label="Portfolio Valuation" value={totalPortfolioValue} subValue={`${totalProjects} Active Assets`} icon={<Landmark className="w-16 h-16" />} />
            <StatBlock label="Revenue Realized" value={totalRevenue} subValue="Billed Audit Active" icon={<IndianRupee className="w-16 h-16" />} />
            <StatBlock label="Operating Profit" value={netProfit} subValue={`Margin: ${portfolioMargin.toFixed(1)}%`} icon={<Coins className="w-16 h-16" />} color="emerald" />
            <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform"><Wallet className="w-20 h-20" /></div>
               <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest mb-1">Total Liquidity</p>
               <p className="text-3xl font-black tracking-tighter italic">₹{(cashFlowPosition / 10000000).toFixed(2)}Cr</p>
               <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400">
                  <TrendingUp className="w-4 h-4" /> Capital Safe
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs italic">Revenue vs Expense Synthesis</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Growth vs Burn Matrix</p>
                  </div>
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase italic">
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-600 rounded-sm" /> Revenue</div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-sm" /> Expenses</div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full" /> Margin %</div>
                  </div>
               </div>
               <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                     <ComposedChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} />
                        <YAxis yAxisId="left" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} fontSize={10} tickFormatter={(v) => `${v}%`} />
                        <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }} />
                        <Bar yAxisId="left" dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={25} />
                        <Bar yAxisId="left" dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={25} />
                        <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981' }} />
                     </ComposedChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm flex flex-col justify-between">
               <div>
                  <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-8 italic flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-indigo-600" /> Expense Breakdown
                  </h4>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={expenseBreakdown}
                          innerRadius={60}
                          outerRadius={85}
                          paddingAngle={10}
                          dataKey="value"
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 space-y-3">
                    {expenseBreakdown.map(e => (
                      <div key={e.name} className="flex justify-between items-center text-[10px] font-black uppercase">
                         <span className="flex items-center gap-2 text-slate-500">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                           {e.name}
                         </span>
                         <span className="text-slate-900">₹{(e.value/100000).toFixed(1)}L</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm">
                <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-10 italic flex items-center gap-2">
                   <BarChart3 className="w-4 h-4 text-indigo-600" /> Entity Performance Yield
                </h4>
                <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={companyProfitData} layout="vertical" margin={{ left: 20 }}>
                         <XAxis type="number" hide />
                         <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={10} fontStyle="bold" width={80} />
                         <Tooltip cursor={{ fill: 'transparent' }} formatter={(v) => `₹${(Number(v)/100000).toFixed(1)}L Profit`} />
                         <Bar dataKey="profit" fill="#10b981" radius={[0, 8, 8, 0]} barSize={25} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-slate-900 p-10 rounded-[48px] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                <div className="absolute right-0 top-0 p-10 opacity-5 group-hover:scale-110 transition-transform"><Sparkles className="w-40 h-40 text-indigo-400" /></div>
                <div>
                   <div className="flex items-center gap-2 text-indigo-400 mb-6">
                      <Zap className="w-5 h-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest italic">Strategic Yield Guard</span>
                   </div>
                   <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-6 leading-tight">Consolidated Fiscal Resilience</h3>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed italic mb-8">
                      Your current Portfolio Profit Margin is <span className="text-emerald-400 font-black">18.4%</span>. To hit the Q3 target of 22%, optimize sub-contractor utilization in <span className="text-white font-black">High-Burn Zones</span>.
                   </p>
                </div>
                <div className="flex gap-4">
                   <button className="flex-1 py-5 bg-indigo-600 rounded-[28px] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-500 transition-all shadow-xl active:scale-95">Reallocate Capital</button>
                   <button className="px-10 py-5 border border-white/10 rounded-[28px] font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all flex items-center gap-2"><Download className="w-4 h-4" /> Data Export</button>
                </div>
             </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueModule;
