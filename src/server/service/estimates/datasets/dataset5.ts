import { getODP } from 'server/service/estimates/getODP'

export const dataset5 = {
  ITA: {
    originalDataPointValue: {
      '1992': getODP('1780'),
      '2016': getODP('1750'),
    },
  },
}

export const dataset5Expected = {
  'Linear - {1992, 2016}': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1782.50',
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
        raw: '1770.00',
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
        raw: '1757.50',
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
        raw: '1751.25',
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
        raw: '1748.75',
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
        raw: '1747.50',
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
        raw: '1746.25',
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
        raw: '1745.00',
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
        raw: '1738.75',
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
  'Repeat Last - {1992, 2016}': [
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
        raw: '1770.00',
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
        raw: '1757.50',
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
        raw: '1751.25',
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
  'Annual Change - {1992, 2016}': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1380.00',
        estimated: true,
      },
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-580.00',
        estimated: true,
      },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1770.00',
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
        raw: '1757.50',
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
        raw: '1751.25',
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
        raw: '2050.00',
        estimated: true,
      },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '520.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '2350.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '1020.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '2650.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '1520.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '2950.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '2020.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '4450.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '4520.00',
        estimated: true,
      },
    },
  ],
  'Annual Change - {1992, 2016, negative values ratePast}': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '2180.00',
        estimated: true,
      },
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '620.00',
        estimated: true,
      },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1770.00',
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
        raw: '1757.50',
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
        raw: '1751.25',
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
        raw: '2050.00',
        estimated: true,
      },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '520.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '2350.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '1020.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '2650.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '1520.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '2950.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '2020.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '4450.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '4520.00',
        estimated: true,
      },
    },
  ],
  'Annual Change - {1992, 2016, negative values ratePast and rateFuture}': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '4780.00',
        estimated: true,
      },
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-982.00',
        estimated: true,
      },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1770.00',
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
        raw: '1757.50',
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
        raw: '1751.25',
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
        raw: '-1810.00',
        estimated: true,
      },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-940.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '-5370.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-1900.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '-8930.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-2860.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '-12490.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-3820.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '-30290.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-8620.00',
        estimated: true,
      },
    },
  ],
}
