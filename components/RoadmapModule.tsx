
import React from 'react';
import { 
  Milestone, Calendar, Users, DollarSign, Rocket, 
  CheckCircle2, Clock, ShieldCheck, Zap, Layers, 
  ArrowRight, Sparkles, Server, LayoutGrid, 
  ChevronRight, Laptop, Briefcase, Database
} from 'lucide-react';

const RoadmapModule: React.FC = () => {
  const [activeView, setActiveView] = React.useState<'Timeline' | 'Team' | 'Cost'>('Timeline');

  const phases = [
    {
      title: 'Phase 1: Core & Auth',
      month: 'Month 1',
      status: 'In Progress',
      color: 'bg-indigo-600',
      items: [
        'React / Next.js Frontend Framework',
        'Node.js (Express) API Architecture',
        'PostgreSQL Schema Design & RDS Setup',
        'JWT-based Auth & RBAC Implementation'
      ]
    },
    {
      title: 'Phase 2: Project Module',
      month: 'Month 2',
      status: 'Planned',
      color: 'bg-blue-600',
      items: [
        'Project BOQ Management System',
        'Daily Site Log Photo/Data Sync',
        'Task Scheduling & GANTT Logic',
        'Site Location & Geo-fencing Integration'
      ]
    },
    {
      title: 'Phase 3: Finance',
      month: 'Month 3',
      status: 'Planned',
      color: 'bg-emerald-600',
      items: [
        'Double-entry Accounting Engine',
        'GST Automated Taxation Calculation',
        'Profitability & Burn Rate Analytics',
        'Invoice Generation (PDF Export)'
      ]
    },
    {
      title: 'Phase 4: HR',
      month: 'Month 4',
      status: 'Planned',
      color: 'bg-purple-600',
      items: [
        'Attendance with Biometric Sync',
        'Payroll Processing (PF/ESI/TDS)',
        'Leave & Performance Management',
        'Digital Employee Onboarding'
      ]
    },
    {
      title: 'Phase 5: Inventory',
      month: 'Month 5',
      status: 'Planned',
      color: 'bg-amber-600',
      items: [
        'Site-wise Material Distribution',
        'Purchase Order Approval Workflow',
        'Vendor Performance Scorecards',
        'Predictive Stock Reordering'
      ]
    },
    {
      title: 'Phase 6: CRM + SaaS Billing',
      month: 'Month 6',
      status: 'Planned',
      color: 'bg-indigo-900',
      items: [
        'Lead Pipeline & Sales CRM',
        'Razorpay & Stripe Integration',
        'Multi-tenant Scaling (10k+ Users)',
        'Automated Monthly SaaS Billing'
      ]
    }
  ];

  const teamMembers = [
    { role: 'Project Director', count: 1, skill: 'Strategic Vision' },
    { role: 'Backend Engineers', count: 3, skill: 'Node.js/PostgreSQL' },
    { role: 'Frontend Engineers', count: 2, skill: 'React/Next.js' },
    { role: 'QA Automation', count: 1, skill: 'E2E Testing' },
    { role: 'UI/UX Designer', count: 1, skill: 'Product Flow' },
    { role: 'DevOps Specialist', count: 1, skill: 'AWS Cloud' }
  ];

  const costs = [
    { category: 'Development Salaries', amount: '₹12.5L/mo', note: 'Core Engineering Team' },
    { category: 'Cloud Infrastructure', amount: '₹45k/mo', note: 'AWS RDS, EC2, S3' },
    { category: 'SaaS Licensing', amount: '₹15k/mo', note: 'External APIs, Auth0' },
    { category: 'Marketing & Sales', amount: '₹3L/mo', note: 'Starting Month 4' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Milestone className="w-6 h-6 text-indigo-600" />
            Illuminati Development Roadmap
          </h2>
          <p className="text-slate-500 text-sm">Strategic 6-phase growth plan for 10,000+ user scalability.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          {(['Timeline', 'Team', 'Cost'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveView(tab)}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                activeView === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeView === 'Timeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className={`${phase.color} p-4 text-white flex justify-between items-center`}>
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-white/70">{phase.month}</h4>
                   <h3 className="font-bold text-sm">{phase.title}</h3>
                </div>
                {phase.status === 'In Progress' ? <Clock className="w-5 h-5 animate-spin" /> : <Rocket className="w-5 h-5 text-white/30" />}
              </div>
              <div className="p-6 flex-1 bg-white">
                <ul className="space-y-4">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-xs text-slate-600 font-medium">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${idx === 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-300'}`}>
                        {idx === 0 ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />}
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                 <span className={`text-[10px] font-black uppercase ${phase.status === 'In Progress' ? 'text-indigo-600' : 'text-slate-400'}`}>
                   {phase.status}
                 </span>
                 <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === 'Team' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <Users className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">Full-Stack Core Team</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Our team is structured to prioritize engineering excellence across the React/Node stack, ensuring 99.9% uptime.
                  </p>
                  <div className="flex gap-4">
                    <div className="text-center">
                       <p className="text-3xl font-black">09</p>
                       <p className="text-[10px] uppercase font-bold text-indigo-400">Total Experts</p>
                    </div>
                    <div className="text-center border-l border-white/10 pl-6">
                       <p className="text-3xl font-black">10k+</p>
                       <p className="text-[10px] uppercase font-bold text-indigo-400">User Ready</p>
                    </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  {teamMembers.map((member, i) => (
                    <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                       <p className="text-indigo-400 text-[10px] font-black uppercase mb-1">{member.role}</p>
                       <p className="text-lg font-black">{member.count}x</p>
                       <p className="text-[10px] text-slate-500 mt-1">{member.skill}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'Cost' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                Expenditure Forecast
              </h3>
              <div className="space-y-4">
                 {costs.map((cost, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-200">
                            <LayoutGrid className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-800">{cost.category}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{cost.note}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-lg font-black text-slate-900">{cost.amount}</p>
                         <p className="text-[10px] font-black uppercase text-indigo-600">Active</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-indigo-600 p-8 rounded-2xl shadow-xl text-white">
                 <h4 className="text-indigo-200 font-black uppercase tracking-widest text-[10px] mb-2">Technical Goal</h4>
                 <h3 className="text-2xl font-black mb-4">API-First Architecture</h3>
                 <p className="text-indigo-50 text-sm leading-relaxed mb-6">
                   Targeting construction companies with core React/PostgreSQL transparency. Success is defined as stable multi-site deployment by Month 2.
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapModule;
