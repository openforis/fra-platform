export const translation = {

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский'
  },

  definition: {
    definitionLabel: 'See definitions',
    faqLabel: 'FAQ'
  },

  audit: {
    notStarted: 'Not started',
    edited: 'Edited'
  },

  user: {
    roles: {
      reviewer: 'Reviewer',
      nationalCorrespondent: 'National correspondent',
      national_correspondent: 'National correspondent',
      reviewer_all: 'Reviewer',
      national_correspondent_all: 'National correspondent',
      collaborator: 'Collaborator',
      noRole: 'N/A'
    }
  },

  fraClass: {
    forest: 'Forest',
    otherWoodedLand: 'Other wooded land',
    otherLand: 'Other land'
  },

  fraForestCharacteristicsClass: {
    naturallyGenerated: 'Naturally regenerating forest',
    plantationForest: 'Plantation forest',
    otherPlantedForest: 'Other planted forest',
    introduced: '…of which introduces species',
    naturallyRegeneratingForest: 'Naturally regenerating forest',
    plantedForest: 'Planted forest',
    totalForest: 'Total forest'
  },

  fraOtherLandClass: {
    palms: 'Palms',
    palmsClasses: 'Oil, coconut, dates, etc.',
    treeOrchards: 'Tree orchards',
    treeOrchardsClasses: 'Fruit, nuts, olive, etc.',
    agroforestry: 'Agroforestry',
    treesUrbanSettings: 'Trees in urban settings'

  },

  // error messages
  error: {
    access: {
      countryRoleNotSpecified: 'Error: User {{user}} tried to access {{countryIso}} but no role has been specified',
      countryUserNotReviewer: 'Error: User {{user}} tried to access {{countryIso}} of which is not reviewer'
    },
    assessment: {
      transitionNotAllowed: 'Error: Transition from {{currentStatus}} to {{status}} is not allowed for role {{role}}'
    },
    review: {
      commentDeleteNotOwner: 'Error: User {{user}} tried to delete a comment that doesn\'t own',
      commentEnterResolvedIssue: 'Error: User {{user}} tried to enter a comment for a resolved issue'
    },
    ndp: {
      previousNdpNotFound: 'Unable to find any National data point prior to {{year}}'
    }
  },
  // components

  countryListing: {
    annuallyUpdated: 'Annually updated',
    fra2020: 'FRA 2020'
  },

  navigation: {
    annuallyUpdated: 'Annually updated',
    fra2020: 'FRA 2020',
    assessmentStatus: {
      changing: {
        label: 'Changing…'
      },
      review: {
        label: 'In review',
        next: 'Send to review',
        previous: 'Return to review'
      },
      accepted: {
        label: 'Accepted',
        next: 'Accept',
        previous: ''
      },
      editing: {
        label: 'Editing',
        previous: 'Return to editing'
      }
    }
  },

  footer: {
    logout: 'Logout',
    autoSave: {
      saving: 'Saving…'
    }
  },

  time: {
    hour: '{{count}} hour ago',
    hour_plural: '{{count}} hours ago',
    day: '{{count}} day ago',
    day_plural: '{{count}} days ago',
    week: '{{count}} week ago',
    week_plural: '{{count}} weeks ago',
    aMomentAgo: 'A moment ago'
  },

  review: {
    comments: 'Comments',
    noComments: 'No comments',
    resolve: 'Resolve',
    confirmDelete: 'Are you sure you want to delete this comment? This cannot be undone.',
    commentDeleted: 'Comment deleted',
    commentMarkedAsResolved: 'Marked as resolved',
    delete: 'Delete',
    writeComment: 'Write a comment…',
    commentingClosed: 'Commenting closed',
    add: 'Add',
    cancel: 'Cancel'
  },

  description: {
    edit: 'Edit',
    done: 'Done',
    emptyLabel: 'No content',
    loading: 'Loading content…',
    description: 'Description',
    dataSourcesTitle: 'Data sources, original data & national classification and definitions',
    generalCommentsTitle: 'Comments',
    dataSources: {
      label: 'Data sources',
      sourceOfInformation: 'Reference to source of information',
      variables: 'Variable(s)',
      years: 'Year(s)',
      additionalComments: 'Additional comments'
    },
    originalData: 'Original data',
    nationalClassificationAndDefinitions: 'National classification and definitions',
  },

  nationalDataPoint: {
    nationalDataPoint: 'National data point',
    addNationalDataPoint: 'Add national data point',
    noNationalDataAdded: 'No national data added',
    nationalData: 'National data',
    reclassificationLabel: 'Reclassification',
    forestCategoriesLabel: 'Forest, other wooded land and other land',
    year: 'Reference year for the data',
    methods: 'Methods',
    edit: 'Edit',
    copyPreviousValues: 'Copy previous values',
    nationalClass: 'National class',
    nationalClasses: 'National classes',
    definition: 'Definition',
    fraClasses: 'FRA classes',
    fraClassesOfWhich: 'FRA classes (…of which)',
    class: 'Class',
    area: 'Area (1000 ha)',
    total: 'Total',
    delete: 'Delete',
    confirmDelete: 'Are you sure you want to delete this data point? This cannot be undone.',
    cancel: 'Cancel',
    saveData: 'Save data',
    enterOrCopyPasteNationalClasses: 'Enter or copy and paste national classes',
    prefixPrimary: '…of which primary',
    prefixIntroduced: '…of which introduced',
    otherLandCharacteristics: 'Other land with tree cover'
  },

  // annually reported assessment components

  extentOfForest: {
    categoryHeader: 'FRA categories',
    extentOfForest: 'Extent of forest',
    areaUnitLabel: 'Area (1000 ha)',
    generateFraValues: 'Generate FRA values',
    extentOfForestValues: 'Extent of forest values',
    forestArea: 'Forest',
    chart: {
      placeholderLine1: 'To get started, add new national data points and use',
      placeholderLine2: 'them to generate FRA values automatically.'
    },
    otherLandCategories: 'Other land categories',
    ofWhichPalms: '…of which palms (oil, coconut, dates, etc.)',
    ofWhichTreeOrchards: '…of which tree orchards (includes fruit, nuts, olive, etc.)',
    ofWhichAgroforestry: '…of which agroforestry',
    ofWhichTreesUrbanSettings: '…of which trees in urban settings'
  },

  growingStock: {
    growingStock: 'Growing stock',
    fra2020Categories: 'FRA 2020 categories',
    avgTableHeader: 'Average growing stock (m3/ha)',
    totalTableHeader: 'Total growing stock (million m3)'
  },

  biomassStock: {
    biomassStock: 'Biomass stock'
  },

  carbonStock: {
    carbonStock: 'Carbon stock'
  },

  protectedAreas: {
    protectedAreasLongTermMgmtPlans: 'Protected areas and long-term management plans'
  },

  // five year cycle assessment components

  forestAreaChange: {
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha/year)',
    forestAreaLossGainChange: 'Annual forest area loss, gain and net change',
    forestExpansion: 'Forest expansion',
    ofWhichAfforestation: '…of which afforestation',
    ofWhichNaturalExpansion: '…of which natural expansion',
    deforestation: 'Deforestation',
    forestAreaNetChange: 'Forest area net change'
  },

  forestCharacteristics: {
    categoryHeader: 'FRA categories',
    forestCharacteristics: 'Forest characteristics',
    areaUnitLabel: 'Forest area (1000 ha)',
    forestCharacteristicsValues: 'Forest characteristics values',
    naturalForestArea: 'Naturally regenerating forest',
    naturalForestPrimaryArea: '…of which primary',
    plantationForestArea: 'Plantation forest',
    plantationForestIntroducedArea: '…of which introduced species',
    otherPlantedForestArea: 'Other planted forest'
  },

  specificForestCategories: {
    categoryHeader: 'FRA categories',
    specificForestCategories: 'Specific forest categories',
    areaUnitLabel: 'Area (1000 ha)',
    bamboo: 'Bamboos',
    mangroves: 'Mangroves'
  },

  growingStockComposition: {
    categoryHeader: 'FRA categories',
    growingStockComposition: 'Growing stock composition',
    nativeTreeSpecies: 'Native tree species',
    introducedTreeSpecies: 'Introduced tree species',
    areaUnitLabel: 'Growing stock in forest (million m3 o.b.)',
    scientificName: 'Scientific name',
    commonName: 'Common name',
    rank: 'Ranked in terms of volume',
    remainingNative: 'Remaining native tree species',
    remainingIntroduced: 'Remaining introduced tree species',
    totalNative: 'Total volume of native tree species',
    totalIntroduced: 'Total volume of introduced tree species',
    totalGrowingStock: 'Total growing stock'
  },

  nonWoodForestProducts: {
    nonWoodForestProducts: 'Non wood forest products removals 2015'
  },

  primaryDesignatedManagementObjective: {
    categoryHeader: 'FRA categories',
    primaryDesignatedManagementObjective: 'Designated management objective',
    areaUnitLabel: 'Forest area (1000 ha)',
    production: 'Production',
    soilWaterProtection: 'Protection of soil and water',
    biodiversityConservation: 'Conservation of biodiversity',
    socialServices: 'Social Services',
    multipleUse: 'Multiple use',
    other: 'Other (specify)',
    unknown: 'No/unknown',
    totalForestArea: 'Total forest area'
  },

  forestOwnershipManagementRights: {
    forestOwnershipManagementRights: 'Forest ownership'
  },

  holderOfManagementRights: {
    holderOfManagementRights: 'Holder of management rights of public forests'
  },

  disturbances: {
    disturbances: 'Disturbances'
  },

  areaAffectedByFire: {
    categoryHeader: 'FRA categories',
    areaAffectedByFire: 'Area affected by fire',
    areaUnitLabel: 'Area (1000 ha)',
    totalLandAreaAffectedByFire: 'Total land area affected by fire',
    ofWhichForest: '…of which on forest'
  },

  employment: {
    employment: 'Employment'
  },

  graduationOfStudents: {
    graduationOfStudents: 'Graduation of students'
  },

  policiesAndLegislation: {
    policiesAndLegislation: 'Policies and legislation'
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Area of permanent forest estate'
  },
}
