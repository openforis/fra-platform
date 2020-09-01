const PanEuropean = {
  type: 'panEuropean',
  years: [1990, 2000, 2005, 2010, 2015, 2020],
  years90_20: [1990, 2000, 2005, 2010, 2015, 2020],
  years90_15: [1990, 2000, 2005, 2010, 2015],
  years15: [2015],

  sections: {
    1: {
      label: 'panEuropean.navigation.forestResourcesAndCarbon',
      children: {

        '11a': {
          name: 'forestArea',
          anchor: '1.1a',
          tables: {
            table_1_1a: 'table_1_1a',
          },
        },
        
        '11b': {
          name: 'forestAreaByForestTypes',
          anchor: '1.1b',
          tables: { table_1_1b: 'table_1_1b' }
		    },
		  
        '13b': {
          name: 'diameterDistributionAndTotalAreaUnevenAgedStands',
          anchor: '1.3b',
          tables: {
            table_1_3b: 'table_1_3b',
          },
		    },
      		
        '12a': {
          name: 'growingStock',
          anchor: '1.2a',
          tables: {
            table_1_2a: 'table_1_2a',
          },
        },

        '12b': {
          name: 'growingStockByForestType',
          anchor: '1.2b',
          tables: {
            table_1_2b: 'table_1_2b',
          },
		    },
		  
        '13a1': {
          name: 'ageClassDistributionAreaOfEvenAgedStands',
          anchor: '1.3a1',
          tables: {
            table_1_3a1: 'table_1_3a1',
          },
        },

        '13a2': {
          name: 'ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply',
          anchor: '1.3a2',
          tables: {
            table_1_3a2: 'table_1_3a2',
          },
        },
        
        '14a': {
          name: 'carbonStock',
          anchor: '1.4a',
          tables: {
            table_1_4a: 'table_1_4a',
          },
		    },

        '14b': {
          name: 'carbonStockInHarvestedWoodProductsHWP',
          anchor: '1.4b',
          tables: {
            table_1_4b: 'table_1_4b',
          },
        },

      },
    },

    2: {
      label: 'panEuropean.navigation.maintenanceOfForestEcosystemHealthAndVitality',
      children: {
		  
        '24': {
          name: 'forestAreaWithDamage',
          anchor: '2.4',
          tables: {
            table_2_4: 'table_2_4',
          },
		    },
      },
    },    
    
    4: {
      label: 'panEuropean.navigation.biologicalDiversityInForestEcosystems',
      children: {
		  
        '41': {
          name: 'treeSpeciesComposition',
          anchor: '4.1',
          tables: {
            table_4_1: 'table_4_1',
          },
		    },  

        '42a': {
          name: 'totalForestAreaByExpansionAndRegenerationType',
          anchor: '4.2a',
          tables: {
            table_4_2a: 'table_4_2a',
          },
		    },
        
      },
    },

    6: {
      label: 'panEuropean.navigation.socioEconomicFunctionsAndConditions',
      children: {		  
        '64a': {
          name: 'totalGrossFixedCapitalFormationInForestsAndForestry',
          anchor: '6.4a',
          tables: {
            table_6_4a: 'table_6_4a',
          },
        },

        '64b': {
          name: 'totalFixedCapitalConsumptionInForestsAndForestry',
          anchor: '6.4b',
          tables: {
            table_6_4b: 'table_6_4b',
          },
		    },

        '64c': {
          name: 'totalCapitalTransfersInForestsAndForestry',
          anchor: '6.4c',
          tables: {
            table_6_4c: 'table_6_4c',
          },
        },

        '65a': {
          name: 'employmentByGenderAndAge',
          anchor: '6.5a',
          tables: {
            table_6_5a: 'table_6_5a',
          },
        },

        '65b': {
          name: 'employmentByEducationAndJobCharacteristics',
          anchor: '6.5b',
          tables: {
            table_6_5b: 'table_6_5b',
          },
        },

        '66': {
          name: 'occupationalAccidents',
          anchor: '6.6',
          tables: {
            table_6_6: 'table_6_6',
          },
        },

        '610a': {
          name: 'accessibilityForRecreation',
          anchor: '6.10a',
          tables: {
            table_6_10a: 'table_6_10a',
          },
        },        

        '610c': {
          name: 'recreationFacilities',
          anchor: '6.10c',
          tables: {
            table_6_10c: 'table_6_10c',
          },
        },        
		
      },
    },

  },
}

module.exports = PanEuropean
