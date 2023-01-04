export const dataset2 = {
  FIN: {
    originalDataPointValue: {
      '2009': {
        forestArea: {
          odp: true,
          raw: '500',
        },
        otherWoodedLand: {
          odp: true,
          raw: '300',
        },
      },
      '2018': {
        forestArea: {
          odp: true,
          raw: '480.00000000000000000000',
        },
        otherWoodedLand: {
          odp: true,
          raw: '344.00000000000000000000',
        },
      },
    },
  },
}

export const dataset2Expected = {
  'Extrapolates with repeat last value': [
    {
      colName: '1990',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '500.00' },
      variableName: 'forestArea',
    },
    {
      colName: '1990',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '300.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2000',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '500.00' },
      variableName: 'forestArea',
    },
    {
      colName: '2000',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '300.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2010',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '497.78' },
      variableName: 'forestArea',
    },
    {
      colName: '2010',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '304.89' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2015',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '486.67' },
      variableName: 'forestArea',
    },
    {
      colName: '2015',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '329.33' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2016',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '484.45' },
      variableName: 'forestArea',
    },
    {
      colName: '2016',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '334.22' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2017',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '482.23' },
      variableName: 'forestArea',
    },
    {
      colName: '2017',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '339.11' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2018',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '480.00' },
      variableName: 'forestArea',
    },
    {
      colName: '2018',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '344.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2019',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '480.00' },
      variableName: 'forestArea',
    },
    {
      colName: '2019',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '344.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2020',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '480.00' },
      variableName: 'forestArea',
    },
    {
      colName: '2020',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '344.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2025',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '480.00' },
      variableName: 'forestArea',
    },
    {
      colName: '2025',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '344.00' },
      variableName: 'otherWoodedLand',
    },
  ],
  'Extrapolates with annual change rate': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '690.00', estimated: true },
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '395.00', estimated: true },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '590.00', estimated: true },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '345.00', estimated: true },
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '497.78', estimated: true },
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '304.89', estimated: true },
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '486.67', estimated: true },
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '329.33', estimated: true },
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '484.45', estimated: true },
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '334.22', estimated: true },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '482.23', estimated: true },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '339.11', estimated: true },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '480.00', estimated: true },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '344.00', estimated: true },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '500.00', estimated: true },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '354.00', estimated: true },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '520.00', estimated: true },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '364.00', estimated: true },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: { raw: '620.00', estimated: true },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: { raw: '414.00', estimated: true },
    },
  ],
}
