import { getODP } from 'server/service/estimates/getODP'

export const dataset6 = {
  ITA: {
    originalDataPointValue: {
      '1992': getODP('1780'),
      '2016': getODP('2750'),
    },
  },
}

export const dataset6Expected = {
  'Linear - {1992, 2016}': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '1699.17',
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
        raw: '2103.33',
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
        raw: '2507.50',
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
        raw: '2709.58',
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
        raw: '2750.00',
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
        raw: '2790.42',
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
        raw: '2830.84',
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
        raw: '2871.26',
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
        raw: '2911.68',
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
        raw: '3113.78',
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
        raw: '2103.33',
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
        raw: '2507.50',
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
        raw: '2709.58',
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
        raw: '2750.00',
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
        raw: '2750.00',
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
        raw: '2750.00',
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
        raw: '2750.00',
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
        raw: '2750.00',
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
        raw: '2750.00',
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
        raw: '4080.00',
        estimated: true,
      },
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-4670.00',
        estimated: true,
      },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '2103.33',
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
        raw: '2507.50',
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
        raw: '2709.58',
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
        raw: '2750.00',
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
        raw: '4950.00',
        estimated: true,
      },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-1480.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '7150.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-2980.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '9350.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-4480.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '11550.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-5980.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '22550.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '-13480.00',
        estimated: true,
      },
    },
  ],
  'Annual Change - {1992, 2016} - 2': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '-3220.00',
        estimated: true,
      },
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '17820.00',
        estimated: true,
      },
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '2103.33',
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
        raw: '2507.50',
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
        raw: '2709.58',
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
        raw: '2750.00',
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
        raw: '-1750.00',
        estimated: true,
      },
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '5910.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '-6250.00',
        estimated: true,
      },
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '11800.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '-10750.00',
        estimated: true,
      },
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '17690.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '-15250.00',
        estimated: true,
      },
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '23580.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'forestArea',
      value: {
        raw: '-37750.00',
        estimated: true,
      },
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      variableName: 'otherWoodedLand',
      value: {
        raw: '53030.00',
        estimated: true,
      },
    },
  ],
}
