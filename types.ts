
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  ACCOUNTANT = 'ACCOUNTANT',
  SITE_ENGINEER = 'SITE_ENGINEER',
  HR_MANAGER = 'HR_MANAGER',
  STORE_MANAGER = 'STORE_MANAGER',
  CLIENT = 'CLIENT',
  PROCUREMENT_MANAGER = 'PROCUREMENT_MANAGER',
  VENDOR = 'VENDOR'
}

export type SubscriptionStatus = 'Active' | 'Trial' | 'Past Due' | 'Suspended';
export type SubscriptionPlan = 'Standard' | 'Business' | 'Enterprise';

export interface Company {
  id: number; // SERIAL
  name: string;
  email?: string;
  phone?: string;
  created_at?: string;
  domain?: string;
  plan?: SubscriptionPlan;
}

export interface User {
  id: number; // SERIAL
  company_id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  created_at?: string;
}

export interface Project {
  id: number; // SERIAL
  company_id: number;
  name: string;
  client_name: string;
  budget: number; // Internal planned cost
  contract_value: number; // External revenue value
  start_date: string;
  end_date: string;
  status: string;
  created_at?: string;
  spent?: number;
  completion?: number;
  location?: string;
  boq?: BOQItem[];
  tasks?: any[];
  resources?: any[];
  siteLogs?: SiteLog[];
}

export interface BOQItem {
  id: number; // SERIAL
  project_id: number;
  item_name: string;
  unit: string;
  quantity: number;
  material_cost: number;
  labour_cost: number;
  machinery_cost: number;
  overhead_percent: number;
  profit_percent: number;
  base_cost?: number;
  overhead_amount?: number;
  subtotal?: number;
  profit_amount?: number;
  final_rate?: number;
  total_amount?: number;
}

export interface Contractor {
  id: number;
  company_id: number;
  name: string;
  phone: string;
  contract_value: number;
}

export interface WorkOrder {
  id: number;
  company_id: number;
  project_id: number;
  contractor_id: number;
  wo_number: string;
  description?: string;
  issue_date: string;
  start_date?: string;
  end_date?: string;
  status: 'Draft' | 'Issued' | 'In Progress' | 'Completed' | 'Cancelled';
  items: WorkOrderItem[];
  total_value: number;
}

export interface WorkOrderItem {
  id: number;
  work_order_id?: number;
  boq_item_id: number;
  assigned_quantity: number;
  unit_rate: number;
  amount: number; // Qty * Rate
}

export interface ContractorBill {
  id: number;
  contractor_id: number;
  project_id: number;
  work_order_id?: number; // Linked to WO
  bill_number: string;
  bill_amount: number;
  retention_percent: number;
  tds_percent: number;
  net_payable: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  created_at?: string;
}

export interface ContractorPayment {
  id: number;
  contractor_bill_id: number;
  paid_amount: number;
  payment_date: string;
  payment_mode: string;
}

// Procurement Module Types
export interface MaterialRequisition {
  id: number;
  company_id: number;
  project_id: number;
  requested_by: string;
  items: { material_id: number; material_name: string; quantity: number; unit: string }[];
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'PO Issued' | 'Rejected';
  date: string;
  priority: 'Normal' | 'Urgent' | 'Critical';
}

export interface Vendor {
  id: number;
  company_id: number;
  name: string;
  category: string;
  contact_person: string;
  email: string;
  phone: string;
  rating: number;
  address?: string;
  gstin?: string;
}

export interface RFQ {
  id: number;
  company_id: number;
  requisition_id: number;
  vendor_ids: number[];
  deadline: string;
  status: 'Open' | 'Quotes Received' | 'Finalized' | 'Cancelled';
  title: string;
}

export interface Quote {
  id: number;
  rfq_id: number;
  vendor_id: number;
  items: { material_id: number; rate: number; total: number }[];
  total_amount: number;
  gst_amount: number;
  grand_total: number;
  terms?: string;
  delivery_time?: string;
  status: 'Draft' | 'Submitted' | 'Selected' | 'Rejected';
  date: string;
}

export interface PurchaseOrder {
  id: number;
  company_id: number;
  project_id: number;
  vendor_id: number;
  quote_id?: number;
  po_number: string;
  items: { material_id: number; material_name: string; quantity: number; rate: number; total: number }[];
  total_amount: number;
  tax_amount: number;
  grand_total: number;
  status: 'Issued' | 'Confirmed' | 'Partial Delivery' | 'Completed' | 'Cancelled';
  date: string;
  delivery_date?: string;
}

export interface GRN {
  id: number;
  po_id: number;
  received_date: string;
  received_by: string;
  invoice_ref?: string;
  items: { material_id: number; qty_received: number; condition: 'Good' | 'Damaged' }[];
  status: 'Draft' | 'Verified' | 'Returned';
}

export interface Transaction {
  id: number; // SERIAL
  company_id: number;
  project_id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
}

export interface Employee {
  id: number; // SERIAL
  company_id: number;
  name: string;
  designation: string;
  salary: number;
  joining_date: string;
}

export interface Material {
  id: number;
  company_id: number;
  name: string;
  category: string;
  currentStock: number;
  reorderLevel: number;
  unit: string;
  avgCost: number;
  site?: string;
}

export type Inventory = Material;

export type LeadStatus = 'New' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export interface Lead {
  id: number; // SERIAL
  company_id: number;
  name: string;
  phone: string;
  status: LeadStatus;
  created_at?: string;
  value: number;
  email?: string;
  company: string;
}

export interface SiteLog {
  id: string;
  date: string;
  author: string;
  description: string;
  weather: string;
  labourCount: number;
  status: 'Normal' | 'Critical' | 'Delayed';
}

export interface Account {
  id: string;
  company_id: number;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
}

export interface Invoice {
  id: string;
  company_id: number;
  invoiceNumber: string;
  partyName: string;
  total: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
  date: string;
  type?: 'Sales' | 'Purchase';
}

export interface Quotation {
  id: string;
  company_id: number;
  quoteNumber: string;
  clientName: string;
  totalAmount: number;
  status: 'Pending' | 'Accepted' | 'Declined';
  date: string;
}

export interface CRMClient {
  id: string;
  company_id: number;
  name: string;
  companyName: string;
  email: string;
  phone: string;
}

export interface StockLog {
  id: string;
  materialId: number;
  materialName: string;
  quantity: number;
  type: 'Inward' | 'Outward';
  date: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  description: string;
}

export interface ProjectStock {
  projectId: number;
  projectName: string;
  materials: { materialId: number; materialName: string; quantity: number }[];
}

export interface PortfolioStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalPortfolioValue: number;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  portfolioMargin: number;
  totalRetention: number;
  cashFlowPosition: number;
  gstPayable: number;
}

export type ActiveModule = 'Dashboard' | 'CRM' | 'Projects' | 'Contractors' | 'Inventory' | 'Finance' | 'Revenue' | 'HR' | 'AI_Assistant' | 'Security' | 'SaaS_Hub' | 'Roadmap' | 'Investor_Deck' | 'Settings' | 'Procurement' | 'Reports';
