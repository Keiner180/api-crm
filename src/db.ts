import fs from 'node:fs';
import path from 'node:path';
import {
  DatabaseSchema,
  Agent,
  Company,
  Debtor,
  Debt,
  FormattedDebt,
  DebtorWithDebts,
  PaginatedDebtorsResponse,
} from './types.js';
import { createDefaultSeed } from './seed.js';

export class JsonDatabase {
  private filePath: string;
  private data: DatabaseSchema;

  constructor(filePath?: string) {
    this.filePath =
      filePath ||
      process.env.DB_PATH ||
      path.resolve(process.cwd(), 'data', 'crm_db.json');
    this.data = this.loadOrCreate();
  }

  private loadOrCreate(): DatabaseSchema {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(this.filePath)) {
      const initialData = createDefaultSeed();
      fs.writeFileSync(this.filePath, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }

    try {
      const content = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(content) as DatabaseSchema;
    } catch {
      const fallback = createDefaultSeed();
      fs.writeFileSync(this.filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
  }

  public reload(): void {
    this.data = this.loadOrCreate();
  }

  public save(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempPath = `${this.filePath}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
    fs.renameSync(tempPath, this.filePath);
  }

  public getData(): DatabaseSchema {
    return this.data;
  }

  public getAgentByToken(token: string): Agent | undefined {
    return this.data.agents.find((a) => a.token === token);
  }

  public getCompanyById(companyId: string): Company | undefined {
    return this.data.companies.find((c) => c.id === companyId);
  }

  public getDebtorByDocumentId(documentId: string): Debtor | undefined {
    return this.data.debtors.find((d) => d.documentId === documentId);
  }

  public getDebtorById(id: string): Debtor | undefined {
    return this.data.debtors.find((d) => d.id === id);
  }

  public formatDebt(debt: Debt): FormattedDebt | null {
    const company = this.getCompanyById(debt.companyId);
    if (!company) return null;
    return {
      id: debt.id,
      invoice: debt.invoice,
      company: {
        id: company.id,
        name: company.name,
        nit: company.nit,
      },
      dueDate: debt.dueDate,
      balance: debt.balance,
      currency: debt.currency,
    };
  }

  public getDebtsForDebtorAndAgent(
    debtorId: string,
    agentId: string,
    companyId?: string
  ): FormattedDebt[] {
    const filteredDebts = this.data.debts.filter((d) => {
      if (d.debtorId !== debtorId) return false;
      if (d.agentId !== agentId) return false;
      if (companyId && d.companyId !== companyId) return false;
      return true;
    });

    return filteredDebts
      .map((d) => this.formatDebt(d))
      .filter((d): d is FormattedDebt => d !== null);
  }

  public getDebtorsForAgent(
    agentId: string,
    options: { companyId?: string; limit?: number; cursor?: string | null }
  ): { result: PaginatedDebtorsResponse; error?: { status: number; code: string; message: string } } {
    const limit = options.limit !== undefined ? options.limit : 25;
    const { companyId, cursor } = options;

    // Validate limit
    if (!Number.isInteger(limit) || limit < 1 || limit > 25) {
      return {
        result: { data: [], nextCursor: null, total: 0 },
        error: {
          status: 400,
          code: 'BAD_REQUEST',
          message: 'Limit must be an integer between 1 and 25.',
        },
      };
    }

    // Validate companyId if provided
    if (companyId) {
      const companyExists = this.getCompanyById(companyId);
      if (!companyExists) {
        return {
          result: { data: [], nextCursor: null, total: 0 },
          error: {
            status: 400,
            code: 'BAD_REQUEST',
            message: `Company not found with id: ${companyId}`,
          },
        };
      }
    }

    // Collect all debts for this agent (and optional companyId)
    const agentDebts = this.data.debts.filter((d) => {
      if (d.agentId !== agentId) return false;
      if (companyId && d.companyId !== companyId) return false;
      return true;
    });

    // Group debtorIds with matching debts
    const debtorIdSet = new Set<string>();
    for (const debt of agentDebts) {
      debtorIdSet.add(debt.debtorId);
    }

    // Retrieve debtor objects
    const matchedDebtors: Debtor[] = [];
    for (const dId of debtorIdSet) {
      const debtor = this.getDebtorById(dId);
      if (debtor) {
        matchedDebtors.push(debtor);
      }
    }

    // Stable sorting by debtor.id
    matchedDebtors.sort((a, b) => a.id.localeCompare(b.id));

    const total = matchedDebtors.length;

    let startIndex = 0;
    if (cursor) {
      const cursorIndex = matchedDebtors.findIndex((d) => d.id === cursor);
      if (cursorIndex === -1) {
        return {
          result: { data: [], nextCursor: null, total: 0 },
          error: {
            status: 400,
            code: 'BAD_REQUEST',
            message: 'Invalid cursor.',
          },
        };
      }
      startIndex = cursorIndex + 1;
    }

    const pageDebtors = matchedDebtors.slice(startIndex, startIndex + limit);

    const data: DebtorWithDebts[] = pageDebtors.map((debtor) => {
      const debtorDebts = this.getDebtsForDebtorAndAgent(debtor.id, agentId, companyId);
      return {
        debtor: {
          id: debtor.id,
          documentId: debtor.documentId,
          firstName: debtor.firstName,
          lastName: debtor.lastName,
        },
        debts: debtorDebts,
      };
    });

    const hasMore = startIndex + pageDebtors.length < matchedDebtors.length;
    const nextCursor =
      hasMore && pageDebtors.length > 0
        ? pageDebtors[pageDebtors.length - 1].id
        : null;

    return {
      result: {
        data,
        nextCursor,
        total,
      },
    };
  }
}
