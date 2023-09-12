// @ts-nocheck

const dataColsWithValidation = [
  {
    idx: 0,
    type: 'decimal',
    colName: 'total_area_with_damage',
    migration: {
      forceColName: true,
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['total_area_with_damage'],
                    [table_2_4.forest_year_placeholder['total_area_with_damage'],table_2_4.other_wooded_land_year_placeholder['total_area_with_damage']])`,
        ],
      },
    },
  },
  {
    idx: 1,
    type: 'decimal',
    colName: 'insects',
    migration: {
      forceColName: true,
      cycles: ['2025'],
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['insects'],
                    [table_2_4.forest_year_placeholder['insects'],table_2_4.other_wooded_land_year_placeholder['insects']])`,
        ],
      },
    },
  },
  {
    idx: 2,
    type: 'decimal',
    colName: 'disease',
    migration: {
      forceColName: true,
      cycles: ['2025'],
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['disease'],
                    [table_2_4.forest_year_placeholder['disease'],table_2_4.other_wooded_land_year_placeholder['disease']],
                    "table_2_4.total_forest_and_other_wooded_land_year_placeholder", "disease", "2.4",
                    "[table_2_4.forest_year_placeholder[disease],table_2_4.other_wooded_land_year_placeholder[disease]")`,
        ],
      },
    },
  },
  { idx: 3, type: 'decimal', colName: 'insects_and_disease', migration: { forceColName: true, cycles: ['2020'] } },
  {
    idx: 4,
    type: 'decimal',
    colName: 'wildlife_and_grazing',
    migration: {
      forceColName: true,
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['wildlife_and_grazing'],
                    [table_2_4.forest_year_placeholder['wildlife_and_grazing'],table_2_4.other_wooded_land_year_placeholder['wildlife_and_grazing']])`,
        ],
      },
    },
  },
  {
    idx: 5,
    type: 'decimal',
    colName: 'forest_operations',
    migration: {
      forceColName: true,
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['forest_operations'],
                    [table_2_4.forest_year_placeholder['forest_operations'],table_2_4.other_wooded_land_year_placeholder['forest_operations']])`,
        ],
      },
    },
  },
  {
    idx: 6,
    type: 'decimal',
    colName: 'other',
    migration: {
      forceColName: true,
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['other'],
                    [table_2_4.forest_year_placeholder['other'],table_2_4.other_wooded_land_year_placeholder['other']])`,
        ],
      },
    },
  },
  {
    idx: 7,
    type: 'decimal',
    colName: 'primarily_damaged_by_abiotic_agents',
    migration: {
      forceColName: true,
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['primarily_damaged_by_abiotic_agents'],
                    [table_2_4.forest_year_placeholder['primarily_damaged_by_abiotic_agents'],table_2_4.other_wooded_land_year_placeholder['primarily_damaged_by_abiotic_agents']])`,
        ],
      },
    },
  },
  {
    idx: 8,
    type: 'decimal',
    colName: 'unspecified_mixed_damage_2025',
    migration: {
      cycles: ['2025'],
      forceColName: true,
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['unspecified_mixed_damage_2025'],
                    [table_2_4.forest_year_placeholder['unspecified_mixed_damage_2025'],table_2_4.other_wooded_land_year_placeholder['unspecified_mixed_damage_2025']])`,
        ],
      },
    },
  },
  {
    idx: 9,
    type: 'decimal',
    colName: 'primarily_damaged_by_fire_total',
    migration: {
      forceColName: true,
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['primarily_damaged_by_fire_total'],
                    [table_2_4.forest_year_placeholder['primarily_damaged_by_fire_total'],table_2_4.other_wooded_land_year_placeholder['primarily_damaged_by_fire_total']])`,
        ],
      },
    },
  },
  {
    idx: 10,
    type: 'decimal',
    colName: 'of_which_human_induced',
    migration: {
      forceColName: true,
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['of_which_human_induced'],
                    [table_2_4.forest_year_placeholder['of_which_human_induced'],table_2_4.other_wooded_land_year_placeholder['of_which_human_induced']])`,
        ],
      },
    },
  },
  {
    idx: 11,
    type: 'decimal',
    colName: 'unspecified_mixed_damage',
    migration: {
      cycles: ['2020'],
      forceColName: true,
      validateFns: {
        '2025': [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_year_placeholder['unspecified_mixed_damage'],
                    [table_2_4.forest_year_placeholder['unspecified_mixed_damage'],table_2_4.other_wooded_land_year_placeholder['unspecified_mixed_damage']])`,
        ],
      },
    },
  },
]

const updatedDataColsValidation = (year: string) =>
  dataColsWithValidation.map((col) => {
    if (col.migration && col.migration.validateFns && col.migration.validateFns['2025']) {
      const validateFns = {
        ...col.migration.validateFns,
        '2025': col.migration.validateFns['2025'].map((fn: string) => fn.replace(/year_placeholder/g, year)),
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

const dataCols = [
  { idx: 0, type: 'decimal', colName: 'total_area_with_damage', migration: { forceColName: true } },
  { idx: 1, type: 'decimal', colName: 'insects', migration: { forceColName: true, cycles: ['2025'] } },
  { idx: 2, type: 'decimal', colName: 'disease', migration: { forceColName: true, cycles: ['2025'] } },
  { idx: 3, type: 'decimal', colName: 'insects_and_disease', migration: { forceColName: true, cycles: ['2020'] } },
  { idx: 4, type: 'decimal', colName: 'wildlife_and_grazing', migration: { forceColName: true } },
  { idx: 5, type: 'decimal', colName: 'forest_operations', migration: { forceColName: true } },
  { idx: 6, type: 'decimal', colName: 'other', migration: { forceColName: true } },
  {
    idx: 7,
    type: 'decimal',
    colName: 'primarily_damaged_by_abiotic_agents',
    migration: { forceColName: true },
  },
  {
    idx: 8,
    type: 'decimal',
    colName: 'unspecified_mixed_damage_2025',
    migration: { cycles: ['2025'], forceColName: true },
  },
  {
    idx: 9,
    type: 'decimal',
    colName: 'primarily_damaged_by_fire_total',
    migration: { forceColName: true },
  },
  { idx: 10, type: 'decimal', colName: 'of_which_human_induced', migration: { forceColName: true } },
  {
    idx: 11,
    type: 'decimal',
    colName: 'unspecified_mixed_damage',
    migration: { cycles: ['2020'], forceColName: true },
  },
]

const linkedDataCols = (colName) => {
  const linkedNodesToAdd = {
    1: {
      '2025': {
        assessmentName: 'fra',
        cycleName: '2025',
        tableName: 'disturbances',
        variableName: 'insects',
        colName,
      },
    },
    2: {
      '2025': {
        assessmentName: 'fra',
        cycleName: '2025',
        tableName: 'disturbances',
        variableName: 'diseases',
        colName,
      },
    },
    7: {
      '2025': {
        assessmentName: 'fra',
        cycleName: '2025',
        tableName: 'disturbances',
        variableName: 'severe_weather_events',
        colName,
      },
    },
    9: {
      '2025': {
        assessmentName: 'fra',
        cycleName: '2025',
        tableName: 'areaAffectedByFire',
        variableName: 'of_which_on_forest',
        colName,
      },
    },
  }

  return dataCols.map((col) => {
    if (Object.prototype.hasOwnProperty.call(linkedNodesToAdd, col.idx)) {
      return {
        ...col,
        migration: {
          ...col.migration,
          linkedNodes: linkedNodesToAdd[col.idx],
        },
      }
    }
    return col
  })
}

export const forestAreaWithDamage = {
  sectionName: 'forestAreaWithDamage',
  sectionAnchor: '2.4',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_2_4',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 4,
                  labelKey: 'panEuropean.forestAreaWithDamage.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.forestAreaWithDamage.total_area_with_damage',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 2,
                  colSpan: 7,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.areaWithDamageByDifferentAgents',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    label: {
                      '2020': { key: 'panEuropean.forestAreaWithDamage.areaWithDamageByDifferentAgents' },
                      '2025': { key: 'panEuropean.forestAreaWithDamage.areaDamageExcFireHa' },
                    },
                    style: {
                      '2020': { colSpan: 7 },
                      '2025': { colSpan: 8 },
                    },
                  },
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.forestAreaWithDamage.unspecifiedMixedDamage',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 4,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByFireHa',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
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
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByFireTotal',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 1,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByBioticAgents',
                  className: 'fra-table__header-cell',
                  type: 'header',

                  migration: {
                    style: {
                      '2020': { colSpan: 2 },
                      '2025': { colSpan: 3 },
                    },
                  },
                },
                {
                  idx: 2,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.damagePrimarilyHumanInduced',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByAbioticAgents',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.forestAreaWithDamage.unspecifiedMixedDamage',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 5,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByFire',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByFireTotal',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.forestAreaWithDamage.ofWhichHumanInduced',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
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
                  labelKey: 'panEuropean.forestAreaWithDamage.insects',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.disease',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2025'],
                  },
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.insectsAndDisease',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.wildlifeAndGrazing',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forestOperations',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.otherHumanInduced',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.primarilyDamagedByFireTotal',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.ofWhichHumanInduced',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
                },
              ],
              type: 'header',
            },
            {
              idx: 'header_3',
              cols: [
                {
                  idx: 0,
                  colSpan: 9,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.thousandHa',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    cycles: ['2020'],
                  },
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
              variableName: 'forest_2022',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2022 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2022'),
              ],
              migration: {
                cycles: ['2025'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2022['total_area_with_damage'],
                    [table_2_4.forest_2022['insects'], table_2_4.forest_2022['disease'],table_2_4.forest_2022['wildlife_and_grazing'],
                    table_2_4.forest_2022['forest_operations'],table_2_4.forest_2022['other'],
                    table_2_4.forest_2022['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2022['primarily_damaged_by_fire_total'],
                    table_2_4.forest_2022['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2022 },
              variableExport: 'forest_2022',
            },
            {
              idx: 1,
              type: 'data',
              variableName: 'forest_2021',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2021 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2021'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2021['total_area_with_damage'],
                     [table_2_4.forest_2021['insects'], table_2_4.forest_2021['disease'],table_2_4.forest_2021['wildlife_and_grazing'],
                     table_2_4.forest_2021['forest_operations'],table_2_4.forest_2021['other'],
                     table_2_4.forest_2021['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2021['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2021['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2021 },
              variableExport: 'forest_2021',
            },
            {
              idx: 2,
              type: 'data',
              variableName: 'forest_2020',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2020'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2020['total_area_with_damage'],
                     [table_2_4.forest_2020['insects'], table_2_4.forest_2020['disease'],table_2_4.forest_2020['wildlife_and_grazing'],
                     table_2_4.forest_2020['forest_operations'],table_2_4.forest_2020['other'],
                     table_2_4.forest_2020['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2020['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2020['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2020 },
              variableExport: 'forest_2020',
            },
            {
              idx: 3,
              type: 'data',
              variableName: 'forest_2019',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2019 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2019'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2019['total_area_with_damage'],
                     [table_2_4.forest_2019['insects'], table_2_4.forest_2019['disease'],table_2_4.forest_2019['wildlife_and_grazing'],
                     table_2_4.forest_2019['forest_operations'],table_2_4.forest_2019['other'],
                     table_2_4.forest_2019['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2019['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2019['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2019 },
              variableExport: 'forest_2019',
            },
            {
              idx: 4,
              type: 'data',
              variableName: 'forest_2018',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2018 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2018'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2018['total_area_with_damage'],
                     [table_2_4.forest_2018['insects'], table_2_4.forest_2018['disease'],table_2_4.forest_2018['wildlife_and_grazing'],
                     table_2_4.forest_2018['forest_operations'],table_2_4.forest_2018['other'],
                     table_2_4.forest_2018['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2018['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2018['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2018 },
              variableExport: 'forest_2018',
            },
            {
              idx: 5,
              type: 'data',
              variableName: 'forest_2017',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2017 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2017'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2017['total_area_with_damage'],
                     [table_2_4.forest_2017['insects'], table_2_4.forest_2017['disease'],table_2_4.forest_2017['wildlife_and_grazing'],
                     table_2_4.forest_2017['forest_operations'],table_2_4.forest_2017['other'],
                     table_2_4.forest_2017['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2017['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2017['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2017 },
              variableExport: 'forest_2017',
            },
            {
              idx: 6,
              variableName: 'forest_2016',
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2016 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2016'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2016['total_area_with_damage'],
                     [table_2_4.forest_2016['insects'], table_2_4.forest_2016['disease'],table_2_4.forest_2016['wildlife_and_grazing'],
                     table_2_4.forest_2016['forest_operations'],table_2_4.forest_2016['other'],
                     table_2_4.forest_2016['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2016['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2016['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2016 },
              variableExport: 'forest_2016',
            },
            {
              idx: 7,
              type: 'data',
              variableName: 'forest_2015',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2015'),
              ],
              migration: {
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2015['total_area_with_damage'],
                     [table_2_4.forest_2015['insects'], table_2_4.forest_2015['disease'],table_2_4.forest_2015['wildlife_and_grazing'],
                     table_2_4.forest_2015['forest_operations'],table_2_4.forest_2015['other'],
                     table_2_4.forest_2015['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2015['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2015['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2015 },
              variableExport: 'forest_2015',
            },
            {
              idx: 8,
              type: 'data',
              variableName: 'forest_2014',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2014 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2014'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2014['total_area_with_damage'],
                [table_2_4.forest_2014['insects'], table_2_4.forest_2014['disease'],table_2_4.forest_2014['wildlife_and_grazing'],
                table_2_4.forest_2014['forest_operations'],table_2_4.forest_2014['other'],
                table_2_4.forest_2014['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2014['primarily_damaged_by_fire_total'],
                table_2_4.forest_2014['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2014 },
              variableExport: 'forest_2014',
            },
            {
              idx: 9,
              type: 'data',
              variableName: 'forest_2013',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2013 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2013'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2013['total_area_with_damage'],
                [table_2_4.forest_2013['insects'], table_2_4.forest_2013['disease'],table_2_4.forest_2013['wildlife_and_grazing'],
                table_2_4.forest_2013['forest_operations'],table_2_4.forest_2013['other'],
                table_2_4.forest_2013['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2013['primarily_damaged_by_fire_total'],
                table_2_4.forest_2013['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2013 },
              variableExport: 'forest_2013',
            },
            {
              idx: 10,
              type: 'data',
              variableName: 'forest_2012',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2012 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2012'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2012['total_area_with_damage'],
                [table_2_4.forest_2012['insects'], table_2_4.forest_2012['disease'],table_2_4.forest_2012['wildlife_and_grazing'],
                table_2_4.forest_2012['forest_operations'],table_2_4.forest_2012['other'],
                table_2_4.forest_2012['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2012['primarily_damaged_by_fire_total'],
                table_2_4.forest_2012['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2012 },
              variableExport: 'forest_2012',
            },
            {
              idx: 11,
              type: 'data',
              variableName: 'forest_2011',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2011 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2011'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2011['total_area_with_damage'],
                [table_2_4.forest_2011['insects'], table_2_4.forest_2011['disease'],table_2_4.forest_2011['wildlife_and_grazing'],
                table_2_4.forest_2011['forest_operations'],table_2_4.forest_2011['other'],
                table_2_4.forest_2011['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2011['primarily_damaged_by_fire_total'],
                table_2_4.forest_2011['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2011 },
              variableExport: 'forest_2011',
            },
            {
              idx: 12,
              type: 'data',
              variableName: 'forest_2010',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2010'),
              ],
              migration: {
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2010['total_area_with_damage'],
                     [table_2_4.forest_2010['insects'], table_2_4.forest_2010['disease'],table_2_4.forest_2010['wildlife_and_grazing'],
                     table_2_4.forest_2010['forest_operations'],table_2_4.forest_2010['other'],
                     table_2_4.forest_2010['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2010['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2010['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2010 },
              variableExport: 'forest_2010',
            },
            {
              idx: 13,
              type: 'data',
              variableName: 'forest_2009',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2009 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2009'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2009['total_area_with_damage'],
                [table_2_4.forest_2009['insects'], table_2_4.forest_2009['disease'],table_2_4.forest_2009['wildlife_and_grazing'],
                table_2_4.forest_2009['forest_operations'],table_2_4.forest_2009['other'],
                table_2_4.forest_2009['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2009['primarily_damaged_by_fire_total'],
                table_2_4.forest_2009['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2009 },
              variableExport: 'forest_2009',
            },
            {
              idx: 14,
              type: 'data',
              variableName: 'forest_2008',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2008 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2008'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2008['total_area_with_damage'],
                [table_2_4.forest_2008['insects'], table_2_4.forest_2008['disease'],table_2_4.forest_2008['wildlife_and_grazing'],
                table_2_4.forest_2008['forest_operations'],table_2_4.forest_2008['other'],
                table_2_4.forest_2008['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2008['primarily_damaged_by_fire_total'],
                table_2_4.forest_2008['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2008 },
              variableExport: 'forest_2008',
            },
            {
              idx: 15,
              type: 'data',
              variableName: 'forest_2007',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2007 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2007'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2007['total_area_with_damage'],
                [table_2_4.forest_2007['insects'], table_2_4.forest_2007['disease'],table_2_4.forest_2007['wildlife_and_grazing'],
                table_2_4.forest_2007['forest_operations'],table_2_4.forest_2007['other'],
                table_2_4.forest_2007['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2007['primarily_damaged_by_fire_total'],
                table_2_4.forest_2007['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2007 },
              variableExport: 'forest_2007',
            },
            {
              idx: 16,
              type: 'data',
              variableName: 'forest_2006',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2006 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2006'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2006['total_area_with_damage'],
                [table_2_4.forest_2006['insects'], table_2_4.forest_2006['disease'],table_2_4.forest_2006['wildlife_and_grazing'],
                table_2_4.forest_2006['forest_operations'],table_2_4.forest_2006['other'],
                table_2_4.forest_2006['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2006['primarily_damaged_by_fire_total'],
                table_2_4.forest_2006['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2006 },
              variableExport: 'forest_2006',
            },
            {
              idx: 17,
              type: 'data',
              variableName: 'forest_2005',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2005'),
              ],
              migration: {
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2005['total_area_with_damage'],
                     [table_2_4.forest_2005['insects'], table_2_4.forest_2005['disease'],table_2_4.forest_2005['wildlife_and_grazing'],
                     table_2_4.forest_2005['forest_operations'],table_2_4.forest_2005['other'],
                     table_2_4.forest_2005['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2005['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2005['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2005 },
              variableExport: 'forest_2005',
            },
            {
              idx: 18,
              type: 'data',
              variableName: 'forest_2004',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2004 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2004'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2004['total_area_with_damage'],
                [table_2_4.forest_2004['insects'], table_2_4.forest_2004['disease'],table_2_4.forest_2004['wildlife_and_grazing'],
                table_2_4.forest_2004['forest_operations'],table_2_4.forest_2004['other'],
                table_2_4.forest_2004['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2004['primarily_damaged_by_fire_total'],
                table_2_4.forest_2004['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2004 },
              variableExport: 'forest_2004',
            },
            {
              idx: 19,
              type: 'data',
              variableName: 'forest_2003',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2003 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2003'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2003['total_area_with_damage'],
                [table_2_4.forest_2003['insects'], table_2_4.forest_2003['disease'],table_2_4.forest_2003['wildlife_and_grazing'],
                table_2_4.forest_2003['forest_operations'],table_2_4.forest_2003['other'],
                table_2_4.forest_2003['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2003['primarily_damaged_by_fire_total'],
                table_2_4.forest_2003['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2003 },
              variableExport: 'forest_2003',
            },
            {
              idx: 20,
              type: 'data',
              variableName: 'forest_2002',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2002 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2002'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2002['total_area_with_damage'],
                [table_2_4.forest_2002['insects'], table_2_4.forest_2002['disease'],table_2_4.forest_2002['wildlife_and_grazing'],
                table_2_4.forest_2002['forest_operations'],table_2_4.forest_2002['other'],
                table_2_4.forest_2002['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2002['primarily_damaged_by_fire_total'],
                table_2_4.forest_2002['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2002 },
              variableExport: 'forest_2002',
            },
            {
              idx: 21,
              type: 'data',
              variableName: 'forest_2001',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2001 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2001'),
              ],
              migration: {
                cycles: ['2025'],
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2001['total_area_with_damage'],
                [table_2_4.forest_2001['insects'], table_2_4.forest_2001['disease'],table_2_4.forest_2001['wildlife_and_grazing'],
                table_2_4.forest_2001['forest_operations'],table_2_4.forest_2001['other'],
                table_2_4.forest_2001['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2001['primarily_damaged_by_fire_total'],
                table_2_4.forest_2001['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2001 },
              variableExport: 'forest_2001',
            },
            {
              idx: 22,
              type: 'data',
              variableName: 'forest_2000',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...linkedDataCols('2000'),
              ],
              migration: {
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_2000['total_area_with_damage'],
                     [table_2_4.forest_2000['insects'], table_2_4.forest_2000['disease'],table_2_4.forest_2000['wildlife_and_grazing'],
                     table_2_4.forest_2000['forest_operations'],table_2_4.forest_2000['other'],
                     table_2_4.forest_2000['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2000['primarily_damaged_by_fire_total'],
                     table_2_4.forest_2000['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 2000 },
              variableExport: 'forest_2000',
            },
            {
              idx: 23,
              type: 'data',
              variableName: 'forest_1990',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                ValidateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_4.forest_1990['total_area_with_damage'],
                     [table_2_4.forest_1990['insects'], table_2_4.forest_1990['disease'],table_2_4.forest_1990['wildlife_and_grazing'],
                     table_2_4.forest_1990['forest_operations'],table_2_4.forest_1990['other'],
                     table_2_4.forest_1990['primarily_damaged_by_abiotic_agents'],table_2_4.forest_1990['primarily_damaged_by_fire_total'],
                     table_2_4.forest_1990['unspecified_mixed_damage']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.forestAreaWithDamage.forest',
              labelParams: { year: 1990 },
              variableExport: 'forest_1990',
            },
            {
              idx: 24,
              type: 'data',
              variableName: 'other_wooded_land_2020',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
                // ...updatedDataColsValidation('2020'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'other_wooded_land_2020',
            },
            {
              idx: 25,
              type: 'data',
              variableName: 'other_wooded_land_2015',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
                // ...updatedDataColsValidation('2015'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'other_wooded_land_2015',
            },
            {
              idx: 26,
              type: 'data',
              variableName: 'other_wooded_land_2010',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
                // ...updatedDataColsValidation('2010'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'other_wooded_land_2010',
            },
            {
              idx: 27,
              type: 'data',
              variableName: 'other_wooded_land_2005',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
                // ...updatedDataColsValidation('2005'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'other_wooded_land_2005',
            },
            {
              idx: 28,
              type: 'data',
              variableName: 'other_wooded_land_2000',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
                // ...updatedDataColsValidation('2000'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'other_wooded_land_2000',
            },
            {
              idx: 29,
              type: 'data',
              variableName: 'other_wooded_land_1990',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
                // ...updatedDataColsValidation('1990'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'other_wooded_land_1990',
            },
            {
              idx: 30,
              type: 'data',
              variableName: 'total_forest_and_other_wooded_land_2020',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2020'),
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 31,
              type: 'data',
              variableName: 'total_forest_and_other_wooded_land_2015',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2015'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 32,
              type: 'data',
              variableName: 'total_forest_and_other_wooded_land_2010',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2010'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 33,
              type: 'data',
              variableName: 'total_forest_and_other_wooded_land_2005',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2005'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
            {
              idx: 34,
              type: 'data',
              variableName: 'total_forest_and_other_wooded_land_2000',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('2000'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'total_forest_and_other_wooded_land_2000',
            },
            {
              idx: 35,
              type: 'data',
              variableName: 'total_forest_and_other_wooded_land_1990',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...updatedDataColsValidation('1990'),
              ],
              labelKey: 'panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'total_forest_and_other_wooded_land_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: [
            'total_area_with_damage',
            'insects_and_disease',
            'wildlife_and_grazing',
            'forest_operations',
            'other',
            'primarily_damaged_by_abiotic_agents',
            'primarily_damaged_by_fire_total',
            'of_which_human_induced',
            'unspecified_mixed_damage',
          ],
          migration: {
            columnNames: {
              '2020': [
                'total_area_with_damage',
                'insects_and_disease',
                'wildlife_and_grazing',
                'forest_operations',
                'other',
                'primarily_damaged_by_abiotic_agents',
                'primarily_damaged_by_fire_total',
                'of_which_human_induced',
                'unspecified_mixed_damage',
              ],
              '2025': [
                'total_area_with_damage',
                'insects',
                'disease',
                'wildlife_and_grazing',
                'forest_operations',
                'other',
                'primarily_damaged_by_abiotic_agents',
                'unspecified_mixed_damage_2025',
                'primarily_damaged_by_fire_total',
                'of_which_human_induced',
              ],
            },
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.reasonabilityChecks.reasonabilityCheck',
      descriptionKey: 'panEuropean.reasonabilityChecks.description',
      tableSpecs: [
        {
          name: 'reasonability_check_2_4',
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
                  labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
                  labelParams: { year: 2020 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_2_4.forest_2020.total_area_with_damage / table_1_1a.forest_2020.area',
                  },
                },

                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_2_4.other_wooded_land_2020.total_area_with_damage / table_1_1a.other_wooded_land_2020.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_2_4.total_forest_and_other_wooded_land_2020.total_area_with_damage / table_1_1a.total_forest_and_other_wooded_land_2020.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
              labelParams: { year: 2020 },
              variableExport: 'totalWithDamageOverTotal_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
                  labelParams: { year: 2015 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_2_4.forest_2015.total_area_with_damage / table_1_1a.forest_2015.area',
                  },
                },

                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_2_4.other_wooded_land_2015.total_area_with_damage / table_1_1a.other_wooded_land_2015.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_2_4.total_forest_and_other_wooded_land_2015.total_area_with_damage / table_1_1a.total_forest_and_other_wooded_land_2015.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
              labelParams: { year: 2015 },
              variableExport: 'totalWithDamageOverTotal_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
                  labelParams: { year: 2010 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_2_4.forest_2010.total_area_with_damage / table_1_1a.forest_2010.area',
                  },
                },

                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_2_4.other_wooded_land_2010.total_area_with_damage / table_1_1a.other_wooded_land_2010.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_2_4.total_forest_and_other_wooded_land_2010.total_area_with_damage / table_1_1a.total_forest_and_other_wooded_land_2010.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
              labelParams: { year: 2010 },
              variableExport: 'totalWithDamageOverTotal_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
                  labelParams: { year: 2005 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_2_4.forest_2005.total_area_with_damage / table_1_1a.forest_2005.area',
                  },
                },

                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_2_4.other_wooded_land_2005.total_area_with_damage / table_1_1a.other_wooded_land_2005.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_2_4.total_forest_and_other_wooded_land_2005.total_area_with_damage / table_1_1a.total_forest_and_other_wooded_land_2005.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
              labelParams: { year: 2005 },
              variableExport: 'totalWithDamageOverTotal_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
                  labelParams: { year: 2000 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_2_4.forest_2000.total_area_with_damage / table_1_1a.forest_2000.area',
                  },
                },

                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_2_4.other_wooded_land_2000.total_area_with_damage / table_1_1a.other_wooded_land_2000.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_2_4.total_forest_and_other_wooded_land_2000.total_area_with_damage / table_1_1a.total_forest_and_other_wooded_land_2000.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
              labelParams: { year: 2000 },
              variableExport: 'totalWithDamageOverTotal_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
                  labelParams: { year: 1990 },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 0,
                  type: 'calculated',
                  colName: 'forest',
                  migration: {
                    calculateFn: 'table_2_4.forest_1990.total_area_with_damage / table_1_1a.forest_1990.area',
                  },
                },

                {
                  idx: 2,
                  type: 'calculated',
                  colName: 'OWL',
                  migration: {
                    calculateFn:
                      'table_2_4.other_wooded_land_1990.total_area_with_damage / table_1_1a.other_wooded_land_1990.area',
                  },
                },
                {
                  idx: 3,
                  type: 'calculated',
                  colName: 'FOWL',
                  migration: {
                    calculateFn:
                      'table_2_4.total_forest_and_other_wooded_land_1990.total_area_with_damage / table_1_1a.total_forest_and_other_wooded_land_1990.area',
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.reasonabilityChecks.totalWithDamageOverTotal',
              labelParams: { year: 1990 },
              variableExport: 'totalWithDamageOverTotal_1990',
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
          name: 'country_comments_2_4_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.criteriaAppliedToReportingDamage',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            ...[
              'minimumSizeOfDamagedFowlReported',
              'otherCriteriaAndMinimumThresholdsUsedToDetermineAreaAsDamaged',
              'criteriaUsedToDetermineWhichAgentsWerePrimarilyDamaging',
              'areDamageInProtectedForestsIncludedInTheReportedFigures',
            ].map((variableName, idx) => ({
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
          name: 'country_comments_2_4_2',
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
                  labelKey: 'panEuropean.countryComments.commentsRelateToDataDefinitions',
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
              'totalAreaWithDamage',
              'primarilyDamagedByInsectsAndDisease',
              'primarilyDamagedByWildlifeAndGrazing',
              'damagePrimarilyHumanInducedForestOperations',
              'humanInducedDamagesReportedUnderOther',
              'primarilyDamagedByAbioticAgents',
              'primarilyDamagedByFire',
              'unspecifiedMixedDamage',
            ].map((variableName, idx) => ({
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
        sectionName: 'disturbances',
        tableName: 'disturbances',
        variableName: 'insects',
      },
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'disturbances',
        tableName: 'disturbances',
        variableName: 'diseases',
      },
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'disturbances',
        tableName: 'disturbances',
        variableName: 'severe_weather_events',
      },
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'areaAffectedByFire',
        tableName: 'areaAffectedByFire',
        variableName: 'total',
      },
    ],
  },
  dataExport: {
    included: true,
  },
}
