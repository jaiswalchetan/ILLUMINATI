
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MOCK_PROJECTS, MOCK_MATERIALS, MOCK_EMPLOYEES, 
  MOCK_ACCOUNTS, MOCK_INVOICES, MOCK_LEADS, 
  MOCK_QUOTATIONS, MOCK_CRM_CLIENTS, MOCK_COMPANIES,
  MOCK_CONTRACTORS, MOCK_CONTRACTOR_BILLS, MOCK_WORK_ORDERS,
  MOCK_VENDORS, MOCK_REQUISITIONS
} from '../constants';
import { 
  Project, Material, Employee, Account, Invoice, 
  Lead, Quotation, CRMClient, Company, SiteLog, StockLog, JournalEntry, ProjectStock, 
  Contractor, ContractorBill, ContractorPayment, WorkOrder,
  Vendor, MaterialRequisition, RFQ, Quote, PurchaseOrder, GRN
} from '../types';

interface ERPContextType {
  projects: Project[];
  materials: Material[];
  employees: Employee[];
  accounts: Account[];
  invoices: Invoice[];
  leads: Lead[];
  quotations: Quotation[];
  clients: CRMClient[];
  companies: Company[];
  stockLogs: StockLog[];
  journals: JournalEntry[];
  siteStocks: ProjectStock[];
  contractors: Contractor[];
  contractorBills: ContractorBill[];
  contractorPayments: ContractorPayment[];
  workOrders: WorkOrder[];
  
  // Procurement Module State
  vendors: Vendor[];
  requisitions: MaterialRequisition[];
  rfqs: RFQ[];
  quotes: Quote[];
  purchaseOrders: PurchaseOrder[];
  grns: GRN[];

  // Database Operations
  addProject: (project: Project) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addSiteLog: (projectId: number, log: SiteLog) => void;

  addMaterial: (m: Material) => void;
  addStockLog: (log: StockLog) => void;

  addEmployee: (emp: Employee) => void;
  deleteEmployee: (id: number) => void;

  addLead: (lead: Lead) => void;
  updateLead: (id: number, updates: Partial<Lead>) => void;
  convertLeadToProject: (leadId: number) => void;

  addInvoice: (invoice: Invoice) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  updateAccountBalance: (id: string, amount: number) => void;
  
  addContractor: (c: Contractor) => void;
  addWorkOrder: (wo: WorkOrder) => void;
  addContractorBill: (b: ContractorBill) => void;
  approveContractorBill: (billId: number) => void;
  addContractorPayment: (p: ContractorPayment) => void;

  // Procurement Operations
  addRequisition: (req: MaterialRequisition) => void;
  updateRequisition: (id: number, updates: Partial<MaterialRequisition>) => void;
  addVendor: (v: Vendor) => void;
  updateVendor: (id: number, updates: Partial<Vendor>) => void;
  addRFQ: (rfq: RFQ) => void;
  updateRFQ: (id: number, updates: Partial<RFQ>) => void;
  addQuote: (q: Quote) => void;
  addPurchaseOrder: (po: PurchaseOrder) => void;
  updatePurchaseOrder: (id: number, updates: Partial<PurchaseOrder>) => void;
  addGRN: (grn: GRN) => void;
  
  // System Tools
  resetDatabase: () => void;
  exportDatabase: () => void;
}

const ERPContext = createContext<ERPContextType | undefined>(undefined);

