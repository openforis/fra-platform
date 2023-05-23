// @ts-nocheck
const dataColsA = [
  {
    idx: 0,
    type: 'decimal',
  },
  {
    idx: 1,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_2025['regeneration_phase'],
                  [table_1_3a1.predominantly_coniferous_forest_2025['regeneration_phase'],table_1_3a1.mixed_forest_2025['regeneration_phase'],
                  table_1_3a1.predominantly_broadleaved_forest_2025['regeneration_phase']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                   "panEuropean.ageClassDistributionAreaOfEvenAgedStands.regeneration_phase", "1.3a1")`,
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
          `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_2025['intermediate_phase'],
                  [table_1_3a1.predominantly_coniferous_forest_2025['intermediate_phase'],table_1_3a1.mixed_forest_2025['intermediate_phase'],
                  table_1_3a1.predominantly_broadleaved_forest_2025['intermediate_phase']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                   "panEuropean.ageClassDistributionAreaOfEvenAgedStands.intermediate_phase", "1.3a1")`,
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
          `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_2025['mature_phase'],
                  [table_1_3a1.predominantly_coniferous_forest_2025['mature_phase'],table_1_3a1.mixed_forest_2025['mature_phase'],
                  table_1_3a1.predominantly_broadleaved_forest_2025['mature_phase']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                   "panEuropean.ageClassDistributionAreaOfEvenAgedStands.mature_phase", "1.3a1")`,
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
          `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_2025['unspecified'],
                  [table_1_3a1.predominantly_coniferous_forest_2025['unspecified'],table_1_3a1.mixed_forest_2025['unspecified'],
                  table_1_3a1.predominantly_broadleaved_forest_2025['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                   "panEuropean.ageClassDistributionAreaOfEvenAgedStands.unspecified", "1.3a1")`,
        ],
      },
    },
  },
]
const dataColsB = [
  {
    idx: 0,
    type: 'decimal',
  },
  {
    idx: 1,
    type: 'decimal',
    migration: {
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2025['regeneration_phase'],
                  [table_1_3a2.predominantly_coniferous_forest_2025['regeneration_phase'],table_1_3a2.mixed_forest_2025['regeneration_phase'],
                  table_1_3a2.predominantly_broadleaved_forest_2025['regeneration_phase']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.regeneration_phase", "1.3a2")`,
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
          `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2025['intermediate_phase'],
                  [table_1_3a2.predominantly_coniferous_forest_2025['intermediate_phase'],table_1_3a2.mixed_forest_2025['intermediate_phase'],
                  table_1_3a2.predominantly_broadleaved_forest_2025['intermediate_phase']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.intermediate_phase", "1.3a2")`,
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
          `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2025['mature_phase'],
                  [table_1_3a2.predominantly_coniferous_forest_2025['mature_phase'],table_1_3a2.mixed_forest_2025['mature_phase'],
                  table_1_3a2.predominantly_broadleaved_forest_2025['mature_phase']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mature_phase", "1.3a2")`,
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
          `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2025['unspecified'],
                  [table_1_3a2.predominantly_coniferous_forest_2025['unspecified'],table_1_3a2.mixed_forest_2025['unspecified'],
                  table_1_3a2.predominantly_broadleaved_forest_2025['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.unspecified", "1.3a2")`,
        ],
      },
    },
  },
]

