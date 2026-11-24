import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import fs from 'node:fs';
import path from 'node:path';
import { createApp } from '../src/app.js';
import { JsonDatabase } from '../src/db.js';

const TEST_DB_PATH = path.resolve(process.cwd(), 'data', 'test_crm_db.json');

const CARLOS_TOKEN = 'agt_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const LAURA_TOKEN = 'agt_q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6';
const HIPER_SALUD_ID = 'd3r1iuat79db25b3bt0u3t05';
const FLEXO_CONTROL_ID = 'ywipuj69fgbzn2dyfs0z5nxt';

describe('CRM Demo API', () => {
  let app: ReturnType<typeof createApp>;
  let db: JsonDatabase;

  beforeEach(() => {
    if (fs.existsSync(TEST_DB_PATH)) {
      fs.unlinkSync(TEST_DB_PATH);
    }
    db = new JsonDatabase(TEST_DB_PATH);
    app = createApp(db);
  });

  afterEach(() => {
    if (fs.existsSync(TEST_DB_PATH)) {
      fs.unlinkSync(TEST_DB_PATH);
    }
  });

  describe('GET /api/health', () => {
    it('returns status ok without authentication', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    });

    it('rejects POST method with 405 METHOD_NOT_ALLOWED', async () => {
      const res = await request(app).post('/api/health').send({});
      expect(res.status).toBe(405);
      expect(res.body).toEqual({
        error: {
          code: 'METHOD_NOT_ALLOWED',
          message: 'Method not allowed. This API is read-only; only GET requests are supported.',
        },
      });
    });
  });

  describe('Authentication', () => {
    it('returns 401 UNAUTHORIZED when no token is provided', async () => {
      const res = await request(app).get('/api/v1/debtors');
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('returns 401 UNAUTHORIZED when token format is invalid (missing Bearer)', async () => {
      const res = await request(app)
        .get('/api/v1/debtors')
        .set('Authorization', CARLOS_TOKEN);
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('returns 401 UNAUTHORIZED when token is unknown', async () => {
      const res = await request(app)
        .get('/api/v1/debtors')
        .set('Authorization', 'Bearer agt_unknown_token_123456');
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('GET /api/v1/debtors/byDocumentId/:documentId', () => {
    it('returns debtor and debts for valid document in agent portfolio', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/byDocumentId/1000654321')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('debtor');
      expect(res.body.debtor).toEqual({
        id: 'a13rfrdentjfxwtoqnk67ahz',
        documentId: '1000654321',
        firstName: 'DAVID',
        lastName: 'CASTRO CÓRDOBA',
      });
      expect(res.body).toHaveProperty('debts');
      expect(res.body.debts.length).toBeGreaterThan(0);

      const hipperDebt = res.body.debts.find((d: any) => d.id === 'a48mn288x43j4wnn5r5wgmcz');
      expect(hipperDebt).toBeDefined();
      expect(hipperDebt).toEqual({
        id: 'a48mn288x43j4wnn5r5wgmcz',
        invoice: '185129',
        company: {
          id: HIPER_SALUD_ID,
          name: 'HIPER SALUD',
          nit: '830.114.921-3',
        },
        dueDate: '2025-04-27',
        balance: 269000,
        currency: 'COP',
      });
    });

    it('returns debtor and debts for debtor 1000654324 in Carlos portfolio', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/byDocumentId/1000654324')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body.debtor.documentId).toBe('1000654324');
      expect(res.body.debtor.firstName).toBe('CARLOS');
      expect(res.body.debts.length).toBeGreaterThan(0);
      expect(res.body.debts[0].invoice).toBe('185999');
    });

    it('returns debtor and debts for debtor 123456788 with 5000000 balance in Carlos portfolio', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/byDocumentId/123456788')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body.debtor.documentId).toBe('123456788');
      expect(res.body.debts.length).toBeGreaterThan(0);
      expect(res.body.debts[0].balance).toBe(5000000);
    });

    it('returns debtor and debts for EmiteOS debtor 1038492019 in Carlos portfolio', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/byDocumentId/1038492019')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body.debtor.documentId).toBe('1038492019');
      expect(res.body.debtor.firstName).toBe('VALERIA');
      expect(res.body.debts.length).toBeGreaterThan(0);
      expect(res.body.debts[0].balance).toBe(4100000);
    });

    it('returns 404 NOT_FOUND if document contains letters', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/byDocumentId/abc')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('returns 404 NOT_FOUND if debtor does not exist', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/byDocumentId/999999999999')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('returns 403 FORBIDDEN if debtor exists but has no debts in agent portfolio', async () => {
      // Beatriz Pinzon (9000999888) is assigned only to Laura
      const res = await request(app)
        .get('/api/v1/debtors/byDocumentId/9000999888')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(403);
      expect(res.body.error.code).toBe('FORBIDDEN');
    });

    it('returns 200 for Beatriz Pinzon when queried with Laura token', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/byDocumentId/9000999888')
        .set('Authorization', `Bearer ${LAURA_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body.debtor.firstName).toBe('BEATRIZ');
    });
  });

  describe('GET /api/v1/debtors/:id', () => {
    it('returns debtor and debts by internal cuid2 id', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/a13rfrdentjfxwtoqnk67ahz')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body.debtor.id).toBe('a13rfrdentjfxwtoqnk67ahz');
    });

    it('returns 404 with helpful message when numeric ID is sent instead of cuid2', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/1000654321')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
      expect(res.body.error.message).toContain('byDocumentId');
    });

    it('returns 404 if internal ID does not exist', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/cuid_non_existent_12345')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('returns 403 FORBIDDEN if debtor exists but belongs to another agent', async () => {
      const res = await request(app)
        .get('/api/v1/debtors/b13rfrdentjfxwtoqnk67099') // Beatriz Pinzon
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(403);
      expect(res.body.error.code).toBe('FORBIDDEN');
    });
  });

  describe('GET /api/v1/debtors (List and Pagination)', () => {
    it('returns total 22 for Carlos Mendoza portfolio', async () => {
      const res = await request(app)
        .get('/api/v1/debtors')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body.total).toBe(22);
      expect(res.body.data.length).toBe(22);
      expect(res.body.nextCursor).toBeNull();
    });

    it('paginates correctly when limit is provided', async () => {
      const page1 = await request(app)
        .get('/api/v1/debtors?limit=5')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(page1.status).toBe(200);
      expect(page1.body.total).toBe(22);
      expect(page1.body.data.length).toBe(5);
      expect(page1.body.nextCursor).not.toBeNull();

      const cursor1 = page1.body.nextCursor;

      const page2 = await request(app)
        .get(`/api/v1/debtors?limit=5&cursor=${cursor1}`)
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(page2.status).toBe(200);
      expect(page2.body.data.length).toBe(5);
      expect(page2.body.nextCursor).not.toBeNull();
      // Ensure records are distinct
      const idsPage1 = page1.body.data.map((d: any) => d.debtor.id);
      const idsPage2 = page2.body.data.map((d: any) => d.debtor.id);
      for (const id of idsPage2) {
        expect(idsPage1).not.toContain(id);
      }
    });

    it('returns 400 BAD_REQUEST for invalid limit (< 1 or > 25)', async () => {
      const res0 = await request(app)
        .get('/api/v1/debtors?limit=0')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);
      expect(res0.status).toBe(400);
      expect(res0.body.error.code).toBe('BAD_REQUEST');

      const res26 = await request(app)
        .get('/api/v1/debtors?limit=26')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);
      expect(res26.status).toBe(400);
      expect(res26.body.error.code).toBe('BAD_REQUEST');
    });

    it('returns 400 BAD_REQUEST for invalid/unknown cursor', async () => {
      const res = await request(app)
        .get('/api/v1/debtors?cursor=invented_cursor_xyz')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('BAD_REQUEST');
      expect(res.body.error.message).toContain('cursor');
    });

    it('filters portfolio by companyId correctly', async () => {
      const resHiper = await request(app)
        .get(`/api/v1/debtors?companyId=${HIPER_SALUD_ID}`)
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(resHiper.status).toBe(200);
      expect(resHiper.body.data.length).toBeGreaterThan(0);
      // All debts inside must belong to HIPER SALUD
      for (const item of resHiper.body.data) {
        for (const debt of item.debts) {
          expect(debt.company.id).toBe(HIPER_SALUD_ID);
        }
      }
    });

    it('returns 400 BAD_REQUEST if companyId does not exist', async () => {
      const res = await request(app)
        .get('/api/v1/debtors?companyId=zzzzzzzzzzzzzzzzzzzzzzzz')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('BAD_REQUEST');
      expect(res.body.error.message).toContain('Company not found');
    });
  });

  describe('Model fields and edge cases', () => {
    it('handles debtor with null lastName correctly', async () => {
      // Debtor with documentId '1000333444' has lastName: null
      const res = await request(app)
        .get('/api/v1/debtors/byDocumentId/1000333444')
        .set('Authorization', `Bearer ${CARLOS_TOKEN}`);

      expect(res.status).toBe(200);
      expect(res.body.debtor.lastName).toBeNull();
    });
  });
});
