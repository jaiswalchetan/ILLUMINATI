
import React from 'react';
import { useERP } from '../context/ERPContext';
import { Employee } from '../types';
import { 
  Users, Calendar, Clock, UserPlus, 
  Fingerprint, Banknote, MoreVertical, Search, Filter, X, Save
} from 'lucide-react';

type HRTab = 'Employees' | 'Attendance' | 'Payroll' | 'Leaves';

const HRModule: React.FC = () => {
  const { employees, addEmployee, deleteEmployee } = useERP();
  const [activeTab, setActiveTab] = React.useState<HRTab>('Employees');
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newEmp, setNewEmp] = React.useState<Partial<Employee>>({
    name: '', designation: '', salary: 0, joining_date: new Date().toISOString().split('T')[0]
  });

  const handleSave = () => {
    if (!newEmp.name || !newEmp.designation) return;
    addEmployee({ ...newEmp, id: Date.now(), company_id: 1 } as Employee);
    setShowAddForm(false);
    setNewEmp({ name: '', designation: '', salary: 0, joining_date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">HR Management</h2>
          <p className="text-slate-500 text-sm font-medium italic">Unified workforce deployment and payroll audit.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {(['Employees', 'Attendance', 'Payroll', 'Leaves'] as HRTab[]).map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === 'Employees' && (
           <div className="space-y-6">
             <div className="flex justify-between items-center bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
                <div className="relative w-80">
                   <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                   <input type="text" placeholder="Filter talent..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-4 py-3 text-xs font-bold" />
                </div>
                <button onClick={() => setShowAddForm(true)} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 flex items-center gap-2 hover:scale-105 transition-all"><UserPlus className="w-4 h-4" /> Onboard Staff</button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {employees.map(emp => (
                 <div key={emp.id} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:border-indigo-400 transition-all flex flex-col items-center text-center group relative overflow-hidden">
                    <div className="absolute top-4 right-4"><button onClick={() => deleteEmployee(emp.id)} className="p-2 text-slate-200 hover:text-rose-500 transition-colors"><X className="w-4 h-4" /></button></div>
                    <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-400 font-black text-3xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl group-hover:rotate-3">
                       {emp.name.substring(0, 1)}
                    </div>
                    <h4 className="font-black text-slate-900 text-xl leading-tight uppercase tracking-tighter italic">{emp.name}</h4>
                    <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mt-2 bg-indigo-50 px-3 py-1 rounded-full">{emp.designation}</p>
                    <div className="mt-10 pt-8 border-t border-slate-50 w-full space-y-3 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                       <div className="flex justify-between items-center"><span>Gross Salary</span><span className="text-slate-900 text-sm">₹{emp.salary.toLocaleString()}</span></div>
                       <div className="flex justify-between items-center"><span>Joined</span><span className="text-slate-900">{emp.joining_date}</span></div>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] w-full max-w-xl shadow-2xl p-12 space-y-10 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Staff Onboarding</h3>
                    <p className="text-slate-500 text-sm font-medium">Add a new member to the corporate workforce.</p>
                 </div>
                 <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-8 h-8" /></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold" />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Designation</label>
                      <input type="text" value={newEmp.designation} onChange={e => setNewEmp({...newEmp, designation: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly CTC</label>
                      <input type="number" value={newEmp.salary} onChange={e => setNewEmp({...newEmp, salary: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold" />
                   </div>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={handleSave} className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all">
                    <Save className="w-5 h-5" /> Confirm Onboarding
                 </button>
                 <button onClick={() => setShowAddForm(false)} className="px-8 py-5 border border-slate-200 text-slate-500 rounded-[24px] text-xs font-black uppercase">Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default HRModule;
