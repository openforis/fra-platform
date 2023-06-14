// TODO: all fra labels will be migrated here in a future refactor
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _2020 = require('./2020')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _2025 = require('./2025')

module.exports = {
  2020: _2020,
  2025: _2025,

  // assessment labels
  labels: {
    short: 'FRA',
  },

  // common
  area100HaYear: 'Area (1000 ha/year)',
  area100Ha: 'Area (1000 ha)',
  categoryHeader2020: 'FRA 2020 categories',
  categoryHeader2025: 'FRA 2025 categories',
  forestArea100HaYear: 'Forest area (1000 ha)',

  // tables
  areaAffectedByFire: {
    areaAffected: 'Area affected (1000 ha)',
    areaAffectedByFire2025: '$t(areaAffectedByFire.areaAffectedByFire)',
    totalLandAreaAffectedByFire2025: '$t(areaAffectedByFire.totalLandAreaAffectedByFire)',
  },

  biomassStock: {
    aboveGround2025: '$t(biomassStock.aboveGround)',
    belowGround2025: '$t(biomassStock.belowGround)',
    deadWood2025: '$t(biomassStock.deadWood)',
    biomassStock2025: '$t(biomassStock.biomassStock)',
  },

  biomassStockAvg: {
    forestBiomass: 'Forest Biomass (tonnes/ha)',
  },

  biomassStockTotal: {
    totalForestBiomass: 'Total forest Biomass (million tonnes)',
  },

  carbonStock: {
    carbonAboveGroundBiomass2025: '$t(carbonStock.carbonAboveGroundBiomass)',
    carbonBelowGroundBiomass2025: '$t(carbonStock.carbonBelowGroundBiomass)',
    carbonStock2025: '$t(carbonStock.carbonStock)',
  },

  carbonStockTotal: {
    totalForestCarbon: 'Total forest carbon (million tonnes)',
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
    criteriaOfDegradedForest2025: '$t(fra.degradedForest.criteriaOfDegradedForest)',
  },

  designatedManagementObjective: {
    designatedManagementObjective2025: '$t(designatedManagementObjective.designatedManagementObjective)',
    noDesignation: 'No designation',
    unknown2025: 'Unknown',
  },

  disturbances: {
    forestDamage: 'Forest damage',
    predominantCause: 'Predominant cause',
    forestAreaAffected: 'Forest area affected (1000 ha)',
    severeWeatherEvents2025: '$t(disturbances.severeWeatherEvents)',
  },

  extentOfForest: {
    remainingLandArea: 'Remaining land area',
    totalLandArea2025: '$t(extentOfForest.totalLandArea)',
    extentOfForest2025: '$t(extentOfForest.extentOfForest)',
    otherWoodedLand: '$t(fraClass.otherWoodedLand)',
  },

  forestAreaChange: {
    forestExpansion2025: '$t(forestAreaChange.forestExpansion)',
    forestAreaChange2025: '$t(forestAreaChange.forestAreaChange)',
    forestAreaNetChange2025: '$t(forestAreaChange.forestAreaNetChange)',
  },

  forestAreaWithinProtectedAreas: {
    forestAreaWithLongTermManagementPlan2025: 'Forest area with long-term management plan',
    forestAreaWithinProtectedAreas2025: '$t(forestAreaWithinProtectedAreas.forestAreaWithinProtectedAreas)',
  },

  forestCharacteristics: {
    ofWhichOtherPlantedForest: '$t(growingStock.otherPlantedForest)',
    ofWhichPlantationForest: '$t(growingStock.plantationForest)',
    primaryForest: '…of which primary forest',
    plantationForestIntroducedArea2025: '…of which introduced species',
    naturalForestArea2025: '$t(forestCharacteristics.naturalForestArea)',
  },

  forestOwnership: {
    ofWhichPrivateBusinesses2025: '$t(forestOwnership.ofWhichPrivateBusinesses)',
    ofWhichCommunities2025: '…of which owned by Indigenous Peoples and local communities',
    other2025: '$t(common.otherSpecifyInComments)',
    unknown2025: 'Unknown',
    total2025: 'Total',
    forestOwnership2025: '$t(forestOwnership.forestOwnership)',
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
    naturallyRegeneratingForest2025: '$t(growingStock.naturallyRegeneratingForest)',
    plantationForest2025: '$t(growingStock.plantationForest)',
    plantedForest2025: '$t(growingStock.plantedForest)',
    otherPlantedForest2025: '$t(growingStock.otherPlantedForest)',
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
    nativeTreeSpecies2025: '$t(growingStockComposition.nativeTreeSpecies)',
    remainingNative2025: '$t(growingStockComposition.remainingNative)',
    introducedTreeSpecies2025: '$t(growingStockComposition.introducedTreeSpecies)',
    remainingIntroduced2025: '$t(growingStockComposition.remainingIntroduced)',
  },

  holderOfManagementRights: {
    holderOfManagementRights2025: '$t(holderOfManagementRights.holderOfManagementRights)',
    privateBusinesses2025: '$t(holderOfManagementRights.privateBusinesses)',
    communities2025: 'Indigenous Peoples and local communities',
    other2025: '$t(common.otherSpecifyInComments)',
    unknown2025: 'Unknown',
  },

  otherWoodedLand: {
    otherWoodedLand2025: '$t(growingStock.otherWoodedLand)',
  },

  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals2025: 'Non wood forest products removals and value 2020',
    nameOfProduct2025: '$t(nonWoodForestProductsRemovals.nameOfProduct)',
    allOtherPlantProducts2025: '$t(nonWoodForestProductsRemovals.allOtherPlantProducts)',
    allOtherAnimalProducts2025: '$t(nonWoodForestProductsRemovals.allOtherAnimalProducts)',
    currency2025: '$t(nonWoodForestProductsRemovals.currency)',
  },

  otherLandWithTreeCover: {
    otherLandWithTreeCover2025: '$t(otherLandWithTreeCover.otherLandWithTreeCover)',
    agroforestry2025: '$t(otherLandWithTreeCover.agroforestry)',
    other2025: '$t(otherLandWithTreeCover.other)',
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
    rubberWood2025: '$t(specificForestCategories.rubberWood)',
    mangrovesDisclaimer: `\u00B9Includes both Forest and Other wooded land`,
  },

  forestPolicy: {
    forestPolicy2025: '$t(forestPolicy.forestPolicy)',
    policiesSFM2025: '$t(forestPolicy.policiesSFM)',
    legislationsSFM2025: '$t(forestPolicy.legislationsSFM)',
    stakeholderParticipation2025: '$t(forestPolicy.stakeholderParticipation)',
    existenceOfTraceabilitySystem2025: '$t(forestPolicy.existenceOfTraceabilitySystem)',
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate2025: '$t(areaOfPermanentForestEstate.areaOfPermanentForestEstate)',
  },

  sustainableDevelopment: {
    annualForestAreaChangeRate: 'Annual forest area change rate',
    sdgIndicator1_2025: 'SDG Indicator 15.1.1 Forest area as proportion of total land area',
    forestAreaProportionLandArea: 'Forest area as proportion of total land area',
    aboveGroundBiomassStockForests2025: '$t(sustainableDevelopment.aboveGroundBiomassStockForests)',
    proportionForestAreaLegallyEstablishedProtectedAreas2025:
      '$t(sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas)',
    proportionForestAreaLongTermForestManagement2025:
      '$t(sustainableDevelopment.proportionForestAreaLongTermForestManagement)',
    forestAreaVerifiedForestManagement2025: '$t(sustainableDevelopment.forestAreaVerifiedForestManagement)',
  },

  navigation: {
    sectionHeaders: {
      employmentEducationAndNwfp2025: 'Non wood forest products removals and value 2020',
      forestGrowingStockBiomassAndCarbon2025: '$t(navigation.sectionHeaders.forestGrowingStockBiomassAndCarbon)',
      forestDesignationAndManagement2025: '$t(navigation.sectionHeaders.forestDesignationAndManagement)',
      forestOwnershipAndManagementRights2025: '$t(navigation.sectionHeaders.forestOwnershipAndManagementRights)',
      forestDisturbances2025: '$t(navigation.sectionHeaders.forestDisturbances)',
      forestExtentCharacteristicsAndChanges2025: '$t(navigation.sectionHeaders.forestExtentCharacteristicsAndChanges)',
      forestPolicyAndLegislation2025: '$t(navigation.sectionHeaders.forestPolicyAndLegislation)',
    },
  },

  extentOfForest_forestAreaStatusAndTrend_Description: {
    header_0: 'Forest area tier criteria',
    status: {
      high: 'Data sources: Recent¹ National Forest Inventory or remote sensing (sample-based survey or wall-to-wall mapping) with accuracy assessment / field data calibration.',
      medium:
        'Data sources: Old² National Forest Inventory or remote sensing (sample-based survey or wall-to-wall mapping) with accuracy assessment / field data calibration.',
      low: 'Data sources:  Other, such as registers, expert estimates, or remote sensing without accuracy assessment / field data calibration.',
    },
    trend: {
      high: 'Estimates based on repeated compatible³ National Forest Inventories where the most recent is not older than five years; and/or remote sensing- change assessments through multitemporal analysis for a period ending not more than five years ago (e.g., REDD+ forest reference [emission] levels).',
      medium:
        'Estimates based on repeated compatible³ National Forest Inventories where the most recent is older than five years; and/or remote sensing change assessments through multitemporal analysis for a period ending more than five years ago; or comparison of compatible maps without multitemporal analysis.',
      low: 'Other data sources, e.g., expert estimates, or estimates based on non-compatible assessments.',
    },
    footer1:
      '¹ Data not older than 5 years from year of submission of report (2018 or more recent for FRA 2025 country reports)',
    footer2:
      '² Data older than 5 years from year of submission of report (older than 2018 for FRA 2025 country reports)',
    footer3: '³ Compatible in terms of methods, categories and definitions used',
  },
  growingStock_growingStockStatus_Description: {
    header_0: 'Growing stock tier criteria',
    status: {
      high: 'Data sources: Recent¹ National Forest Inventory or Airborne Laser Scanning (ALS) with probabilistic ground samples.',
      medium:
        'Data sources:  Old² National Forest Inventory, partial field inventories, or ALS without probabilistic ground samples.',
      low: 'Data sources:  Other data sources, such as satellite data, registers, questionnaires or expert assessments.',
    },
    status2025: {
      high: '$t(fra.growingStock_growingStockStatus_Description.status.high)',
      medium: '$t(fra.growingStock_growingStockStatus_Description.status.medium)',
      low: '$t(fra.growingStock_growingStockStatus_Description.status.low)',
    },
    footer1:
      '¹ Data not older than 10 years from year of submission of report (2013 or more recent for FRA 2025 country reports)',
    footer2:
      '² Data older than 10 years from year of submission of report (older than 2013 for FRA 2025 country reports)',
  },

  biomassStock_biomassStockStatus_Description: {
    header_0: 'Biomass estimation methods tier criteria',
    status: {
      high: 'Country-specific biomass conversion and expansion factors or allometric equations applied',
      medium:
        'Application of generic or biome-level allometric equations or a combination of country/biome specific conversion factors and IPCC default biomass expansion factors.',
      low: 'IPCC default biomass conversion and expansion factors applied (e g using the "biomass calculator"), or estimates based on remote sensing-based biomass maps.',
    },
  },
}
