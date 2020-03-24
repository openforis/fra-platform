const R = require('ramda')

const FRA = {
  type: 'fra2020',
  years: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
  yearsTable: [1990, 2000, 2010, 2015, 2020],
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
        d: {
          name: 'annualReforestation',
          anchor: '1d',
          tables: {
            annualReforestation: 'annualReforestation',
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
    4: {
      label: 'navigation.sectionHeaders.forestOwnershipAndManagementRights',
      children: {
        a: {
          name: 'forestOwnership',
          anchor: '4a',
          tables: {
            forestOwnership: 'forestOwnership',
          },
        },
        b: {
          name: 'holderOfManagementRights',
          anchor: '4b',
          tables: {
            forestOwnership: 'holderOfManagementRights',
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
        b: {
          name: 'areaAffectedByFire',
          anchor: '5b',
          tables: {
            areaAffectedByFire: 'areaAffectedByFire',
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
        a: {
          name: 'employment',
          anchor: '7a',
          tables: {
            employment: 'employment',
          },
        },
        b: {
          name: 'graduationOfStudents',
          anchor: '7b',
          tables: {
            graduationOfStudents: 'graduationOfStudents',
          },
        },
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
    8: {
      label: 'navigation.sectionHeaders.sustainableDevelopment',
      children: {
        a: {
          name: 'sustainableDevelopment',
          anchor: '8a',
          tables: {
            sustainableDevelopmentAgencyIndicator: 'sustainableDevelopmentAgencyIndicator',
            sustainableDevelopmentAgencySubIndicator1: 'sustainableDevelopmentAgencySubIndicator1',
            sustainableDevelopmentAgencySubIndicator2: 'sustainableDevelopmentAgencySubIndicator2',
            sustainableDevelopmentAgencySubIndicator3: 'sustainableDevelopmentAgencySubIndicator3',
            sustainableDevelopmentAgencySubIndicator4: 'sustainableDevelopmentAgencySubIndicator4',
          },
        },
      },
    },
  },
}

module.exports = FRA
