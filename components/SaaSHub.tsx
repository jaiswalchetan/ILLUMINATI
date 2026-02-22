import React from 'react';
import { 
  Globe, CreditCard, Building2, UserPlus, ArrowRight, 
  CheckCircle2, AlertCircle, BarChart3, TrendingUp, 
  Zap, Package, ShieldCheck, Download, History,
  Star, ChevronRight, LayoutGrid, Rocket,
  FileText, Plus, Landmark, PieChart, Key,
  Shield, Calculator, TrendingDown, DollarSign,
  Fingerprint, Sparkles, Palette, BarChart, Settings,
  MapPin, Network, Briefcase, IndianRupee, HeartHandshake,
  HardDrive
} from 'lucide-react';
import { MOCK_COMPANIES } from '../constants';
import { Company, SubscriptionPlan } from '../types';

const SaaSHub: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'Overview' | 'Tenants' | 'Plans' | 'Add-ons' | 'Strategy' | 'Billing'>('Overview');
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [simulatedTenants, setSimulatedTenants] = React.useState(50);
  const [avgSetupFee, setAvgSetupFee] = React.useState(50000);

  const plans = [
    {
      name: 'Starter',
      price: 2999,
      period: '/mo',
      features: ['5 Users', '3 Active Projects', 'Basic Accounting', 'Mobile Access', '100 GB Storage'],
      icon: <Package className="w-8 h-8" />,
      color: 'bg-white',
      accent: 'text-slate-400'
    },
    {
      name: 'Professional',
      price: 6999,
      period: '/mo',
      features: ['20 Users', 'Unlimited Projects', 'GST Compliance', 'AI Risk Alerts', '2 TB Cloud Storage'],
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-indigo-600',
      accent: 'text-indigo-200',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Unlimited Users', 'API Access', '50 TB Cloud Storage', 'Dedicated Database', 'White Labeling'],
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-slate-900',
      accent: 'text-indigo-400'
    }
  ];

  const addons = [
    { name: 'Payroll Automation', price: 1499, desc: 'Biometric sync & auto TDS.', icon: <Fingerprint className="w-6 h-6" />, bg: 'bg-blue-50', color: 'text-blue-600' },
    { name: 'Advanced Analytics', price: 2499, desc: 'Deep-dive BOQ analysis.', icon: <BarChart className="w-6 h-6" />, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { name: 'Storage Expansion', price: 9999, desc: '+10 TB Enterprise Storage.', icon: <HardDrive className="w-6 h-6" />, bg: 'bg-rose-50', color: 'text-rose-600' },
    { name: 'Custom Branding', price: 4999, desc: 'Whitelabel portal deployment.', icon: <Palette className="w-6 h-6" />, bg: 'bg-amber-50', color: 'text-amber-600' }
  ];

  const targetSegments = [
    { name: 'Mumbai Contractors', marketShare: 'High Priority', focus: 'Tier 1 Infrastructure', icon: <MapPin className="w-6 h-6" />, color: 'bg-rose-50 text-rose-600' },
    { name: 'Infrastructure Developers', marketShare: 'Strategic', focus: 'Large Enterprise Developers', icon: <Briefcase className="w-6 h-6" />, color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Real Estate SMEs', marketShare: 'Volume', focus: 'Residential Developers', icon: <Building2 className="w-6 h-6" />, color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Channel Partners', marketShare: 'Scaling', focus: 'Reseller Network', icon: <Network className="w-6 h-6" />, color: 'bg-amber-50 text-amber-600' }
  ];

  const calculateMRR = () => {
    const starterRev = (simulatedTenants * 0.5) * 2999;
    const proRev = (simulatedTenants * 0.4) * 6999;
    const entRev = (simulatedTenants * 0.1) * 25000;
    const subTotal = starterRev + proRev + entRev;
    const addonTotal = subTotal * 0.15; // 15% attach rate
    const amcTotal = (subTotal * 12) * 0.15 / 12; // 15% AMC spread monthly
    return subTotal + addonTotal + amcTotal;
  };

  const calculateSetupRev = () => simulatedTenants * avgSetupFee;

  const renderPlans = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-500">
      {plans.map((plan, i) => (
        <div key={i} className={`${plan.color} p-10 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300`}>
          {plan.popular && (
            <div className="absolute top-0 right-0 bg-amber-400 text-slate-900 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Star className="w-3 h-3 fill-current" /> Most Popular
            </div>
          )}
          <div>
            <div className={`${plan.accent} mb-8 group-hover:scale-110 transition-transform`}>{plan.icon}</div>
            <h3 className={`text-2xl font-black mb-2 ${plan.color === 'bg-white' ? 'text-slate-900' : 'text-white'}`}>{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className={`text-4xl font-black tracking-tighter ${plan.color === 'bg-white' ? 'text-slate-900' : 'text-white'}`}>
                {typeof plan.price === 'number' ? `₹${plan.price.toLocaleString()}` : plan.price}
              </span>
              <span className={`text-sm font-bold ${plan.color === 'bg-white' ? 'text-slate-400' : 'text-indigo-200'}`}>{plan.period}</span>
            </div>
            <ul className="space-y-4">
              {plan.features.map((feature, j) => (
                <li key={j} className={`flex items-center gap-3 text-xs font-bold ${plan.color === 'bg-white' ? 'text-slate-600' : 'text-indigo-100'}`}>
                  <CheckCircle2 className={`w-4 h-4 ${plan.color === 'bg-white' ? 'text-indigo-600' : 'text-indigo-300'}`} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button className={`mt-10 w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl ${
            plan.color === 'bg-white' 
              ? 'bg-slate-900 text-white hover:bg-black shadow-slate-900/10' 
              : 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-white/10'
          }`}>
            Get Started
          </button>
        </div>
      ))}
    </div>
  );

  const renderStrategy = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Target Strategy (India Focus)</h3>
          <p className="text-slate-500 text-sm font-medium">Aggressive expansion roadmap across key infrastructure hubs.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
             <Star className="w-3 h-3" /> Q3 Milestone: 20 New Partners
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {targetSegments.map((seg, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm group hover:border-indigo-400 transition-all">
             <div className={`${seg.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
               {seg.icon}
             </div>
             <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight mb-1">{seg.name}</h4>
             <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4">{seg.marketShare}</p>
             <div className="pt-4 border-t border-slate-50">
               <p className="text-slate-500 text-[11px] font-bold">{seg.focus}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5"><Landmark className="w-40 h-40" /></div>
           <h3 className="text-2xl font-black mb-2 tracking-tight">Implementation & Support</h3>
           <p className="text-slate-400 text-sm mb-10 max-w-sm">Service-based revenue streams ensuring high-quality deployments.</p>
           
           <div className="space-y-6">
              <div className="flex justify-between items-center p-6 bg-white/5 rounded-3xl border border-white/10">
                 <div>
                    <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">One-Time Setup Fee</p>
                    <p className="text-xl font-black">₹25,000 – ₹1,00,000</p>
                 </div>
                 <HeartHandshake className="w-8 h-8 text-white/20" />
              </div>
              <div className="flex justify-between items-center p-6 bg-white/5 rounded-3xl border border-white/10">
                 <div>
                    <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-1">Annual Maintenance (AMC)</p>
                    <p className="text-xl font-black">15% of Subscription</p>
                 </div>
                 <ShieldCheck className="w-8 h-8 text-white/20" />
              </div>
           </div>
        </div>

        <div className="bg-indigo-600 p-10 rounded-[48px] text-white shadow-2xl flex flex-col justify-between">
           <div>
              <h3 className="text-2xl font-black mb-2 tracking-tight italic uppercase">Market Penetration</h3>
              <p className="text-indigo-100/70 text-sm leading-relaxed mb-10">
                ILLUMINATI ERP is positioned to capture the SME contractor boom in Maharashtra through localized GST-ready workflows.
              </p>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/10 rounded-3xl border border-white/10">
                 <p className="text-[10px] text-indigo-200 font-black uppercase mb-1">Partner Comm.</p>
                 <p className="text-2xl font-black">10%</p>
              </div>
              <div className="p-6 bg-white/10 rounded-3xl border border-white/10">
                 <p className="text-[10px] text-indigo-200 font-black uppercase mb-1">Onboarding Speed</p>
                 <p className="text-2xl font-black">48 Hrs</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="absolute right-0 bottom-0 p-6 opacity-5 group-hover:scale-125 transition-transform"><TrendingUp className="w-16 h-16 text-indigo-600" /></div>
           <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Portfolio MRR</h4>
           <p className="text-3xl font-black text-slate-900 tracking-tighter italic">₹4.82L</p>
           <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase">
             <TrendingUp className="w-3.5 h-3.5" /> +12.5% Growth
           </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
           <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Deployment Pool</h4>
           <p className="text-3xl font-black text-slate-900 tracking-tighter">₹2.4M</p>
           <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase">
             <Landmark className="w-3.5 h-3.5" /> Setup Fee Pipeline
           </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
           <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">AMC Reserve</h4>
           <p className="text-3xl font-black text-slate-900 tracking-tighter">15%</p>
           <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase">
             <ShieldCheck className="w-3.5 h-3.5" /> Retention Buffer
           </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[32px] shadow-2xl text-white relative overflow-hidden">
           <div className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5"><Rocket /></div>
           <h4 className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-1">Scaling Limit</h4>
           <p className="text-2xl font-black tracking-tighter italic uppercase">10k+ Sites</p>
           <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]" style={{ width: '100%' }} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
                <PieChart className="w-5 h-5 text-indigo-600" /> Revenue Distribution
              </h3>
           </div>
           <div className="space-y-4">
              {['SaaS Subscriptions', 'AMC Support', 'Implementation'].map((type, i) => (
                <div key={type} className="flex items-center gap-6">
                   <span className="text-xs font-bold text-slate-500 w-40">{type}</span>
                   <div className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <div className={`h-full ${i === 0 ? 'bg-indigo-600' : i === 1 ? 'bg-emerald-500' : 'bg-amber-400'}`} style={{ width: `${70 - i*20}%` }} />
                   </div>
                   <span className="text-xs font-black text-slate-800">{70 - i*20}%</span>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 p-10 rounded-[40px] text-white shadow-xl flex flex-col justify-between">
           <div>
              <h3 className="text-2xl font-black mb-4 tracking-tight italic uppercase">Multi-Tenant Onboarding</h3>
              <p className="text-indigo-100/70 text-sm leading-relaxed mb-10 max-w-sm">
                Provision high-performance isolated clusters for Enterprise tenants with dedicated DB instances.
              </p>
           </div>
           <button 
             onClick={() => setShowOnboarding(true)}
             className="w-full flex items-center justify-center gap-3 bg-white text-indigo-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-transform active:scale-95"
           >
             <UserPlus className="w-5 h-5" /> Provision Multi-Tenant Cluster
           </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 italic uppercase">
            <Globe className="w-6 h-6 text-indigo-600" />
            SaaS & Multi-Tenancy Hub
          </h2>
          <p className="text-slate-500 text-sm font-medium">Subscription Engine • Deployment Controller • Growth Strategy</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {(['Overview', 'Tenants', 'Plans', 'Add-ons', 'Strategy', 'Billing'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === 'Overview' && renderOverview()}
        {activeTab === 'Plans' && renderPlans()}
        {activeTab === 'Add-ons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-indigo-400 transition-all group">
                <div className={`${addon.bg} ${addon.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {addon.icon}
                </div>
                <h4 className="font-black text-slate-900 text-lg uppercase mb-1">{addon.name}</h4>
                <p className="text-slate-500 text-xs mb-6">{addon.desc}</p>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-end">
                   <p className="text-xl font-black text-slate-900">₹{addon.price.toLocaleString()}<span className="text-xs font-bold text-slate-400">/mo</span></p>
                   <Settings className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Strategy' && renderStrategy()}
        {activeTab === 'Tenants' && (
           <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-in slide-in-from-bottom-4 duration-500">
             <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                 <tr>
                   <th className="px-8 py-5">Tenant Identity</th>
                   <th className="px-8 py-5">SaaS Tier</th>
                   <th className="px-8 py-5">Onboarding Revenue</th>
                   <th className="px-8 py-5">AMC Status</th>
                   <th className="px-8 py-5 text-right">LTD Revenue</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {MOCK_COMPANIES.map(company => (
                   <tr key={company.id} className="hover:bg-slate-50 transition-colors font-bold">
                     <td className="px-8 py-4">
                        <p className="text-slate-900">{company.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{company.domain}</p>
                     </td>
                     <td className="px-8 py-4">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                          company.plan === 'Enterprise' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                        }`}>{company.plan}</span>
                     </td>
                     <td className="px-8 py-4 text-slate-900 font-black tracking-tighter italic">₹{avgSetupFee.toLocaleString()}</td>
                     <td className="px-8 py-4">
                        <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase">
                           <ShieldCheck className="w-3.5 h-3.5" /> Covered (15%)
                        </div>
                     </td>
                     <td className="px-8 py-4 text-right text-indigo-600 font-black tracking-tighter">₹{(Math.random() * 5 + 1).toFixed(2)}L</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        )}
      </div>
    </div>
  );
};

export default SaaSHub;