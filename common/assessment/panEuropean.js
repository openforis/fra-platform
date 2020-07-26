const PanEuropean = {
  type: 'panEuropean',
  years90_20: [1990, 2000, 2005, 2010, 2015, 2020],

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
		  
        '12a': {
          name: 'growingStock',
          anchor: '1.2a',
          tables: {
            table_1_2a: 'table_1_2a',
          },
		    },
		
      },
    },
    
  },
  
}

module.exports = PanEuropean
