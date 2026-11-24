export interface Company {
  id: string; // cuid2
  name: string;
  nit: string;
}

export interface Debtor {
  id: string; // cuid2
  documentId: string;
  firstName: string;
  lastName: string | null;
}

export interface Agent {
  id: string; // cuid2
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface Debt {
  id: string; // cuid2
  invoice: string;
  debtorId: string; // cuid2
  companyId: string; // cuid2
  agentId: string; // cuid2
  dueDate: string; // YYYY-MM-DD
  balance: number; // integer
  currency: string; // "COP"
}

export interface DatabaseSchema {
  companies: Company[];
  agents: Agent[];
  debtors: Debtor[];
  debts: Debt[];
}

export interface FormattedDebt {
  id: string;
  invoice: string;
  company: {
    id: string;
    name: string;
    nit: string;
  };
  dueDate: string;
  balance: number;
  currency: string;
}

export interface DebtorWithDebts {
  debtor: Debtor;
  debts: FormattedDebt[];
}

export interface PaginatedDebtorsResponse {
  data: DebtorWithDebts[];
  nextCursor: string | null;
  total: number;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