const updatedDataColsA = (year: string) =>
  dataColsA.map((col) => {
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

const updatedDataColsB = (year: string) =>
  dataColsB.map((col) => {
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

export const ageClassDistributionAreaOfEvenAgedStands = {
  sectionName: 'ageClassDistributionAreaOfEvenAgedStands',
  sectionAnchor: '1.3a1',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_1_3a1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 4,
                  rowSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.developmentPhases',
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
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.regeneration_phase',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.intermediate_phase',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mature_phase',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.unspecified',
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
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands._1000Ha',
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
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
                  labelParams: { year: 2020 },
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_2020['area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2020['total_area'], 
                   table_1_3b.forest_uneven_aged_stands_2020['area']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a",
                   ["panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                  "panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest_uneven_aged_stands"])`,
                      ],
                    },
                  },
                },
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
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_2020['total_area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2020['intermediate_phase'],table_1_3a1.forest_even_aged_stands_of_which_2020['mature_phase'],
                  table_1_3a1.forest_even_aged_stands_of_which_2020['regeneration_phase'],table_1_3a1.forest_even_aged_stands_of_which_2020['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
              labelParams: { year: 2020 },
              variableExport: 'forest_even_aged_stands_of_which_2020',
              mainCategory: true,
              subcategory: false,
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
                  labelParams: { year: 2015 },
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_2015['area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2015['total_area'], 
                   table_1_3b.forest_uneven_aged_stands_2015['area']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a",
                   ["panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                  "panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest_uneven_aged_stands"])`,
                      ],
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_2015['total_area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2015['intermediate_phase'],table_1_3a1.forest_even_aged_stands_of_which_2015['mature_phase'],
                  table_1_3a1.forest_even_aged_stands_of_which_2015['regeneration_phase'],table_1_3a1.forest_even_aged_stands_of_which_2015['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
              labelParams: { year: 2015 },
              variableExport: 'forest_even_aged_stands_of_which_2015',
              mainCategory: true,
              subcategory: false,
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
                  labelParams: { year: 2010 },
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_2010['area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2010['total_area'], 
                   table_1_3b.forest_uneven_aged_stands_2010['area']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a",
                   ["panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                  "panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest_uneven_aged_stands"])`,
                      ],
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_2010['total_area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2010['intermediate_phase'],table_1_3a1.forest_even_aged_stands_of_which_2010['mature_phase'],
                  table_1_3a1.forest_even_aged_stands_of_which_2010['regeneration_phase'],table_1_3a1.forest_even_aged_stands_of_which_2010['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
              labelParams: { year: 2010 },
              variableExport: 'forest_even_aged_stands_of_which_2010',
              mainCategory: true,
              subcategory: false,
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
                  labelParams: { year: 2005 },
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_2005['area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2005['total_area'], 
                   table_1_3b.forest_uneven_aged_stands_2005['area']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a",
                   ["panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                  "panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest_uneven_aged_stands"])`,
                      ],
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_2005['total_area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2005['intermediate_phase'],table_1_3a1.forest_even_aged_stands_of_which_2005['mature_phase'],
                  table_1_3a1.forest_even_aged_stands_of_which_2005['regeneration_phase'],table_1_3a1.forest_even_aged_stands_of_which_2005['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
              labelParams: { year: 2005 },
              variableExport: 'forest_even_aged_stands_of_which_2005',
              mainCategory: true,
              subcategory: false,
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
                  labelParams: { year: 2000 },
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_2000['area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2000['total_area'], 
                   table_1_3b.forest_uneven_aged_stands_2000['area']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a",
                   ["panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                  "panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest_uneven_aged_stands"])`,
                      ],
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_2000['total_area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_2000['intermediate_phase'],table_1_3a1.forest_even_aged_stands_of_which_2000['mature_phase'],
                  table_1_3a1.forest_even_aged_stands_of_which_2000['regeneration_phase'],table_1_3a1.forest_even_aged_stands_of_which_2000['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
              labelParams: { year: 2000 },
              variableExport: 'forest_even_aged_stands_of_which_2000',
              mainCategory: true,
              subcategory: false,
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
                  labelParams: { year: 1990 },
                  className: 'fra-table__header-cell-left',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_1990['area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_1990['total_area'], 
                   table_1_3b.forest_uneven_aged_stands_1990['area']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1a",
                   ["panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which",
                  "panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest_uneven_aged_stands"])`,
                      ],
                    },
                  },
                },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.forest_even_aged_stands_of_which_1990['total_area'],
                  [table_1_3a1.forest_even_aged_stands_of_which_1990['intermediate_phase'],table_1_3a1.forest_even_aged_stands_of_which_1990['mature_phase'],
                  table_1_3a1.forest_even_aged_stands_of_which_1990['regeneration_phase'],table_1_3a1.forest_even_aged_stands_of_which_1990['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged_stands_of_which',
              labelParams: { year: 1990 },
              variableExport: 'forest_even_aged_stands_of_which_1990',
              mainCategory: true,
              subcategory: false,
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
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
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.available_for_wood_supply_of_which_2020['total_area'],
                  [table_1_3a1.available_for_wood_supply_of_which_2020['intermediate_phase'],table_1_3a1.available_for_wood_supply_of_which_2020['mature_phase'],
                  table_1_3a1.available_for_wood_supply_of_which_2020['regeneration_phase'],table_1_3a1.available_for_wood_supply_of_which_2020['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
              labelParams: { year: 2020 },
              variableExport: 'available_for_wood_supply_of_which_2020',
              mainCategory: false,
              subcategory: false,
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
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
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.available_for_wood_supply_of_which_2015['total_area'],
                  [table_1_3a1.available_for_wood_supply_of_which_2015['intermediate_phase'],table_1_3a1.available_for_wood_supply_of_which_2015['mature_phase'],
                  table_1_3a1.available_for_wood_supply_of_which_2015['regeneration_phase'],table_1_3a1.available_for_wood_supply_of_which_2015['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
              labelParams: { year: 2015 },
              variableExport: 'available_for_wood_supply_of_which_2015',
              mainCategory: false,
              subcategory: false,
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
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
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.available_for_wood_supply_of_which_2010['total_area'],
                  [table_1_3a1.available_for_wood_supply_of_which_2010['intermediate_phase'],table_1_3a1.available_for_wood_supply_of_which_2010['mature_phase'],
                  table_1_3a1.available_for_wood_supply_of_which_2010['regeneration_phase'],table_1_3a1.available_for_wood_supply_of_which_2010['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
              labelParams: { year: 2010 },
              variableExport: 'available_for_wood_supply_of_which_2010',
              mainCategory: false,
              subcategory: false,
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
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
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.available_for_wood_supply_of_which_2005['total_area'],
                  [table_1_3a1.available_for_wood_supply_of_which_2005['intermediate_phase'],table_1_3a1.available_for_wood_supply_of_which_2005['mature_phase'],
                  table_1_3a1.available_for_wood_supply_of_which_2005['regeneration_phase'],table_1_3a1.available_for_wood_supply_of_which_2005['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
              labelParams: { year: 2005 },
              variableExport: 'available_for_wood_supply_of_which_2005',
              mainCategory: false,
              subcategory: false,
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
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
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.available_for_wood_supply_of_which_2000['total_area'],
                  [table_1_3a1.available_for_wood_supply_of_which_2000['intermediate_phase'],table_1_3a1.available_for_wood_supply_of_which_2000['mature_phase'],
                  table_1_3a1.available_for_wood_supply_of_which_2000['regeneration_phase'],table_1_3a1.available_for_wood_supply_of_which_2000['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
              labelParams: { year: 2000 },
              variableExport: 'available_for_wood_supply_of_which_2000',
              mainCategory: false,
              subcategory: false,
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
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
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.available_for_wood_supply_of_which_1990['total_area'],
                  [table_1_3a1.available_for_wood_supply_of_which_1990['intermediate_phase'],table_1_3a1.available_for_wood_supply_of_which_1990['mature_phase'],
                  table_1_3a1.available_for_wood_supply_of_which_1990['regeneration_phase'],table_1_3a1.available_for_wood_supply_of_which_1990['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply_of_which',
              labelParams: { year: 1990 },
              variableExport: 'available_for_wood_supply_of_which_1990',
              mainCategory: false,
              subcategory: false,
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2020'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_coniferous_forest_2020['total_area'],
                  [table_1_3a1.predominantly_coniferous_forest_2020['intermediate_phase'],table_1_3a1.predominantly_coniferous_forest_2020['mature_phase'],
                  table_1_3a1.predominantly_coniferous_forest_2020['regeneration_phase'],table_1_3a1.predominantly_coniferous_forest_2020['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
              labelParams: { year: 2020 },
              variableExport: 'predominantly_coniferous_forest_2020',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2015'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_coniferous_forest_2015['total_area'],
                  [table_1_3a1.predominantly_coniferous_forest_2015['intermediate_phase'],table_1_3a1.predominantly_coniferous_forest_2015['mature_phase'],
                  table_1_3a1.predominantly_coniferous_forest_2015['regeneration_phase'],table_1_3a1.predominantly_coniferous_forest_2015['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
              labelParams: { year: 2015 },
              variableExport: 'predominantly_coniferous_forest_2015',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2010'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_coniferous_forest_2010['total_area'],
                  [table_1_3a1.predominantly_coniferous_forest_2010['intermediate_phase'],table_1_3a1.predominantly_coniferous_forest_2010['mature_phase'],
                  table_1_3a1.predominantly_coniferous_forest_2010['regeneration_phase'],table_1_3a1.predominantly_coniferous_forest_2010['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
              labelParams: { year: 2010 },
              variableExport: 'predominantly_coniferous_forest_2010',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2005'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_coniferous_forest_2005['total_area'],
                  [table_1_3a1.predominantly_coniferous_forest_2005['intermediate_phase'],table_1_3a1.predominantly_coniferous_forest_2005['mature_phase'],
                  table_1_3a1.predominantly_coniferous_forest_2005['regeneration_phase'],table_1_3a1.predominantly_coniferous_forest_2005['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
              labelParams: { year: 2005 },
              variableExport: 'predominantly_coniferous_forest_2005',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2000'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_coniferous_forest_2000['total_area'],
                  [table_1_3a1.predominantly_coniferous_forest_2000['intermediate_phase'],table_1_3a1.predominantly_coniferous_forest_2000['mature_phase'],
                  table_1_3a1.predominantly_coniferous_forest_2000['regeneration_phase'],table_1_3a1.predominantly_coniferous_forest_2000['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
              labelParams: { year: 2000 },
              variableExport: 'predominantly_coniferous_forest_2000',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('1990'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_coniferous_forest_1990['total_area'],
                  [table_1_3a1.predominantly_coniferous_forest_1990['intermediate_phase'],table_1_3a1.predominantly_coniferous_forest_1990['mature_phase'],
                  table_1_3a1.predominantly_coniferous_forest_1990['regeneration_phase'],table_1_3a1.predominantly_coniferous_forest_1990['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_forest',
              labelParams: { year: 1990 },
              variableExport: 'predominantly_coniferous_forest_1990',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2020'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_broadleaved_forest_2020['total_area'],
                  [table_1_3a1.predominantly_broadleaved_forest_2020['intermediate_phase'],table_1_3a1.predominantly_broadleaved_forest_2020['mature_phase'],
                  table_1_3a1.predominantly_broadleaved_forest_2020['regeneration_phase'],table_1_3a1.predominantly_broadleaved_forest_2020['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
              labelParams: { year: 2020 },
              variableExport: 'predominantly_broadleaved_forest_2020',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2015'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_broadleaved_forest_2015['total_area'],
                  [table_1_3a1.predominantly_broadleaved_forest_2015['intermediate_phase'],table_1_3a1.predominantly_broadleaved_forest_2015['mature_phase'],
                  table_1_3a1.predominantly_broadleaved_forest_2015['regeneration_phase'],table_1_3a1.predominantly_broadleaved_forest_2015['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
              labelParams: { year: 2015 },
              variableExport: 'predominantly_broadleaved_forest_2015',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2010'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_broadleaved_forest_2010['total_area'],
                  [table_1_3a1.predominantly_broadleaved_forest_2010['intermediate_phase'],table_1_3a1.predominantly_broadleaved_forest_2010['mature_phase'],
                  table_1_3a1.predominantly_broadleaved_forest_2010['regeneration_phase'],table_1_3a1.predominantly_broadleaved_forest_2010['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
              labelParams: { year: 2010 },
              variableExport: 'predominantly_broadleaved_forest_2010',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 21,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2005'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_broadleaved_forest_2005['total_area'],
                  [table_1_3a1.predominantly_broadleaved_forest_2005['intermediate_phase'],table_1_3a1.predominantly_broadleaved_forest_2005['mature_phase'],
                  table_1_3a1.predominantly_broadleaved_forest_2005['regeneration_phase'],table_1_3a1.predominantly_broadleaved_forest_2005['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
              labelParams: { year: 2005 },
              variableExport: 'predominantly_broadleaved_forest_2005',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 22,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2000'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_broadleaved_forest_2000['total_area'],
                  [table_1_3a1.predominantly_broadleaved_forest_2000['intermediate_phase'],table_1_3a1.predominantly_broadleaved_forest_2000['mature_phase'],
                  table_1_3a1.predominantly_broadleaved_forest_2000['regeneration_phase'],table_1_3a1.predominantly_broadleaved_forest_2000['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
              labelParams: { year: 2000 },
              variableExport: 'predominantly_broadleaved_forest_2000',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 23,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('1990'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.predominantly_broadleaved_forest_1990['total_area'],
                  [table_1_3a1.predominantly_broadleaved_forest_1990['intermediate_phase'],table_1_3a1.predominantly_broadleaved_forest_1990['mature_phase'],
                  table_1_3a1.predominantly_broadleaved_forest_1990['regeneration_phase'],table_1_3a1.predominantly_broadleaved_forest_1990['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_forest',
              labelParams: { year: 1990 },
              variableExport: 'predominantly_broadleaved_forest_1990',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 24,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2020'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.mixed_forest_2020['total_area'],
                  [table_1_3a1.mixed_forest_2020['intermediate_phase'],table_1_3a1.mixed_forest_2020['mature_phase'],
                  table_1_3a1.mixed_forest_2020['regeneration_phase'],table_1_3a1.mixed_forest_2020['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
              labelParams: { year: 2020 },
              variableExport: 'mixed_forest_2020',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 25,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2015'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.mixed_forest_2015['total_area'],
                  [table_1_3a1.mixed_forest_2015['intermediate_phase'],table_1_3a1.mixed_forest_2015['mature_phase'],
                  table_1_3a1.mixed_forest_2015['regeneration_phase'],table_1_3a1.mixed_forest_2015['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
              labelParams: { year: 2015 },
              variableExport: 'mixed_forest_2015',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 26,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2010'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.mixed_forest_2010['total_area'],
                  [table_1_3a1.mixed_forest_2010['intermediate_phase'],table_1_3a1.mixed_forest_2010['mature_phase'],
                  table_1_3a1.mixed_forest_2010['regeneration_phase'],table_1_3a1.mixed_forest_2010['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
              labelParams: { year: 2010 },
              variableExport: 'mixed_forest_2010',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 27,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2005'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.mixed_forest_2005['total_area'],
                  [table_1_3a1.mixed_forest_2005['intermediate_phase'],table_1_3a1.mixed_forest_2005['mature_phase'],
                  table_1_3a1.mixed_forest_2005['regeneration_phase'],table_1_3a1.mixed_forest_2005['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
              labelParams: { year: 2005 },
              variableExport: 'mixed_forest_2005',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 28,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('2000'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.mixed_forest_2000['total_area'],
                  [table_1_3a1.mixed_forest_2000['intermediate_phase'],table_1_3a1.mixed_forest_2000['mature_phase'],
                  table_1_3a1.mixed_forest_2000['regeneration_phase'],table_1_3a1.mixed_forest_2000['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
              labelParams: { year: 2000 },
              variableExport: 'mixed_forest_2000',
              mainCategory: false,
              subcategory: true,
            },
            {
              idx: 29,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsA('1990'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a1.mixed_forest_1990['total_area'],
                  [table_1_3a1.mixed_forest_1990['intermediate_phase'],table_1_3a1.mixed_forest_1990['mature_phase'],
                  table_1_3a1.mixed_forest_1990['regeneration_phase'],table_1_3a1.mixed_forest_1990['unspecified']],
                  "panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a1")`,
                  ],
                },
              },
              labelKey: 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed_forest',
              labelParams: { year: 1990 },
              variableExport: 'mixed_forest_1990',
              mainCategory: false,
              subcategory: true,
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: ['total_area', 'regeneration_phase', 'intermediate_phase', 'mature_phase', 'unspecified'],
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.ageClassDistribution',
      tableSpecs: [
        {
          name: 'table_1_3a2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 4,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.developmentPhases',
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
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.regeneration_phase',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.intermediate_phase',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mature_phase',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.unspecified',
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
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply._1000M3',
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
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2020['total_volume'],
                  [table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2020['intermediate_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2020['mature_phase'],
                  table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2020['regeneration_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2020['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which","panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2020 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2020',
              subcategory: false,
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2015['total_volume'],
                  [table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2015['intermediate_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2015['mature_phase'],
                  table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2015['regeneration_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2015['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2015 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2015',
              subcategory: false,
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2010['total_volume'],
                  [table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2010['intermediate_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2010['mature_phase'],
                  table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2010['regeneration_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2010['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2010 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2010',
              subcategory: false,
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2005['total_volume'],
                  [table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2005['intermediate_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2005['mature_phase'],
                  table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2005['regeneration_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2005['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2005 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2005',
              subcategory: false,
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2000['total_volume'],
                  [table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2000['intermediate_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2000['mature_phase'],
                  table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2000['regeneration_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_2000['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2000 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2000',
              subcategory: false,
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_1990['total_volume'],
                  [table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_1990['intermediate_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_1990['mature_phase'],
                  table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_1990['regeneration_phase'],table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_1990['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 1990 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_1990',
              subcategory: false,
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2020'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_coniferous_forest_2020['total_volume'],
                  [table_1_3a2.predominantly_coniferous_forest_2020['intermediate_phase'],table_1_3a2.predominantly_coniferous_forest_2020['mature_phase'],
                  table_1_3a2.predominantly_coniferous_forest_2020['regeneration_phase'],table_1_3a2.predominantly_coniferous_forest_2020['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2020 },
              variableExport: 'predominantly_coniferous_forest_2020',
              subcategory: true,
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2015'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_coniferous_forest_2015['total_volume'],
                  [table_1_3a2.predominantly_coniferous_forest_2015['intermediate_phase'],table_1_3a2.predominantly_coniferous_forest_2015['mature_phase'],
                  table_1_3a2.predominantly_coniferous_forest_2015['regeneration_phase'],table_1_3a2.predominantly_coniferous_forest_2015['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2015 },
              variableExport: 'predominantly_coniferous_forest_2015',
              subcategory: true,
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2010'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_coniferous_forest_2010['total_volume'],
                  [table_1_3a2.predominantly_coniferous_forest_2010['intermediate_phase'],table_1_3a2.predominantly_coniferous_forest_2010['mature_phase'],
                  table_1_3a2.predominantly_coniferous_forest_2010['regeneration_phase'],table_1_3a2.predominantly_coniferous_forest_2010['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2010 },
              variableExport: 'predominantly_coniferous_forest_2010',
              subcategory: true,
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2005'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_coniferous_forest_2005['total_volume'],
                  [table_1_3a2.predominantly_coniferous_forest_2005['intermediate_phase'],table_1_3a2.predominantly_coniferous_forest_2005['mature_phase'],
                  table_1_3a2.predominantly_coniferous_forest_2005['regeneration_phase'],table_1_3a2.predominantly_coniferous_forest_2005['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2005 },
              variableExport: 'predominantly_coniferous_forest_2005',
              subcategory: true,
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2000'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_coniferous_forest_2000['total_volume'],
                  [table_1_3a2.predominantly_coniferous_forest_2000['intermediate_phase'],table_1_3a2.predominantly_coniferous_forest_2000['mature_phase'],
                  table_1_3a2.predominantly_coniferous_forest_2000['regeneration_phase'],table_1_3a2.predominantly_coniferous_forest_2000['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2000 },
              variableExport: 'predominantly_coniferous_forest_2000',
              subcategory: true,
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('1990'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_coniferous_forest_1990['total_volume'],
                  [table_1_3a2.predominantly_coniferous_forest_1990['intermediate_phase'],table_1_3a2.predominantly_coniferous_forest_1990['mature_phase'],
                  table_1_3a2.predominantly_coniferous_forest_1990['regeneration_phase'],table_1_3a2.predominantly_coniferous_forest_1990['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 1990 },
              variableExport: 'predominantly_coniferous_forest_1990',
              subcategory: true,
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2020'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_broadleaved_forest_2020['total_volume'],
                  [table_1_3a2.predominantly_broadleaved_forest_2020['intermediate_phase'],table_1_3a2.predominantly_broadleaved_forest_2020['mature_phase'],
                  table_1_3a2.predominantly_broadleaved_forest_2020['regeneration_phase'],table_1_3a2.predominantly_broadleaved_forest_2020['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2020 },
              variableExport: 'predominantly_broadleaved_forest_2020',
              subcategory: true,
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2015'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_broadleaved_forest_2015['total_volume'],
                  [table_1_3a2.predominantly_broadleaved_forest_2015['intermediate_phase'],table_1_3a2.predominantly_broadleaved_forest_2015['mature_phase'],
                  table_1_3a2.predominantly_broadleaved_forest_2015['regeneration_phase'],table_1_3a2.predominantly_broadleaved_forest_2015['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2015 },
              variableExport: 'predominantly_broadleaved_forest_2015',
              subcategory: true,
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2010'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_broadleaved_forest_2010['total_volume'],
                  [table_1_3a2.predominantly_broadleaved_forest_2010['intermediate_phase'],table_1_3a2.predominantly_broadleaved_forest_2010['mature_phase'],
                  table_1_3a2.predominantly_broadleaved_forest_2010['regeneration_phase'],table_1_3a2.predominantly_broadleaved_forest_2010['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2010 },
              variableExport: 'predominantly_broadleaved_forest_2010',
              subcategory: true,
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2005'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_broadleaved_forest_2005['total_volume'],
                  [table_1_3a2.predominantly_broadleaved_forest_2005['intermediate_phase'],table_1_3a2.predominantly_broadleaved_forest_2005['mature_phase'],
                  table_1_3a2.predominantly_broadleaved_forest_2005['regeneration_phase'],table_1_3a2.predominantly_broadleaved_forest_2005['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2005 },
              variableExport: 'predominantly_broadleaved_forest_2005',
              subcategory: true,
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2000'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_broadleaved_forest_2000['total_volume'],
                  [table_1_3a2.predominantly_broadleaved_forest_2000['intermediate_phase'],table_1_3a2.predominantly_broadleaved_forest_2000['mature_phase'],
                  table_1_3a2.predominantly_broadleaved_forest_2000['regeneration_phase'],table_1_3a2.predominantly_broadleaved_forest_2000['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2000 },
              variableExport: 'predominantly_broadleaved_forest_2000',
              subcategory: true,
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('1990'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.predominantly_broadleaved_forest_1990['total_volume'],
                  [table_1_3a2.predominantly_broadleaved_forest_1990['intermediate_phase'],table_1_3a2.predominantly_broadleaved_forest_1990['mature_phase'],
                  table_1_3a2.predominantly_broadleaved_forest_1990['regeneration_phase'],table_1_3a2.predominantly_broadleaved_forest_1990['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 1990 },
              variableExport: 'predominantly_broadleaved_forest_1990',
              subcategory: true,
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2020'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.mixed_forest_2020['total_volume'],
                  [table_1_3a2.mixed_forest_2020['intermediate_phase'],table_1_3a2.mixed_forest_2020['mature_phase'],
                  table_1_3a2.mixed_forest_2020['regeneration_phase'],table_1_3a2.mixed_forest_2020['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2020 },
              variableExport: 'mixed_forest_2020',
              subcategory: true,
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2015'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.mixed_forest_2015['total_volume'],
                  [table_1_3a2.mixed_forest_2015['intermediate_phase'],table_1_3a2.mixed_forest_2015['mature_phase'],
                  table_1_3a2.mixed_forest_2015['regeneration_phase'],table_1_3a2.mixed_forest_2015['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2015 },
              variableExport: 'mixed_forest_2015',
              subcategory: true,
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2010'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.mixed_forest_2010['total_volume'],
                  [table_1_3a2.mixed_forest_2010['intermediate_phase'],table_1_3a2.mixed_forest_2010['mature_phase'],
                  table_1_3a2.mixed_forest_2010['regeneration_phase'],table_1_3a2.mixed_forest_2010['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2010 },
              variableExport: 'mixed_forest_2010',
              subcategory: true,
            },
            {
              idx: 21,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2005'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.mixed_forest_2005['total_volume'],
                  [table_1_3a2.mixed_forest_2005['intermediate_phase'],table_1_3a2.mixed_forest_2005['mature_phase'],
                  table_1_3a2.mixed_forest_2005['regeneration_phase'],table_1_3a2.mixed_forest_2005['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2005 },
              variableExport: 'mixed_forest_2005',
              subcategory: true,
            },
            {
              idx: 22,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('2000'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.mixed_forest_2000['total_volume'],
                  [table_1_3a2.mixed_forest_2000['intermediate_phase'],table_1_3a2.mixed_forest_2000['mature_phase'],
                  table_1_3a2.mixed_forest_2000['regeneration_phase'],table_1_3a2.mixed_forest_2000['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2000 },
              variableExport: 'mixed_forest_2000',
              subcategory: true,
            },
            {
              idx: 23,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__subcategory-cell',
                },
                ...updatedDataColsB('1990'),
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_3a2.mixed_forest_1990['total_volume'],
                  [table_1_3a2.mixed_forest_1990['intermediate_phase'],table_1_3a2.mixed_forest_1990['mature_phase'],
                  table_1_3a2.mixed_forest_1990['regeneration_phase'],table_1_3a2.mixed_forest_1990['unspecified']],
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest",
                  "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2")`,
                  ],
                },
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 1990 },
              variableExport: 'mixed_forest_1990',
              subcategory: true,
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'thousandCubicMeter',
          columnsExport: ['total_volume', 'regeneration_phase', 'intermediate_phase', 'mature_phase', 'unspecified'],
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
          name: 'country_comments_1_3a_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.approachToDelineationBetweenEvenAgedAndUnevenAgedStands',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'howIdYouDistinguishBetweenEvenAgedAndUnevenAgedStands',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.howIdYouDistinguishBetweenEvenAgedAndUnevenAgedStands',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': ['comment'] },
          },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'country_comments_1_3a_2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.commentsToInterpretationOfDevelopmentPhases',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'regenerationPhase',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  rowSpan: 4,
                  labelKey: 'panEuropean.countryComments.howDidYouInterpretedAndDefineNationally',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: -1,
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.regenerationPhase',
                  className: 'fra-table__header-cell',
                  type: 'placeholder',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
            ...['intermediatePhase', 'maturePhase', 'unspecified'].map((variableName, idx) => ({
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
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': ['comment'] },
          },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'country_comments_1_3a_3',
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
                  labelKey: 'panEuropean.countryComments.commentsOnTrends',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            ...['forestEvenAgedStands', 'ofWhichAvailableForWoodSupply'].map((variableName, idx) => ({
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
                { idx: 1, type: 'textarea', colName: 'comment_trends' },
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
  },
  dataExport: {
    included: true,
  },
  migration: {
    anchors: {
      '2020': '1.3a1',
      '2025': '1.3a',
    },
  },
}

export const ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply = {
  sectionName: 'ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply',
  sectionAnchor: '1.3a2',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_1_3a2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 4,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.developmentPhases',
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
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.regeneration_phase',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.intermediate_phase',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mature_phase',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.unspecified',
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
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply._1000M3',
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
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2020 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2020',
              subcategory: false,
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2015 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2015',
              subcategory: false,
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2010 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2010',
              subcategory: false,
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2005 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2005',
              subcategory: false,
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 2000 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_2000',
              subcategory: false,
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
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
              ],
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.forest_available_for_wood_supply_even_aged_stands_of_which',
              labelParams: { year: 1990 },
              variableExport: 'forest_available_for_wood_supply_even_aged_stands_of_which_1990',
              subcategory: false,
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2020 },
              variableExport: 'predominantly_coniferous_forest_2020',
              subcategory: true,
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2015 },
              variableExport: 'predominantly_coniferous_forest_2015',
              subcategory: true,
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2010 },
              variableExport: 'predominantly_coniferous_forest_2010',
              subcategory: true,
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2005 },
              variableExport: 'predominantly_coniferous_forest_2005',
              subcategory: true,
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 2000 },
              variableExport: 'predominantly_coniferous_forest_2000',
              subcategory: true,
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_coniferous_forest',
              labelParams: { year: 1990 },
              variableExport: 'predominantly_coniferous_forest_1990',
              subcategory: true,
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2020 },
              variableExport: 'predominantly_broadleaved_forest_2020',
              subcategory: true,
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2015 },
              variableExport: 'predominantly_broadleaved_forest_2015',
              subcategory: true,
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2010 },
              variableExport: 'predominantly_broadleaved_forest_2010',
              subcategory: true,
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2005 },
              variableExport: 'predominantly_broadleaved_forest_2005',
              subcategory: true,
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 2000 },
              variableExport: 'predominantly_broadleaved_forest_2000',
              subcategory: true,
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.predominantly_broadleaved_forest',
              labelParams: { year: 1990 },
              variableExport: 'predominantly_broadleaved_forest_1990',
              subcategory: true,
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2020 },
              variableExport: 'mixed_forest_2020',
              subcategory: true,
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2015 },
              variableExport: 'mixed_forest_2015',
              subcategory: true,
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2010 },
              variableExport: 'mixed_forest_2010',
              subcategory: true,
            },
            {
              idx: 21,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2005 },
              variableExport: 'mixed_forest_2005',
              subcategory: true,
            },
            {
              idx: 22,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 2000 },
              variableExport: 'mixed_forest_2000',
              subcategory: true,
            },
            {
              idx: 23,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__subcategory-cell',
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
              labelKey:
                'panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mixed_forest',
              labelParams: { year: 1990 },
              variableExport: 'mixed_forest_1990',
              subcategory: true,
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'thousandCubicMeter',
          columnsExport: ['total_volume', 'regeneration_phase', 'intermediate_phase', 'mature_phase', 'unspecified'],
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
