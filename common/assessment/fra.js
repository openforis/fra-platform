const FRA = {
  type: 'fra2020',
  yearsTable: [1990, 2000, 2010, 2015, 2020],
  years: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],

  sections: {
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
  },
}

module.exports = FRA
