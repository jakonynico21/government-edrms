import { RegistryDocument, MovementEntry, RetentionRule, MonthlyStat, Alert, TimelineNode } from './types';

export const dummyDocuments: RegistryDocument[] = [
  { id: '1', referenceNumber: 'MOF/2024/001', title: 'Annual Budget Allocation Directive FY2024/25', documentType: 'Circular', originatingDepartment: 'Ministry of Finance', dateLogged: '2024-01-15', status: 'Active', retentionYears: 7, description: 'Directive on budget allocation for all ministries' },
  { id: '2', referenceNumber: 'MOF/2024/012', title: 'Internal Audit Report Q1 2024', documentType: 'Report', originatingDepartment: 'Internal Audit', dateLogged: '2024-02-10', status: 'Active', retentionYears: 7, description: 'Quarterly internal audit findings' },
  { id: '3', referenceNumber: 'MOF/2023/089', title: 'Procurement Approval for Office Supplies', documentType: 'Letter', originatingDepartment: 'Procurement Unit', dateLogged: '2023-06-22', status: 'Archived', retentionYears: 5, description: 'Approval for Q3 office supplies procurement' },
  { id: '4', referenceNumber: 'MOF/2024/045', title: 'Staff Performance Evaluation Guidelines', documentType: 'File', originatingDepartment: 'Human Resources', dateLogged: '2024-03-05', status: 'Active', retentionYears: 7, description: 'Updated performance evaluation framework' },
  { id: '5', referenceNumber: 'MOF/2024/078', title: 'Tax Revenue Collection Strategy', documentType: 'Report', originatingDepartment: 'Revenue Authority', dateLogged: '2024-04-18', status: 'In Transit', retentionYears: 10, description: 'Strategic plan for tax revenue optimization' },
  { id: '6', referenceNumber: 'MOF/2022/156', title: 'Ministerial Correspondence with Treasury', documentType: 'Letter', originatingDepartment: 'Ministry of Finance', dateLogged: '2022-09-14', status: 'Archived', retentionYears: 5, description: 'Exchange regarding fiscal policy adjustments' },
  { id: '7', referenceNumber: 'MOF/2024/102', title: 'Capital Expenditure Review Committee Minutes', documentType: 'File', originatingDepartment: 'Planning Unit', dateLogged: '2024-05-30', status: 'Active', retentionYears: 7, description: 'Minutes from the capital expenditure review meeting' },
  { id: '8', referenceNumber: 'MOF/2024/134', title: 'Emergency Fund Disbursement Request', documentType: 'Memo', originatingDepartment: 'Disaster Management', dateLogged: '2024-06-12', status: 'Pending', retentionYears: 7, description: 'Request for emergency relief fund release' },
  { id: '9', referenceNumber: 'MOF/2023/201', title: 'ICT Infrastructure Upgrade Proposal', documentType: 'Report', originatingDepartment: 'ICT Department', dateLogged: '2023-11-03', status: 'Active', retentionYears: 7, description: 'Proposal for modernizing government IT systems' },
  { id: '10', referenceNumber: 'MOF/2024/167', title: 'Public Procurement Act Amendment Draft', documentType: 'File', originatingDepartment: 'Legal Affairs', dateLogged: '2024-07-08', status: 'Active', retentionYears: 10, description: 'Draft amendment to procurement legislation' },
  { id: '11', referenceNumber: 'MOF/2021/334', title: 'Annual Financial Statements 2021', documentType: 'Report', originatingDepartment: 'Accounting Department', dateLogged: '2021-12-20', status: 'Archived', retentionYears: 7, description: 'Audited financial statements for FY2021' },
  { id: '12', referenceNumber: 'MOF/2024/189', title: 'Inter-Ministerial Coordination Meeting Agenda', documentType: 'Memo', originatingDepartment: 'Cabinet Affairs', dateLogged: '2024-08-01', status: 'Active', retentionYears: 2, description: 'Agenda for quarterly coordination meeting' },
  { id: '13', referenceNumber: 'MOF/2024/201', title: 'Salary Adjustment Circular for Civil Servants', documentType: 'Circular', originatingDepartment: 'Public Service', dateLogged: '2024-08-15', status: 'Active', retentionYears: 7, description: 'Circular on new salary scales effective September 2024' },
  { id: '14', referenceNumber: 'MOF/2023/267', title: 'Audit Query Response - External Audit', documentType: 'Letter', originatingDepartment: 'Internal Audit', dateLogged: '2023-08-30', status: 'Active', retentionYears: 7, description: 'Formal response to external audit findings' },
  { id: '15', referenceNumber: 'MOF/2024/215', title: 'Development Partner Funding Agreement', documentType: 'File', originatingDepartment: 'International Cooperation', dateLogged: '2024-09-02', status: 'In Transit', retentionYears: 10, description: 'Bilateral funding agreement with development partner' },
  { id: '16', referenceNumber: 'MOF/2022/412', title: 'General Correspondence - Policy Inquiry', documentType: 'Letter', originatingDepartment: 'Policy Unit', dateLogged: '2022-03-15', status: 'Archived', retentionYears: 2, description: 'General inquiry regarding fiscal policy direction' },
  { id: '17', referenceNumber: 'MOF/2024/234', title: 'Quarterly Revenue Forecast Update', documentType: 'Report', originatingDepartment: 'Revenue Authority', dateLogged: '2024-09-20', status: 'Active', retentionYears: 7, description: 'Updated revenue projections for Q4 2024' },
  { id: '18', referenceNumber: 'MOF/2024/256', title: 'Memorandum on New Tax Regulations', documentType: 'Memo', originatingDepartment: 'Legal Affairs', dateLogged: '2024-10-05', status: 'Pending', retentionYears: 7, description: 'Internal memo on implementation of new tax laws' },
  { id: '19', referenceNumber: 'MOF/2023/345', title: 'Facility Maintenance Budget Report', documentType: 'Report', originatingDepartment: 'Facilities Management', dateLogged: '2023-10-12', status: 'Active', retentionYears: 5, description: 'Annual maintenance budget utilization report' },
  { id: '20', referenceNumber: 'MOF/2024/278', title: 'Anti-Corruption Compliance Directive', documentType: 'Circular', originatingDepartment: 'Ethics & Integrity', dateLogged: '2024-10-18', status: 'Active', retentionYears: 10, description: 'Directive on updated anti-corruption compliance requirements' },
];

