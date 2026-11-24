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
    {
      id: 'ag_asesor_emiteos',
      firstName: 'Asesor',
      lastName: 'EmiteOS',
      email: 'asesor.emiteos@solarisbpo.com',
      token: 'agt_e1m2i3t4e5o6s7b8p9o0a1s2e3s4o5r6',
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
    {
      id: 'a20rfrdentjfxwtoqnk67088',
      documentId: '123456788',
      firstName: 'JUAN',
      lastName: 'CASTILLO HERRERA',
    },
    // Debtors from seedCommitmentsAndGroups (EmiteOS)
    { id: 'b20rfrdentjfxwtoqnk67101', documentId: '1018475821', firstName: 'ALFONSO', lastName: 'RAMÍREZ VEGA' },
    { id: 'b20rfrdentjfxwtoqnk67102', documentId: '1020485912', firstName: 'CLAUDIA PATRICIA', lastName: 'GÓMEZ' },
    { id: 'b20rfrdentjfxwtoqnk67103', documentId: '79482910', firstName: 'JAVIER EDUARDO', lastName: 'MONTOYA' },
    { id: 'b20rfrdentjfxwtoqnk67104', documentId: '52849102', firstName: 'MARTHA LUCÍA', lastName: 'SANTOS' },
    { id: 'b20rfrdentjfxwtoqnk67105', documentId: '1032481920', firstName: 'ANDRÉS FELIPE', lastName: 'CASTRO' },
    { id: 'b20rfrdentjfxwtoqnk67106', documentId: '1017482931', firstName: 'CAROLINA', lastName: 'MORALES RICO' },
    { id: 'b20rfrdentjfxwtoqnk67107', documentId: '80491823', firstName: 'HERNÁN DARÍO', lastName: 'HENAO' },
    { id: 'b20rfrdentjfxwtoqnk67108', documentId: '1022948192', firstName: 'DIANA MARCELA', lastName: 'OSORIO' },
    { id: 'b20rfrdentjfxwtoqnk67109', documentId: '71829301', firstName: 'RODRIGO ANTONIO', lastName: 'CORREA' },
    { id: 'b20rfrdentjfxwtoqnk67110', documentId: '1038492019', firstName: 'VALERIA', lastName: 'QUINTERO DUQUE' },
    { id: 'b20rfrdentjfxwtoqnk67111', documentId: '52918234', firstName: 'GLORIA INÉS', lastName: 'CÁRDENAS' },
    { id: 'b20rfrdentjfxwtoqnk67112', documentId: '1019283746', firstName: 'SEBASTIÁN', lastName: 'LONDOÑO TORO' },
    { id: 'b20rfrdentjfxwtoqnk67113', documentId: '1028374651', firstName: 'PAULA ANDREA', lastName: 'RESTREPO' },
    { id: 'b20rfrdentjfxwtoqnk67114', documentId: '79384729', firstName: 'MAURICIO ALBERTO', lastName: 'GIL' },
    { id: 'b20rfrdentjfxwtoqnk67115', documentId: '1037482910', firstName: 'YULIANA ANDREA', lastName: 'PARRA' },
    { id: 'b20rfrdentjfxwtoqnk67116', documentId: '1016273849', firstName: 'ESTEBAN CAMILO', lastName: 'ROLDÁN' },
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
    // Carlos's debt for debtor 123456788 (balance: 5000000)
    {
      id: 'a99mn288x43j4wnn5r5wgm88',
      invoice: '186001',
      debtorId: 'a20rfrdentjfxwtoqnk67088',
      companyId: 'd3r1iuat79db25b3bt0u3t05', // HIPER SALUD
      agentId: 'ag_carlos_mendoza',
      dueDate: '2025-07-20',
      balance: 5000000,
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

  // Debts from seedCommitmentsAndGroups (EmiteOS)
  debts.push(
    // Team A -> HIPER SALUD (9 commitments across 3 advisors)
    {
      id: 'd20rfrdentjfxwtoqnk67201',
      invoice: 'EXP-202611-01',
      debtorId: 'b20rfrdentjfxwtoqnk67101', // 1018475821
      companyId: 'd3r1iuat79db25b3bt0u3t05', // HIPER SALUD
      agentId: 'ag_asesor_emiteos',
      dueDate: '2025-11-12',
      balance: 3600000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67202',
      invoice: 'EXP-202611-02',
      debtorId: 'b20rfrdentjfxwtoqnk67102', // 1020485912
      companyId: 'd3r1iuat79db25b3bt0u3t05',
      agentId: 'ag_sofia_herrera',
      dueDate: '2025-11-08',
      balance: 2800000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67203',
      invoice: 'EXP-202611-03',
      debtorId: 'b20rfrdentjfxwtoqnk67103', // 79482910
      companyId: 'd3r1iuat79db25b3bt0u3t05',
      agentId: 'ag_diego_romero',
      dueDate: '2025-11-11',
      balance: 2400000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67204',
      invoice: 'EXP-202611-04',
      debtorId: 'b20rfrdentjfxwtoqnk67104', // 52849102
      companyId: 'd3r1iuat79db25b3bt0u3t05',
      agentId: 'ag_asesor_emiteos',
      dueDate: '2025-11-10',
      balance: 4200000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67205',
      invoice: 'EXP-202611-05',
      debtorId: 'b20rfrdentjfxwtoqnk67105', // 1032481920
      companyId: 'd3r1iuat79db25b3bt0u3t05',
      agentId: 'ag_sofia_herrera',
      dueDate: '2025-11-27',
      balance: 4000000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67206',
      invoice: 'EXP-202611-06',
      debtorId: 'b20rfrdentjfxwtoqnk67106', // 1017482931
      companyId: 'd3r1iuat79db25b3bt0u3t05',
      agentId: 'ag_diego_romero',
      dueDate: '2025-11-14',
      balance: 3100000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67207',
      invoice: 'EXP-202611-07',
      debtorId: 'b20rfrdentjfxwtoqnk67107', // 80491823
      companyId: 'd3r1iuat79db25b3bt0u3t05',
      agentId: 'ag_asesor_emiteos',
      dueDate: '2025-12-11',
      balance: 3900000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67208',
      invoice: 'EXP-202611-08',
      debtorId: 'b20rfrdentjfxwtoqnk67108', // 1022948192
      companyId: 'd3r1iuat79db25b3bt0u3t05',
      agentId: 'ag_sofia_herrera',
      dueDate: '2025-11-19',
      balance: 3300000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67209',
      invoice: 'EXP-202611-09',
      debtorId: 'b20rfrdentjfxwtoqnk67109', // 71829301
      companyId: 'd3r1iuat79db25b3bt0u3t05',
      agentId: 'ag_diego_romero',
      dueDate: '2025-12-10',
      balance: 2900000,
      currency: 'COP',
    },

    // Team B -> Flexo Control (9 commitments across 3 advisors)
    {
      id: 'd20rfrdentjfxwtoqnk67210',
      invoice: 'EXP-202611-10',
      debtorId: 'b20rfrdentjfxwtoqnk67110', // 1038492019
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt', // Flexo Control
      agentId: 'ag_carlos_mendoza',
      dueDate: '2025-11-08',
      balance: 4100000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67211',
      invoice: 'EXP-202611-11',
      debtorId: 'b20rfrdentjfxwtoqnk67111', // 52918234
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt',
      agentId: 'ag_laura_restrepo',
      dueDate: '2025-11-17',
      balance: 3500000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67212',
      invoice: 'EXP-202611-12',
      debtorId: 'b20rfrdentjfxwtoqnk67112', // 1019283746
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt',
      agentId: 'ag_marcos_giraldo',
      dueDate: '2025-11-15',
      balance: 2600000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67213',
      invoice: 'EXP-202611-13',
      debtorId: 'b20rfrdentjfxwtoqnk67113', // 1028374651
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt',
      agentId: 'ag_carlos_mendoza',
      dueDate: '2025-11-26',
      balance: 3800000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67214',
      invoice: 'EXP-202611-14',
      debtorId: 'b20rfrdentjfxwtoqnk67114', // 79384729
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt',
      agentId: 'ag_laura_restrepo',
      dueDate: '2025-11-16',
      balance: 3000000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67215',
      invoice: 'EXP-202611-15',
      debtorId: 'b20rfrdentjfxwtoqnk67115', // 1037482910
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt',
      agentId: 'ag_marcos_giraldo',
      dueDate: '2025-12-11',
      balance: 4400000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67216',
      invoice: 'EXP-202611-16',
      debtorId: 'b20rfrdentjfxwtoqnk67116', // 1016273849
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt',
      agentId: 'ag_carlos_mendoza',
      dueDate: '2025-11-19',
      balance: 3200000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67217',
      invoice: 'EXP-202611-17',
      debtorId: 'b20rfrdentjfxwtoqnk67102', // 1020485912
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt',
      agentId: 'ag_laura_restrepo',
      dueDate: '2025-12-03',
      balance: 2700000,
      currency: 'COP',
    },
    {
      id: 'd20rfrdentjfxwtoqnk67218',
      invoice: 'EXP-202611-18',
      debtorId: 'b20rfrdentjfxwtoqnk67101', // 1018475821
      companyId: 'ywipuj69fgbzn2dyfs0z5nxt',
      agentId: 'ag_marcos_giraldo',
      dueDate: '2025-11-23',
      balance: 3700000,
      currency: 'COP',
    }
  );

  return {
    companies,
    agents,
    debtors: debtorsList,
    debts,
  };
}
