const PanEuropean = {
  type: 'panEuropean',
  years: [1990, 2000, 2005, 2010, 2015, 2020],
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
		  
        '64b': {
          name: 'totalFixedCapitalConsumptionInForestsAndForestry',
          anchor: '6.4b',
          tables: {
            table_6_4b: 'table_6_4b',
          },
		},
      },
    },    
  },
  
}

module.exports = PanEuropean
