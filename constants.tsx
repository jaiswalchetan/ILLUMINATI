
import React from 'react';
import { 
  LayoutDashboard, 
  HardHat, 
  Warehouse, 
  CircleDollarSign, 
  Users, 
  Sparkles, 
  Settings as SettingsIcon,
  Briefcase,
  Database,
  ShieldCheck,
  Globe,
  Milestone,
  Presentation,
  Hammer,
  ClipboardList,
  TrendingUp,
  ShoppingCart,
  BarChart3
} from 'lucide-react';
import { UserRole, ActiveModule, Project, Transaction, Employee, Lead, Company, Material, Account, Invoice, Quotation, CRMClient, Contractor, ContractorBill, WorkOrder, Vendor, MaterialRequisition, RFQ, Quote, PurchaseOrder, GRN } from './types';

export const NAV_ITEMS: { id: ActiveModule; label: string; icon: React.ReactNode; allowedRoles: UserRole[] }[] = [
  { id: 'Dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, allowedRoles: Object.values(UserRole) },
  { id: 'Projects', label: 'Projects', icon: <HardHat className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.PROJECT_MANAGER, UserRole.SITE_ENGINEER] },
  { id: 'Procurement', label: 'Procurement', icon: <ShoppingCart className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.PROJECT_MANAGER, UserRole.STORE_MANAGER, UserRole.PROCUREMENT_MANAGER] },
  { id: 'Reports', label: 'Strategic Reports', icon: <BarChart3 className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.PROJECT_MANAGER, UserRole.ACCOUNTANT] },
  { id: 'Revenue', label: 'Revenue Analytics', icon: <TrendingUp className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.ACCOUNTANT] },
  { id: 'Contractors', label: 'Contractors & WO', icon: <Hammer className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.PROJECT_MANAGER, UserRole.ACCOUNTANT] },
  { id: 'Finance', label: 'Finance', icon: <CircleDollarSign className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.ACCOUNTANT] },
  { id: 'Inventory', label: 'Inventory', icon: <Warehouse className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.STORE_MANAGER, UserRole.SITE_ENGINEER] },
  { id: 'HR', label: 'HR', icon: <Users className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.HR_MANAGER] },
  { id: 'CRM', label: 'CRM', icon: <Briefcase className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN, UserRole.PROJECT_MANAGER] },
  { id: 'AI_Assistant', label: 'Genius AI', icon: <Sparkles className="w-5 h-5" />, allowedRoles: Object.values(UserRole) },
  { id: 'SaaS_Hub', label: 'SaaS Hub', icon: <Globe className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN] },
  { id: 'Investor_Deck', label: 'Investor Pitch', icon: <Presentation className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN] },
  { id: 'Security', label: 'Security', icon: <ShieldCheck className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN] },
  { id: 'Roadmap', label: 'Dev Roadmap', icon: <Milestone className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN] },
  { id: 'Settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" />, allowedRoles: [UserRole.SUPER_ADMIN, UserRole.COMPANY_ADMIN] },
];

export const MOCK_COMPANIES: Company[] = [
  { id: 1, name: 'Skyline Construction', email: 'admin@skyline.com', phone: '04-1234567', domain: 'skyline.com', plan: 'Enterprise' }
];

export const MOCK_PROJECTS: Project[] = [
  { 
    id: 1, 
    company_id: 1, 
    name: 'Skyline Towers', 
    client_name: 'Emaar Properties', 
    budget: 50000000, 
    contract_value: 65000000, 
    spent: 32000000, 
    completion: 65,
    start_date: '2023-01-10', 
    end_date: '2024-12-15', 
    status: 'In Progress',
    boq: [
      { id: 101, project_id: 1, item_name: 'Earthwork foundation', unit: 'm3', quantity: 1250, material_cost: 0, labour_cost: 150, machinery_cost: 120, overhead_percent: 10, profit_percent: 15, final_rate: 340 },
      { id: 102, project_id: 1, item_name: 'Cement concrete 1:5:10', unit: 'm3', quantity: 500, material_cost: 3200, labour_cost: 450, machinery_cost: 200, overhead_percent: 10, profit_percent: 15, final_rate: 4800 }
    ]
  }
];

export const MOCK_VENDORS: Vendor[] = [
  { id: 1, company_id: 1, name: 'UltraTech Cement Ltd', category: 'Civil', contact_person: 'Amit Shah', email: 'amit@ultratech.com', phone: '+91 98765 43210', rating: 4.8, gstin: '27AAACU1234A1Z1' },
  { id: 2, company_id: 1, name: 'JSW Steel', category: 'Steel', contact_person: 'Rajesh Varma', email: 'rajesh@jsw.in', phone: '+91 91234 56789', rating: 4.5, gstin: '27AAACJ5678J1Z1' },
  { id: 3, company_id: 1, name: 'Kajaria Ceramics', category: 'Finishes', contact_person: 'Sanjay Jain', email: 'sanjay@kajaria.com', phone: '+91 92222 11111', rating: 4.2 }
];

