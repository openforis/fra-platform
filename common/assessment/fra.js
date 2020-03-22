const R = require('ramda')

const FRA = {
  type: 'fra2020',
  yearsTable: [1990, 2000, 2010, 2015, 2020],
  years: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
  yearsRange: ['1990-2000', '2000-2010', '2010-2015', '2015-2020'],
  yearsAnnual: R.range(2000, 2018),

  sections: {
    0: {
      label: 'navigation.sectionHeaders.introduction',
      children: {
        a: {
          name: 'contactPersons',
          anchor: '',
        },
      },
    },
    1: {
      label: 'navigation.sectionHeaders.forestExtentCharacteristicsAndChanges',
      children: {
        a: {
          name: 'extentOfForest',
          anchor: '1a',
          tables: {
            extentOfForest: 'extentOfForest',
            climaticDomain: 'climaticDomain',
          },
        },
        b: {
          name: 'forestCharacteristics',
          anchor: '1b',
          tables: {
            forestCharacteristics: 'forestCharacteristics',
          },
        },
        c: {
          name: 'forestAreaChange',
          anchor: '1c',
          tables: {
            forestAreaChange: 'forestAreaChange',
          },
        },
      },
    },
    2: {
      label: 'navigation.sectionHeaders.forestGrowingStockBiomassAndCarbon',
      children: {
        a: {
          name: 'growingStock',
          anchor: '2a',
          tables: {
            totalTable: 'totalTable',
            avgTable: 'avgTable',
            baseTable: 'baseTable',
          },
        },
        b: {
          name: 'growingStockComposition',
          anchor: '2b',
          tables: {
            growingStockComposition: 'growingStockComposition',
          },
        },
        c: {
          name: 'biomassStock',
          anchor: '2c',
          tables: {
            biomassStock: 'biomassStock',
          },
        },
        d: {
          name: 'carbonStock',
          anchor: '2d',
          tables: {
            carbonStock: 'carbonStock',
            carbonStockSoilDepth: 'carbonStockSoilDepth',
          },
        },
      },
    },
    3: {
      label: 'navigation.sectionHeaders.forestDesignationAndManagement',
      children: {
        a: {
          name: 'designatedManagementObjective',
          anchor: '3a',
          tables: {
            primaryDesignatedManagementObjective: 'primaryDesignatedManagementObjective',
            totalAreaWithDesignatedManagementObjective: 'totalAreaWithDesignatedManagementObjective',
          },
        },
        b: {
          name: 'forestAreaWithinProtectedAreas',
          anchor: '3b',
          tables: {
            forestAreaWithinProtectedAreas: 'forestAreaWithinProtectedAreas',
          },
        },
      },
    },
    5: {
      label: 'navigation.sectionHeaders.forestDisturbances',
      children: {
        a: {
          name: 'disturbances',
          anchor: '5a',
          tables: {
            disturbances: 'disturbances',
          },
        },
        c: {
          name: 'degradedForest',
          anchor: '5c',
          tables: {
            degradedForest: 'degradedForest',
          },
        },
      },
    },
    7: {
      label: 'navigation.sectionHeaders.employmentEducationAndNwfp',
      children: {
        c: {
          name: 'nonWoodForestProductsRemovals',
          anchor: '7c',
          tables: {
            nonWoodForestProductsRemovals: 'nonWoodForestProductsRemovals',
            nonWoodForestProductsRemovalsCurrency: 'nonWoodForestProductsRemovalsCurrency',
          },
        },
      },
    },
  },
}

module.exports = FRA
