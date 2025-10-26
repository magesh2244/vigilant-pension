// Mock data for the pension management system

export interface Pensioner {
  id: string;
  aadhaarNumber: string;
  name: string;
  rank: string;
  serviceNumber: string;
  dateOfBirth: string;
  dateOfRetirement: string;
  pensionAmount: number;
  status: 'active' | 'deceased' | 'suspended' | 'transferred';
  lastLifeCertificateDate: string | null;
  nextLifeCertificateDue: string | null;
}

export interface Dependent {
  id: string;
  pensionerId: string;
  name: string;
  relationship: 'spouse' | 'daughter' | 'son';
  aadhaarNumber: string;
  dateOfBirth: string;
  maritalStatus: 'married' | 'unmarried' | 'widowed';
  priority: number;
}

export interface LifeCertificate {
  id: string;
  pensionerId: string;
  submissionDate: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy: string | null;
  verificationDate: string | null;
  certificateUrl: string;
  remarks: string;
}

export interface Transaction {
  id: string;
  pensionerId: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  description: string;
  referenceNumber: string;
}

export interface DeathRecord {
  id: string;
  aadhaarNumber: string;
  name: string;
  dateOfDeath: string;
  certificateNumber: string;
  registeredDate: string;
}

export interface MarriageRecord {
  id: string;
  aadhaarNumber: string;
  name: string;
  dateOfMarriage: string;
  certificateNumber: string;
  registeredDate: string;
}

export interface Complaint {
  id: string;
  pensionerId: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdDate: string;
  resolvedDate: string | null;
  adminResponse: string | null;
}

// Mock Pensioners
export const mockPensioners: Pensioner[] = [
  {
    id: '1',
    aadhaarNumber: '1234-5678-9012',
    name: 'Col. Rajesh Kumar',
    rank: 'Colonel',
    serviceNumber: 'IC-45678',
    dateOfBirth: '1960-03-15',
    dateOfRetirement: '2020-03-31',
    pensionAmount: 85000,
    status: 'active',
    lastLifeCertificateDate: '2024-09-15',
    nextLifeCertificateDue: '2024-12-15',
  },
  {
    id: '2',
    aadhaarNumber: '2345-6789-0123',
    name: 'Maj. Vikram Singh',
    rank: 'Major',
    serviceNumber: 'IC-56789',
    dateOfBirth: '1965-07-20',
    dateOfRetirement: '2023-07-31',
    pensionAmount: 72000,
    status: 'deceased',
    lastLifeCertificateDate: '2024-03-10',
    nextLifeCertificateDue: null,
  },
  {
    id: '3',
    aadhaarNumber: '3456-7890-1234',
    name: 'Lt. Col. Amit Sharma',
    rank: 'Lieutenant Colonel',
    serviceNumber: 'IC-67890',
    dateOfBirth: '1962-11-05',
    dateOfRetirement: '2022-11-30',
    pensionAmount: 78000,
    status: 'active',
    lastLifeCertificateDate: '2024-10-01',
    nextLifeCertificateDue: '2025-01-01',
  },
  {
    id: '4',
    aadhaarNumber: '4567-8901-2345',
    name: 'Brig. Suresh Reddy',
    rank: 'Brigadier',
    serviceNumber: 'IC-78901',
    dateOfBirth: '1958-05-12',
    dateOfRetirement: '2018-05-31',
    pensionAmount: 95000,
    status: 'active',
    lastLifeCertificateDate: '2024-08-20',
    nextLifeCertificateDue: '2024-11-20',
  },
];

// Mock Dependents
export const mockDependents: Dependent[] = [
  {
    id: 'd1',
    pensionerId: '2',
    name: 'Smt. Priya Singh',
    relationship: 'spouse',
    aadhaarNumber: '2345-6789-0124',
    dateOfBirth: '1967-03-15',
    maritalStatus: 'widowed',
    priority: 1,
  },
  {
    id: 'd2',
    pensionerId: '2',
    name: 'Anjali Singh',
    relationship: 'daughter',
    aadhaarNumber: '2345-6789-0125',
    dateOfBirth: '1995-08-22',
    maritalStatus: 'unmarried',
    priority: 2,
  },
  {
    id: 'd3',
    pensionerId: '1',
    name: 'Smt. Meera Kumar',
    relationship: 'spouse',
    aadhaarNumber: '1234-5678-9013',
    dateOfBirth: '1963-06-10',
    maritalStatus: 'married',
    priority: 1,
  },
];