export const ERPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [clients, setClients] = useState<CRMClient[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [stockLogs, setStockLogs] = useState<StockLog[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [siteStocks, setSiteStocks] = useState<ProjectStock[]>([]);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [contractorBills, setContractorBills] = useState<ContractorBill[]>([]);
  const [contractorPayments, setContractorPayments] = useState<ContractorPayment[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  // Procurement States
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [requisitions, setRequisitions] = useState<MaterialRequisition[]>([]);
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [grns, setGrns] = useState<GRN[]>([]);

  useEffect(() => {
    const db = localStorage.getItem('illuminati_master_db');
    if (db) {
      const data = JSON.parse(db);
      setProjects(data.projects || []);
      setMaterials(data.materials || []);
      setEmployees(data.employees || []);
      setAccounts(data.accounts || []);
      setInvoices(data.invoices || []);
      setLeads(data.leads || []);
      setQuotations(data.quotations || []);
      setClients(data.clients || []);
      setCompanies(data.companies || []);
      setStockLogs(data.stockLogs || []);
      setJournals(data.journals || []);
      setSiteStocks(data.siteStocks || []);
      setContractors(data.contractors || []);
      setContractorBills(data.contractorBills || []);
      setContractorPayments(data.contractorPayments || []);
      setWorkOrders(data.workOrders || []);
      
      setVendors(data.vendors || []);
      setRequisitions(data.requisitions || []);
      setRfqs(data.rfqs || []);
      setQuotes(data.quotes || []);
      setPurchaseOrders(data.purchaseOrders || []);
      setGrns(data.grns || []);
    } else {
      setProjects(MOCK_PROJECTS);
      setMaterials(MOCK_MATERIALS);
      setEmployees(MOCK_EMPLOYEES);
      setAccounts(MOCK_ACCOUNTS);
      setInvoices(MOCK_INVOICES);
      setLeads(MOCK_LEADS);
      setContractors(MOCK_CONTRACTORS);
      setContractorBills(MOCK_CONTRACTOR_BILLS);
      setWorkOrders(MOCK_WORK_ORDERS);
      setVendors(MOCK_VENDORS);
      setRequisitions(MOCK_REQUISITIONS);
    }
  }, []);

  useEffect(() => {
    const data = { 
      projects, materials, employees, accounts, invoices, 
      leads, quotations, clients, companies, stockLogs, journals, 
      siteStocks, contractors, contractorBills, contractorPayments, workOrders,
      vendors, requisitions, rfqs, quotes, purchaseOrders, grns
    };
    localStorage.setItem('illuminati_master_db', JSON.stringify(data));
  }, [projects, materials, employees, accounts, invoices, leads, quotations, clients, companies, stockLogs, journals, siteStocks, contractors, contractorBills, contractorPayments, workOrders, vendors, requisitions, rfqs, quotes, purchaseOrders, grns]);

  const addProject = (p: Project) => setProjects(prev => [p, ...prev]);
  const updateProject = (id: number, updates: Partial<Project>) => setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const deleteProject = (id: number) => setProjects(prev => prev.filter(p => p.id !== id));
  const addEmployee = (emp: Employee) => setEmployees(prev => [emp, ...prev]);
  const deleteEmployee = (id: number) => setEmployees(prev => prev.filter(e => e.id !== id));
  const addMaterial = (m: Material) => setMaterials(prev => [m, ...prev]);
  const addStockLog = (log: StockLog) => {
    setStockLogs(prev => [log, ...prev]);
    setMaterials(prev => prev.map(m => m.id === log.materialId ? {
      ...m,
      currentStock: log.type === 'Inward' ? m.currentStock + log.quantity : m.currentStock - log.quantity
    } : m));
  };

  const convertLeadToProject = (leadId: number) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    const newProject: Project = {
      id: Date.now(),
      company_id: lead.company_id,
      name: `${lead.company} Infrastructure`,
      client_name: lead.company,
      budget: lead.value,
      contract_value: lead.value * 1.25,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 31536000000).toISOString().split('T')[0],
      status: 'Active',
      spent: 0,
      completion: 0,
      boq: []
    };
    addProject(newProject);
    updateLead(leadId, { status: 'Closed Won' });
    addJournalEntry({ id: `JN-${Date.now()}`, date: new Date().toISOString().split('T')[0], debitAccount: 'Accounts Receivable', creditAccount: 'Unearned Revenue', amount: newProject.contract_value, description: `Contract init: ${newProject.name}` });
  };

  const addLead = (lead: Lead) => setLeads(prev => [lead, ...prev]);
  const updateLead = (id: number, updates: Partial<Lead>) => setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  const addJournalEntry = (entry: JournalEntry) => setJournals(prev => [entry, ...prev]);
  const updateAccountBalance = (id: string, amount: number) => setAccounts(prev => prev.map(a => a.id === id ? { ...a, balance: a.balance + amount } : a));
  const approveContractorBill = (billId: number) => {
    setContractorBills(prev => prev.map(b => {
      if (b.id === billId) {
        updateProject(b.project_id, { spent: (projects.find(p => p.id === b.project_id)?.spent || 0) + b.bill_amount });
        addJournalEntry({ id: `JN-BILL-${b.id}`, date: new Date().toISOString().split('T')[0], debitAccount: 'WIP Assets', creditAccount: 'Accounts Payable', amount: b.net_payable, description: `Approved RA Bill: ${b.bill_number}` });
        return { ...b, status: 'approved' };
      }
      return b;
    }));
  };
  // Fixed addContractorPayment to properly use .map on prev state and avoid 'b' undefined error
  const addContractorPayment = (p: ContractorPayment) => {
    setContractorPayments(prev => [...prev, p]);
    setContractorBills(prev => prev.map(bill => bill.id === p.contractor_bill_id ? { ...bill, status: 'paid' } : bill));
    updateAccountBalance('1', -p.paid_amount);
  };
  const addInvoice = (inv: Invoice) => {
    setInvoices(prev => [inv, ...prev]);
    if (inv.status === 'Paid') updateAccountBalance('1', inv.total);
  };
  const addContractor = (c: Contractor) => setContractors(prev => [...prev, c]);
  const addWorkOrder = (wo: WorkOrder) => setWorkOrders(prev => [wo, ...prev]);
  const addContractorBill = (b: ContractorBill) => setContractorBills(prev => [b, ...prev]);
  const addSiteLog = (projectId: number, log: SiteLog) => setProjects(prev => prev.map(p => p.id === projectId ? { ...p, siteLogs: [log, ...(p.siteLogs || [])] } : p));

  // Procurement Operations
  const addRequisition = (req: MaterialRequisition) => setRequisitions(prev => [req, ...prev]);
  const updateRequisition = (id: number, updates: Partial<MaterialRequisition>) => setRequisitions(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  const addVendor = (v: Vendor) => setVendors(prev => [v, ...prev]);
  const updateVendor = (id: number, updates: Partial<Vendor>) => setVendors(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  const addRFQ = (rfq: RFQ) => setRfqs(prev => [rfq, ...prev]);
  const updateRFQ = (id: number, updates: Partial<RFQ>) => setRfqs(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  const addQuote = (q: Quote) => setQuotes(prev => [q, ...prev]);
  const addPurchaseOrder = (po: PurchaseOrder) => setPurchaseOrders(prev => [po, ...prev]);
  const updatePurchaseOrder = (id: number, updates: Partial<PurchaseOrder>) => setPurchaseOrders(prev => prev.map(po => po.id === id ? { ...po, ...updates } : po));
  
  const addGRN = (grn: GRN) => {
    setGrns(prev => [grn, ...prev]);
    // Logic: Confirm receipt of items and update main inventory
    const po = purchaseOrders.find(p => p.id === grn.po_id);
    if (po) {
      grn.items.forEach(item => {
        const material = materials.find(m => m.id === item.material_id);
        if (material) {
          addStockLog({
            id: `GRN-LOG-${Date.now()}-${item.material_id}`,
            materialId: item.material_id,
            materialName: material.name,
            quantity: item.qty_received,
            type: 'Inward',
            date: grn.received_date
          });
        }
      });
      // Check if PO is complete
      updatePurchaseOrder(po.id, { status: 'Completed' });
    }
  };

  const resetDatabase = () => { localStorage.removeItem('illuminati_master_db'); window.location.reload(); };
  const exportDatabase = () => {
    const data = localStorage.getItem('illuminati_master_db');
    if (!data) return;
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `illuminati_erp_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };

  return (
    <ERPContext.Provider value={{ 
      projects, materials, employees, accounts, invoices, leads, quotations, clients, companies, stockLogs, journals, siteStocks, contractors, contractorBills, contractorPayments, workOrders,
      vendors, requisitions, rfqs, quotes, purchaseOrders, grns,
      addProject, updateProject, deleteProject, addInvoice, updateAccountBalance, convertLeadToProject, addSiteLog, 
      addMaterial, addStockLog, addEmployee, deleteEmployee, addLead, updateLead, addJournalEntry,
      addContractor, addWorkOrder, addContractorBill, approveContractorBill, addContractorPayment,
      addRequisition, updateRequisition, addVendor, updateVendor, addRFQ, updateRFQ, addQuote, addPurchaseOrder, updatePurchaseOrder, addGRN,
      resetDatabase, exportDatabase
    }}>
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => {
  const context = useContext(ERPContext);
  if (context === undefined) throw new Error('useERP must be used within an ERPProvider');
  return context;
};
