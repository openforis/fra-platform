// @ts-nocheck

const dataCols = [
  { idx: 0, type: 'decimal', colName: 'totalAreaOfDegradedLand', migration: { forceColName: true } },

  { idx: 1, type: 'decimal', colName: 'agentOne', migration: { cycles: ['2025'], forceColName: true } },
  { idx: 2, type: 'decimal', colName: 'agentTwo', migration: { cycles: ['2025'], forceColName: true } },
  { idx: 3, type: 'decimal', colName: 'agentThree', migration: { cycles: ['2025'], forceColName: true } },
  { idx: 4, type: 'decimal', colName: 'agentFour', migration: { cycles: ['2025'], forceColName: true } },
  { idx: 5, type: 'decimal', colName: 'agentFive', migration: { cycles: ['2025'], forceColName: true } },
  { idx: 6, type: 'decimal', colName: 'unknownMixedDegradation', migration: { cycles: ['2025'], forceColName: true } },

  { idx: 7, type: 'decimal', colName: 'grazing', migration: { cycles: ['2020'], forceColName: true } },
  { idx: 8, type: 'decimal', colName: 'repeated_fires', migration: { cycles: ['2020'], forceColName: true } },
  { idx: 9, type: 'decimal', colName: 'air_pollution', migration: { cycles: ['2020'], forceColName: true } },
  { idx: 10, type: 'decimal', colName: 'desertification', migration: { cycles: ['2020'], forceColName: true } },
  { idx: 11, type: 'decimal', colName: 'other_1', migration: { cycles: ['2020'], forceColName: true } },
  { idx: 12, type: 'decimal', colName: 'other_2', migration: { cycles: ['2020'], forceColName: true } },
  { idx: 13, type: 'decimal', colName: 'other_3', migration: { cycles: ['2020'], forceColName: true } },
  { idx: 14, type: 'decimal', colName: 'unknown', migration: { cycles: ['2020'], forceColName: true } },
  {
    idx: 15,
    type: 'decimal',
    colName: 'former_degraded_land_restored',
    migration: { cycles: ['2020'], forceColName: true },
  },
]

