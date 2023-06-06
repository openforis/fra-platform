// Assessment: FRA
// Cycle: 2025
// Country: Egypt
// CountryIso: EGY
// @ts-ignore
export const dataset7 = {
  EGY: {
    originalDataPointValue: {
      '2021': {
        total: {
          odp: true,
          raw: '4.0100000000000000000000',
          odpId: 1256,
        },
        otherLand: {
          odp: true,
          raw: '99537.49',
          odpId: 1256,
        },
        forestArea: {
          odp: true,
          raw: '4.01000000000000000000',
          odpId: 1256,
        },
        plantedForest: {
          odp: true,
          raw: '3.38000000000000000000',
          odpId: 1256,
        },
        primaryForest: {
          odp: true,
          raw: '0.630000000000000000000000',
          odpId: 1256,
        },
        totalLandArea: {
          odp: true,
          raw: '99545',
          odpId: 1256,
        },
        otherWoodedLand: {
          odp: true,
          raw: '3.50000000000000000000',
          odpId: 1256,
        },
        totalForestArea: {
          odp: true,
          raw: '4.0100000000000000000000',
          odpId: 1256,
        },
        naturalForestArea: {
          odp: true,
          raw: '0.6300000000000000000000',
          odpId: 1256,
        },
        plantationForestArea: {
          odp: true,
          raw: '0.00000000000000000000',
          odpId: 1256,
        },
        otherPlantedForestArea: {
          odp: true,
          raw: '3.38000000000000000000',
          odpId: 1256,
        },
        plantationForestIntroducedArea: {
          odp: true,
          // @ts-ignore
          raw: null,
          odpId: 1256,
        },
      },
    },
  },
}

export const dataset7Expected = {
  'Extrapolates with repeat last value': [
    {
      colName: '1990',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '1990',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '2000',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '2010',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '2015',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '2016',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '2017',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '2018',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '2019',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '2020',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'naturalForestArea',
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.63',
      },
      variableName: 'primaryForest',
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '0.00',
      },
      variableName: 'plantationForestArea',
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: null,
      },
      variableName: 'plantationForestIntroducedArea',
    },
    {
      colName: '2025',
      tableName: 'extentOfForest',
      value: {
        estimated: true,
        raw: '3.38',
      },
      variableName: 'otherPlantedForestArea',
    },
  ],
}
