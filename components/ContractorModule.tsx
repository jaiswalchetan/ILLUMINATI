
import React from 'react';
import { useERP } from '../context/ERPContext';
import { Contractor, ContractorBill, Project, ContractorPayment, WorkOrder, WorkOrderItem, BOQItem } from '../types';
import { 
  Plus, Search, Filter, Hammer, FileText, 
  IndianRupee, MoreVertical, CheckCircle2, 
  Clock, AlertTriangle, ArrowRight, User,
  Calendar, CreditCard, ChevronDown, Save,
  X, Briefcase, Calculator, Receipt,
  MinusCircle, CheckCircle, TrendingUp,
  BarChart3, Activity, PieChart, ShieldCheck,
  Building2, Landmark, History, ClipboardList,
  Eye
} from 'lucide-react';

type ContractorTab = 'Dashboard' | 'Directory' | 'Work Orders' | 'RA Billing' | 'Payments';

const ContractorModule: React.FC = () => {
  const { 
    contractors, 
    contractorBills, 
    contractorPayments,
    workOrders,
    projects, 
    addContractor, 
    addContractorBill, 
    addContractorPayment,
    addWorkOrder,
    updateWorkOrderStatus,
    updateContractorBillStatus 
  } = useERP();
  
  const [activeTab, setActiveTab] = React.useState<ContractorTab>('Dashboard');
  const [showBillForm, setShowBillForm] = React.useState(false);
  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  const [showWOForm, setShowWOForm] = React.useState(false);
  const [selectedBillForPayment, setSelectedBillForPayment] = React.useState<ContractorBill | null>(null);
  
  // WO Form State
  const [newWO, setNewWO] = React.useState<Partial<WorkOrder>>({
    project_id: projects[0]?.id || 0,
    contractor_id: 0,
    wo_number: `WO-${Date.now().toString().slice(-4)}`,
    status: 'Issued',
    description: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
    items: []
  });

  const [newBill, setNewBill] = React.useState<Partial<ContractorBill>>({
    contractor_id: 0,
    project_id: 1,
    work_order_id: undefined,
    bill_number: '',
    bill_amount: 0,
    retention_percent: 5,
    tds_percent: 2,
    status: 'pending'
  });

  const [paymentData, setPaymentData] = React.useState({
    amount: 0,
    mode: 'NEFT/RTGS',
    date: new Date().toISOString().split('T')[0]
  });

  /**
   * C. Tracking Dashboard Aggregates
   * Calculates Total Value, Billed, Paid, Retention, and Outstanding
   */
  const getStats = (cId: number | null = null) => {
    const filteredContractors = cId ? contractors.filter(c => c.id === cId) : contractors;
    const filteredBills = cId ? contractorBills.filter(b => b.contractor_id === cId) : contractorBills;
    const billIds = filteredBills.map(b => b.id);
    const filteredPayments = cId ? contractorPayments.filter(p => billIds.includes(p.contractor_bill_id)) : contractorPayments;

    const totalContractValue = filteredContractors.reduce((acc, c) => acc + c.contract_value, 0);
    const totalBilled = filteredBills.reduce((acc, b) => acc + b.bill_amount, 0);
    const totalRetention = filteredBills.reduce((acc, b) => acc + (b.bill_amount * b.retention_percent / 100), 0);
    const totalNetPayable = filteredBills.reduce((acc, b) => acc + b.net_payable, 0);
    const totalPaid = filteredPayments.reduce((acc, p) => acc + p.paid_amount, 0);
    const outstanding = totalNetPayable - totalPaid;

    return { totalContractValue, totalBilled, totalPaid, totalRetention, outstanding };
  };

  const globalStats = React.useMemo(() => getStats(), [contractors, contractorBills, contractorPayments]);

  const handleSaveBill = () => {
    if (!newBill.contractor_id || !newBill.bill_amount || !newBill.bill_number) {
      alert("Please fill all required fields.");
      return;
    }
    const amount = Number(newBill.bill_amount);
    const ret = (amount * (newBill.retention_percent || 0)) / 100;
    const tds = (amount * (newBill.tds_percent || 0)) / 100;
    const net = amount - ret - tds;

    addContractorBill({
      ...newBill,
      id: Date.now(),
      net_payable: net,
      status: 'approved',
      created_at: new Date().toISOString().split('T')[0]
    } as ContractorBill);
    setShowBillForm(false);
  };

  const handleRecordPayment = () => {
    if (!selectedBillForPayment) return;
    addContractorPayment({
      id: Date.now(),
      contractor_bill_id: selectedBillForPayment.id,
      paid_amount: paymentData.amount,
      payment_date: paymentData.date,
      payment_mode: paymentData.mode
    });
    setShowPaymentForm(false);
    setSelectedBillForPayment(null);
  };

  /**
   * B. Work Order Calculation Logic:
   * Item Amount = Quantity × Rate
   * Work Order Total = Sum of all item amounts
   */
  const handleSaveWO = () => {
    if (!newWO.project_id || !newWO.contractor_id || !newWO.items?.length) {
      alert("Please select project, contractor and at least one BOQ item.");
      return;
    }
    const totalValue = newWO.items.reduce((sum, item) => sum + item.amount, 0);
    
    addWorkOrder({
      ...newWO,
      id: Date.now(),
      company_id: 1, 
      issue_date: new Date().toISOString().split('T')[0],
      total_value: totalValue
    } as WorkOrder);
    setShowWOForm(false);
    // Reset
    setNewWO({
      project_id: projects[0]?.id || 0,
      contractor_id: 0,
      wo_number: `WO-${Date.now().toString().slice(-4)}`,
      status: 'Issued',
      description: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      items: []
    });
  };

  /**
   * Balance Work = Work Order Value – Total Bills Submitted
   */
  const calculateBalanceWork = (wo: WorkOrder) => {
    const totalBilledForWO = contractorBills
      .filter(b => b.work_order_id === wo.id)
      .reduce((sum, b) => sum + b.bill_amount, 0);
    return wo.total_value - totalBilledForWO;
  };

  const StatBlock = ({ label, value, icon, color = 'indigo' }: any) => (
    <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm relative group overflow-hidden">
      <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform text-${color}-600`}>{icon}</div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black text-slate-900 tracking-tighter italic">₹{(value / 100000).toFixed(2)}L</p>
    </div>
  );

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
             <Hammer className="w-8 h-8 text-indigo-600" />
             Contractor Hub
           </h2>
           <p className="text-slate-500 text-sm font-medium italic">Asset Lifecycle • Fiscal Control • Work Allocation</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-[24px] border border-slate-200 shadow-sm overflow-x-auto">
          {(['Dashboard', 'Directory', 'Work Orders', 'RA Billing', 'Payments'] as ContractorTab[]).map(tab => (
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

      {activeTab === 'Dashboard' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatBlock label="Total Contract Value" value={globalStats.totalContractValue} icon={<Landmark className="w-16 h-16" />} />
            <StatBlock label="Total Billed" value={globalStats.totalBilled} icon={<FileText className="w-16 h-16" />} />
            <StatBlock label="Total Paid" value={globalStats.totalPaid} icon={<CreditCard className="w-16 h-16" />} />
            <StatBlock label="Retention Held" value={globalStats.totalRetention} icon={<ShieldCheck className="w-16 h-16" />} />
            <div className="bg-slate-900 p-6 rounded-[32px] shadow-xl text-white">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Outstanding Liability</p>
              <p className="text-2xl font-black text-rose-500 tracking-tighter italic">₹{(globalStats.outstanding / 100000).toFixed(2)}L</p>
              <div className="mt-3 flex items-center gap-1.5 text-[9px] font-black uppercase text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-lg w-fit">
                 <AlertTriangle className="w-3 h-3" /> Net Aging Active
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-10 px-2">
                <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest italic flex items-center gap-3">
                  <PieChart className="w-5 h-5 text-indigo-600" /> Per-Contractor Summary
                </h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                   <thead className="text-[10px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-100">
                      <tr>
                         <th className="px-6 py-4">Contractor Name</th>
                         <th className="px-6 py-4 text-right">Value</th>
                         <th className="px-6 py-4 text-right">Billed</th>
                         <th className="px-6 py-4 text-right">Paid</th>
                         <th className="px-6 py-4 text-right">Outstanding</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 font-bold">
                      {contractors.map(c => {
                         const s = getStats(c.id);
                         return (
                            <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                               <td className="px-6 py-5 text-slate-900 uppercase tracking-tight">{c.name}</td>
                               <td className="px-6 py-5 text-right">₹{s.totalContractValue.toLocaleString()}</td>
                               <td className="px-6 py-5 text-right text-indigo-600 italic">₹{s.totalBilled.toLocaleString()}</td>
                               <td className="px-6 py-5 text-right text-emerald-600">₹{s.totalPaid.toLocaleString()}</td>
                               <td className="px-6 py-5 text-right text-rose-500">₹{s.outstanding.toLocaleString()}</td>
                            </tr>
                         );
                      })}
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'Directory' && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {contractors.map(c => (
             <div key={c.id} className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm hover:border-indigo-400 transition-all group relative overflow-hidden">
                <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:scale-125 transition-transform"><Hammer className="w-24 h-24 text-indigo-600" /></div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-[24px] flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                     {c.name.substring(0, 1)}
                  </div>
                  <div>
                     <h4 className="font-black text-slate-900 text-lg leading-tight uppercase tracking-tight">{c.name}</h4>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Contractor ID: {c.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Contract Value</p>
                        <p className="text-2xl font-black text-slate-900 italic">₹{(c.contract_value / 100000).toFixed(1)}L</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">Verified</span>
                     </div>
                  </div>
                  <button className="w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-white hover:border-indigo-600 hover:text-indigo-600 transition-all">View Statement</button>
                </div>
             </div>
           ))}
           <button className="h-full min-h-[300px] border-4 border-dashed border-slate-100 rounded-[48px] flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-indigo-200 hover:text-indigo-400 transition-all group">
              <Plus className="w-12 h-12 group-hover:scale-110 transition-transform" />
              <span className="font-black uppercase tracking-widest text-xs">Onboard New Contractor</span>
           </button>
         </div>
      )}

      {activeTab === 'Work Orders' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
           <div className="bg-slate-900 p-10 rounded-[48px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 p-10 opacity-10"><ClipboardList className="w-48 h-48" /></div>
              <div className="relative z-10">
                 <h3 className="text-2xl font-black uppercase tracking-tight italic">Work Order Control</h3>
                 <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mt-1">Legally binding work allocation system</p>
              </div>
              <button 
                onClick={() => setShowWOForm(true)}
                className="relative z-10 bg-white text-slate-900 px-10 py-5 rounded-[24px] text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3"
              >
                <Plus className="w-5 h-5" /> Generate Work Order
              </button>
           </div>

           <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                 <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                    <tr>
                       <th className="px-10 py-8">WO Identity</th>
                       <th className="px-10 py-8">Contractor / Project</th>
                       <th className="px-10 py-8 text-right">Value</th>
                       <th className="px-10 py-8 text-right">Balance Work</th>
                       <th className="px-10 py-8 text-center">Status</th>
                       <th className="px-10 py-8 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {workOrders.map(wo => {
                      const contractor = contractors.find(c => c.id === wo.contractor_id);
                      const project = projects.find(p => p.id === wo.project_id);
                      const balance = calculateBalanceWork(wo);
                      return (
                        <tr key={wo.id} className="hover:bg-slate-50 transition-colors group font-bold">
                           <td className="px-10 py-8">
                              <p className="text-indigo-600 font-black italic">{wo.wo_number}</p>
                              <p className="text-[9px] text-slate-400 uppercase font-black mt-1">Issued: {wo.issue_date}</p>
                           </td>
                           <td className="px-10 py-8">
                              <p className="text-slate-900 text-sm tracking-tight">{contractor?.name}</p>
                              <p className="text-[10px] text-slate-400 uppercase font-black mt-1">{project?.name}</p>
                           </td>
                           <td className="px-10 py-8 text-right font-black text-slate-900 italic">₹{wo.total_value.toLocaleString()}</td>
                           <td className="px-10 py-8 text-right font-black text-rose-500 italic">₹{balance.toLocaleString()}</td>
                           <td className="px-10 py-8 text-center">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                wo.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                                wo.status === 'Issued' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                              }`}>{wo.status}</span>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex justify-end gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-all"><Eye className="w-5 h-5" /></button>
                                <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all"><MoreVertical className="w-5 h-5" /></button>
                              </div>
                           </td>
                        </tr>
                      );
                    })}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {activeTab === 'RA Billing' && (
         <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
           <div className="bg-slate-900 p-10 rounded-[48px] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 p-10 opacity-10"><Calculator className="w-48 h-48" /></div>
              <div className="relative z-10">
                 <h3 className="text-2xl font-black uppercase tracking-tight italic">Running Account (RA) Billing Engine</h3>
                 <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mt-1">Systematic Audit & Compliance Overlay</p>
              </div>
              <button 
                onClick={() => setShowBillForm(true)}
                className="relative z-10 bg-white text-slate-900 px-10 py-5 rounded-[24px] text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3"
              >
                <FileText className="w-5 h-5" /> Raise New RA Bill
              </button>
           </div>

           <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                 <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                    <tr>
                       <th className="px-10 py-8">Bill Identity</th>
                       <th className="px-10 py-8">Contractor / Project</th>
                       <th className="px-10 py-8 text-right">Gross Amount</th>
                       <th className="px-10 py-8 text-center">Retention & TDS</th>
                       <th className="px-10 py-8 text-right">Net Certified</th>
                       <th className="px-10 py-8 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {contractorBills.map(bill => {
                      const contractor = contractors.find(c => c.id === bill.contractor_id);
                      const project = projects.find(p => p.id === bill.project_id);
                      return (
                        <tr key={bill.id} className="hover:bg-slate-50 transition-colors group font-bold">
                           <td className="px-10 py-8 text-sm">
                              <p className="text-indigo-600 font-black italic">{bill.bill_number}</p>
                              <p className="text-[9px] text-slate-400 uppercase font-black mt-1">Audit: {bill.created_at || '2024-05-20'}</p>
                           </td>
                           <td className="px-10 py-8">
                              <p className="text-slate-900 text-sm tracking-tight">{contractor?.name}</p>
                              <p className="text-[10px] text-slate-400 uppercase font-black mt-1">{project?.name}</p>
                           </td>
                           <td className="px-10 py-8 text-right font-black text-slate-900 italic">₹{bill.bill_amount.toLocaleString()}</td>
                           <td className="px-10 py-8 text-center">
                              <div className="flex flex-col items-center">
                                 <div className="flex gap-2 text-[9px] font-black uppercase">
                                    <span className="text-rose-600">RET {bill.retention_percent}%</span>
                                    <span className="text-amber-600">TDS {bill.tds_percent}%</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right font-black text-indigo-600 text-lg tracking-tighter italic">₹{bill.net_payable.toLocaleString()}</td>
                           <td className="px-10 py-8 text-right">
                              {bill.status === 'approved' && (
                                <button 
                                  onClick={() => { setSelectedBillForPayment(bill); setPaymentData({...paymentData, amount: bill.net_payable}); setShowPaymentForm(true); }}
                                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2"
                                >
                                  <CreditCard className="w-3 h-3" /> Pay Now
                                </button>
                              )}
                              {bill.status === 'paid' && <CheckCircle className="w-6 h-6 text-emerald-500 ml-auto" />}
                           </td>
                        </tr>
                      );
                    })}
                 </tbody>
              </table>
           </div>
         </div>
      )}

      {activeTab === 'Payments' && (
        <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-500">
           <div className="p-8 bg-slate-50 border-b border-slate-100">
              <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest italic">Disbursement History</h4>
           </div>
           <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                 <tr>
                    <th className="px-10 py-8">Date</th>
                    <th className="px-10 py-8">Contractor</th>
                    <th className="px-10 py-8">Bill Reference</th>
                    <th className="px-10 py-8">Mode</th>
                    <th className="px-10 py-8 text-right">Amount</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {contractorPayments.map(p => {
                    const bill = contractorBills.find(b => b.id === p.contractor_bill_id);
                    const contractor = contractors.find(c => c.id === bill?.contractor_id);
                    return (
                       <tr key={p.id} className="hover:bg-slate-50 font-bold">
                          <td className="px-10 py-6 text-slate-400 font-mono italic">{p.payment_date}</td>
                          <td className="px-10 py-6 text-slate-900 uppercase">{contractor?.name}</td>
                          <td className="px-10 py-6 text-indigo-600 italic">{bill?.bill_number}</td>
                          <td className="px-10 py-6 text-slate-500 uppercase text-xs">{p.payment_mode}</td>
                          <td className="px-10 py-6 text-right font-black text-emerald-600">₹{p.paid_amount.toLocaleString()}</td>
                       </tr>
                    );
                 })}
              </tbody>
           </table>
        </div>
      )}

      {/* Enhanced WO Form Modal */}
      {showWOForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] w-full max-w-4xl shadow-2xl p-16 space-y-12 animate-in zoom-in-95 duration-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none"><ClipboardList className="w-64 h-64 text-indigo-600" /></div>
              
              <div className="flex justify-between items-start relative z-10">
                 <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Work Order Architect</h3>
                    <p className="text-slate-500 text-sm font-medium mt-1">Bind contractors to specific BOQ scope and rates.</p>
                 </div>
                 <button onClick={() => setShowWOForm(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X className="w-8 h-8" /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WO Number</label>
                        <input type="text" value={newWO.wo_number} onChange={e => setNewWO({...newWO, wo_number: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-black outline-none focus:border-indigo-600" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project</label>
                        <select 
                          value={newWO.project_id}
                          onChange={e => setNewWO({...newWO, project_id: Number(e.target.value), items: []})}
                          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-black outline-none"
                        >
                          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assign Contractor</label>
                       <select 
                        value={newWO.contractor_id}
                        onChange={e => setNewWO({...newWO, contractor_id: Number(e.target.value)})}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-black outline-none"
                       >
                          <option value={0}>Choose Contractor...</option>
                          {contractors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scope Description</label>
                       <textarea 
                        value={newWO.description}
                        onChange={e => setNewWO({...newWO, description: e.target.value})}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium outline-none h-24"
                        placeholder="Detailed scope of works..."
                       />
                    </div>
                    
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Scope from BOQ</label>
                       <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                         {projects.find(p => p.id === newWO.project_id)?.boq?.map(item => {
                           const isChecked = newWO.items?.some(i => i.boq_item_id === item.id);
                           return (
                             <div 
                              key={item.id} 
                              onClick={() => {
                                const exists = newWO.items?.find(i => i.boq_item_id === item.id);
                                if (exists) {
                                  setNewWO({...newWO, items: newWO.items?.filter(i => i.boq_item_id !== item.id)});
                                } else {
                                  const rate = item.final_rate || 0;
                                  const qty = item.quantity || 0;
                                  setNewWO({...newWO, items: [...(newWO.items || []), { 
                                    id: Date.now(), 
                                    boq_item_id: item.id, 
                                    assigned_quantity: qty, 
                                    unit_rate: rate,
                                    amount: qty * rate
                                  }]});
                                }
                              }}
                              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${isChecked ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'}`}
                             >
                               <div>
                                 <p className="text-[10px] font-black uppercase text-slate-800">{item.item_name}</p>
                                 <p className="text-[9px] text-slate-400">BOQ Rate: ₹{item.final_rate?.toLocaleString()}</p>
                               </div>
                               {isChecked && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                             </div>
                           );
                         })}
                       </div>
                    </div>
                 </div>

                 <div className="bg-slate-900 rounded-[48px] p-12 text-white flex flex-col justify-between shadow-2xl group border border-white/5">
                    <div className="space-y-10">
                       <div className="flex items-center gap-3 text-indigo-400">
                          <Calculator className="w-5 h-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">WO Value Calculator</span>
                       </div>
                       <div className="space-y-6">
                          <div className="flex justify-between items-center text-slate-400 font-bold text-sm">
                             <span className="uppercase tracking-widest text-[10px]">Total Linked Items</span>
                             <span className="text-white text-lg">{newWO.items?.length || 0}</span>
                          </div>
                          
                          <div className="space-y-3 pt-4">
                             {newWO.items?.map((item, idx) => {
                               const boq = projects.find(p => p.id === newWO.project_id)?.boq?.find(b => b.id === item.boq_item_id);
                               return (
                                 <div key={idx} className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase italic">
                                    <span className="truncate w-40">{boq?.item_name}</span>
                                    <span>₹{item.amount.toLocaleString()}</span>
                                 </div>
                               );
                             })}
                          </div>

                          <div className="pt-8 border-t border-white/10 flex flex-col">
                             <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-3 italic">Total Work Order Value</span>
                             <span className="text-5xl font-black italic tracking-tighter text-white">
                               ₹{newWO.items?.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                             </span>
                          </div>
                       </div>
                    </div>
                    
                    <button 
                      onClick={handleSaveWO}
                      className="mt-12 w-full py-6 bg-indigo-600 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-indigo-500 transition-all active:scale-95"
                    >
                      Issue Work Order
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {showBillForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] w-full max-w-4xl shadow-2xl p-16 space-y-12 animate-in zoom-in-95 duration-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none"><FileText className="w-64 h-64 text-indigo-600" /></div>
              
              <div className="flex justify-between items-start relative z-10">
                 <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">RA Bill Auditor</h3>
                    <p className="text-slate-500 text-sm font-medium mt-1">Manual Audit & Retention Protocols.</p>
                 </div>
                 <button onClick={() => setShowBillForm(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><X className="w-8 h-8" /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                 <div className="space-y-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Contractor</label>
                       <select 
                        value={newBill.contractor_id}
                        onChange={e => setNewBill({...newBill, contractor_id: Number(e.target.value)})}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-5 text-sm font-black outline-none focus:border-indigo-600 transition-all appearance-none"
                       >
                          <option value={0}>Choose Firm...</option>
                          {contractors.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                       </select>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Link Work Order</label>
                       <select 
                        value={newBill.work_order_id}
                        onChange={e => setNewBill({...newBill, work_order_id: Number(e.target.value)})}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-5 text-sm font-black outline-none focus:border-indigo-600 transition-all appearance-none"
                       >
                          <option value="">Direct Bill (No WO)</option>
                          {workOrders.filter(wo => wo.contractor_id === newBill.contractor_id).map(wo => (
                            <option key={wo.id} value={wo.id}>{wo.wo_number} (₹{calculateBalanceWork(wo).toLocaleString()} Left)</option>
                          ))}
                       </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bill Number</label>
                          <input type="text" value={newBill.bill_number} onChange={e => setNewBill({...newBill, bill_number: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-5 text-sm font-black outline-none focus:border-indigo-600 transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Amount</label>
                          <input type="number" value={newBill.bill_amount} onChange={e => setNewBill({...newBill, bill_amount: Number(e.target.value)})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-5 text-sm font-black outline-none focus:border-indigo-600 transition-all" />
                       </div>
                    </div>
                 </div>

                 <div className="bg-slate-900 rounded-[48px] p-12 text-white flex flex-col justify-between shadow-2xl group border border-white/5">
                    <div className="space-y-10">
                       <div className="flex items-center gap-3 text-indigo-400">
                          <Calculator className="w-5 h-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Audit Formula Engine</span>
                       </div>
                       <div className="space-y-6">
                          <div className="flex justify-between items-center text-slate-400 font-bold text-sm">
                             <span className="uppercase tracking-widest text-[10px]">Net Certified Payable</span>
                             <span className="text-5xl font-black italic tracking-tighter text-white">
                               ₹{(Number(newBill.bill_amount || 0) * 0.93).toLocaleString()}
                             </span>
                          </div>
                          <p className="text-[10px] text-indigo-300 font-bold italic">Calculation: Gross - 5% Retention - 2% TDS</p>
                       </div>
                    </div>
                    
                    <button 
                      onClick={handleSaveBill}
                      className="mt-12 w-full py-6 bg-indigo-600 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-indigo-500 transition-all active:scale-95"
                    >
                      Commit RA Bill
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {showPaymentForm && selectedBillForPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] w-full max-w-md shadow-2xl p-12 space-y-10 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Disbursement Form</h3>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Ref: {selectedBillForPayment.bill_number}</p>
                 </div>
                 <button onClick={() => setShowPaymentForm(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-6 h-6" /></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</label>
                    <input 
                      type="number" 
                      value={paymentData.amount}
                      onChange={e => setPaymentData({...paymentData, amount: Number(e.target.value)})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-lg font-black"
                    />
                 </div>
              </div>

              <button 
                onClick={handleRecordPayment}
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-emerald-700 transition-all"
              >
                Confirm Disbursement
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default ContractorModule;
