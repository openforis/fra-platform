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

    4: {
      label: 'panEuropean.navigation.biologicalDiversityInForestEcosystems',
      children: {
		  
        '49': {
          name: 'protectedForests',
          anchor: '4.9',
          tables: {
            table_4_9: 'table_4_9',
          },
        },
        		
      },
    },

  },
  
}

module.exports = PanEuropean
