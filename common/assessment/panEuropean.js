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

        '14b': {
          name: 'carbonStockInHarvestedWoodProductsHWP',
          anchor: '1.4b',
          tables: {
            table_1_4b: 'table_1_4b',
          },
		    },
		
      },
    },

    5: {
      label: 'panEuropean.navigation.protectiveFunctionsInForestManagement',
      children: {
		  
        '51': {
          name: 'protectiveForestsSoilWaterAndOtherEcosystemFunctions',
          anchor: '5.1',
          tables: {
            table_5_1: 'table_5_1',
          },
        },
        
      },
    },

  },
  
}

module.exports = PanEuropean