export const areaWithForestLandDegradation = {
  sectionName: 'areaWithForestLandDegradation',
  sectionAnchor: '2.5',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_2_5',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 1, rowSpan: 3 },
                      '2025': { colSpan: 1, rowSpan: 1 },
                    },
                  },
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.totalAreaOfDegradedLand',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 1, rowSpan: 2 },
                      '2025': { colSpan: 1, rowSpan: 1 },
                    },
                  },
                },
                {
                  idx: 2,
                  colSpan: 6,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.areaPrimarilyDegradedBy',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 8, rowSpan: 1 },
                      '2025': { colSpan: 6, rowSpan: 1 },
                    },
                  },
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.formerDegradedLandRestored',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: { cycles: ['2020'] },
                },
              ],
              type: 'header',
              migration: { cycles: ['2020'] },
            },
            {
              idx: 'header_1',
              cols: [
                {
                  idx: 7,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.grazing',
                  migration: {
                    cycles: ['2020'],
                  },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 8,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.repeated_fires',
                  migration: {
                    cycles: ['2020'],
                  },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 9,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.air_pollution',
                  migration: {
                    cycles: ['2020'],
                  },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 10,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.desertification',
                  migration: {
                    cycles: ['2020'],
                  },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 11,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.other_1',
                  migration: {
                    cycles: ['2020'],
                  },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 12,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.other2',
                  migration: { cycles: ['2020'] },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 13,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.other3',
                  migration: { cycles: ['2020'] },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 14,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.unknownMixedDegradation',
                  migration: { cycles: ['2020'] },
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
              migration: { cycles: ['2020'] },
            },
            {
              idx: 'header_2',
              cols: [
                {
                  idx: 0,
                  colSpan: 11,
                  rowSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.thousandHa',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
              migration: { cycles: ['2020'] },
            },

            {
              idx: 0,
              type: 'data',
              variableName: 'header_2025',
              cols: [
                {
                  idx: 0,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.categoryYear',
                  type: 'placeholder',
                  migration: { cycles: ['2025'], style: { '2025': { colSpan: 1, rowSpan: 2, fontWeight: 600 } } },
                },
                {
                  idx: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.totalAreaOfDegradedLand',
                  type: 'placeholder',
                  migration: {
                    cycles: ['2025'],
                    style: { '2025': { colSpan: 1, rowSpan: 2, fontWeight: 600, textAlign: 'center' } },
                  },
                },
                {
                  idx: 2,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.areaPrimarilyDegradedBy',
                  type: 'placeholder',
                  migration: {
                    cycles: ['2025'],
                    style: { '2025': { colSpan: 6, rowSpan: 1, fontWeight: 600, textAlign: 'center' } },
                  }, // , height: '39px'
                },
              ],
              migration: { cycles: ['2025'] },
            },
            {
              idx: 1,
              type: 'data',
              variableName: 'agentName',
              cols: [
                {
                  idx: 2,
                  type: 'text',
                  colName: 'agentOne',
                  inputPlaceholder: 'panEuropean.areaWithForestLandDegradation.writeName',
                  migration: {
                    cycles: ['2025'],
                    forceColName: true,
                    validateFns: {
                      '2025': [
                        `validatorNotEmpty(table_2_5.agentName.agentOne,
                    [table_2_5.forest_2020.agentOne, table_2_5.forest_2015.agentOne, table_2_5.forest_2010.agentOne, table_2_5.forest_2005.agentOne, table_2_5.forest_2000.agentOne, table_2_5.forest_1990.agentOne])`,
                      ],
                    },
                    style: { '2025': { minWidth: '145px' } },
                  },
                },
                {
                  idx: 3,
                  type: 'text',
                  colName: 'agentTwo',
                  inputPlaceholder: 'panEuropean.areaWithForestLandDegradation.writeName',
                  migration: {
                    cycles: ['2025'],
                    forceColName: true,
                    validateFns: {
                      '2025': [
                        `validatorNotEmpty(table_2_5.agentName.agentTwo,
                    [table_2_5.forest_2020.agentTwo, table_2_5.forest_2015.agentTwo, table_2_5.forest_2010.agentTwo, table_2_5.forest_2005.agentTwo, table_2_5.forest_2000.agentTwo, table_2_5.forest_1990.agentTwo])`,
                      ],
                    },
                    style: { '2025': { minWidth: '145px' } },
                  },
                },
                {
                  idx: 4,
                  type: 'text',
                  colName: 'agentThree',
                  inputPlaceholder: 'panEuropean.areaWithForestLandDegradation.writeName',
                  migration: {
                    cycles: ['2025'],
                    forceColName: true,
                    validateFns: {
                      '2025': [
                        `validatorNotEmpty(table_2_5.agentName.agentThree,
                    [table_2_5.forest_2020.agentThree, table_2_5.forest_2015.agentThree, table_2_5.forest_2010.agentThree, table_2_5.forest_2005.agentThree, table_2_5.forest_2000.agentThree, table_2_5.forest_1990.agentThree])`,
                      ],
                    },
                    style: { '2025': { minWidth: '145px' } },
                  },
                },
                {
                  idx: 5,
                  type: 'text',
                  colName: 'agentFour',
                  inputPlaceholder: 'panEuropean.areaWithForestLandDegradation.writeName',
                  migration: {
                    cycles: ['2025'],
                    forceColName: true,
                    validateFns: {
                      '2025': [
                        `validatorNotEmpty(table_2_5.agentName.agentFour,
                    [table_2_5.forest_2020.agentFour, table_2_5.forest_2015.agentFour, table_2_5.forest_2010.agentFour, table_2_5.forest_2005.agentFour, table_2_5.forest_2000.agentFour, table_2_5.forest_1990.agentFour])`,
                      ],
                    },
                    style: { '2025': { minWidth: '145px' } },
                  },
                },
                {
                  idx: 6,
                  type: 'text',
                  colName: 'agentFive',
                  inputPlaceholder: 'panEuropean.areaWithForestLandDegradation.writeName',
                  migration: {
                    cycles: ['2025'],
                    forceColName: true,
                    validateFns: {
                      '2025': [
                        `validatorNotEmpty(table_2_5.agentName.agentFive,
                    [table_2_5.forest_2020.agentFive, table_2_5.forest_2015.agentFive, table_2_5.forest_2010.agentFive, table_2_5.forest_2005.agentFive, table_2_5.forest_2000.agentFive, table_2_5.forest_1990.agentFive])`,
                      ],
                    },
                    style: { '2025': { minWidth: '145px' } },
                  },
                },
                {
                  idx: 7,
                  type: 'placeholder',
                  labelKey: 'panEuropean.areaWithForestLandDegradation.unknownMixedDegradation2025',
                  migration: { cycles: ['2025'], style: { '2025': { fontWeight: 600, textAlign: 'center' } } },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.agentName',
              variableExport: 'agentName',
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
                  labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2025', '2020'],
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_5.forest_2020['total_area_of_degraded_land'],
                     [table_2_5.forest_2020['agentOne'],table_2_5.forest_2020['agentTwo'],
                     table_2_5.forest_2020['agentThree'],table_2_5.forest_2020['AgentFour'],
                     table_2_5.forest_2020['agentFive'],table_2_5.forest_2020['unknownMixedDegradation']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
              labelParams: { year: 2020 },
              variableExport: 'forest_2020',
            },
            {
              idx: 3,
              type: 'data',
              variableName: 'forest_2015',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_5.forest_2020['total_area_of_degraded_land'],
                     [table_2_5.forest_2020['agentOne'],table_2_5.forest_2020['agentTwo'],
                     table_2_5.forest_2020['agentThree'],table_2_5.forest_2020['AgentFour'],
                     table_2_5.forest_2020['agentFive'],table_2_5.forest_2020['unknownMixedDegradation']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
              labelParams: { year: 2015 },
              variableExport: 'forest_2015',
            },
            {
              idx: 4,
              type: 'data',
              variableName: 'forest_2010',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_5.forest_2020['total_area_of_degraded_land'],
                     [table_2_5.forest_2020['agentOne'],table_2_5.forest_2020['agentTwo'],
                     table_2_5.forest_2020['agentThree'],table_2_5.forest_2020['AgentFour'],
                     table_2_5.forest_2020['agentFive'],table_2_5.forest_2020['unknownMixedDegradation']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
              labelParams: { year: 2010 },
              variableExport: 'forest_2010',
            },
            {
              idx: 5,
              type: 'data',
              variableName: 'forest_2005',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_5.forest_2020['total_area_of_degraded_land'],
                     [table_2_5.forest_2020['agentOne'],table_2_5.forest_2020['agentTwo'],
                     table_2_5.forest_2020['agentThree'],table_2_5.forest_2020['AgentFour'],
                     table_2_5.forest_2020['agentFive'],table_2_5.forest_2020['unknownMixedDegradation']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
              labelParams: { year: 2005 },
              variableExport: 'forest_2005',
            },
            {
              idx: 6,
              type: 'data',
              variableName: 'forest_2000',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_5.forest_2020['total_area_of_degraded_land'],
                     [table_2_5.forest_2020['agentOne'],table_2_5.forest_2020['agentTwo'],
                     table_2_5.forest_2020['agentThree'],table_2_5.forest_2020['AgentFour'],
                     table_2_5.forest_2020['agentFive'],table_2_5.forest_2020['unknownMixedDegradation']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
              labelParams: { year: 2000 },
              variableExport: 'forest_2000',
            },
            {
              idx: 7,
              type: 'data',
              variableName: 'forest_1990',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                validateFns: {
                  '2025': [
                    `validatorEqualToSum(table_2_5.forest_2020['total_area_of_degraded_land'],
                     [table_2_5.forest_2020['agentOne'],table_2_5.forest_2020['agentTwo'],
                     table_2_5.forest_2020['agentThree'],table_2_5.forest_2020['AgentFour'],
                     table_2_5.forest_2020['agentFive'],table_2_5.forest_2020['unknownMixedDegradation']])`,
                  ],
                },
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.forest',
              labelParams: { year: 1990 },
              variableExport: 'forest_1990',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
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
                  labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
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
                  labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
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
                  labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
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
                  labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
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
                  labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.other_wooded_land',
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
                  labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'total_forest_and_other_wooded_land_2000',
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                ...dataCols,
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.areaWithForestLandDegradation.total_forest_and_other_wooded_land',
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
            'total_area_of_degraded_land',
            'grazing',
            'repeated_fires',
            'air_pollution',
            'desertification',
            'other_1',
            'other_2',
            'other_3',
            'unknown',
            'former_degraded_land_restored',
          ],
          migration: {
            columnNames: {
              '2020': [
                'total_area_of_degraded_land',
                'grazing',
                'repeated_fires',
                'air_pollution',
                'desertification',
                'other_1',
                'other_2',
                'other_3',
                'unknown',
                'former_degraded_land_restored',
              ],
              '2025': [
                'total_area_of_degraded_land',
                'agentOne',
                'agentTwo',
                'agentThree',
                'agentFour',
                'agentFive',
                'unknownMixedDegradation',
              ],
            },
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_2_5_1',
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
              'doesYourCountryHaveANationalMethodology',
              'ifYesWhatIsTheNationalDefinition',
              'ifYesDescribeMonitoringProcessAndResults',
              'minimumSizeOfDegradedForestReportedHa',
              'otherCriteriaAndMinimumThresholdsUsedToDetermineForestAsDegraded',
              'criteriaUsedToDeterminePrimaryTypeOfDegradation',
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
          name: 'country_comments_2_5_2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 2,
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
            {
              idx: 0,
              type: 'data',
              variableName: 'totalAreaOfDegradedLand',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: `panEuropean.countryComments.totalAreaOfDegradedLand`,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
                { idx: 0, type: 'textarea', colName: 'comment_trends' },
              ],
            },
            ...[
              'primarilyDegradedBy_1',
              'primarilyDegradedBy_2',
              'primarilyDegradedBy_3',
              'primarilyDegradedBy_4',
              'primarilyDegradedBy_5',
            ].map((variableName, idx) => ({
              idx: idx + 1,
              type: 'data',
              variableName,
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: `panEuropean.countryComments.primarilyDegradedBy`,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'text', colName: 'agent' },
                { idx: 1, type: 'textarea', colName: 'comment' },
                { idx: 2, type: 'textarea', colName: 'comment_trends' },
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
}
