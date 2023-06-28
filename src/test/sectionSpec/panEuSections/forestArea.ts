// @ts-nocheck

export const forestArea = {
  sectionName: 'forestArea',
  sectionAnchor: '1.1a',
  tableSections: [
    {
      titleKey: 'panEuropean.forestArea.forestAreaNumber',
      tableSpecs: [
        {
          name: 'table_1_1a',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestArea.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.forestArea.area1000Ha',
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
                  labelKey: 'panEuropean.forestArea.forest',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'forestArea',
                        colName: '2025',
                      },
                    },
                  },
                },
              ],

              labelKey: 'panEuropean.forestArea.forest',
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
                  labelKey: 'panEuropean.forestArea.forest',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'forestArea',
                        colName: '2020',
                      },
                    },
                  },
                },
              ],

              labelKey: 'panEuropean.forestArea.forest',
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
                  labelKey: 'panEuropean.forestArea.forest',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'forestArea',
                        colName: '2015',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.forest',

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
                  labelKey: 'panEuropean.forestArea.forest',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'forestArea',
                        colName: '2010',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.forest',

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
                  labelKey: 'panEuropean.forestArea.forest',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],

              labelKey: 'panEuropean.forestArea.forest',
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
                  labelKey: 'panEuropean.forestArea.forest',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'forestArea',
                        colName: '2000',
                      },
                    },
                  },
                },
              ],

              labelKey: 'panEuropean.forestArea.forest',
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
                  labelKey: 'panEuropean.forestArea.forest',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'forestArea',
                        colName: '1990',
                      },
                    },
                  },
                },
              ],

              labelKey: 'panEuropean.forestArea.forest',
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
                  labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
              labelParams: { year: 2025 },
              migration: {
                cycles: ['2025'],
              },
              variableExport: '_of_which_available_for_wood_supply_2025',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
              labelParams: { year: 2020 },
              variableExport: '_of_which_available_for_wood_supply_2020',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
              labelParams: { year: 2015 },
              variableExport: '_of_which_available_for_wood_supply_2015',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
              labelParams: { year: 2010 },
              variableExport: '_of_which_available_for_wood_supply_2010',
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
              labelParams: { year: 2005 },
              variableExport: '_of_which_available_for_wood_supply_2005',
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
              labelParams: { year: 2000 },
              variableExport: '_of_which_available_for_wood_supply_2000',
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_available_for_wood_supply',
              labelParams: { year: 1990 },
              variableExport: '_of_which_available_for_wood_supply_1990',
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.other_wooded_land',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherWoodedLand',
                        colName: '2025',
                      },
                    },
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.forestArea.other_wooded_land',
              labelParams: { year: 2025 },
              variableExport: 'other_wooded_land_2025',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherWoodedLand',
                        colName: '2020',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'other_wooded_land_2020',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherWoodedLand',
                        colName: '2015',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'other_wooded_land_2015',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherWoodedLand',
                        colName: '2010',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'other_wooded_land_2010',
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea.other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'other_wooded_land_2005',
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherWoodedLand',
                        colName: '2000',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'other_wooded_land_2000',
            },
            {
              idx: 20,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherWoodedLand',
                        colName: '1990',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'other_wooded_land_1990',
            },
            {
              idx: 21,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 22,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 23,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              migration: {
                cycles: ['2020'],
              },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 24,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
            {
              idx: 25,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'total_forest_and_other_wooded_land_2000',
            },
            {
              idx: 26,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2020'],
              },
              labelKey: 'panEuropean.forestArea.total_forest_and_other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'total_forest_and_other_wooded_land_1990',
            },
            {
              idx: 28,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2025': { key: 'panEuropean.forestArea.remaining_land_area', params: { year: 2025 } },
                    },
                  },
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherLand',
                        colName: '2025',
                      },
                    },
                  },
                },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.forestArea.other_land',
              labelParams: { year: 2025 },
              variableExport: 'other_land_2025',
            },
            {
              idx: 29,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': { key: 'panEuropean.forestArea.other_land', params: { year: 2020 } },
                      '2025': { key: 'panEuropean.forestArea.remaining_land_area', params: { year: 2020 } },
                    },
                  },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherLand',
                        colName: '2020',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_land',
              labelParams: { year: 2020 },
              variableExport: 'other_land_2020',
            },
            {
              idx: 30,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': { key: 'panEuropean.forestArea.other_land', params: { year: 2015 } },
                      '2025': { key: 'panEuropean.forestArea.remaining_land_area', params: { year: 2015 } },
                    },
                  },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherLand',
                        colName: '2015',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_land',
              labelParams: { year: 2015 },
              variableExport: 'other_land_2015',
            },
            {
              idx: 31,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': { key: 'panEuropean.forestArea.other_land', params: { year: 2010 } },
                      '2025': { key: 'panEuropean.forestArea.remaining_land_area', params: { year: 2010 } },
                    },
                  },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherLand',
                        colName: '2010',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_land',
              labelParams: { year: 2010 },
              variableExport: 'other_land_2010',
            },
            {
              idx: 32,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': { key: 'panEuropean.forestArea.other_land', params: { year: 2005 } },
                      '2025': { key: 'panEuropean.forestArea.remaining_land_area', params: { year: 2005 } },
                    },
                  },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea.other_land',
              labelParams: { year: 2005 },
              variableExport: 'other_land_2005',
            },
            {
              idx: 33,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': { key: 'panEuropean.forestArea.other_land', params: { year: 2000 } },
                      '2025': { key: 'panEuropean.forestArea.remaining_land_area', params: { year: 2000 } },
                    },
                  },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherLand',
                        colName: '2000',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_land',
              labelParams: { year: 2000 },
              variableExport: 'other_land_2000',
            },
            {
              idx: 34,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  migration: {
                    label: {
                      '2020': { key: 'panEuropean.forestArea.other_land', params: { year: 1990 } },
                      '2025': { key: 'panEuropean.forestArea.remaining_land_area', params: { year: 1990 } },
                    },
                  },
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    linkedNodes: {
                      '2025': {
                        assessmentName: 'fra',
                        cycleName: '2025',
                        tableName: 'extentOfForest',
                        variableName: 'otherLand',
                        colName: '1990',
                      },
                    },
                  },
                },
              ],
              labelKey: 'panEuropean.forestArea.other_land',
              labelParams: { year: 1990 },
              variableExport: 'other_land_1990',
            },
            {
              idx: 35,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
                  labelParams: { year: 2025 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
              labelParams: { year: 2025 },
              variableExport: '_of_which_with_tree_cover_2025',
            },
            {
              idx: 36,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
              labelParams: { year: 2020 },
              variableExport: '_of_which_with_tree_cover_2020',
            },
            {
              idx: 37,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
              labelParams: { year: 2015 },
              variableExport: '_of_which_with_tree_cover_2015',
            },
            {
              idx: 38,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
              labelParams: { year: 2010 },
              variableExport: '_of_which_with_tree_cover_2010',
            },
            {
              idx: 39,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
              labelParams: { year: 2005 },
              variableExport: '_of_which_with_tree_cover_2005',
            },
            {
              idx: 40,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
              labelParams: { year: 2000 },
              variableExport: '_of_which_with_tree_cover_2000',
            },
            {
              idx: 41,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
              ],
              labelKey: 'panEuropean.forestArea._of_which_with_tree_cover',
              labelParams: { year: 1990 },
              variableExport: '_of_which_with_tree_cover_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: ['area'],
        },
      ],
    },
    {
      titleKey: 'panEuropean.forestArea.forestAreaByForestTypeNumber',
      tableSpecs: [
        {
          name: 'table_1_1b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.forestAreaByForestTypes.category',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  labelKey: 'panEuropean.forestAreaByForestTypes.forestArea1000Ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 6, rowSpan: 1 },
                      '2025': { colSpan: 7, rowSpan: 1 },
                    },
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
                  rowSpan: 1,
                  labelKey: '1990',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2005',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: { cycles: ['2025'] },
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
                  labelKey: 'panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_1990['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_1990'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_1990'],
                  table_1_1b.mixed_forest['forest_area_1990']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2000['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2000'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2000'],
                  table_1_1b.mixed_forest['forest_area_2000']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2005['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2005'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2005'],
                  table_1_1b.mixed_forest['forest_area_2005']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2010['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2010'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2010'],
                  table_1_1b.mixed_forest['forest_area_2010']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2015['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2015'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2015'],
                  table_1_1b.mixed_forest['forest_area_2015']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2020['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2020'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2020'],
                  table_1_1b.mixed_forest['forest_area_2020']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
                      ],
                    },
                  },
                },
                {
                  idx: 6,
                  type: 'decimal',
                  colName: 'forest_area_2025',
                  migration: {
                    cycles: ['2025'],
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_2025['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2025'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2025'],
                  table_1_1b.mixed_forest['forest_area_2025']],
                   "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
                      ],
                    },
                  },
                },
              ],
              variableExport: 'predominantly_coniferous_forest',
              labelKey: 'panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_1990['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_1990'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_1990'],
                  table_1_1b.mixed_forest['forest_area_1990']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2000['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2000'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2000'],
                  table_1_1b.mixed_forest['forest_area_2000']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2005['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2005'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2005'],
                  table_1_1b.mixed_forest['forest_area_2005']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2010['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2010'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2010'],
                  table_1_1b.mixed_forest['forest_area_2010']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2015['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2015'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2015'],
                  table_1_1b.mixed_forest['forest_area_2015']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2020['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2020'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2020'],
                  table_1_1b.mixed_forest['forest_area_2020']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
                      ],
                    },
                  },
                },
                {
                  idx: 6,
                  type: 'decimal',
                  colName: 'forest_area_2025',
                  migration: {
                    cycles: ['2025'],
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_2025['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2025'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2025'],
                  table_1_1b.mixed_forest['forest_area_2025']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
                      ],
                    },
                  },
                },
              ],
              variableExport: 'predominantly_broadleaved_forest',
              labelKey: 'panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaByForestTypes.mixed_forest',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  migration: {
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_1990['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_1990'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_1990'],
                  table_1_1b.mixed_forest['forest_area_1990']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2000['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2000'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2000'],
                  table_1_1b.mixed_forest['forest_area_2000']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2005['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2005'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2005'],
                  table_1_1b.mixed_forest['forest_area_2005']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2010['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2010'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2010'],
                  table_1_1b.mixed_forest['forest_area_2010']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2015['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2015'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2015'],
                  table_1_1b.mixed_forest['forest_area_2015']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
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
                        `validatorEqualToSum(table_1_1a.forest_2020['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2020'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2020'],
                  table_1_1b.mixed_forest['forest_area_2020']], 
                  "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
                      ],
                    },
                  },
                },
                {
                  idx: 6,
                  type: 'decimal',
                  colName: 'forest_area_2025',
                  migration: {
                    cycles: ['2025'],
                    validateFns: {
                      '2025': [
                        `validatorEqualToSum(table_1_1a.forest_2025['area'],
                  [table_1_1b.predominantly_coniferous_forest['forest_area_2025'],
                  table_1_1b.predominantly_broadleaved_forest['forest_area_2025'],
                  table_1_1b.mixed_forest['forest_area_2025']], "panEuropean.forestArea.forest", "panEuropean.forestArea.area1000Ha", "1.1.I",
                   ["panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest",
                  "panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest",
                  "panEuropean.forestAreaByForestTypes.mixed_forest"])`,
                      ],
                    },
                  },
                },
              ],
              variableExport: 'mixed_forest',
              labelKey: 'panEuropean.forestAreaByForestTypes.mixed_forest',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: [
            'forest_area_1990',
            'forest_area_2000',
            'forest_area_2005',
            'forest_area_2010',
            'forest_area_2015',
            'forest_area_2020',
          ],
          migration: {
            cycles: ['2025'],
            columnNames: {
              '2020': [
                'forest_area_1990',
                'forest_area_2000',
                'forest_area_2005',
                'forest_area_2010',
                'forest_area_2015',
                'forest_area_2020',
              ],
              '2025': [
                'forest_area_1990',
                'forest_area_2000',
                'forest_area_2005',
                'forest_area_2010',
                'forest_area_2015',
                'forest_area_2020',
                'forest_area_2025',
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
          name: 'country_comments_1_1_1',
          rows: [
            {
              idx: 0,
              type: 'data',
              variableName: 'theRecentAvailableYear',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  rowSpan: 3,
                  labelKey: 'panEuropean.countryComments.howDidYouGenerateValues',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: { style: { '2025': { colSpan: 1, rowSpan: 4 } } },
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
            {
              idx: 3,
              type: 'data',
              variableName: 'other',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: 'panEuropean.countryComments.other',
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
          name: 'country_comments_1_1_2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 3,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.approachToReportingOnTheCategoriesOfTheTable11A',
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
                  labelKey: 'panEuropean.countryComments.category',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.areaEstimate',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.comments',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            ...[
              'forest',
              'christmasTreePlantationsOnForestLand',
              'poplarPlantationsOnForestLand',
              'shortRotationForestry',
              'shortRotationCoppicesOnForestLand',
              'OfWhichNotAvailableForWoodSupply',
              'environmentalRestrictions',
              'protectedForests',
              'productiveForestsDesignatedToProtectKeyHabitatsSpeciesOrOtherNaturalValues',
              'protectiveForestsSoilWaterAndOtherEcosystemFunctionsInfrastructureAndManagedNaturalResources',
              'socialRestrictions',
              'forestsDesignatedToProtectAestheticHistoricalCulturalOrSpiritualValues',
              'forestsManagedForRecreationalPurposes',
              'forestsExcludedFromHarvestingByOwnerSDecision',
              'militaryForests',
              'economicRestrictions',
              'forestsOfVeryLowProductivityEconomicRevenueOfHarvesting',
              'forestsPhysicallyNotAccessibleIncludingSlopeAndSoilCondition',
              'otherPleaseSpecify',
              'otherWoodedLand',
              'alpineShrublandEGPinusMugo',
              'otherShrublandEGMaquisGarrigueMatorral',
              'otherPleaseSpecify',
              'otherLandWithTreeCover',
              'agroForestrySilvoPastoralAreasEGForRearingIberianBlackPig',
              'plantationsOfNutProducingTreesOrShrubsEGSweetChestnutsAlmondsWalnutsHazelnuts',
              'oliveGrovesAndFruitTreeOrchards',
              'poplarPlantationsOnAgriculturalLand',
              'treesInUrbanSettings',
              'shortRotationCoppicesOnAgriculturalLand',
              'christmasTreePlantationsOnAgriculturalLand',
            ].map((variableName, idx) => ({
              idx,
              type: 'data',
              variableName,
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  labelKey: `panEuropean.countryComments.${variableName}`,
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                { idx: 1, type: 'decimal', colName: 'area' },
                { idx: 2, type: 'textarea', colName: 'comment' },
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
              '2025': ['area', 'comment'],
            },
          },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'country_comments_1_1_3',
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
                  labelKey: 'panEuropean.countryComments.commentsOnTrendS',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            ...['forestArea', 'ofWhichAvailableForWoodSupply', 'owlArea', 'forestTypes'].map((variableName, idx) => ({
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
    linkedVariables: [
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'extentOfForest',
        tableName: 'extentOfForest',
        variableName: 'forestArea',
      },
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'extentOfForest',
        tableName: 'extentOfForest',
        variableName: 'otherWoodedLand',
      },
      {
        assessmentName: 'fra',
        cycleName: '2025',
        sectionName: 'extentOfForest',
        tableName: 'extentOfForest',
        variableName: 'otherLand',
      },
      //   {
      //     assessmentName: 'fra',
      //     cycleName: '2025',
      //     sectionName: 'otherLandWithTreeCover',
      //     tableName: 'otherLandWithTreeCover',
      //     variableName: 'otherLandWithTreeCoverTotal', // NOT SURE OF THE VARIABLE HERE - 2020 cycle
      //   },
    ],
  },
  dataExport: {
    included: true,
  },
  migration: {
    anchors: {
      '2020': '1.1a',
      '2025': '1.1',
    },
  },
}

export const forestAreaByForestTypes = {
  sectionName: 'forestAreaByForestTypes',
  sectionAnchor: '1.1b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_1_1b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.forestAreaByForestTypes.category',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  labelKey: 'panEuropean.forestAreaByForestTypes.forestArea1000Ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: {
                    style: {
                      '2020': { colSpan: 6, rowSpan: 1 },
                      '2025': { colSpan: 7, rowSpan: 1 },
                    },
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
                  rowSpan: 1,
                  labelKey: '1990',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2000',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2005',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2010',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2015',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 5,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2020',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 6,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: '2025',
                  className: 'fra-table__header-cell',
                  type: 'header',
                  migration: { cycles: ['2025'] },
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
                  labelKey: 'panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                { idx: 2, type: 'decimal' },
                { idx: 3, type: 'decimal' },
                { idx: 4, type: 'decimal' },
                { idx: 5, type: 'decimal' },
                { idx: 6, type: 'decimal', colName: 'forest_area_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'predominantly_coniferous_forest',
              labelKey: 'panEuropean.forestAreaByForestTypes.predominantly_coniferous_forest',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest',
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
                { idx: 5, type: 'decimal' },
                { idx: 6, type: 'decimal', colName: 'forest_area_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'predominantly_broadleaved_forest',
              labelKey: 'panEuropean.forestAreaByForestTypes.predominantly_broadleaved_forest',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.forestAreaByForestTypes.mixed_forest',
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
                { idx: 5, type: 'decimal' },
                { idx: 6, type: 'decimal', colName: 'forest_area_2025', migration: { cycles: ['2025'] } },
              ],
              variableExport: 'mixed_forest',
              labelKey: 'panEuropean.forestAreaByForestTypes.mixed_forest',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'haThousand',
          columnsExport: [
            'forest_area_1990',
            'forest_area_2000',
            'forest_area_2005',
            'forest_area_2010',
            'forest_area_2015',
            'forest_area_2020',
          ],
          migration: {
            columnNames: {
              '2020': [
                'forest_area_1990',
                'forest_area_2000',
                'forest_area_2005',
                'forest_area_2010',
                'forest_area_2015',
                'forest_area_2020',
              ],
              '2025': [
                'forest_area_1990',
                'forest_area_2000',
                'forest_area_2005',
                'forest_area_2010',
                'forest_area_2015',
                'forest_area_2020',
                'forest_area_2025',
              ],
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
    cycles: ['2020'],
  },
}
