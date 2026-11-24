import { init } from '@paralleldrive/cuid2';
import { DatabaseSchema, Company, Agent, Debtor, Debt } from './types.js';

const createCuid = init({ length: 24 });

export function createDefaultSeed(): DatabaseSchema {
  const companies: Company[] = [
    {
      id: 'd3r1iuat79db25b3bt0u3t05',
      name: 'HIPER SALUD',
      nit: '830.114.921-3',
    },
    {
      id: 'ywipuj69fgbzn2dyfs0z5nxt',
      name: 'Flexo Control',
      nit: '901.458.302-6',
    },
  ];

  const agents: Agent[] = [
    {
      id: 'ag_carlos_mendoza',
      firstName: 'Carlos',
      lastName: 'Mendoza',
      email: 'carlos.mendoza@crm-demo.io',
      token: 'agt_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    },
    {
      id: 'ag_laura_restrepo',
      firstName: 'Laura',
      lastName: 'Restrepo',
      email: 'laura.restrepo@crm-demo.io',
      token: 'agt_q1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6',
    },
    {
      id: 'ag_marcos_giraldo',
      firstName: 'Marcos',
      lastName: 'Giraldo',
      email: 'marcos.giraldo@crm-demo.io',
      token: 'agt_m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6',
    },
    {
      id: 'ag_sofia_herrera',
      firstName: 'Sofia',
      lastName: 'Herrera',
      email: 'sofia.herrera@crm-demo.io',
      token: 'agt_c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6',
    },
    {
      id: 'ag_diego_romero',
      firstName: 'Diego',
      lastName: 'Romero',
      email: 'diego.romero@crm-demo.io',
      token: 'agt_s1t2u3v4w5x6y7z8a9b0c1d2e3f4g5h6',
    },
  ];

  // Specific debtor from guide documentation
  const davidCastro: Debtor = {
    id: 'a13rfrdentjfxwtoqnk67ahz',
    documentId: '1000654321',
    firstName: 'DAVID',
    lastName: 'CASTRO CÓRDOBA',
  };

  // Additional debtors to make 17 debtors in Carlos's portfolio, matching the guide's `"total": 17`
  const debtorsList: Debtor[] = [
    davidCastro,
    {
      id: 'a20rfrdentjfxwtoqnk67001',
      documentId: '1000111222',
      firstName: 'ANDREA',
      lastName: 'GOMEZ PEREZ',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67002',
      documentId: '1000222333',
      firstName: 'JULIAN',
      lastName: 'MARTINEZ ROJAS',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67003',
      documentId: '1000333444',
      firstName: 'CAMILA',
      lastName: null, // Test case where lastName is null
    },
    {
      id: 'a20rfrdentjfxwtoqnk67004',
      documentId: '1000444555',
      firstName: 'FELIPE',
      lastName: 'OSPINA SILVA',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67005',
      documentId: '1000555666',
      firstName: 'PAULA',
      lastName: 'MORALES DUQUE',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67006',
      documentId: '1000666777',
      firstName: 'ALEJANDRO',
      lastName: 'VELEZ TORRES',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67007',
      documentId: '1000777888',
      firstName: 'VALENTINA',
      lastName: 'CARDONA RUIZ',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67008',
      documentId: '1000888999',
      firstName: 'MATEO',
      lastName: null, // Test case where lastName is null
    },
    {
      id: 'a20rfrdentjfxwtoqnk67009',
      documentId: '1000999000',
      firstName: 'DANIELA',
      lastName: 'SUAREZ BOTERO',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67010',
      documentId: '1001111222',
      firstName: 'SANTIAGO',
      lastName: 'GARCIA QUINTERO',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67011',
      documentId: '1001222333',
      firstName: 'MARIANA',
      lastName: 'JARAMILLO ORTIZ',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67012',
      documentId: '1001333444',
      firstName: 'JUAN PABLO',
      lastName: 'RAMIREZ BEDOYA',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67013',
      documentId: '1001444555',
      firstName: 'LILIANA',
      lastName: 'MONTOYA RIOS',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67014',
      documentId: '1001555666',
      firstName: 'GABRIEL',
      lastName: 'HERNANDEZ CANO',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67015',
      documentId: '1001666777',
      firstName: 'NATALIA',
      lastName: 'ZAPATA CARVAJAL',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67016',
      documentId: '1001777888',
      firstName: 'ESTEBAN',
      lastName: 'GUZMAN FLOREZ',
    },
    {
      id: 'a20rfrdentjfxwtoqnk67024',
      documentId: '1000654324',
      firstName: 'CARLOS',
      lastName: 'RODRÍGUEZ PEÑA',
    },
    // Debtor assigned ONLY to Laura (used to verify 403 Forbidden for Carlos)
    {
      id: 'b13rfrdentjfxwtoqnk67099',
      documentId: '9000999888',
      firstName: 'BEATRIZ',
      lastName: 'PINZON SOLANO',
    },
  ];

  const debts: Debt[] = [
    // Carlos's debt for David Castro (from guide example)
    {
      id: 'a48mn288x43j4wnn5r5wgmcz',
      invoice: '185129',
      debtorId: 'a13rfrdentjfxwtoqnk67ahz',
      companyId: 'd3r1iuat79db25b3bt0u3t05', // HIPER SALUD
      agentId: 'ag_carlos_mendoza',
      dueDate: '2025-04-27',
      balance: 269000,
      currency: 'COP',
    },
    // Carlos's debt for debtor 1000654324
    {
      id: 'a99mn288x43j4wnn5r5wgm24',
      invoice: '185999',
      debtorId: 'a20rfrdentjfxwtoqnk67024',
      companyId: 'd3r1iuat79db25b3bt0u3t05', // HIPER SALUD
      agentId: 'ag_carlos_mendoza',
      dueDate: '2025-06-15',
      balance: 345000,
      currency: 'COP',
    },
    // Second debt for David Castro assigned to Laura (to demonstrate shared debtor with distinct debts)
    {
      id: 'b99mn288x43j4wnn5r5wgmcz',
      invoice: '190450',
      debtorId: 'a13rfrdentjfxwtoqnk67ahz',
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt', // Flexo Control
      agentId: 'ag_laura_restrepo',
      dueDate: '2025-05-15',
      balance: 450000,
      currency: 'COP',
    },
  ];

  // Distribute debts for the other 16 debtors for Carlos:
  // Some with HIPER SALUD, some with Flexo Control, some with both
  for (let i = 1; i <= 16; i++) {
    const debtor = debtorsList[i];
    const isHiperSalud = i % 2 === 1;
    const isFlexoControl = i % 2 === 0 || i === 3 || i === 7;

    if (isHiperSalud) {
      debts.push({
        id: createCuid(),
        invoice: `${185200 + i}`,
        debtorId: debtor.id,
        companyId: 'd3r1iuat79db25b3bt0u3t05', // HIPER SALUD
        agentId: 'ag_carlos_mendoza',
        dueDate: `2025-0${(i % 8) + 1}-15`,
        balance: 150000 + i * 12500,
        currency: 'COP',
      });
    }

    if (isFlexoControl) {
      debts.push({
        id: createCuid(),
        invoice: `${240100 + i}`,
        debtorId: debtor.id,
        companyId: 'ywipuj69fgbzn2dyfs0z5nxt', // Flexo Control
        agentId: 'ag_carlos_mendoza',
        dueDate: `2025-0${(i % 9) + 1}-20`,
        balance: 320000 + i * 15000,
        currency: 'COP',
      });
    }
  }

  // Debt assigned ONLY to Laura for Beatriz Pinzon
  debts.push({
    id: 'c88mn288x43j4wnn5r5wgmcz',
    invoice: '998811',
    debtorId: 'b13rfrdentjfxwtoqnk67099',
    companyId: 'd3r1iuat79db25b3bt0u3t05',
    agentId: 'ag_laura_restrepo',
    dueDate: '2025-06-30',
    balance: 890000,
    currency: 'COP',
  });

  // Assign some debts to Marcos, Sofia, Diego as well
  debts.push({
    id: createCuid(),
    invoice: '556677',
    debtorId: davidCastro.id,
    companyId: 'd3r1iuat79db25b3bt0u3t05',
    agentId: 'ag_marcos_giraldo',
    dueDate: '2025-07-10',
    balance: 120000,
    currency: 'COP',
  });

  return {
    companies,
    agents,
    debtors: debtorsList,
    debts,
  };
}
