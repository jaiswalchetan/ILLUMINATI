
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { ActiveModule, User, UserRole } from '../types';
import { 
  Menu, X, LogOut, Bell, Search, User as UserIcon, 
  ChevronDown, Sparkles, Bot, ShieldCheck
} from 'lucide-react';
import AIAssistant from './AIAssistant';

interface LayoutProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  user: User;
  onRoleChange?: (role: UserRole) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeModule, setActiveModule, user, onRoleChange, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [showRoleSelector, setShowRoleSelector] = React.useState(false);
  const [aiPanelOpen, setAiPanelOpen] = React.useState(false);

  const filteredNavItems = NAV_ITEMS.filter(item => item.allowedRoles.includes(user.role));

  const roleColors: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: 'bg-rose-600',
    [UserRole.COMPANY_ADMIN]: 'bg-indigo-600',
    [UserRole.PROJECT_MANAGER]: 'bg-amber-600',
    [UserRole.ACCOUNTANT]: 'bg-emerald-600',
    [UserRole.SITE_ENGINEER]: 'bg-blue-600',
    [UserRole.HR_MANAGER]: 'bg-purple-600',
    [UserRole.STORE_MANAGER]: 'bg-slate-700',
    [UserRole.CLIENT]: 'bg-slate-400',
    [UserRole.PROCUREMENT_MANAGER]: 'bg-cyan-600',
    [UserRole.VENDOR]: 'bg-orange-600',
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-slate-900 text-slate-300 flex flex-col z-30 shadow-2xl`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 font-black text-white text-xl tracking-tighter">
              <span className="uppercase tracking-[0.2em] font-serif italic text-lg text-amber-50">Illuminati</span>
            </div>
          ) : (
            <div className="mx-auto w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl">
              <span className="text-white font-serif italic font-black">I</span>
            </div>
          )}
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
          {filteredNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative group ${
                activeModule === item.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'
              }`}
            >
              <span className={`shrink-0 transition-transform ${activeModule === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
              {sidebarOpen && <span className="font-bold text-[11px] uppercase tracking-widest">{item.label}</span>}
              {activeModule === item.id && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-full" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={() => setAiPanelOpen(!aiPanelOpen)}
            className={`w-full flex items-center justify-center gap-3 p-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              aiPanelOpen ? 'bg-white text-indigo-600 shadow-xl' : 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30'
            }`}
          >
            <Bot className="w-5 h-5" />
            {sidebarOpen && <span>Genius AI</span>}
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">
              {NAV_ITEMS.find(i => i.id === activeModule)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-3" />
              <input type="text" placeholder="Search resources..." className="bg-transparent border-none outline-none text-xs font-medium w-64 text-slate-600" />
            </div>
            
            <div className="flex items-center gap-6 border-l border-slate-100 pl-8 relative">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800 tracking-tight">{user.name}</p>
                <div className="flex items-center justify-end gap-1.5 cursor-pointer group mt-0.5" onClick={() => setShowRoleSelector(!showRoleSelector)}>
                  <span className={`text-[9px] text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${roleColors[user.role]}`}>
                    {user.role.replace('_', ' ')}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform" style={{ transform: showRoleSelector ? 'rotate(180deg)' : 'none' }} />
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm relative overflow-hidden group">
                <UserIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {showRoleSelector && (
                <div className="absolute top-full right-0 mt-4 w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> Switch Authority
                  </p>
                  <div className="space-y-1">
                    {Object.values(UserRole).map((role) => (
                      <button
                        key={role}
                        onClick={() => { onRoleChange?.(role); setShowRoleSelector(false); }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                          user.role === role ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {role.replace('_', ' ')}
                        {user.role === role && <Sparkles className="w-3 h-3 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50 custom-scrollbar">
          {children}
        </div>
      </main>

      <div 
        className={`fixed top-0 bottom-0 right-0 w-[450px] bg-white shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.1)] z-[100] transition-transform duration-500 ease-in-out border-l border-slate-100 ${
          aiPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-xl"><Bot className="w-6 h-6" /></div>
                <div><h3 className="font-black uppercase tracking-widest text-sm">Genius ERP Core</h3><p className="text-[10px] text-indigo-400 font-bold uppercase">Intelligence Layer Active</p></div>
             </div>
             <button onClick={() => setAiPanelOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
          </div>
          <div className="flex-1"><AIAssistant /></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;