export const MOCK_REQUISITIONS: MaterialRequisition[] = [
  { id: 1, company_id: 1, project_id: 1, requested_by: 'Rajesh Kumar', items: [{ material_id: 1, material_name: 'Portland Cement', quantity: 200, unit: 'Bags' }], status: 'Pending Approval', date: '2024-05-20', priority: 'Urgent' },
  { id: 2, company_id: 1, project_id: 1, requested_by: 'Suresh Raina', items: [{ material_id: 2, material_name: 'TMT Steel 12mm', quantity: 5, unit: 'MT' }], status: 'PO Issued', date: '2024-05-18', priority: 'Normal' }
];

export const MOCK_RFQS: RFQ[] = [
  { id: 1, company_id: 1, requisition_id: 1, title: 'Bulk Cement Procurement - May', vendor_ids: [1, 2], deadline: '2024-05-25', status: 'Open' }
];

export const MOCK_QUOTES: Quote[] = [
  { id: 1, rfq_id: 1, vendor_id: 1, date: '2024-05-21', items: [{ material_id: 1, rate: 380, total: 76000 }], total_amount: 76000, gst_amount: 13680, grand_total: 89680, status: 'Submitted' },
  { id: 2, rfq_id: 1, vendor_id: 2, date: '2024-05-21', items: [{ material_id: 1, rate: 395, total: 79000 }], total_amount: 79000, gst_amount: 14220, grand_total: 93220, status: 'Submitted' }
];

export const MOCK_POS: PurchaseOrder[] = [
  { id: 1, company_id: 1, project_id: 1, vendor_id: 2, po_number: 'PO-SKY-2024-012', date: '2024-05-15', items: [{ material_id: 2, material_name: 'TMT Steel 12mm', quantity: 5, rate: 65000, total: 325000 }], total_amount: 325000, tax_amount: 58500, grand_total: 383500, status: 'Issued' }
];

export const MOCK_GRNS: GRN[] = [
  { id: 1, po_id: 1, received_date: '2024-05-19', received_by: 'Ankit Sharma', items: [{ material_id: 2, qty_received: 5, condition: 'Good' }], status: 'Verified' }
];

export const MOCK_CONTRACTORS: Contractor[] = [
  { id: 1, company_id: 1, name: 'Reliable Structural Works', phone: '9876543210', contract_value: 15000000 },
  { id: 2, company_id: 1, name: 'Precision MEP Solutions', phone: '9123456780', contract_value: 8000000 }
];

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    id: 1,
    company_id: 1,
    project_id: 1,
    contractor_id: 1,
    wo_number: 'WO-SKL-2024-001',
    issue_date: '2024-01-15',
    status: 'Issued',
    total_value: 425000,
    items: [
      { id: 1, boq_item_id: 101, assigned_quantity: 1250, unit_rate: 340, amount: 425000 }
    ]
  }
];

export const MOCK_CONTRACTOR_BILLS: ContractorBill[] = [
  { id: 1, contractor_id: 1, project_id: 1, bill_number: 'RA-001', bill_amount: 1000000, retention_percent: 5, tds_percent: 2, net_payable: 930000, status: 'approved', created_at: '2024-05-10' }
];

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 1, company_id: 1, name: 'Rajesh Kumar', designation: 'Project Manager', salary: 85000, joining_date: '2022-01-15' }
];

export const MOCK_MATERIALS: Material[] = [
  { id: 1, company_id: 1, name: 'Portland Cement', category: 'Civil', currentStock: 450, reorderLevel: 100, unit: 'Bags', avgCost: 380, site: 'Skyline Towers' },
  { id: 2, company_id: 1, name: 'TMT Steel 12mm', category: 'Steel', currentStock: 12, reorderLevel: 5, unit: 'MT', avgCost: 65000, site: 'Skyline Towers' }
];

export const MOCK_LEADS: Lead[] = [
  { id: 1, company_id: 1, name: 'John Peterson', phone: '+971 50 123 4567', status: 'Proposal', value: 12000000, company: 'Emaar Properties' }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 1, company_id: 1, project_id: 1, type: 'income', amount: 500000, description: 'Milestone 2 Payout', date: '2024-05-01' }
];

export const MOCK_ACCOUNTS: Account[] = [
  { id: '1', company_id: 1, name: 'HDFC Bank Corporate', type: 'Asset', balance: 25000000 }
];

export const MOCK_INVOICES: Invoice[] = [
  { id: '1', company_id: 1, invoiceNumber: 'INV-2024-001', partyName: 'Emaar Properties', total: 500000, status: 'Paid', date: '2024-05-01' }
];

export const MOCK_QUOTATIONS: Quotation[] = [
  { id: '1', company_id: 1, quoteNumber: 'QT-2024-001', clientName: 'Emaar Properties', totalAmount: 2770000, status: 'Accepted', date: '2024-05-15' }
];

export const MOCK_CRM_CLIENTS: CRMClient[] = [
  { id: '1', company_id: 1, name: 'John Peterson', companyName: 'Emaar Properties', email: 'john@emaar.ae', phone: '+971 50 123 4567' }
];

export const MOCK_AUDIT_LOGS = [
  { id: 1, action: 'User Login', user: 'Sarah Connor', timestamp: '2024-05-20 10:00:00' }
];
