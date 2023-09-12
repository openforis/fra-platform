import { getODP } from 'server/service/estimates/getODP'

export const dataset3 = {
  ITA: {
    originalDataPointValue: {
      '1992': getODP('1780'),
      '2002': getODP('1750'),
    },
  },
}

export const dataset3Expected = {
  'Linear - {1992, 2002}': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1786.00',
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
        raw: '1756.00',
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
        raw: '1726.00',
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
        raw: '1711.00',
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
        raw: '1708.00',
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
        raw: '1705.00',
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
        raw: '1702.00',
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
        raw: '1699.00',
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
        raw: '1696.00',
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
        raw: '1681.00',
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
  'Repeat last - {1992, 2002}': [
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
        raw: '1756.00',
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
        raw: '1750.00',
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
}
