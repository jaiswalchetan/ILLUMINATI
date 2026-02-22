
import React from 'react';
import { ShieldAlert, ShieldCheck, Lock, Fingerprint, History, Database, Key, Server, RefreshCcw, Bell, AlertTriangle, Activity, Wifi, Shield } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../constants';

const SecurityModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'Overview' | 'AuditLogs' | 'Resilience' | 'Authentication'>('Overview');
  const [backupProgress, setBackupProgress] = React.useState<number | null>(null);

  const startBackup = () => {
    setBackupProgress(0);
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Lock className="w-6 h-6 text-indigo-600" />
            Security & Resilience
          </h2>
          <p className="text-slate-500 text-sm font-medium">JWT Secure • AES-256 Encrypted • Automatic RDS Backups</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {(['Overview', 'AuditLogs', 'Resilience', 'Authentication'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 opacity-[0.03] group-hover:scale-125 transition-transform"><Activity className="w-20 h-20 text-indigo-600" /></div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                <Wifi className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                99% Uptime Verified
              </span>
            </div>
            <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Live Service Monitoring</h4>
            <p className="text-2xl font-black text-slate-900">Operational</p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                <Key className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">Active</span>
            </div>
            <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">JWT Auth Layer</h4>
            <p className="text-2xl font-black text-slate-900">Tokenized Session</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-[32px] shadow-2xl text-white relative overflow-hidden">
            <Database className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5" />
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/10 rounded-2xl text-indigo-400">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-black uppercase text-indigo-400 bg-white/10 px-2.5 py-1 rounded-full tracking-widest">PostgreSQL RDS</span>
            </div>
            <h4 className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-1">Auto Backup</h4>
            <p className="text-xl font-black">Daily @ 02:00 UTC</p>
          </div>

          <div className="bg-rose-900 p-8 rounded-[32px] shadow-xl text-white">
            <h4 className="text-rose-200 text-[10px] font-black uppercase tracking-widest mb-1">Encryption</h4>
            <p className="text-3xl font-black">AES-256</p>
            <p className="text-[10px] text-rose-300 font-bold uppercase mt-4">At-rest & In-transit</p>
          </div>
        </div>
      )}

      {activeTab === 'Authentication' && (
        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
           <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20">
                 <Shield className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-slate-900">JWT Identity Management</h3>
                 <p className="text-slate-500 text-sm font-medium">Secure cross-origin session authorization.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Current Session Health</h4>
                    <div className="space-y-3">
                       <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500">Token Status</span>
                          <span className="text-emerald-600">Valid</span>
                       </div>
                       <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500">Refresh Cycle</span>
                          <span className="text-slate-800">Every 24 Hours</span>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="bg-slate-900 p-8 rounded-3xl text-white">
                 <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">RBAC Implementation</p>
                 <ul className="space-y-3 text-sm font-medium text-slate-300">
                    <li className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                       Granular Module Permissions
                    </li>
                    <li className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                       Bcrypt Password Hashing
                    </li>
                    <li className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                       MFA Support Ready
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'Resilience' && (
        <div className="bg-white p-12 rounded-[40px] border border-slate-200 shadow-sm text-center">
          <div className="bg-blue-50 p-6 rounded-full w-fit mx-auto mb-8 border border-blue-100">
            <Database className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">RDS Backup Engine</h3>
          <p className="text-slate-500 text-sm mt-3 mb-10 max-w-lg mx-auto leading-relaxed font-medium">
            Daily snapshots and point-in-time recovery are enabled for the PostgreSQL cluster on AWS.
          </p>
          
          {backupProgress !== null ? (
            <div className="mb-10 max-w-md mx-auto">
              <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-3">
                <span className="flex items-center gap-2">
                  <RefreshCcw className={`w-3 h-3 ${backupProgress < 100 ? 'animate-spin' : ''}`} />
                  {backupProgress === 100 ? 'Snapshot Finalized' : 'Archiving RDS Block Data...'}
                </span>
                <span>{backupProgress}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300" 
                  style={{ width: `${backupProgress}%` }} 
                />
              </div>
            </div>
          ) : (
            <button 
              onClick={startBackup}
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Test Manual RDS Snapshot
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SecurityModule;
