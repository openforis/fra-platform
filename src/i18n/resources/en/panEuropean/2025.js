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
      facilityCategory: {
        notSelected: '',
        accommodationFacilities: '1 Accommodation facilities (mountain hotels, cottages, apartments)',
        campingSites: '2 Camping sites',
        overnightShelters: '3 Overnight shelters',
        picnicSites: '4 Picnic sites',
        natureSchools: '5 Nature schools',
        sitesForNatureStudying:
          '6 Sites for nature studying (educational walkways, nature exhibitions, protected sites, geological localities, sites of cultural heritage, famous trees …)',
        birdAndWildlifeWatchingLocalities: '7 Bird and wildlife watching localities',
        cablewaysAndLifts: '8 Cableways and lifts',
        parkingLots: '9 Parking lots',
        otherFacilities: '10 Other facilities',
      },
    },
  },
}
