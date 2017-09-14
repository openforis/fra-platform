export const translation = {

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский'
  },
  definition: {
    linkLabel: 'See definitions'
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
    naturallyGenerated: 'Naturally regenerated',
    plantationForest: 'Plantation forest',
    otherPlantedForest: 'Other planted forest',
    introduced: '…of which introduces species'
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
    annuallyReported: 'Annually',
    fiveYearCycle: 'Five-year'
  },

  navigation: {
    annuallyReported: 'Annually reported',
    fiveYearCycle: 'Five-year cycle',
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
    dataSources: 'Data sources',
    originalData: 'Original data',
    nationalClassificationAndDefinitions: 'National classification and definitions',
  },

  nationalDataPoint: {
    nationalDataPoint: 'National data point',
    addNationalDataPoint: 'Add national data point',
    noNationalDataAdded: 'No national data added',
    nationalData: 'National data',
    year: 'Year',
    methods: 'Methods',
    edit: 'Edit',
    copyPreviousValues: 'Copy previous values',
    nationalClass: 'National class',
    nationalClasses: 'National classes',
    definition: 'Definition',
    fraClasses: 'FRA classes',
    class: 'Class',
    area: 'Area',
    total: 'Total',
    delete: 'Delete',
    confirmDelete: 'Are you sure you want to delete this data point? This cannot be undone.',
    cancel: 'Cancel',
    saveData: 'Save data',
    enterOrCopyPasteNationalClasses: 'Enter or copy and paste national classes',
    prefixPrimary: 'Primary',
    prefixIntroduced: 'Introduced',
    otherLandCharacteristics: 'Other land characteristics'
  },

  // annually reported assessment components

  extentOfForest: {
    extentOfForest: 'Extent of forest',
    areaUnitLabel: 'Area (1000 ha)',
    generateFraValues: 'Generate FRA values',
    extentOfForestValues: 'Extent of forest values',
    forestArea: 'Forest area',
    chart: {
      placeholderLine1: 'To get started, add new national data points and use',
      placeholderLine2: 'them to generate FRA values automatically.'
    },
    otherLandCategories: 'Other land categories',
    ofWhichPalms: '...of which palms (oil, coconut, dates, etc.)',
    ofWhichTreeOrchards: '...of which trees orchards (includes fruit, nuts, olive, etc.)',
    ofWhichAgroforestry: '...of which agroforestry',
    ofWhichTreesUrbanSettings: '...of which trees in urban settings'
  },

  growingStock: {
    growingStock: 'Growing stock'
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
    forestAreaLossGainChange: 'Forest area loss, gain and net change',
    forestExpansion: 'Forest expansion (a)',
    ofWhichAfforestation: '…of which afforestation',
    ofWhichNaturalExpansion: '…of which natural expansion',
    deforestation: 'Deforestation (b)',
    forestAreaNetChange: 'Forest area net change'
  },

  forestCharacteristics: {
    forestCharacteristics: 'Forest characteristics',
    areaUnitLabel: 'Forest area (1000 ha)',
    forestCharacteristicsValues: 'Forest characteristics values',
    naturalForestArea: 'Naturally regenerated forest',
    naturalForestPrimaryArea: '…of which primary',
    plantationForestArea: 'Plantation forest',
    plantationForestIntroducedArea: '…of which introduced species',
    otherPlantedForestArea: 'Other planted forest'
  },

  specificForestCategories: {
    specificForestCategories: 'Specific forest categories',
    bamboo: 'Bamboo',
    mangroves: 'Mangroves',
    rubberPlantations: 'Rubber plantations'
  },

  growingStockComposition: {
    growingStockComposition: 'Growing stock composition'
  },

  nonWoodForestProducts: {
    nonWoodForestProducts: 'Non wood forest products'
  },

  primaryDesignatedManagementObjective: {
    primaryDesignatedManagementObjective: 'Designated management objective',
    production: 'Production',
    soilWaterProtection: 'Protection of soil and water',
    biodiversityConservation: 'Conservation of biodiversity',
    socialServices: 'Social Services',
    multipleUse: 'Multiple use',
    other: 'Other',
    unknown: 'No/unknown',
    totalForestArea: 'Total forest area'
  },

  forestOwnershipManagementRights: {
    forestOwnershipManagementRights: 'Forest ownership and management rights'
  },

  disturbances: {
    disturbances: 'Disturbances'
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Area affected by fire',
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
