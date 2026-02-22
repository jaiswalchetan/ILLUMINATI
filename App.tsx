
import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProjectsModule from './components/ProjectsModule';
import InventoryModule from './components/InventoryModule';
import AIAssistant from './components/AIAssistant';
import FinanceModule from './components/FinanceModule';
import RevenueModule from './components/RevenueModule';
import HRModule from './components/HRModule';
import CRMModule from './components/CRMModule';
import SecurityModule from './components/SecurityModule';
import SaaSHub from './components/SaaSHub';
import RoadmapModule from './components/RoadmapModule';
import InvestorModule from './components/InvestorModule';
import ContractorModule from './components/ContractorModule';
import ProcurementModule from './components/ProcurementModule';
import ReportsModule from './components/ReportsModule';
import SettingsModule from './components/SettingsModule';
import Login from './components/Login';
import { ERPProvider } from './context/ERPContext';
import { ActiveModule, User, UserRole } from './types';
import { NAV_ITEMS } from './constants';
import { ShieldAlert } from 'lucide-react';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [activeModule, setActiveModule] = React.useState<ActiveModule>('Dashboard');
  const [user, setUser] = React.useState<User>({
    id: 1,
    name: 'Sarah Connor',
    email: 'sarah.c@illuminatierp.com',
    role: UserRole.SUPER_ADMIN,
    company_id: 1
  });

  const handleRoleChange = (role: UserRole) => {
    setUser(prev => ({ ...prev, role }));
    const allowed = NAV_ITEMS.find(item => item.id === activeModule)?.allowedRoles.includes(role);
    if (!allowed) {
      setActiveModule('Dashboard');
    }
  };

  /**
   * Intelligently Redirect Users After Login
   * Super Admin -> Dashboard
   * Project Manager -> Projects
   * Procurement Manager -> Procurement
   * Accountant -> Finance
   * Site Engineer -> Projects
   */
  const handleLogin = (role: UserRole) => {
    setUser(prev => ({ 
      ...prev, 
      role,
      name: role === UserRole.SUPER_ADMIN ? 'Sarah Connor' : role.replace('_', ' ') + ' User'
    }));
    
    // Role-based initial redirection
    let initialModule: ActiveModule = 'Dashboard';
    switch (role) {
      case UserRole.PROJECT_MANAGER:
      case UserRole.SITE_ENGINEER:
        initialModule = 'Projects';
        break;
      case UserRole.PROCUREMENT_MANAGER:
      case UserRole.STORE_MANAGER:
        initialModule = 'Procurement';
        break;
      case UserRole.ACCOUNTANT:
        initialModule = 'Finance';
        break;
      case UserRole.SUPER_ADMIN:
      case UserRole.COMPANY_ADMIN:
        initialModule = 'Dashboard';
        break;
      default:
        initialModule = 'Dashboard';
    }
    
    setActiveModule(initialModule);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderModule = () => {
    const currentNavItem = NAV_ITEMS.find(item => item.id === activeModule);
    const hasAccess = currentNavItem?.allowedRoles.includes(user.role);

    if (!hasAccess) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="bg-rose-50 p-6 rounded-full text-rose-600">
            <ShieldAlert className="w-12 h-12" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Access Denied</h2>
            <p className="text-slate-500 max-w-sm mx-auto mt-2 italic font-medium">
              Authority level <b>{user.role.replace('_', ' ')}</b> lacks permission to access the <b>{activeModule}</b> asset.
            </p>
          </div>
          <button 
            onClick={() => setActiveModule('Dashboard')}
            className="px-10 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-600/20"
          >
            Return to Dashboard
          </button>
        </div>
      );
    }

    switch (activeModule) {
      case 'Dashboard': return <Dashboard />;
      case 'CRM': return <CRMModule />;
      case 'Projects': return <ProjectsModule />;
      case 'Procurement': return <ProcurementModule />;
      case 'Reports': return <ReportsModule />;
      case 'Contractors': return <ContractorModule />;
      case 'Revenue': return <RevenueModule />;
      case 'Inventory': return <InventoryModule />;
      case 'AI_Assistant': return <AIAssistant />;
      case 'Finance': return <FinanceModule />;
      case 'HR': return <HRModule />;
      case 'Security': return <SecurityModule />;
      case 'SaaS_Hub': return <SaaSHub />;
      case 'Roadmap': return <RoadmapModule />;
      case 'Investor_Deck': return <InvestorModule />;
      case 'Settings': return <SettingsModule />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeModule={activeModule} 
      setActiveModule={setActiveModule} 
      user={user} 
      onRoleChange={handleRoleChange}
      onLogout={() => setIsAuthenticated(false)}
    >
      {renderModule()}
    </Layout>
  );
};

const App: React.FC = () => (
  <ERPProvider>
    <AppContent />
  </ERPProvider>
);

export default App;
