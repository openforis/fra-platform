// @ts-nocheck

export const carbonStock = {
  sectionName: 'carbonStock',
  sectionAnchor: '1.4a',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_1_4a',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.carbonStock.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStock.carbonMillionMetricTonnes',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 2,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStock.carbonInAboveGroundAndBelowGroundLivingBiomass',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 3,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStock.carbonInDeadwoodAndLitter',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.carbonStock.soil_carbon',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
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
                  labelKey: 'panEuropean.carbonStock.carbonInAboveGroundAndBelowGroundLivingBiomass',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 1,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStock.carbonInDeadwoodAndLitter',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.carbonStock.soil_carbon',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              type: 'header',
            },
            {
              idx: 'header_2',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStock.aboveGround',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStock.belowGround',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStock.deadwoodCarbon',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStock.litterCarbon',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_3',
              cols: [
                {
                  idx: 0,
                  colSpan: 5,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStock.millionMetricTonnes',
                  className: 'fra-table__header-cell',
                  migration: {
                    cycles: ['2020'],
                  },
                  type: 'header',
                },
              ],
              migration: {
                cycles: ['2020'],
              },
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
                  labelKey: 'panEuropean.carbonStock.forest',
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
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.carbonStock.forest',
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
                  labelKey: 'panEuropean.carbonStock.forest',
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
              labelKey: 'panEuropean.carbonStock.forest',
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
                  labelKey: 'panEuropean.carbonStock.forest',
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
              labelKey: 'panEuropean.carbonStock.forest',
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
                  labelKey: 'panEuropean.carbonStock.forest',
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
              labelKey: 'panEuropean.carbonStock.forest',
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
                  labelKey: 'panEuropean.carbonStock.forest',
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
              labelKey: 'panEuropean.carbonStock.forest',
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
                  labelKey: 'panEuropean.carbonStock.forest',
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
              labelKey: 'panEuropean.carbonStock.forest',
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
                  labelKey: 'panEuropean.carbonStock.forest',
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
              labelKey: 'panEuropean.carbonStock.forest',
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
                  labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
              labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
              labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
              labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
              labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
              labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
              labelKey: 'panEuropean.carbonStock.other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2025['above_ground'],
                  [table_1_4a.other_wooded_land_2025['above_ground'],table_1_4a.forest_2025['above_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2025['below_ground'],
                  [table_1_4a.other_wooded_land_2025['below_ground'],table_1_4a.forest_2025['below_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2025['deadwood'],
                  [table_1_4a.other_wooded_land_2025['deadwood'],table_1_4a.forest_2025['deadwood']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2025['litter'],
                  [table_1_4a.other_wooded_land_2025['litter'],table_1_4a.forest_2025['litter']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2025['soil_carbon'],
                  [table_1_4a.other_wooded_land_2025['soil_carbon'],table_1_4a.forest_2025['soil_carbon']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2020['above_ground'],
                  [table_1_4a.other_wooded_land_2020['above_ground'],table_1_4a.forest_2020['above_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2020['below_ground'],
                  [table_1_4a.other_wooded_land_2020['below_ground'],table_1_4a.forest_2020['below_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2020['deadwood'],
                  [table_1_4a.other_wooded_land_2020['deadwood'],table_1_4a.forest_2020['deadwood']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2020['litter'],
                  [table_1_4a.other_wooded_land_2020['litter'],table_1_4a.forest_2020['litter']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2020['soil_carbon'],
                  [table_1_4a.other_wooded_land_2020['soil_carbon'],table_1_4a.forest_2020['soil_carbon']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2015['above_ground'],
                  [table_1_4a.other_wooded_land_2015['above_ground'],table_1_4a.forest_2015['above_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2015['below_ground'],
                  [table_1_4a.other_wooded_land_2015['below_ground'],table_1_4a.forest_2015['below_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2015['deadwood'],
                  [table_1_4a.other_wooded_land_2015['deadwood'],table_1_4a.forest_2015['deadwood']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2015['litter'],
                  [table_1_4a.other_wooded_land_2015['litter'],table_1_4a.forest_2015['litter']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2015['soil_carbon'],
                  [table_1_4a.other_wooded_land_2015['soil_carbon'],table_1_4a.forest_2015['soil_carbon']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2010['above_ground'],
                  [table_1_4a.other_wooded_land_2010['above_ground'],table_1_4a.forest_2010['above_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2010['below_ground'],
                  [table_1_4a.other_wooded_land_2010['below_ground'],table_1_4a.forest_2010['below_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2010['deadwood'],
                  [table_1_4a.other_wooded_land_2010['deadwood'],table_1_4a.forest_2010['deadwood']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2010['litter'],
                  [table_1_4a.other_wooded_land_2010['litter'],table_1_4a.forest_2010['litter']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2010['soil_carbon'],
                  [table_1_4a.other_wooded_land_2010['soil_carbon'],table_1_4a.forest_2010['soil_carbon']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2005['above_ground'],
                  [table_1_4a.other_wooded_land_2005['above_ground'],table_1_4a.forest_2005['above_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2005['below_ground'],
                  [table_1_4a.other_wooded_land_2005['below_ground'],table_1_4a.forest_2005['below_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2005['deadwood'],
                  [table_1_4a.other_wooded_land_2005['deadwood'],table_1_4a.forest_2005['deadwood']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2005['litter'],
                  [table_1_4a.other_wooded_land_2005['litter'],table_1_4a.forest_2005['litter']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2005['soil_carbon'],
                  [table_1_4a.other_wooded_land_2005['soil_carbon'],table_1_4a.forest_2005['soil_carbon']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2000['above_ground'],
                  [table_1_4a.other_wooded_land_2000['above_ground'],table_1_4a.forest_2000['above_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2000['below_ground'],
                  [table_1_4a.other_wooded_land_2000['below_ground'],table_1_4a.forest_2000['below_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2000['deadwood'],
                  [table_1_4a.other_wooded_land_2000['deadwood'],table_1_4a.forest_2000['deadwood']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2000['litter'],
                  [table_1_4a.other_wooded_land_2000['litter'],table_1_4a.forest_2000['litter']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_2000['soil_carbon'],
                  [table_1_4a.other_wooded_land_2000['soil_carbon'],table_1_4a.forest_2000['soil_carbon']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                  labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
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
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_1990['above_ground'],
                  [table_1_4a.other_wooded_land_1990['above_ground'],table_1_4a.forest_1990['above_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_1990['below_ground'],
                  [table_1_4a.other_wooded_land_1990['below_ground'],table_1_4a.forest_1990['below_ground']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_1990['deadwood'],
                  [table_1_4a.other_wooded_land_1990['deadwood'],table_1_4a.forest_1990['deadwood']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_1990['litter'],
                  [table_1_4a.other_wooded_land_1990['litter'],table_1_4a.forest_1990['litter']])`,
                    `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_1990['soil_carbon'],
                  [table_1_4a.other_wooded_land_1990['soil_carbon'],table_1_4a.forest_1990['soil_carbon']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.carbonStock.total_forest_and_other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'total_forest_and_other_wooded_land_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionTonnes',
          columnsExport: ['above_ground', 'below_ground', 'deadwood', 'litter', 'soil_carbon'],
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.carbonStockInHarvestedWoodProductsHWP',
      tableSpecs: [
        {
          name: 'table_1_4b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.carbonStockInHarvestedWoodProductsHWP.totalCarbonStockInHWPMillionMetricTonnes',
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
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2025 },
              variableExport: 'harvested_wood_products_2025',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2020 },
              variableExport: 'harvested_wood_products_2020',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2015 },
              variableExport: 'harvested_wood_products_2015',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2010 },
              variableExport: 'harvested_wood_products_2010',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2005 },
              variableExport: 'harvested_wood_products_2005',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2000 },
              variableExport: 'harvested_wood_products_2000',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 1990 },
              variableExport: 'harvested_wood_products_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionTonnes',
          columnsExport: ['total_carbon_stock_in_hwp'],
          migration: {
            cycles: ['2025'],
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.reasonabilityChecks.reasonabilityCheck',
      descriptionKey: 'panEuropean.reasonabilityChecks.description',
      tableSpecs: [
        {
          name: 'reasonability_check_1_4',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.variable',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.forest',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.FAWS',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.OWL',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.FOWL',
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
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
                  labelParams: { year: 2020 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2020.below_ground / table_1_4a.forest_2020.above_ground',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2020.below_ground / table_1_4a.other_wooded_land_2020.above_ground',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2020.below_ground / table_1_4a.total_forest_and_other_wooded_land_2020.above_ground',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
              labelParams: { year: 2020 },
              variableExport: 'carbonBelowByCarbonAbove_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
                  labelParams: { year: 2015 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2015.below_ground / table_1_4a.forest_2015.above_ground',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2015.below_ground / table_1_4a.other_wooded_land_2015.above_ground',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2015.below_ground / table_1_4a.total_forest_and_other_wooded_land_2015.above_ground',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
              labelParams: { year: 2015 },
              variableExport: 'carbonBelowByCarbonAbove_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
                  labelParams: { year: 2010 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2010.below_ground / table_1_4a.forest_2010.above_ground',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2010.below_ground / table_1_4a.other_wooded_land_2010.above_ground',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2010.below_ground / table_1_4a.total_forest_and_other_wooded_land_2010.above_ground',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
              labelParams: { year: 2010 },
              variableExport: 'carbonBelowByCarbonAbove_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
                  labelParams: { year: 2005 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2005.below_ground / table_1_4a.forest_2005.above_ground',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2005.below_ground / table_1_4a.other_wooded_land_2005.above_ground',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2005.below_ground / table_1_4a.total_forest_and_other_wooded_land_2005.above_ground',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
              labelParams: { year: 2005 },
              variableExport: 'carbonBelowByCarbonAbove_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
                  labelParams: { year: 2000 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2000.below_ground / table_1_4a.forest_2000.above_ground',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2000.below_ground / table_1_4a.other_wooded_land_2000.above_ground',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2000.below_ground / table_1_4a.total_forest_and_other_wooded_land_2000.above_ground',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
              labelParams: { year: 2000 },
              variableExport: 'carbonBelowByCarbonAbove_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
                  labelParams: { year: 1990 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_1990.below_ground / table_1_4a.forest_1990.above_ground',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_1990.below_ground / table_1_4a.other_wooded_land_1990.above_ground',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_1990.below_ground / table_1_4a.total_forest_and_other_wooded_land_1990.above_ground',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonBelowByCarbonAbove',
              labelParams: { year: 1990 },
              variableExport: 'carbonBelowByCarbonAbove_1990',
            },

            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
                  labelParams: { year: 2020 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2020.above_ground / table_1_2a.forest_2020.total',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2020.above_ground / table_1_2a.other_wooded_land_2020.total',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2020.above_ground / table_1_2a.total_forest_and_other_wooded_land_2020.total',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
              labelParams: { year: 2020 },
              variableExport: 'carbonAboveByGrowingStock_2020',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
                  labelParams: { year: 2015 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2015.above_ground / table_1_2a.forest_2015.total',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2015.above_ground / table_1_2a.other_wooded_land_2015.total',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2015.above_ground / table_1_2a.total_forest_and_other_wooded_land_2015.total',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
              labelParams: { year: 2015 },
              variableExport: 'carbonAboveByGrowingStock_2015',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
                  labelParams: { year: 2010 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2010.above_ground / table_1_2a.forest_2010.total',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2010.above_ground / table_1_2a.other_wooded_land_2010.total',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2010.above_ground / table_1_2a.total_forest_and_other_wooded_land_2010.total',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
              labelParams: { year: 2010 },
              variableExport: 'carbonAboveByGrowingStock_2010',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
                  labelParams: { year: 2005 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2005.above_ground / table_1_2a.forest_2005.total',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2005.above_ground / table_1_2a.other_wooded_land_2005.total',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2005.above_ground / table_1_2a.total_forest_and_other_wooded_land_2005.total',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
              labelParams: { year: 2005 },
              variableExport: 'carbonAboveByGrowingStock_2005',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
                  labelParams: { year: 2000 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2000.above_ground / table_1_2a.forest_2000.total',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2000.above_ground / table_1_2a.other_wooded_land_2000.total',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2000.above_ground / table_1_2a.total_forest_and_other_wooded_land_2000.total',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
              labelParams: { year: 2000 },
              variableExport: 'carbonAboveByGrowingStock_2000',
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
                  labelParams: { year: 1990 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_1990.above_ground / table_1_2a.forest_1990.total',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_1990.above_ground / table_1_2a.other_wooded_land_1990.total',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_1990.above_ground / table_1_2a.total_forest_and_other_wooded_land_1990.total',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.carbonAboveByGrowingStock',
              labelParams: { year: 1990 },
              variableExport: 'carbonAboveByGrowingStock_1990',
            },

            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
                  labelParams: { year: 2020 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2020.soil_carbon * 1000 / table_1_1a.forest_2020.area',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2020.soil_carbon * 1000 / table_1_1a.other_wooded_land_2020.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2020.soil_carbon * 1000 / table_1_1a.total_forest_and_other_wooded_land_2020.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
              labelParams: { year: 2020 },
              variableExport: 'soilCarbon_2020',
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
                  labelParams: { year: 2015 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2015.soil_carbon * 1000 / table_1_1a.forest_2015.area',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2015.soil_carbon * 1000 / table_1_1a.other_wooded_land_2015.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2015.soil_carbon * 1000 / table_1_1a.total_forest_and_other_wooded_land_2015.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
              labelParams: { year: 2015 },
              variableExport: 'soilCarbon_2015',
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
                  labelParams: { year: 2010 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2010.soil_carbon * 1000 / table_1_1a.forest_2010.area',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2010.soil_carbon * 1000 / table_1_1a.other_wooded_land_2010.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2010.soil_carbon * 1000 / table_1_1a.total_forest_and_other_wooded_land_2010.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
              labelParams: { year: 2010 },
              variableExport: 'soilCarbon_2010',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
                  labelParams: { year: 2005 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2005.soil_carbon * 1000 / table_1_1a.forest_2005.area',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2005.soil_carbon * 1000 / table_1_1a.other_wooded_land_2005.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2005.soil_carbon * 1000 / table_1_1a.total_forest_and_other_wooded_land_2005.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
              labelParams: { year: 2005 },
              variableExport: 'soilCarbon_2005',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
                  labelParams: { year: 2000 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_2000.soil_carbon * 1000 / table_1_1a.forest_2000.area',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_2000.soil_carbon * 1000 / table_1_1a.other_wooded_land_2000.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_2000.soil_carbon * 1000 / table_1_1a.total_forest_and_other_wooded_land_2000.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
              labelParams: { year: 2000 },
              variableExport: 'soilCarbon_2000',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
                  labelParams: { year: 1990 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_1_4a.forest_1990.soil_carbon * 1000 / table_1_1a.forest_1990.area',
                  },
                },
                { idx: 1, type: 'placeholder' },
                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.other_wooded_land_1990.soil_carbon * 1000 / table_1_1a.other_wooded_land_1990.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_1_4a.total_forest_and_other_wooded_land_1990.soil_carbon * 1000 / table_1_1a.total_forest_and_other_wooded_land_1990.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.soilCarbon',
              labelParams: { year: 1990 },
              variableExport: 'soilCarbon_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': ['variable', 'forest', 'FAWS', 'OWL', 'FOWL'] },
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_1_4_1',
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
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
            {
              idx: 1,
              type: 'data',
              variableName: 'extrapolation',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.extrapolation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
            {
              idx: 2,
              type: 'data',
              variableName: 'assessmentBasedOnEvidence',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.assessmentBasedOnEvidence',
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
          name: 'country_comments_1_4_2',
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
                  labelKey: 'panEuropean.countryComments.commentsRelatedToDataDefinitionsConversionFactorsUsed',
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
              'carbonStockInAboveGroundLivingBiomass',
              'carbonStockInAboveGroundLivingBiomass',
              'carbonStockInDeadwood',
              'carbonStockInLitter',
              'carbonStockInSoil',
              'biomassCarbonConversionFactorUsed',
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
            columnNames: {
              '2025': ['comment', 'comment_trends'],
            },
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
      '2020': '1.4a',
      '2025': '1.4',
    },
  },
}
export const carbonStockInHarvestedWoodProductsHWP = {
  sectionName: 'carbonStockInHarvestedWoodProductsHWP',
  sectionAnchor: '1.4b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_1_4b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.carbonStockInHarvestedWoodProductsHWP.totalCarbonStockInHWPMillionMetricTonnes',
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
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2025 },
              variableExport: 'harvested_wood_products_2025',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2020 },
              variableExport: 'harvested_wood_products_2020',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2015 },
              variableExport: 'harvested_wood_products_2015',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2010 },
              variableExport: 'harvested_wood_products_2010',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products',
              labelParams: { year: 2005 },
              variableExport: 'harvested_wood_products_2005',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWPharvested_wood_products',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWPharvested_wood_products',
              labelParams: { year: 2000 },
              variableExport: 'harvested_wood_products_2000',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWPharvested_wood_products',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.carbonStockInHarvestedWoodProductsHWPharvested_wood_products',
              labelParams: { year: 1990 },
              variableExport: 'harvested_wood_products_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'millionTonnes',
          columnsExport: ['total_carbon_stock_in_hwp'],
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
