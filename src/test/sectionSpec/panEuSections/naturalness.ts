// @ts-nocheck

const dataColsAValidator = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.total_forest_and_other_wooded_land_2025['undisturbed_by_man'],
                   [table_4_3a.forest_2025['undisturbed_by_man'],table_4_3a.other_wooded_land_2025['undisturbed_by_man']])`,
        ],
      },
    },
  },
  {
    idx: 1,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.total_forest_and_other_wooded_land_2025['semi_natural'],
                   [table_4_3a.forest_2025['semi_natural'],table_4_3a.other_wooded_land_2025['semi_natural']])`,
        ],
      },
    },
  },
  {
    idx: 2,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.total_forest_and_other_wooded_land_2025['plantations'],
                   [table_4_3a.forest_2025['plantations'],table_4_3a.other_wooded_land_2025['plantations']])`,
        ],
      },
    },
  },
]
const dataColsA = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'forestCharacteristics',
          variableName: 'primaryForest',
          colName: '2020',
        },
      },
    },
  },
  { idx: 1, type: 'decimal' },
  {
    idx: 2,
    type: 'decimal',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'forestCharacteristics',
          variableName: 'plantationForestArea',
          colName: '2020',
        },
      },
    },
  },
]

const updatedDataColsValidation = (year: string) =>
  dataColsAValidator.map((col) => {
    if (col.migration && col.migration.validateFns && col.migration.validateFns['2025']) {
      const validateFns = {
        ...col.migration.validateFns,
        '2025': col.migration.validateFns['2025'].map((fn: string) => fn.replace(/2025/g, year)),
      }

      return {
        ...col,
        migration: {
          ...col.migration,
          validateFns,
        },
      }
    }
    return col
  })

const linkedDataColsA = (colName: string) =>
  dataColsA.map((col) => {
    if ('migration' in col) {
      return {
        ...col,
        migration: {
          ...col.migration,
          linkedNodes: Object.fromEntries(
            Object.entries(col.migration.linkedNodes).map(([key, node]) => [key, { ...node, colName }])
          ),
        },
      }
    }
    return col
  })

const dataColsB = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.forest_2025['semi_natural'],
                  [table_4_3b.forest_2025['naturally_established'],
                   table_4_3b.forest_2025['naturalised_introduced_species'],
                   table_4_3b.forest_2025['established_by_planting_and_or_seeding'],
                   table_4_3b.forest_2025['coppice'],
                   table_4_3b.forest_2025['unknown_origin']], "panEuropean.forestArea.forest", "panEuropean.naturalness.semi_natural", "4.3a")`,
        ],
      },
    },
  },
  {
    idx: 1,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.forest_2025['semi_natural'],
                  [table_4_3b.forest_2025['naturally_established'],
                   table_4_3b.forest_2025['naturalised_introduced_species'],
                   table_4_3b.forest_2025['established_by_planting_and_or_seeding'],
                   table_4_3b.forest_2025['coppice'],
                   table_4_3b.forest_2025['unknown_origin']], "panEuropean.forestArea.forest", "panEuropean.naturalness.semi_natural", "4.3a")`,
        ],
      },
    },
  },
  {
    idx: 2,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.forest_2025['semi_natural'],
                  [table_4_3b.forest_2025['naturally_established'],
                   table_4_3b.forest_2025['naturalised_introduced_species'],
                   table_4_3b.forest_2025['established_by_planting_and_or_seeding'],
                   table_4_3b.forest_2025['coppice'],
                   table_4_3b.forest_2025['unknown_origin']], "panEuropean.forestArea.forest", "panEuropean.naturalness.semi_natural", "4.3a")`,
        ],
      },
    },
  },
  {
    idx: 3,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.forest_2025['semi_natural'],
                  [table_4_3b.forest_2025['naturally_established'],
                   table_4_3b.forest_2025['naturalised_introduced_species'],
                   table_4_3b.forest_2025['established_by_planting_and_or_seeding'],
                   table_4_3b.forest_2025['coppice'],
                   table_4_3b.forest_2025['unknown_origin']], "panEuropean.forestArea.forest", "panEuropean.naturalness.semi_natural", "4.3a")`,
        ],
      },
    },
  },
  {
    idx: 4,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.forest_2025['semi_natural'],
                  [table_4_3b.forest_2025['naturally_established'],
                   table_4_3b.forest_2025['naturalised_introduced_species'],
                   table_4_3b.forest_2025['established_by_planting_and_or_seeding'],
                   table_4_3b.forest_2025['coppice'],
                   table_4_3b.forest_2025['unknown_origin']], "panEuropean.forestArea.forest", "panEuropean.naturalness.semi_natural", "4.3a")`,
        ],
      },
    },
  },
  {
    idx: 5,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.forest_2025['plantations'],
              [table_4_3b.forest_2025['native_species'],
               table_4_3b.forest_2025['introduced_species']], "panEuropean.forestArea.forest", "panEuropean.naturalness.plantations", "4.3a")`,
        ],
      },
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'forestCharacteristics',
          variableName: 'plantationForestArea',
          colName: '2020',
        },
      },
    },
  },
  {
    idx: 6,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_4_3a.forest_2025['plantations'],
              [table_4_3b.forest_2025['native_species'],
               table_4_3b.forest_2025['introduced_species']], "panEuropean.forestArea.forest", "panEuropean.naturalness.plantations", "4.3a")`,
        ],
      },
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'forestCharacteristics',
          variableName: 'plantationForestIntroducedArea',
          colName: '2020',
        },
      },
    },
  },
]
const linkedDataColsB = (colName: string) =>
  dataColsB.map((col) => {
    const validateFns = {
      ...col.migration.validateFns,
      '2025': col.migration.validateFns['2025'].map((fn: string) => fn.replace(/2025/g, colName)),
    }

    let migration = {
      ...col.migration,
      validateFns,
    }

    if (col.migration.linkedNodes && colName !== '2005') {
      migration = {
        ...migration,
        linkedNodes: Object.fromEntries(
          Object.entries(col.migration.linkedNodes).map(([key, node]) => [key, { ...node, colName }])
        ),
      }
    } else {
      delete migration.linkedNodes
    }

    return { ...col, migration }
  })