const timeline1: TimelineNode[] = [
  { id: 't1-1', timestamp: '2024-04-18T09:00:00', location: 'Central Registry', action: 'Document logged and shelved', officer: 'Registry Clerk A. Okello' },
  { id: 't1-2', timestamp: '2024-04-20T11:30:00', location: 'Revenue Authority', action: 'Checked out for review', officer: 'Senior Officer J. Mwangi' },
  { id: 't1-3', timestamp: '2024-04-22T14:00:00', location: 'Commissioner\'s Office', action: 'Cleared by Commissioner', officer: 'Commissioner P. Nalubega' },
  { id: 't1-4', timestamp: '2024-04-25T08:45:00', location: 'Field Office - Eastern Region', action: 'Dispatched to field office', officer: 'Dispatch Clerk R. Kato' },
];

const timeline2: TimelineNode[] = [
  { id: 't2-1', timestamp: '2024-09-02T10:00:00', location: 'Central Registry', action: 'Document logged and shelved', officer: 'Registry Clerk A. Okello' },
  { id: 't2-2', timestamp: '2024-09-05T13:15:00', location: 'International Cooperation', action: 'Checked out for negotiation', officer: 'Director S. Ochieng' },
  { id: 't2-3', timestamp: '2024-09-10T09:30:00', location: 'Minister\'s Office', action: 'Under ministerial review', officer: 'Private Secretary L. Auma' },
];

export const dummyMovements: MovementEntry[] = [
  {
    id: 'm1', documentId: '5', documentRef: 'MOF/2024/078', documentTitle: 'Tax Revenue Collection Strategy',
    issuedTo: 'J. Mwangi', department: 'Revenue Authority', dateIssued: '2024-04-20', purpose: 'Strategic review and implementation planning',
    status: 'Out', timeline: timeline1,
  },
  {
    id: 'm2', documentId: '15', documentRef: 'MOF/2024/215', documentTitle: 'Development Partner Funding Agreement',
    issuedTo: 'S. Ochieng', department: 'International Cooperation', dateIssued: '2024-09-05', purpose: 'Bilateral negotiation and signing preparation',
    status: 'Out', timeline: timeline2,
  },
];

export const retentionRules: RetentionRule[] = [
  { id: 'r1', category: 'Financial Records', documentType: 'Report', retentionYears: 7, actionAfterRetention: 'Archive', description: 'All financial reports, audit reports, and budget documents must be retained for 7 years before permanent archival.' },
  { id: 'r2', category: 'General Correspondence', documentType: 'Letter', retentionYears: 2, actionAfterRetention: 'Destroy', description: 'Routine correspondence and letters should be retained for 2 years, then reviewed for destruction.' },
  { id: 'r3', category: 'Policy & Legal Documents', documentType: 'File', retentionYears: 10, actionAfterRetention: 'Archive', description: 'Policy files, legal agreements, and legislative drafts must be retained for 10 years.' },
  { id: 'r4', category: 'Circulars & Directives', documentType: 'Circular', retentionYears: 7, actionAfterRetention: 'Archive', description: 'Ministerial circulars and official directives retained for 7 years then archived.' },
  { id: 'r5', category: 'Internal Memoranda', documentType: 'Memo', retentionYears: 2, actionAfterRetention: 'Review', description: 'Internal memos retained for 2 years before review for continued relevance.' },
];

export const monthlyStats: MonthlyStat[] = [
  { month: 'Jan', incoming: 12, outgoing: 8 },
  { month: 'Feb', incoming: 18, outgoing: 14 },
  { month: 'Mar', incoming: 22, outgoing: 19 },
  { month: 'Apr', incoming: 16, outgoing: 12 },
  { month: 'May', incoming: 25, outgoing: 21 },
  { month: 'Jun', incoming: 19, outgoing: 17 },
  { month: 'Jul', incoming: 28, outgoing: 24 },
  { month: 'Aug', incoming: 21, outgoing: 18 },
  { month: 'Sep', incoming: 30, outgoing: 26 },
  { month: 'Oct', incoming: 24, outgoing: 20 },
  { month: 'Nov', incoming: 15, outgoing: 11 },
  { month: 'Dec', incoming: 10, outgoing: 7 },
];

export const dummyAlerts: Alert[] = [
  { id: 'a1', type: 'critical', message: 'Document "Annual Financial Statements 2021" is due for archival review.', documentRef: 'MOF/2021/334', date: '2024-10-15' },
  { id: 'a2', type: 'warning', message: 'Document "General Correspondence - Policy Inquiry" retention period ends in 30 days.', documentRef: 'MOF/2022/412', date: '2024-10-20' },
  { id: 'a3', type: 'warning', message: 'Document "Inter-Ministerial Coordination Meeting Agenda" is due for review.', documentRef: 'MOF/2024/189', date: '2024-10-25' },
  { id: 'a4', type: 'info', message: 'New retention schedule policy effective November 2024.', documentRef: 'POLICY/2024/001', date: '2024-10-28' },
];
