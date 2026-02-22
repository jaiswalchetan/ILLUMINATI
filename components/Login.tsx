
import React from 'react';
import { 
  Lock, Mail, ShieldCheck, ArrowRight, 
  Loader2, Key, Globe, Smartphone,
  AlertCircle, CheckCircle2, Construction
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState('admin@skyline.erp');
  const [password, setPassword] = React.useState('••••••••');
  const [companyCode, setCompanyCode] = React.useState('SKY-2024');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loginMethod, setLoginMethod] = React.useState<'password' | 'otp'>('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (email.includes('admin')) {
        onLogin(UserRole.SUPER_ADMIN);
      } else if (email.includes('pm')) {
        onLogin(UserRole.PROJECT_MANAGER);
      } else if (email.includes('procure')) {
        onLogin(UserRole.PROCUREMENT_MANAGER);
      } else if (email.includes('site')) {
        onLogin(UserRole.SITE_ENGINEER);
      } else if (email.includes('acc')) {
        onLogin(UserRole.ACCOUNTANT);
      } else {
        onLogin(UserRole.SUPER_ADMIN);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="w-full max-w-[1100px] min-h-[650px] bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col md:flex-row m-4 animate-in fade-in zoom-in-95 duration-700">
        
        <div className="w-full md:w-5/12 bg-slate-900 p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />
          
          <div className="relative z-10">
            <div className="flex flex-col mb-16">
              <span className="text-4xl font-serif italic tracking-[0.1em] uppercase leading-none text-amber-50">Illuminati</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 opacity-80 mt-2">Intelligent ERP Core</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-black text-white leading-tight tracking-tight">
                Manage Projects.<br />
                Control Costs.<br />
                Maximize Profit.
              </h1>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
                The advanced cloud-native operating system for modern infrastructure development.
              </p>
            </div>

            <div className="mt-12 space-y-4">
               {[
                 { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, text: "Real-time Cost Tracking" },
                 { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, text: "Automated BOQ Analysis" },
                 { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, text: "Multi-Tenant Cloud Arch" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-slate-300 text-sm font-bold animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${i * 100}ms` }}>
                    {item.icon}
                    <span>{item.text}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="relative z-10 pt-10 border-t border-white/10">
             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Enterprise Verified Node v4.0.2</p>
          </div>

          <div className="absolute -bottom-20 -left-20 opacity-10 pointer-events-none scale-150">
             <Construction className="w-64 h-64 text-white" />
          </div>
        </div>

        <div className="w-full md:w-7/12 bg-white p-12 md:p-20 flex flex-col justify-center relative">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Access Portal</h2>
              <p className="text-slate-500 mt-2 font-medium">Log in to your secure workspace.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-in shake duration-300">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Code</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-4 text-sm font-black outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Enterprise ID</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-4 text-sm font-black outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pass-key</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-4 text-sm font-black outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black uppercase tracking-[0.1em] text-xs shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating Node...
                  </>
                ) : (
                  <>
                    Secure Login
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Auth Link</span>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-0 right-0 text-center">
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
               AWS Cluster AP-SOUTH-1 • ILLUMINATI CORE
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;