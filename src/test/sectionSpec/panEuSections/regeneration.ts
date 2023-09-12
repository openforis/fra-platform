// @ts-nocheck

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
          variableName: 'naturalForestArea',
          colName: '2025',
        },
      },
    },
  },
  {
    idx: 1,
    type: 'decimal',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'forestCharacteristics',
          variableName: 'plantedForest',
          colName: '2025',
        },
      },
    },
  },
]

const linkedDataColsA = (colName) =>
  dataColsA.map((col) => ({
    ...col,
    migration: {
      ...col.migration,
      linkedNodes: Object.fromEntries(
        Object.entries(col.migration.linkedNodes).map(([key, node]) => [key, { ...node, colName }])
      ),
    },
  }))

const dataColsB = [
  {
    idx: 0,
    type: 'decimal',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'forestAreaChange',
          variableName: 'afforestation',
          colName: '1990-2000',
        },
      },
    },
  },
  {
    idx: 1,
    type: 'decimal',
    migration: {
      linkedNodes: {
        '2025': {
          assessmentName: 'fra',
          cycleName: '2025',
          tableName: 'forestAreaChange',
          variableName: 'natural_expansion',
          colName: '1990-2000',
        },
      },
    },
  },
]

const linkedDataColsB = (colName) =>
  dataColsB.map((col) => ({
    ...col,
    migration: {
      ...col.migration,
      linkedNodes: Object.fromEntries(
        Object.entries(col.migration.linkedNodes).map(([key, node]) => [key, { ...node, colName }])
      ),
    },
  }))

