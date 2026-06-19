export type DocumentType = 'Letter' | 'Report' | 'File' | 'Memo' | 'Circular';
export type DocumentStatus = 'Active' | 'Archived' | 'In Transit' | 'Pending';

export interface RegistryDocument {
  id: string;
  referenceNumber: string;
  title: string;
  documentType: DocumentType;
  originatingDepartment: string;
  dateLogged: string;
  status: DocumentStatus;
  retentionYears: number;
  description?: string;
}

export interface MovementEntry {
  id: string;
  documentId: string;
  documentRef: string;
  documentTitle: string;
  issuedTo: string;
  department: string;
  dateIssued: string;
  purpose: string;
  returnedDate?: string;
  status: 'Out' | 'Returned';
  timeline: TimelineNode[];
}

export interface TimelineNode {
  id: string;
  timestamp: string;
  location: string;
  action: string;
  officer: string;
}

export interface RetentionRule {
  id: string;
  category: string;
  documentType: DocumentType;
  retentionYears: number;
  actionAfterRetention: 'Archive' | 'Destroy' | 'Review';
  description: string;
}

export interface MonthlyStat {
  month: string;
  incoming: number;
  outgoing: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  message: string;
  documentRef: string;
  date: string;
}
