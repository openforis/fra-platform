import { getODP } from 'server/service/estimates/getODP'

export const dataset4 = {
  ITA: {
    originalDataPointValue: {
      '1992': getODP('1780'),
      '2012': getODP('1750'),
    },
  },
}

export const dataset4Expected = {
  'Repeat last - {1992, 2016}': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1780.00',
        estimated: true,
      },
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1768.00',
        estimated: true,
      },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1753.00',
        estimated: true,
      },
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1750.00',
        estimated: true,
      },
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1750.00',
        estimated: true,
      },
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1750.00',
        estimated: true,
      },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1750.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1750.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1750.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1750.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
  ],
  'Linear - {1992, 2016}': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1783.00',
        estimated: true,
      },
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1768.00',
        estimated: true,
      },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1753.00',
        estimated: true,
      },
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1745.50',
        estimated: true,
      },
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1744.00',
        estimated: true,
      },
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1742.50',
        estimated: true,
      },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1741.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1739.50',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1738.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1730.50',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '20.00',
        estimated: true,
      },
    },
  ],
}