// Mock Life Certificates
export const mockLifeCertificates: LifeCertificate[] = [
  {
    id: 'lc1',
    pensionerId: '1',
    submissionDate: '2024-09-15',
    verificationStatus: 'verified',
    verifiedBy: 'admin1',
    verificationDate: '2024-09-16',
    certificateUrl: '/certificates/lc1.pdf',
    remarks: 'Verified successfully',
  },
  {
    id: 'lc2',
    pensionerId: '3',
    submissionDate: '2024-10-20',
    verificationStatus: 'pending',
    verifiedBy: null,
    verificationDate: null,
    certificateUrl: '/certificates/lc2.pdf',
    remarks: '',
  },
  {
    id: 'lc3',
    pensionerId: '4',
    submissionDate: '2024-10-22',
    verificationStatus: 'pending',
    verifiedBy: null,
    verificationDate: null,
    certificateUrl: '/certificates/lc3.pdf',
    remarks: '',
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    pensionerId: '1',
    date: '2024-10-01',
    amount: 85000,
    type: 'credit',
    status: 'completed',
    description: 'Monthly Pension - October 2024',
    referenceNumber: 'TXN20241001001',
  },
  {
    id: 't2',
    pensionerId: '1',
    date: '2024-09-01',
    amount: 85000,
    type: 'credit',
    status: 'completed',
    description: 'Monthly Pension - September 2024',
    referenceNumber: 'TXN20240901001',
  },
  {
    id: 't3',
    pensionerId: '3',
    date: '2024-10-01',
    amount: 78000,
    type: 'credit',
    status: 'completed',
    description: 'Monthly Pension - October 2024',
    referenceNumber: 'TXN20241001002',
  },
  {
    id: 't4',
    pensionerId: '2',
    date: '2024-09-01',
    amount: 72000,
    type: 'credit',
    status: 'completed',
    description: 'Monthly Pension - September 2024',
    referenceNumber: 'TXN20240901002',
  },
];

// Mock Death Records
export const mockDeathRecords: DeathRecord[] = [
  {
    id: 'dr1',
    aadhaarNumber: '2345-6789-0123',
    name: 'Maj. Vikram Singh',
    dateOfDeath: '2024-09-28',
    certificateNumber: 'DC-2024-09-1234',
    registeredDate: '2024-09-30',
  },
];

// Mock Marriage Records
export const mockMarriageRecords: MarriageRecord[] = [
  {
    id: 'mr1',
    aadhaarNumber: '1234-5678-9014',
    name: 'Priya Kumar',
    dateOfMarriage: '2023-12-15',
    certificateNumber: 'MC-2023-12-5678',
    registeredDate: '2023-12-20',
  },
];

// Mock Complaints
export const mockComplaints: Complaint[] = [
  {
    id: 'c1',
    pensionerId: '1',
    subject: 'Delayed pension credit',
    description: 'My pension for September was credited late. Please investigate.',
    status: 'resolved',
    createdDate: '2024-09-05',
    resolvedDate: '2024-09-08',
    adminResponse: 'Your concern has been addressed. There was a technical delay which has been resolved.',
  },
  {
    id: 'c2',
    pensionerId: '3',
    subject: 'Life certificate verification pending',
    description: 'I submitted my life certificate on 20th Oct but it is still pending verification.',
    status: 'in-progress',
    createdDate: '2024-10-23',
    resolvedDate: null,
    adminResponse: 'Your life certificate is under review and will be verified within 48 hours.',
  },
];

// Mock Admin
export const mockAdmin = {
  id: 'admin1',
  username: 'admin',
  password: 'admin123',
  name: 'System Administrator',
  role: 'admin',
};
