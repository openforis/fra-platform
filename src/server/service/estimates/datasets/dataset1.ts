export const dataset1 = {
  FIN: {
    originalDataPointValue: {
      '1991': {
        forestArea: {
          odp: true,
          raw: '40000',
        },
        otherWoodedLand: {
          odp: true,
          raw: '2000',
        },
      },
      '2018': {
        forestArea: {
          odp: true,
          raw: '80000.00000000000000000000',
        },
        otherWoodedLand: {
          odp: true,
          raw: '29000.00000000000000000000',
        },
      },
    },
  },
}

export const dataset1Expected = {
  'Interpolates and extrapolates linearly': [
    {
      colName: '1990',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '38518.52' },
      variableName: 'forestArea',
    },
    {
      colName: '1990',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '1000.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2000',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '53333.33' },
      variableName: 'forestArea',
    },
    {
      colName: '2000',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '11000.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2010',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '68148.15' },
      variableName: 'forestArea',
    },
    {
      colName: '2010',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '21000.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2015',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '75555.56' },
      variableName: 'forestArea',
    },
    {
      colName: '2015',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '26000.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2016',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '77037.04' },
      variableName: 'forestArea',
    },
    {
      colName: '2016',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '27000.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2017',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '78518.52' },
      variableName: 'forestArea',
    },
    {
      colName: '2017',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '28000.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2018',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '80000.00' },
      variableName: 'forestArea',
    },
    {
      colName: '2018',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '29000.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2019',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '81481.48' },
      variableName: 'forestArea',
    },
    {
      colName: '2019',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '30000.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2020',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '82962.96' },
      variableName: 'forestArea',
    },
    {
      colName: '2020',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '31000.00' },
      variableName: 'otherWoodedLand',
    },
    {
      colName: '2025',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '90370.36' },
      variableName: 'forestArea',
    },
    {
      colName: '2025',

      tableName: 'extentOfForest',
      value: { estimated: true, raw: '36000.00' },
      variableName: 'otherWoodedLand',
    },
  ],
}
