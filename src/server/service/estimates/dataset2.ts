const _defaultOtherWoodedLand = '20.00'

const _getODP = (forestArea: string, otherWoodedLand: string = _defaultOtherWoodedLand) => ({
  forestArea: {
    odp: true,
    raw: forestArea,
  },
  otherWoodedLand: {
    odp: true,
    raw: otherWoodedLand,
  },
})

export const dataset2 = {
  mockOriginalDataPointSet1: {
    ITA: {
      originalDataPointValue: {
        '1992': _getODP('1780'),
        '2002': _getODP('1750'),
      },
    },
  },
  mockOriginalDataPointSet2: {
    ITA: {
      originalDataPointValue: {
        '1992': _getODP('1780'),
        '2012': _getODP('1750'),
      },
    },
  },
  mockOriginalDataPointSet3: {
    ITA: {
      originalDataPointValue: {
        '1992': _getODP('1780'),
        '2016': _getODP('1750'),
      },
    },
  },
  mockOriginalDataPointSet4: {
    ITA: {
      originalDataPointValue: {
        '1992': _getODP('1780'),
        '2016': _getODP('2750'),
      },
    },
  },
}
export const dataset2Result = {
  '1 - Linear - {1992, 2002}': [
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
  '1 - Repeat last - {1992, 2002}': [
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

  '2 - Repeat last - {1992, 2016}': [
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
  '2 - Linear - {1992, 2016}': [
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

  '3 - Linear - {1992, 2016}': [
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
  '3 - Repeat Last - {1992, 2016}': [
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
  '3 - Annual Change - {1992, 2016}': [
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
  '3 - Annual Change - {1992, 2016, negative values ratePast}': [
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
  '3 - Annual Change - {1992, 2016, negative values ratePast and rateFuture}': [
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

  '4 - Linear - {1992, 2016}': [
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
  '4 - Repeat last - {1992, 2016}': [
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
  '4 - Annual Change - {1992, 2016}': [
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
  '4 - Annual Change - {1992, 2016} - 2': [
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