export const naturalness = {
  sectionName: 'naturalness',
  sectionAnchor: '4.3a',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_4_3a',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.naturalness.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalness.area1000ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalness.undisturbed_by_man',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalness.semi_natural',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalness.plantations',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.forest',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2025'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2025['area'],
                  [table_4_3a.forest_2025['undisturbed_by_man'],
                   table_4_3a.forest_2025['semi_natural'],
                   table_4_3a.forest_2025['plantations']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.naturalness.forest',
              labelParams: { year: 2025 },
              variableExport: 'forest_2025',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2020'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2020['area'],
                  [table_4_3a.forest_2020['undisturbed_by_man'],
                   table_4_3a.forest_2020['semi_natural'],
                   table_4_3a.forest_2020['plantations']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.naturalness.forest',
              labelParams: { year: 2020 },
              variableExport: 'forest_2020',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2015'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2015['area'],
                  [table_4_3a.forest_2015['undisturbed_by_man'],
                   table_4_3a.forest_2015['semi_natural'],
                   table_4_3a.forest_2015['plantations']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.naturalness.forest',
              labelParams: { year: 2015 },
              variableExport: 'forest_2015',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2010'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2010['area'],
                  [table_4_3a.forest_2010['undisturbed_by_man'],
                   table_4_3a.forest_2010['semi_natural'],
                   table_4_3a.forest_2010['plantations']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.naturalness.forest',
              labelParams: { year: 2010 },
              variableExport: 'forest_2010',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2005['area'],
                  [table_4_3a.forest_2005['undisturbed_by_man'],
                   table_4_3a.forest_2005['semi_natural'],
                   table_4_3a.forest_2005['plantations']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.naturalness.forest',
              labelParams: { year: 2005 },
              variableExport: 'forest_2005',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2000'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2000['area'],
                  [table_4_3a.forest_2000['undisturbed_by_man'],
                   table_4_3a.forest_2000['semi_natural'],
                   table_4_3a.forest_2000['plantations']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.naturalness.forest',
              labelParams: { year: 2000 },
              variableExport: 'forest_2000',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('1990'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_1990['area'],
                  [table_4_3a.forest_1990['undisturbed_by_man'],
                   table_4_3a.forest_1990['semi_natural'],
                   table_4_3a.forest_1990['plantations']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.naturalness.forest',
              labelParams: { year: 1990 },
              variableExport: 'forest_1990',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.other_wooded_land',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.naturalness.other_wooded_land',
              labelParams: { year: 2025 },
              variableExport: 'other_wooded_land_2025',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalness.other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'other_wooded_land_2020',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalness.other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'other_wooded_land_2015',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalness.other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'other_wooded_land_2010',
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalness.other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'other_wooded_land_2005',
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalness.other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'other_wooded_land_2000',
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalness.other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'other_wooded_land_1990',
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2025'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
              labelParams: { year: 2025 },
              variableExport: 'total_forest_and_other_wooded_land_2025',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2020'),
              ],
              labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2015'),
              ],
              labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2010'),
              ],
              labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2005'),
              ],
              labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2000'),
              ],
              labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'total_forest_and_other_wooded_land_2000',
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('1990'),
              ],
              labelKey: 'panEuropean.naturalness.total_forest_and_other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'total_forest_and_other_wooded_land_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: ['undisturbed_by_man', 'semi_natural', 'plantations'],
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.naturalnessBySubclass',
      tableSpecs: [
        {
          name: 'table_4_3b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.naturalnessBySubclasses.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 7,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.area1000ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: [
                {
                  idx: 0,
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.semiNatural',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.plantations',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_2',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.naturallyEstablished',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.naturalisedIntroducedSpecies',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.establishedByPlantingAndOrSeeding',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.coppiceSemiNatural',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.unknownOrigin',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.nativeSpecies',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.introducedSpecies',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('2025'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2025 },
              variableExport: 'forest_2025',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('2020'),
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2020 },
              variableExport: 'forest_2020',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('2015'),
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2015 },
              variableExport: 'forest_2015',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('2010'),
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2010 },
              variableExport: 'forest_2010',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('2005'),
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2005 },
              variableExport: 'forest_2005',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('2000'),
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2000 },
              variableExport: 'forest_2000',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('1990'),
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 1990 },
              variableExport: 'forest_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: [
            'naturally_established',
            'naturalised_introduced_species',
            'established_by_planting_and_or_seeding',
            'coppice',
            'unknown_origin',
            'native_species',
            'introduced_species',
          ],
          migration: {
            cycles: ['2025'],
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_4_3_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.theYearAndDataReportedFor2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'theRecentAvailableYear',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.countryComments.howDidYouGenerateValuesFor2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: -1,
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.theRecentAvailableYear',
                  className: 'fra-table__header-cell',
                  type: 'placeholder',
                },
                { idx: 1, type: 'textarea', colName: 'comment' },
              ],
            },
            ...['extrapolation', 'assessmentBasedOnEvidence'].map((variableName, idx) => ({
              idx: idx + 1,
              type: 'data',
              variableName,
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: `panEuropean.countryComments.${variableName}`,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            })),
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: { cycles: ['2025'], columnNames: { '2025': ['comment'] } },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'country_comments_4_3_2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.approachToDelimniateBetweenCategories',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            ...[
              'criteriaOrThresholdsUsedToDelimitUndisturbedByManFromSemiNatural',
              'criteriaOrThresholdsUsedToDelimitSemiNaturalFromPlantations',
            ].map((variableName, idx) => ({
              idx,
              type: 'data',
              variableName,
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: `panEuropean.countryComments.${variableName}`,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            })),
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: { cycles: ['2025'], columnNames: { '2025': ['comment'] } },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'country_comments_4_3_3',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.category',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.commentsRelatedToDataDefinitions',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.commentsOnTrend',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },

            ...['fowlUndisturbedByMan', 'fowlSemiNatural', 'fowlPlantations'].map((variableName, idx) => ({
              idx,
              type: 'data',
              variableName,
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: `panEuropean.countryComments.${variableName}`,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
                { idx: 0, type: 'textarea', colName: 'comment_trends' },
              ],
            })),
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': ['comment', 'comment_trends'] },
          },
        },
      ],
    },
  ],
  showTitle: true,
  descriptions: {
    analysisAndProcessing: true,
    comments: true,
    introductoryText: false,
    nationalData: true,
    linkedVariables: [
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'forestCharacteristics',
        tableName: 'forestCharacteristics',
        variableName: 'naturalForestArea',
      },
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'forestCharacteristics',
        tableName: 'forestCharacteristics',
        variableName: 'plantationForestArea',
      },
    ],
  },
  dataExport: {
    included: true,
  },
  migration: {
    anchors: {
      '2020': '4.3a',
      '2025': '4.3',
    },
  },
}
export const naturalnessBySubclasses = {
  sectionName: 'naturalnessBySubclasses',
  sectionAnchor: '4.3b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_4_3b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.naturalnessBySubclasses.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 7,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.area1000ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_1',
              cols: [
                {
                  idx: 0,
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.semiNatural',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.plantations',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_2',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.naturallyEstablished',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.naturalisedIntroducedSpecies',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.establishedByPlantingAndOrSeeding',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.coppiceSemiNatural',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.unknownOrigin',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.nativeSpecies',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.introducedSpecies',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                {
                  idx: 5,
                  type: 'decimal',
                },
                { idx: 6, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2025 },
              variableExport: 'forest_2025',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                {
                  idx: 5,
                  type: 'decimal',
                },
                { idx: 6, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2020 },
              variableExport: 'forest_2020',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                {
                  idx: 5,
                  type: 'decimal',
                },
                { idx: 6, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2015 },
              variableExport: 'forest_2015',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                {
                  idx: 5,
                  type: 'decimal',
                },
                { idx: 6, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2010 },
              variableExport: 'forest_2010',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                {
                  idx: 5,
                  type: 'decimal',
                },
                { idx: 6, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2005 },
              variableExport: 'forest_2005',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                {
                  idx: 5,
                  type: 'decimal',
                },
                { idx: 6, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 2000 },
              variableExport: 'forest_2000',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.naturalnessBySubclasses.forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                {
                  idx: 5,
                  type: 'decimal',
                },
                { idx: 6, type: 'decimal' },
              ],
              labelKey: 'panEuropean.naturalnessBySubclasses.forest',
              labelParams: { year: 1990 },
              variableExport: 'forest_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: [
            'naturally_established',
            'naturalised_introduced_species',
            'established_by_planting_and_or_seeding',
            'coppice',
            'unknown_origin',
            'native_species',
            'introduced_species',
          ],
        },
      ],
    },
  ],
  showTitle: true,
  descriptions: {
    analysisAndProcessing: true,
    comments: true,
    introductoryText: false,
    nationalData: true,
  },
  dataExport: {
    included: true,
  },
  migration: {
    cycles: ['2020'],
  },
}
