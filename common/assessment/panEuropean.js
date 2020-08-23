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

        '65a': {
          name: 'employmentByGenderAndAge',
          anchor: '6.5a',
          tables: {
            table_6_5a: 'table_6_5a',
          },
        },
      },
    },		  
  },
  
}

module.exports = PanEuropean
