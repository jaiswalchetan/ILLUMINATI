
import React from 'react';
import { useERP } from '../context/ERPContext';
import { 
  ShoppingCart, Truck, Package, Plus, Search, 
  Filter, FileText, ClipboardList, CheckCircle2, 
  Clock, AlertTriangle, ArrowRight, X, Save, 
  User, Calendar, Briefcase, Calculator, Receipt,
  TrendingUp, BarChart3, Activity, PieChart, Star,
  DollarSign, Landmark, History, Layers, Zap,
  Settings, Info, Trash2, Eye, Mail, Phone,
  IndianRupee, ChevronRight, CheckSquare, ListChecks,
  Scale, FileSearch, Building, Download, MoreVertical
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { MaterialRequisition, RFQ, Vendor, PurchaseOrder, Quote, GRN } from '../types';

type ProcurementTab = 'Dashboard' | 'Requisitions' | 'Vendors' | 'RFQ' | 'Purchase Orders' | 'GRN';

const ProcurementModule: React.FC = () => {
  const { 
    projects, materials, vendors, requisitions, 
    rfqs, quotes, purchaseOrders, grns,
    addRequisition, updateRequisition, addVendor, 
    addRFQ, addQuote, addPurchaseOrder, addGRN 
  } = useERP();

  const [activeTab, setActiveTab] = React.useState<ProcurementTab>('Dashboard');
  const [showReqForm, setShowReqForm] = React.useState(false);
  const [showVendorForm, setShowVendorForm] = React.useState(false);
  const [showPOForm, setShowPOForm] = React.useState(false);
  const [selectedRFQ, setSelectedRFQ] = React.useState<RFQ | null>(null);

  // Stats Aggregation
  const totalPOValue = purchaseOrders.reduce((sum, po) => sum + po.grand_total, 0);
  const pendingReqCount = requisitions.filter(r => r.status === 'Pending Approval').length;
  const activeRFQs = rfqs.filter(r => r.status === 'Open').length;

  const StatCard = ({ label, value, subValue, icon, color = 'indigo' }: any) => (
    <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-400 transition-all">
      <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-500 text-${color}-600`}>{icon}</div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-black text-slate-900 tracking-tighter italic">{value}</p>
      </div>
      <p className="text-[11px] font-bold text-slate-400 uppercase mt-2">{subValue}</p>
    </div>
  );

  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total PO Valuation" value={`₹${(totalPOValue / 100000).toFixed(1)}L`} subValue="Committed Spend" icon={<IndianRupee className="w-16 h-16" />} />
        <StatCard label="Active Requisitions" value={pendingReqCount} subValue="Awaiting Approval" icon={<ClipboardList className="w-16 h-16" />} color="rose" />
        <StatCard label="Live RFQs" value={activeRFQs} subValue="Open Tenders" icon={<Zap className="w-16 h-16" />} color="amber" />
        <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl text-white relative overflow-hidden group">
           <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform"><Truck className="w-20 h-20" /></div>
           <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest mb-1">Logistics Efficiency</p>
           <p className="text-3xl font-black tracking-tighter italic">94.2%</p>
           <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400">
              <TrendingUp className="w-4 h-4" /> On-Time Performance
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs italic">Procurement vs Burn Analysis</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Global Supply Chain Audit</p>
              </div>
           </div>
           <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{name: 'Mar', po: 85, grn: 70}, {name: 'Apr', po: 120, grn: 95}, {name: 'May', po: 150, grn: 140}]}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} cursor={{fill: 'transparent'}} />
                  <Bar dataKey="po" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={30} />
                  <Bar dataKey="grn" fill="#10b981" radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm flex flex-col justify-between">
           <div>
              <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-8 italic flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-600" /> Recent PO Issuance
              </h4>
              <div className="space-y-4">
                 {purchaseOrders.slice(0, 4).map(po => (
                    <div key={po.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                       <div>
                          <p className="text-xs font-black text-slate-900 uppercase">{po.po_number}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase">{vendors.find(v => v.id === po.vendor_id)?.name}</p>
                       </div>
                       <span className="text-xs font-black italic text-indigo-600">₹{po.grand_total.toLocaleString()}</span>
                    </div>
                 ))}
              </div>
           </div>
           <button className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Download Audit Trail</button>
        </div>
      </div>
    </>
  );

  const renderRequisitions = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
       <div className="flex justify-between items-center bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
          <div className="flex items-center gap-6">
             <div className="p-4 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-200"><ListChecks className="w-8 h-8" /></div>
             <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Indents & Requisitions</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Site Demand Control Layer</p>
             </div>
          </div>
          <button onClick={() => setShowReqForm(true)} className="bg-slate-900 text-white px-10 py-5 rounded-[24px] text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3 hover:scale-105 transition-all">
            <Plus className="w-5 h-5" /> Raise Material Indent
          </button>
       </div>
       
       <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
             <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                <tr>
                   <th className="px-10 py-8">Request ID</th>
                   <th className="px-10 py-8">Project Site</th>
                   <th className="px-10 py-8">Requested By</th>
                   <th className="px-10 py-8 text-center">Priority</th>
                   <th className="px-10 py-8">Status</th>
                   <th className="px-10 py-8 text-right">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 font-bold">
                {requisitions.map(req => (
                   <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-10 py-6">
                         <p className="text-slate-900 font-black italic">MRQ-{req.id.toString().padStart(4, '0')}</p>
                         <p className="text-[9px] text-slate-400 uppercase tracking-widest">{req.date}</p>
                      </td>
                      <td className="px-10 py-6 text-slate-900 uppercase tracking-tight italic">{projects.find(p => p.id === req.project_id)?.name}</td>
                      <td className="px-10 py-6">
                         <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                            <User className="w-3.5 h-3.5 text-slate-300" /> {req.requested_by}
                         </div>
                      </td>
                      <td className="px-10 py-6 text-center">
                         <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase ${
                            req.priority === 'Critical' ? 'bg-rose-100 text-rose-700' : 
                            req.priority === 'Urgent' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                         }`}>{req.priority}</span>
                      </td>
                      <td className="px-10 py-6">
                         <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                            req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                            req.status === 'PO Issued' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                         }`}>{req.status}</span>
                      </td>
                      <td className="px-10 py-6 text-right">
                         <button className="text-indigo-600 p-2.5 hover:bg-indigo-50 rounded-2xl transition-all shadow-sm hover:shadow-md"><Eye className="w-5 h-5" /></button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );

  const renderRFQ = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rfqs.map(rfq => (
             <div key={rfq.id} className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-sm hover:border-indigo-400 transition-all group relative overflow-hidden flex flex-col justify-between">
                <div className="absolute right-0 top-0 p-10 opacity-5 group-hover:scale-125 transition-transform"><Scale className="w-32 h-32 text-indigo-600" /></div>
                <div>
                   <div className="flex justify-between items-start mb-10">
                      <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all"><FileSearch className="w-8 h-8" /></div>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${rfq.status === 'Open' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100'}`}>{rfq.status}</span>
                   </div>
                   <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight italic mb-2">{rfq.title}</h4>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-10 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" /> Deadline: {rfq.deadline}
                   </p>
                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Participating Vendors ({rfq.vendor_ids.length})</p>
                      <div className="flex -space-x-3">
                         {rfq.vendor_ids.map(vid => (
                            <div key={vid} className="w-10 h-10 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-[10px] font-black text-white uppercase italic">
                               {vendors.find(v => v.id === vid)?.name.charAt(0)}
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center">
                   <button onClick={() => setSelectedRFQ(rfq)} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2">
                      Compare Quotations <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
          ))}
          <button className="min-h-[400px] border-4 border-dashed border-slate-100 rounded-[56px] flex flex-col items-center justify-center gap-6 text-slate-300 hover:border-indigo-200 hover:text-indigo-400 transition-all group">
             <div className="p-6 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors"><Zap className="w-12 h-12 group-hover:scale-110 transition-transform" /></div>
             <span className="font-black uppercase tracking-widest text-xs">Initialize Strategic RFQ</span>
          </button>
       </div>

       {selectedRFQ && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300">
             <div className="bg-white rounded-[64px] w-full max-w-6xl shadow-2xl p-16 animate-in zoom-in-95 duration-300 relative overflow-hidden">
                <div className="flex justify-between items-start mb-16">
                   <div>
                      <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{selectedRFQ.title} - Quote Comparison</h3>
                      <p className="text-slate-500 text-sm font-medium mt-1">Multi-vendor financial variance analysis.</p>
                   </div>
                   <button onClick={() => setSelectedRFQ(null)} className="p-3 hover:bg-slate-100 rounded-full"><X className="w-10 h-10" /></button>
                </div>
                
                <div className="overflow-x-auto rounded-[40px] border border-slate-100 shadow-inner">
                   <table className="w-full text-left">
                      <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                         <tr>
                            <th className="px-10 py-8">Quote Specification</th>
                            {selectedRFQ.vendor_ids.map(vid => (
                               <th key={vid} className="px-10 py-8 text-center">{vendors.find(v => v.id === vid)?.name}</th>
                            ))}
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-bold">
                         <tr>
                            <td className="px-10 py-8 text-slate-400 italic">Total Quotation Value</td>
                            {selectedRFQ.vendor_ids.map(vid => {
                               const q = quotes.find(q => q.rfq_id === selectedRFQ.id && q.vendor_id === vid);
                               return (
                                  <td key={vid} className="px-10 py-8 text-center">
                                     <p className="text-2xl font-black text-slate-900 italic tracking-tighter">₹{q?.total_amount.toLocaleString()}</p>
                                     <p className="text-[9px] text-slate-400 uppercase mt-2 italic">Excl. GST</p>
                                  </td>
                               )
                            })}
                         </tr>
                         <tr>
                            <td className="px-10 py-8 text-slate-400 italic">Delivery Timeline</td>
                            {selectedRFQ.vendor_ids.map(vid => (
                               <td key={vid} className="px-10 py-8 text-center text-indigo-600 text-sm">3 Working Days</td>
                            ))}
                         </tr>
                         <tr>
                            <td className="px-10 py-8 text-slate-400 italic">Decision Engine</td>
                            {selectedRFQ.vendor_ids.map(vid => (
                               <td key={vid} className="px-10 py-8 text-center">
                                  <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all">Select Vendor</button>
                               </td>
                            ))}
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
       )}
    </div>
  );

  const renderVendors = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       {vendors.map(v => (
         <div key={v.id} className="bg-white p-10 rounded-[56px] border border-slate-200 shadow-sm hover:border-indigo-400 transition-all group relative overflow-hidden">
            <div className="absolute right-0 top-0 p-10 opacity-5 group-hover:scale-125 transition-transform"><Building className="w-24 h-24 text-indigo-600" /></div>
            <div className="flex items-center gap-6 mb-10">
               <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center font-black text-2xl text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl group-hover:rotate-6">
                  {v.name.charAt(0)}
               </div>
               <div>
                  <h4 className="font-black text-slate-900 text-xl uppercase leading-tight tracking-tighter">{v.name}</h4>
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1 italic">{v.category}</p>
               </div>
            </div>
            <div className="space-y-4 mb-10">
               <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><Mail className="w-4 h-4 text-slate-300" /> {v.email}</div>
               <div className="flex items-center gap-3 text-xs font-bold text-slate-500"><Phone className="w-4 h-4 text-slate-300" /> {v.phone}</div>
            </div>
            <div className="pt-8 border-t border-slate-50 flex justify-between items-center">
               <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.floor(v.rating) ? 'text-amber-400 fill-current' : 'text-slate-200'}`} />
                  ))}
               </div>
               <button className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">Profile <ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
         </div>
       ))}
       <button onClick={() => setShowVendorForm(true)} className="min-h-[350px] border-4 border-dashed border-slate-100 rounded-[56px] flex flex-col items-center justify-center gap-4 text-slate-300 hover:border-indigo-200 hover:text-indigo-400 transition-all group">
          <div className="p-6 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors"><Plus className="w-10 h-10 group-hover:scale-110 transition-transform" /></div>
          <span className="font-black uppercase tracking-widest text-xs">Onboard Global Supplier</span>
       </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-3">
             <ShoppingCart className="w-8 h-8 text-indigo-600" />
             Procurement Command Center
           </h2>
           <p className="text-slate-500 text-sm font-medium italic">Material Sourcing • Strategic Vendor Selection • Asset Lifecycle Security</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[24px] border border-slate-200 shadow-sm overflow-x-auto">
          {(['Dashboard', 'Requisitions', 'Vendors', 'RFQ', 'Purchase Orders', 'GRN'] as ProcurementTab[]).map(tab => (
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

      {activeTab === 'Dashboard' && renderDashboard()}
      {activeTab === 'Requisitions' && renderRequisitions()}
      {activeTab === 'Vendors' && renderVendors()}
      {activeTab === 'RFQ' && renderRFQ()}
      {activeTab === 'Purchase Orders' && (
        <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm animate-in slide-in-from-bottom-4 duration-500">
          <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <h3 className="text-2xl font-black text-slate-900 uppercase italic flex items-center gap-3"><Receipt className="w-6 h-6 text-indigo-600" /> Purchase Orders Ledger</h3>
             <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 hover:scale-105 transition-all shadow-xl">
                <Plus className="w-4 h-4" /> Issue Manual PO
             </button>
          </div>
          <table className="w-full text-left">
             <thead className="bg-slate-950 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                <tr>
                   <th className="px-10 py-8">PO Reference</th>
                   <th className="px-10 py-8">Vendor Entity</th>
                   <th className="px-10 py-8">Project Allocation</th>
                   <th className="px-10 py-8 text-right">Value (Gross)</th>
                   <th className="px-10 py-8 text-center">Status</th>
                   <th className="px-10 py-8 text-right">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 font-bold italic">
                {purchaseOrders.map(po => (
                   <tr key={po.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-10 py-6 font-black text-indigo-600 tracking-tight">{po.po_number}</td>
                      <td className="px-10 py-6 uppercase text-slate-800">{vendors.find(v => v.id === po.vendor_id)?.name}</td>
                      <td className="px-10 py-6 text-slate-500 uppercase">{projects.find(p => p.id === po.project_id)?.name}</td>
                      <td className="px-10 py-6 text-right font-black text-slate-900">₹{po.grand_total.toLocaleString()}</td>
                      <td className="px-10 py-6 text-center">
                         <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                            po.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                         }`}>{po.status}</span>
                      </td>
                      <td className="px-10 py-6 text-right">
                         <div className="flex justify-end gap-2">
                            <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all"><Download className="w-5 h-5" /></button>
                            <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all"><MoreVertical className="w-5 h-5" /></button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      )}
      {activeTab === 'GRN' && (
        <div className="space-y-8 animate-in fade-in duration-500">
           <div className="bg-slate-900 p-12 rounded-[56px] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
              <div className="absolute right-0 top-0 p-12 opacity-10"><Package className="w-64 h-64 text-emerald-400" /></div>
              <div className="relative z-10 max-w-lg">
                 <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">Goods Receipt Engine</h3>
                 <p className="text-slate-400 text-sm font-medium leading-relaxed italic">Confirm physical asset entry at site locations. Automated inventory reconciliation enabled.</p>
              </div>
              <button className="relative z-10 mt-8 md:mt-0 px-12 py-6 bg-white text-slate-900 rounded-[32px] font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]">Verify New Shipment</button>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {grns.map(grn => {
                 const po = purchaseOrders.find(p => p.id === grn.po_id);
                 return (
                    <div key={grn.id} className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm group hover:border-emerald-400 transition-all flex flex-col justify-between h-full">
                       <div>
                          <div className="flex justify-between items-center mb-8">
                             <div className="p-4 bg-emerald-50 text-emerald-600 rounded-3xl"><Truck className="w-8 h-8" /></div>
                             <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 italic">Verified Asset</span>
                          </div>
                          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic mb-2">GRN #{grn.id.toString().padStart(5, '0')}</h4>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-8">Linked PO: {po?.po_number}</p>
                          
                          <div className="space-y-4">
                             {grn.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                   <span className="text-xs font-black uppercase text-slate-600 italic">{materials.find(m => m.id === item.material_id)?.name}</span>
                                   <span className="text-lg font-black text-slate-900 italic tracking-tighter">{item.qty_received} Units</span>
                                </div>
                             ))}
                          </div>
                       </div>
                       <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between text-[10px] font-black uppercase text-slate-400 italic">
                          <span>Received by: {grn.received_by}</span>
                          <span>{grn.received_date}</span>
                       </div>
                    </div>
                 )
              })}
           </div>
        </div>
      )}

      {/* Requisition Form Modal */}
      {showReqForm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] w-full max-w-2xl shadow-2xl p-12 space-y-10 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Site Requisition (Indent)</h3>
                    <p className="text-slate-500 text-sm font-medium">Capture high-priority material demand from ground operations.</p>
                 </div>
                 <button onClick={() => setShowReqForm(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-8 h-8" /></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Site Allocation</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-4 text-sm font-bold appearance-none outline-none focus:border-indigo-600 transition-all">
                       <option>Select Active Project...</option>
                       {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Material Resource Selection</label>
                    <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-4 text-sm font-bold appearance-none outline-none focus:border-indigo-600 transition-all">
                       <option>Choose Item...</option>
                       {materials.map(m => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
                    </select>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity Required</label>
                       <input type="number" className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-4 text-sm font-black outline-none focus:border-indigo-600 transition-all" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority Protocol</label>
                       <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-4 text-sm font-black outline-none appearance-none focus:border-indigo-600 transition-all">
                          <option>Normal Lifecycle</option>
                          <option>Urgent Requirement</option>
                          <option>Critical Failure Risk</option>
                       </select>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={() => setShowReqForm(false)} className="flex-1 bg-slate-900 text-white py-6 rounded-[28px] font-black uppercase tracking-widest text-[11px] shadow-2xl flex items-center justify-center gap-3 hover:bg-black transition-all">
                    <Save className="w-5 h-5" /> Commit Site Requisition
                 </button>
                 <button onClick={() => setShowReqForm(false)} className="px-10 py-6 border border-slate-200 text-slate-400 rounded-[28px] text-[11px] font-black uppercase transition-all hover:bg-slate-50">Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ProcurementModule;
