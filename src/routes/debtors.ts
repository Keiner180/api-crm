import { Router, Request, Response } from 'express';
import { JsonDatabase } from '../db.js';

export function createDebtorsRouter(db: JsonDatabase): Router {
  const router = Router();

  // 1. Search by documentId
  router.get('/debtors/byDocumentId/:documentId', (req: Request, res: Response) => {
    const documentId = String(req.params.documentId);
    const agent = req.agent!;

    // Route only accepts numeric document IDs. If letters/symbols are provided, respond 404 (Route not found)
    if (!/^\d+$/.test(documentId)) {
      res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Route not found. Document ID must be numeric.',
        },
      });
      return;
    }

    const debtor = db.getDebtorByDocumentId(documentId);
    if (!debtor) {
      res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: `Debtor with document ID ${documentId} not found.`,
        },
      });
      return;
    }

    const debts = db.getDebtsForDebtorAndAgent(debtor.id, agent.id);
    if (debts.length === 0) {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Debtor exists, but has no debts assigned to your portfolio.',
        },
      });
      return;
    }

    res.status(200).json({
      debtor: {
        id: debtor.id,
        documentId: debtor.documentId,
        firstName: debtor.firstName,
        lastName: debtor.lastName,
      },
      debts,
    });
  });

  // 2. List portfolio (with cursor pagination and optional companyId)
  router.get('/debtors', (req: Request, res: Response) => {
    const agent = req.agent!;
    const { limit: rawLimit, cursor, companyId } = req.query;

    let parsedLimit = 25;
    if (rawLimit !== undefined) {
      const num = Number(rawLimit);
      if (!Number.isInteger(num) || num < 1 || num > 25) {
        res.status(400).json({
          error: {
            code: 'BAD_REQUEST',
            message: 'Invalid limit. Must be an integer between 1 and 25.',
          },
        });
        return;
      }
      parsedLimit = num;
    }

    const { result, error } = db.getDebtorsForAgent(agent.id, {
      companyId: typeof companyId === 'string' ? companyId : undefined,
      limit: parsedLimit,
      cursor: typeof cursor === 'string' ? cursor : null,
    });

    if (error) {
      res.status(error.status).json({
        error: {
          code: error.code,
          message: error.message,
        },
      });
      return;
    }

    res.status(200).json(result);
  });

  // 3. Search by internal id (cuid2)
  router.get('/debtors/:id', (req: Request, res: Response) => {
    const id = String(req.params.id);
    const agent = req.agent!;

    // If numeric string is passed, remind the user to use byDocumentId
    if (/^\d+$/.test(id)) {
      res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message:
            'Debtor not found. This route expects an internal ID (cuid2), not a document ID. Use /api/v1/debtors/byDocumentId/{documentId} instead.',
        },
      });
      return;
    }

    const debtor = db.getDebtorById(id);
    if (!debtor) {
      res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: `Debtor with ID ${id} not found.`,
        },
      });
      return;
    }

    const debts = db.getDebtsForDebtorAndAgent(debtor.id, agent.id);
    if (debts.length === 0) {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Debtor exists, but has no debts assigned to your portfolio.',
        },
      });
      return;
    }

    res.status(200).json({
      debtor: {
        id: debtor.id,
        documentId: debtor.documentId,
        firstName: debtor.firstName,
        lastName: debtor.lastName,
      },
      debts,
    });
  });

  return router;
}
