module.exports = {
  description: {
    dataSource: {
      referenceToTataSource: 'Name and Reference to data source',
      typeOfDataSource: '$t(dataSource.typeOfDataSource)',
      variable: '$t(dataSource.variable)',
      yearForDataSource: '$t(dataSource.yearForDataSource)',
      comments: '$t(dataSource.comments)',
    },
  },
  meta: {
    select: {
      forestServiceCategory: {
        notSelected: '',
        _placeholder: '',
        ecologicalServices: '1 Ecological services',
        waterProtection: '1.1 Water protection',
        soilProtection: '1.2 Soil protection',
        healthProtection: '1.3 Health protection',
        infrastructureProtection: '1.4 Infrastructure protection',
        biosphericServices: '2 Biospheric services',
        biodiversityProtection: '2.1 Biodiversity protection',
        climateRegulation: '2.2 Climate regulation',
        socialServices: '3 Social services',
        tourism: '3.1 Tourism',
        recreation: '3.2 Recreation',
        sportActivities: '3.3 Sport activities',
        amenityServices: '4 Amenity services',
        spiritualServices: '4.1 Spiritual services',
        culturalServices: '4.2 Cultural services',
        historicalServices: '4.3 Historical services',
        otherServices: '5 Other services',
      },
    },
  },
}
