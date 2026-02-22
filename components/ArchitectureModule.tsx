import React from 'react';
import { 
  Database, Key, Link as LinkIcon, Zap, Shield, FileCode, Layers, Server, 
  Cpu, Cloud, Globe, Share2, Activity, Terminal, Laptop, Folder, File,
  ChevronRight, Lock, UserCheck, Filter, Box, ShieldCheck, Code2, 
  HardDrive, RefreshCcw, Eye, Code, LayoutGrid, Info, ZapOff
} from 'lucide-react';

type ArchTab = 'Cloud Blueprint' | 'Database Strategy' | 'S3 Storage Logic' | 'Security Architecture';

const ArchitectureModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<ArchTab>('Cloud Blueprint');

  const envSample = `# POSTGRESQL (AWS RDS)
DB_HOST=illuminati-db.xyz.ap-south-1.rds.amazonaws.com
DB_USER=architect_admin
DB_PASS=vault_secret_key
DB_PORT=6432 # PgBouncer

# STORAGE (AWS S3)
AWS_REGION=ap-south-1
S3_BUCKET=illuminati-erp-assets
SSE_ALGORITHM=AES256`;

  const s3Paths = [
    { path: '/company_{id}/project_{id}/work_orders/', desc: 'Signed Work Order PDFs' },
    { path: '/company_{id}/invoices/', desc: 'Tax Invoices & GST Returns' },
    { path: '/company_{id}/project_{id}/site_images/', desc: 'Real-time Site Progress Photos' },
    { path: '/company_{id}/agreements/', desc: 'Legal & Vendor Contracts' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase italic">
            <Server className="w-8 h-8 text-indigo-600" />
            Infrastructure Architect
          </h2>
          <p className="text-slate-500 text-sm font-medium italic">Multi-Tenant SaaS • AWS RDS • 50 TB S3 Asset Engine</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-[24px] border border-slate-200 shadow-sm overflow-x-auto">
          {(['Cloud Blueprint', 'Database Strategy', 'S3 Storage Logic', 'Security Architecture'] as ArchTab[]).map(tab => (
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

      {activeTab === 'Cloud Blueprint' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-900 rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden group border border-white/5">
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform"><Cloud className="w-64 h-64 text-indigo-400" /></div>
                 <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-8 flex items-center gap-3">
                   <Globe className="w-6 h-6 text-indigo-400" />
                   High-Availability Deployment
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400"><Activity /></div>
                          <div><p className="font-black text-sm uppercase">Auto-Scaling Cluster</p><p className="text-xs text-slate-400">ECS Fargate on AWS Nitro</p></div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400"><Database /></div>
                          <div><p className="font-black text-sm uppercase">Multi-AZ RDS</p><p className="text-xs text-slate-400">Synchronous Replication</p></div>
                       </div>
                    </div>
                    <div className="bg-white/5 rounded-[32px] p-6 border border-white/10">
                       <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 italic">Environment Variables (.env)</h4>
                       <pre className="text-[10px] font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">{envSample}</pre>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                       <Box className="w-10 h-10 text-indigo-600 mb-6" />
                       <h4 className="text-xl font-black text-slate-900 uppercase italic mb-2 tracking-tight">VPC Private Layer</h4>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                         All database and storage traffic is routed through **AWS PrivateLink**. Zero exposure to public internet for ERP data.
                       </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                       <span className="text-[10px] font-black uppercase text-slate-400 italic">Network Integrity</span>
                       <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                 </div>
                 <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                       <RefreshCcw className="w-10 h-10 text-rose-600 mb-6" />
                       <h4 className="text-xl font-black text-slate-900 uppercase italic mb-2 tracking-tight">Disaster Recovery</h4>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                         Automated cross-region snapshots every 24 hours. RPO: 24h, RTO: &lt;2h.
                       </p>
                    </div>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Test Failover</button>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-indigo-600 p-10 rounded-[48px] text-white shadow-2xl flex flex-col justify-between h-full group relative overflow-hidden">
                 <div className="absolute bottom-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform"><Cpu className="w-48 h-48" /></div>
                 <div>
                    <div className="bg-white/20 p-4 rounded-3xl w-fit mb-8"><Zap className="w-8 h-8" /></div>
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-4 leading-tight">Scale Up to 10k+ Tenants</h3>
                    <p className="text-indigo-100/70 text-sm leading-relaxed mb-10 italic">
                      Horizontal scaling architecture using PgBouncer for connection pooling and ElastiCache for reporting performance.
                    </p>
                 </div>
                 <div className="space-y-4">
                    <div className="p-5 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
                       <span className="text-xs font-black uppercase">Read Replicas</span>
                       <span className="font-bold">2 Active</span>
                    </div>
                    <div className="p-5 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
                       <span className="text-xs font-black uppercase">Cache Hit Rate</span>
                       <span className="font-bold">94%</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'Database Strategy' && (
        <div className="space-y-8 animate-in fade-in duration-500">
           <div className="bg-white p-12 rounded-[56px] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-12">
                 <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">PostgreSQL Managed RDS</h3>
                    <p className="text-slate-500 font-medium mt-2 italic">Schema-level tenant isolation with Row-Level Security (RLS).</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-emerald-100 flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4" /> SSL Required
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><Key className="w-4 h-4" /> Multi-Tenant Key</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                       Every table includes a <code>company_id</code> foreign key. 
                       Shared database architecture reduces costs while RLS prevents data leakage.
                    </p>
                    <div className="bg-slate-900 rounded-2xl p-4 text-[10px] font-mono text-emerald-400">
                       WHERE company_id = ?
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Indexing Engine</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                       Composite indices on <code>(company_id, project_id)</code> ensure sub-millisecond query performance across 10 million+ rows.
                    </p>
                    <div className="flex gap-2">
                       <span className="bg-slate-100 px-3 py-1 rounded-lg text-[9px] font-black text-slate-400 uppercase">B-Tree</span>
                       <span className="bg-slate-100 px-3 py-1 rounded-lg text-[9px] font-black text-slate-400 uppercase">GIN</span>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2"><RefreshCcw className="w-4 h-4" /> Backup Retention</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                       30-day point-in-time recovery (PITR) enabled. Allows rolling back the entire database to any specific second.
                    </p>
                    <div className="flex items-center gap-2 text-rose-600 font-black text-[10px] uppercase">
                       <Activity className="w-3.5 h-3.5" /> High Durability
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'S3 Storage Logic' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
           <div className="lg:col-span-2 bg-white p-12 rounded-[56px] border border-slate-200 shadow-sm">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-8">AWS S3 Pathing Hierarchy</h3>
              <div className="space-y-4">
                 {s3Paths.map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:border-indigo-200 transition-all group">
                      <div className="flex items-center gap-4">
                         <Folder className="w-6 h-6 text-indigo-600" />
                         <div>
                            <p className="text-sm font-black text-slate-900 font-mono italic">{item.path}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{item.desc}</p>
                         </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-slate-900 p-12 rounded-[56px] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5"><Shield className="w-40 h-40 text-indigo-400" /></div>
              <div>
                 <h4 className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-10 flex items-center gap-2"><HardDrive className="w-4 h-4 text-indigo-400" /> Global Storage Quota</h4>
                 <div className="space-y-8">
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <p className="text-sm font-black uppercase tracking-tight italic">Enterprise Quota</p>
                          <p className="text-2xl font-black text-white italic tracking-tighter">50 TB</p>
                       </div>
                       <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]" style={{ width: '12%' }} />
                       </div>
                       <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest italic text-right">6.2 TB Consumed</p>
                    </div>
                    
                    <div className="space-y-2 pt-6 border-t border-white/10">
                       <p className="text-sm font-black uppercase tracking-tight italic">Pre-Signed URLs</p>
                       <p className="text-xs text-slate-400 font-medium italic">Assets flow browser-to-S3 directly via temporary tokens. Node server never touches raw bytes.</p>
                    </div>
                 </div>
              </div>
              <button className="w-full py-5 bg-white text-slate-900 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all mt-12 shadow-2xl">
                 Audit S3 Policies
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureModule;