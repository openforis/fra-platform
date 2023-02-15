// TODO: all fra labels will be migrated here in a future refactor
module.exports = {
  // common
  area100HaYear: 'Area (1000 ha/year)',
  area100Ha: 'Area (1000 ha)',
  categoryHeader2020: 'FRA 2020 categories',
  categoryHeader2025: 'FRA 2025 categories',
  forestArea100HaYear: 'Forest area (1000 ha)',

  // tables
  areaAffectedByFire: {
    areaAffected: 'Area affected (1000 ha)',
  },

  biomassStockAvg: {
    forestBiomass: 'Forest Biomass (tones/ha)',
  },

  biomassStockTotal: {
    totalForestBiomass: 'Total forest Biomass (million tones)',
  },

  carbonStockTotal: {
    totalForestCarbon: 'Total forest carbon (million tones)',
  },

  climaticDomain: {
    percentOfForestArea: '% of forest area',
  },

  contactPersons: {
    expectedYearForNextCountryReportUpdate: 'Expected year for next update of the country report',
  },

  degradedForest: {
    // Title
    degradedForest: 'Degraded forest',
    degradedForestDefinition: 'Degraded forest definition',
    forestDegradationMonitoringAndAssessment: 'Forest degradation monitoring and assessment',

    degradedAreaForThatYear: 'Degraded forest area for that year (in 1 000 ha)',
    doesYourCountryMonitor: 'Does your country monitor area of degraded forest',
    hasNationalDefinitionOfDegradedForest: 'Has your country a national definition of "Degraded forest"',
    hasNationalLevelData: 'If national level data are available',
    howMonitored: 'Describe the monitoring process and results',
    ifYes: 'If "yes"',
    whatIsDefinition: 'What is the national definition of "Degraded forest"?',
    yearOfLatestAssessment: 'Year of latest assessment',

    // Multiple choice
    // generic
    other: 'Other (explain in comments)',
    notSelected: '',

    criteriaOfDegradedForest: 'Criteria applied in the definition of degraded forest',
    changeInForestStructureDecreaseInForestCanopy: 'Change in forest structure / Decrease in forest canopy',
    forestDisturbances: 'Forest disturbances',
    lossOfProductivityAndForestGoods: 'Loss of productivity and forest goods',
    lossOfForestServices: 'Loss of forest services',
    lossOfCarbonBiomassAndGrowingStock: 'Loss of carbon, biomass and growing stock',
    lossOfBiologicalDiversity: 'Loss of biological diversity',
    soilDamageErosion: 'Soil damage / erosion',

    mainMethods: 'Main methods applied to monitor degraded forest area',
    fieldInventoryAndObservations: 'Field inventory and observations',
    wallToWallRemoteSensingMapping: 'Wall-to-wall remote sensing mapping',
    remoteSensingSurvey: 'Remote sensing survey',
    expertOpinion: 'Expert opinion',
    productionHarvestData: 'Production / Harvest data',
    forestManagementPlanReport: 'Forest management plan report',
    underDevelopment: 'Under development',

    monitoringScale: 'Monitoring scale',
    national: 'National',
    subnational: 'Subnational',
    biome: 'Biome',
    standLocal: 'Stand / Local',
  },

  designatedManagementObjective: {
    noDesignation: 'No designation',
    unknown2025: 'Unknown',
  },

  disturbances: {
    forestDamage: 'Forest damage',
    predominantCause: 'Predominant cause',
    forestAreaAffected: 'Forest area affected (1000 ha)',
  },

  extentOfForest: {
    remainingLandArea: 'Remaining land area',
  },

  forestAreaWithinProtectedAreas: {
    forestAreaWithLongTermManagementPlan2025: 'Forest area with long-term management plan',
  },

  forestCharacteristics: {
    ofWhichOtherPlantedForest: '$t(growingStock.otherPlantedForest)',
    ofWhichPlantationForest: '$t(growingStock.plantationForest)',
    primaryForest: '…of which primary forest',
    plantationForestIntroducedArea2025: '…of which introduced species',
  },

  forestOwnership: {
    ofWhichCommunities2025: '…of which owned by Indigenous Peoples and local communities',
    other2025: 'Other (specify in comments)',
    unknown2025: 'Unknown',
    total2025: 'Total',
  },

  forestRestoration: {
    forestRestoration: 'Forest restoration',
    hasYourCountryForestRestorationCommitments: 'Has your country forest restoration commitments?',
    isThereALawOrOtherGovernmentMandateInSupportOfRestoration:
      'Is there a  law or other government mandate in support of restoration?',
    isThereANationalDefinitionOfRestoration:
      'Is there a national definition of "restoration" if yes, provide the defintion the monitoring process and results.',
    whatAreasInNeedOfRestorationHaveBeenIdentified:
      'What areas in need of restoration have been identified and how have they been identified?',
    whatAreTheTargetsSetForTheRestoration:
      'What are the targets set for the restoration? E g xxx hectares by year yyyy',
    howManyHectaresOfForestHaveBeenRestoredToDate: 'How many hectares of forest have been restored to date?',
    ifYes: 'If "yes"',
  },

  growingStock: {
    totalForest: 'Total Forest',
  },

  growingStockComposition: {
    millionCubicMeter: 'Million m³',
    mostRecentYear: 'Most recent year:',
    percentOfTotal: '% of total',
    ranked: '#{{idx}} Ranked',
    totalGrowingStock: 'Total growing stock',
    totalIntroducedTreeSpecies: 'TOTAL introduced tree species',
    totalNativeTreeSpecies: 'TOTAL native tree species',
    updatedGrowingStockComposition: '$t(growingStockComposition.growingStockComposition)',
  },

  holderOfManagementRights: {
    communities2025: 'Indigenous Peoples and local communities',
    other2025: 'Other (specify in comments)',
    unknown2025: 'Unknown',
  },

  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals2025: 'Non wood forest products removals and value 2020',
  },

  primaryForestByClimaticDomain: {
    primaryForestByClimaticDomain: 'Primary forest by climatic domain',
    primaryForestArea100Ha: 'Primary forest area ($t(unit.haThousand))',
    primaryForestBoreal: '…of which boreal primary forest',
    primaryForestTemperate: '…of which temperate primary forest',
    primaryForestTropical: '…of which tropical primary forest',
    primaryForestSubTropical: '…of which sub-tropical primary forest',
    totalPrimaryForest: 'Total',
  },

  specificForestCategories: {
    specificForestCategories2025: 'Specific forest categories',
    mangroves2025: `Mangroves\u00B9`,
    mangrovesDisclaimer: `\u00B9Includes both Forest and Other wooded land`,
  },

  sustainableDevelopment: {
    annualForestAreaChangeRate: 'Annual forest area change rate',
    sdgIndicator1_2025: 'SDG Indicator 15.1.1 Forest area as proportion of total land area',
    forestAreaProportionLandArea: 'Forest area as proportion of total land area',
  },

  navigation: {
    sectionHeaders: {
      employmentEducationAndNwfp2025: 'Non wood forest products removals and value 2020',
    },
  },
}
