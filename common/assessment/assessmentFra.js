const FRA = {
  type: 'fra2020',
  years: [1990, 2000, 2010, 2015, 2020],

  sections: {
    3: {
      label: 'navigation.sectionHeaders.forestDesignationAndManagement',
      children: {
        'a': {
          name: 'designatedManagementObjective',
          anchor: '3a',
          tables: {
            primaryDesignatedManagementObjective: 'primaryDesignatedManagementObjective',
            totalAreaWithDesignatedManagementObjective: 'totalAreaWithDesignatedManagementObjective',

          }
        },
      }
    },
  }
}

module.exports = FRA
