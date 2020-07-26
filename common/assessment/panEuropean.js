const PanEuropean = {
  type: 'panEuropean',
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
		
      },
    },
    
    6: {
      label: 'panEuropean.navigation.socioEconomicFunctionsAndConditions',
      children: {
		  
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