export const totalForestAreaByExpansionAndRegenerationType = {
  sectionName: 'totalForestAreaByExpansionAndRegenerationType',
  sectionAnchor: '4.2a',
  tableSections: [
    {
      titleKey:
        'panEuropean.totalForestAreaByExpansionAndRegenerationType.totalForestAreaByExpansionAndRegenerationTypeNumber',
      tableSpecs: [
        {
          name: 'table_4_2a',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.totalForestAreaByExpansionAndRegenerationType.totalAreaOfForestByExpansionRegenerationType1000ha',
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
                  labelKey:
                    'panEuropean.totalForestAreaByExpansionAndRegenerationType.natural_expansion_and_natural_regeneration',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.totalForestAreaByExpansionAndRegenerationType.afforestation_and_regeneration_by_planting_and_or_seeding',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.coppice',
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
                  labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2025'),
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
              labelParams: { year: 2025 },
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2025['area'],
                  [table_4_2a.forest_2025['natural_expansion_and_natural_regeneration'],
                   table_4_2a.forest_2025['afforestation_and_regeneration_by_planting_and_or_seeding'],
                   table_4_2a.forest_2025['coppice']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
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
                  labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2020'),
                { idx: 2, type: 'decimal' },
              ],
              labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
              labelParams: { year: 2020 },
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2020['area'],
                  [table_4_2a.forest_2020['natural_expansion_and_natural_regeneration'],
                   table_4_2a.forest_2020['afforestation_and_regeneration_by_planting_and_or_seeding'],
                   table_4_2a.forest_2020['coppice']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
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
                  labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2015'),
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2015['area'],
                  [table_4_2a.forest_2015['natural_expansion_and_natural_regeneration'],
                   table_4_2a.forest_2015['afforestation_and_regeneration_by_planting_and_or_seeding'],
                   table_4_2a.forest_2015['coppice']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
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
                  labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2010'),
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2010['area'],
                  [table_4_2a.forest_2010['natural_expansion_and_natural_regeneration'],
                   table_4_2a.forest_2010['afforestation_and_regeneration_by_planting_and_or_seeding'],
                   table_4_2a.forest_2010['coppice']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
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
                  labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
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
                  [table_4_2a.forest_2005['natural_expansion_and_natural_regeneration'],
                   table_4_2a.forest_2005['afforestation_and_regeneration_by_planting_and_or_seeding'],
                   table_4_2a.forest_2005['coppice']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
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
                  labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('2000'),
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_2000['area'],
                  [table_4_2a.forest_2000['natural_expansion_and_natural_regeneration'],
                   table_4_2a.forest_2000['afforestation_and_regeneration_by_planting_and_or_seeding'],
                   table_4_2a.forest_2000['coppice']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
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
                  labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsA('1990'),
                { idx: 2, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_1a.forest_1990['area'],
                  [table_4_2a.forest_1990['natural_expansion_and_natural_regeneration'],
                   table_4_2a.forest_1990['afforestation_and_regeneration_by_planting_and_or_seeding'],
                   table_4_2a.forest_1990['coppice']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a")`,
                  ],
                },
              },
              labelKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.forest',
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
            'natural_expansion_and_natural_regeneration',
            'afforestation_and_regeneration_by_planting_and_or_seeding',
            'coppice',
          ],
        },
      ],
    },
    {
      titleKey: 'panEuropean.totalForestAreaByExpansionAndRegenerationType.annualForestExpansionAndRegenerationNumber',
      tableSpecs: [
        {
          name: 'table_4_2b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.annualForestExpansionAndRegeneration.annualForestExpansionAndRegeneration1000ha',
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
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.expansionOfForestArea',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.regenerationOfForestArea',
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
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.afforestationExpansion',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.naturalExpansion',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.naturalRegeneration',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.plantingAndSeeding',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.coppiceRegeneration',
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
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '2020-2025' },
                      },
                    },
                  },
                },
                ...linkedDataColsB('2020-2025'),
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2020 },
              variableExport: 'forest_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2020': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: 2015 },
                      },
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '2015-2020' },
                      },
                    },
                  },
                },
                ...linkedDataColsB('2015-2020'),
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2015 },
              variableExport: 'forest_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: 2010 },
                      },
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '2010-2015' },
                      },
                    },
                  },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('2010-2015'),
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2010 },
              variableExport: 'forest_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
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
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2005 },
              variableExport: 'forest_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: 2000 },
                      },
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '2000-2010' },
                      },
                    },
                  },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('2000-2010'),
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2000 },
              variableExport: 'forest_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: 1990 },
                      },
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '1990-2000' },
                      },
                    },
                  },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataColsB('1990-2000'),
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
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
            'afforestation',
            'natural_expansion',
            'natural_regeneration',
            'planting_and_seeding',
            'coppice',
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
          name: 'country_comments_4_2_1',
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

            ...[
              'totalAreaOfForestByExpansionRegenerationType',
              'naturalExpansionAndRegeneration',
              'afforestationAndRegenerationByPlantingAndOrSeeding',
              'coppice',
              'annualForestExpansionAndRegeneration',
              'naturalExpansionOfForestArea',
              'regenerationOfForestArean',
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
        sectionName: 'forestAreaChange',
        tableName: 'forestAreaChange',
        variableName: 'afforestation',
      },
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'forestAreaChange',
        tableName: 'forestAreaChange',
        variableName: 'natural_expansion',
      },
    ],
  },
  dataExport: {
    included: true,
  },
  migration: {
    anchors: {
      '2020': '4.2a',
      '2025': '4.2',
    },
  },
}
export const annualForestExpansionAndRegeneration = {
  sectionName: 'annualForestExpansionAndRegeneration',
  sectionAnchor: '4.2b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_4_2b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.annualForestExpansionAndRegeneration.annualForestExpansionAndRegeneration1000ha',
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
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.expansionOfForestArea',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.regenerationOfForestArea',
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
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.afforestationExpansion',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.naturalExpansion',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.naturalRegeneration',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.plantingAndSeeding',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.coppiceRegeneration',
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
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '2020-2025' },
                      },
                    },
                  },
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2020 },
              variableExport: 'forest_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  className: 'fra-table__category-cell',
                  migration: {
                    label: {
                      '2020': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: 2015 },
                      },
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '2015-2020' },
                      },
                    },
                  },
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2015 },
              variableExport: 'forest_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: 2010 },
                      },
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '2010-2015' },
                      },
                    },
                  },
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
              ],
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2010 },
              variableExport: 'forest_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
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
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2005 },
              variableExport: 'forest_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: 2000 },
                      },
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '2000-2010' },
                      },
                    },
                  },
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
              ],
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
              labelParams: { year: 2000 },
              variableExport: 'forest_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: 1990 },
                      },
                      '2025': {
                        key: 'panEuropean.annualForestExpansionAndRegeneration.forest',
                        params: { year: '1990-2000' },
                      },
                    },
                  },
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
              ],
              labelKey: 'panEuropean.annualForestExpansionAndRegeneration.forest',
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
            'afforestation',
            'natural_expansion',
            'natural_regeneration',
            'planting_and_seeding',
            'coppice',
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
