const PanEuropean = {
  type: 'panEuropean',
  years: [1990, 2000, 2005, 2010, 2015, 2020],
  years90_20: [1990, 2000, 2005, 2010, 2015, 2020],
  years90_15: [1990, 2000, 2005, 2010, 2015],

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
        
        '14b': {
          name: 'carbonStockInHarvestedWoodProductsHWP',
          anchor: '1.4b',
          tables: {
            table_1_4b: 'table_1_4b',
          },
        },

      },
    },
    
    6: {
      label: 'panEuropean.navigation.socioEconomicFunctionsAndConditions',
      children: {
		  
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
		
      },
    },    
  },
}

module.exports = PanEuropean
