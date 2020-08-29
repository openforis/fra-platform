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
    
    6: {
      label: 'panEuropean.navigation.socioEconomicFunctionsAndConditions',
      children: {
		  
        '62': {
          name: 'grossValueAdded',
          anchor: '6.2',
          tables: {
            table_6_2: 'table_6_2',
          },
		    },
		  
      },
    },

  },
  
}

module.exports = PanEuropean
