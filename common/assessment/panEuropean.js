const PanEuropean = {
  type: 'panEuropean',
  years90_20: [1990, 2000, 2005, 2010, 2015, 2020],
  years90_15: [1990, 2000, 2005, 2010, 2015],
  years05_15: [2005, 2010, 2015],
  years15: [2015],
  years88_17: [1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
  years92_17: [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],

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

        '11b': {
          name: 'forestAreaByForestTypes',
          anchor: '1.1b',
          tables: { table_1_1b: 'table_1_1b' }
        },

        '12a': {
          name: 'growingStock',
          anchor: '1.2a',
          tables: {
            table_1_2a: 'table_1_2a',
          },
        },

        '12b': {
          name: 'growingStockByForestType',
          anchor: '1.2b',
          tables: {
            table_1_2b: 'table_1_2b',
          },
        },

        '12c': {
          name: 'growingStockComposition',
          anchor: '1.2c',
          tables: {
            table_1_2c: 'table_1_2c',
          },
        },

        '13a1': {
          name: 'ageClassDistributionAreaOfEvenAgedStands',
          anchor: '1.3a1',
          tables: {
            table_1_3a1: 'table_1_3a1',
          },
        },

        '13a2': {
          name: 'ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply',
          anchor: '1.3a2',
          tables: {
            table_1_3a2: 'table_1_3a2',
          },
        },

        '13b': {
          name: 'diameterDistributionAndTotalAreaUnevenAgedStands',
          anchor: '1.3b',
          tables: {
            table_1_3b: 'table_1_3b',
          },
        },

        '14a': {
          name: 'carbonStock',
          anchor: '1.4a',
          tables: {
            table_1_4a: 'table_1_4a',
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

    2: {
      label: 'panEuropean.navigation.maintenanceOfForestEcosystemHealthAndVitality',
      children: {
        '24': {
          name: 'forestAreaWithDamage',
          anchor: '2.4',
          tables: {
            table_2_4: 'table_2_4',
          },
        },
      },
    },

    3: {
      label: 'panEuropean.navigation.productiveFunctionsOfForestsWoodAndNonWood',
      children: {
        '31': {
          name: 'incrementAndFellings',
          anchor: '3.1',
          tables: {
            table_3_1: 'table_3_1',
          },
        },

        '32': {
          name: 'removals',
          anchor: '3.2',
          tables: {
            table_3_2: 'table_3_2',
          },
        },

        '33': {
          name: 'nonWoodGoods2015',
          anchor: '3.3',
          tables: {
            table_3_3: 'table_3_3',
          },
        },
        '34': {
          name: 'marketedServices2015',
          anchor: '3.4',
          tables: {
            table_3_4: 'table_3_4',
          },
        },
      },
    },

    4: {
      label: 'panEuropean.navigation.biologicalDiversityInForestEcosystems',
      children: {
        '41': {
          name: 'treeSpeciesComposition',
          anchor: '4.1',
          tables: {
            table_4_1: 'table_4_1',
          },
        },

        '42a': {
          name: 'totalForestAreaByExpansionAndRegenerationType',
          anchor: '4.2a',
          tables: {
            table_4_2a: 'table_4_2a',
          },
        },

        '42b': {
          name: 'annualForestExpansionAndRegeneration',
          anchor: '4.2b',
          tables: {
            table_4_2b: 'table_4_2b',
          },
        },

        '43a': {
          name: 'naturalness',
          anchor: '4.3a',
          tables: {
            table_4_3a: 'table_4_3a',
          },
        },

        '43b': {
          name: 'naturalnessBySubclasses',
          anchor: '4.3b',
          tables: {
            table_4_3b: 'table_4_3b',
          },
        },

        '44a': {
          name: 'introducedTreeSpecies',
          anchor: '4.4a',
          tables: {
            table_4_4a: 'table_4_4a',
          },
        },

        '45a': {
          name: 'deadwood',
          anchor: '4.5a',
          tables: {
            table_4_5a: 'table_4_5a',
          },
        },

        '48': {
          name: 'threatenedForestSpecies',
          anchor: '4.8',
          tables: {
            table_4_8: 'table_4_8',
          },
        },

        '49': {
          name: 'protectedForests',
          anchor: '4.9',
          tables: {
            table_4_9: 'table_4_9',
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

    6: {
      label: 'panEuropean.navigation.socioEconomicFunctionsAndConditions',
      children: {
        '61': {
          name: 'forestHoldings',
          anchor: '6.1',
          tables: {
            table_6_1: 'table_6_1',
          },
        },

        '62': {
          name: 'grossValueAdded',
          anchor: '6.2',
          tables: {
            table_6_2: 'table_6_2',
          },
        },

        '63': {
          name: 'factorIncomeAndEntrepreneurialIncome',
          anchor: '6.3',
          tables: {
            table_6_3: 'table_6_3',
          },
        },

        '64a': {
          name: 'totalGrossFixedCapitalFormationInForestsAndForestry',
          anchor: '6.4a',
          tables: {
            table_6_4a: 'table_6_4a',
          },
        },

        '64b': {
          name: 'totalFixedCapitalConsumptionInForestsAndForestry',
          anchor: '6.4b',
          tables: {
            table_6_4b: 'table_6_4b',
          },
        },

        '64c': {
          name: 'totalCapitalTransfersInForestsAndForestry',
          anchor: '6.4c',
          tables: {
            table_6_4c: 'table_6_4c',
          },
        },

        '65a': {
          name: 'employmentByGenderAndAge',
          anchor: '6.5a',
          tables: {
            table_6_5a: 'table_6_5a',
          },
        },

        '65b': {
          name: 'employmentByEducationAndJobCharacteristics',
          anchor: '6.5b',
          tables: {
            table_6_5b: 'table_6_5b',
          },
        },

        '66': {
          name: 'occupationalAccidents',
          anchor: '6.6',
          tables: {
            table_6_6: 'table_6_6',
          },
        },

        '67': {
          name: 'woodConsumption',
          anchor: '6.7',
          tables: {
            table_6_7: 'table_6_7',
          },
        },

        '68': {
          name: 'tradeInWood',
          anchor: '6.8',
          tables: {
            table_6_8: 'table_6_8',
          },
        },

        '610a': {
          name: 'accessibilityForRecreation',
          anchor: '6.10a',
          tables: {
            table_6_10a: 'table_6_10a',
          },
        },

        '610b': {
          name: 'intensityOfUse',
          anchor: '6.10b',
          tables: {
            table_6_10b: 'table_6_10b',
          },
        },

        '610c': {
          name: 'recreationFacilities',
          anchor: '6.10c',
          tables: {
            table_6_10c: 'table_6_10c',
          },
        },
      },
    },
  },
}

module.exports = PanEuropean
