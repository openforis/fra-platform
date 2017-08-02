export const translation = {

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский'
  },

  user: {
    roles: {
      reviewer: 'Reviewer',
      nationalCorrespondent: 'National Correspondent',
      noRole: 'N/A'
    }
  },

  fraClass: {
    forest: 'Forest',
    otherWoodedLand: 'Other wooded land',
    otherLand: 'Other land'
  },

  // components

  navigation: {
    annuallyReported: 'Annually reported',
    fiveYearCycle: 'Five-year Cycle',
    assessmentStatus: {
      changing: {
        label: 'Changing...'
      },
      review: {
        label: 'In Review',
        next: 'Send to review',
        previous: 'Back to review'
      },
      accepted: {
        label: 'Accepted',
        next: 'Accept',
        previous: ''
      },
      editing: {
        label: '', //Currently we do not wish to show the default state at all
        next: 'Start over (to editing)',
        previous: 'remove'
      }
    }
  },

  footer: {
    logout: 'Logout',
    autoSave: {
      saving: 'Saving...'
    }
  },

  review: {
    comments: 'Comments',
    resolve: 'Resolve',
    commentTime: {
      hour: '{{count}} hour ago',
      hour_plural: '{{count}} hours ago',
      day: '{{count}} day ago',
      day_plural: '{{count}} days ago',
      week: '{{count}} week ago',
      week_plural: '{{count}} weeks ago',
      aMomentAgo: 'A moment ago'
    },
    commentDeleted: 'Comment deleted',
    commentMarkedAsResolved: 'Marked as resolved',
    delete: 'Delete',
    writeComment: 'Write a comment…',
    commentingClosed: 'Commenting closed',
    add: 'Add',
    cancel: 'Cancel'
  },

  description: {
    description: 'Description'
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
    cancel: 'Cancel',
    saveData: 'Save data',
    enterOrCopyPasteNationalClasses: 'Enter or copy and paste national classes'
  },

  // annually reported assessment components

  extentOfForest: {
    extentOfForest: 'Extent of forest',
    generateFraValues: 'Generate FRA values',
    extentOfForestValues: 'Extent of forest values',
    forestArea: 'Forest area',
    dataSources: 'Data Sources',
    nationalClassificationAndDefinitions: 'National classification and definitions',
    originalData: 'Original data',
    chart: {
      noDataPlaceholderLine1: 'To get started, add new national data points and use',
      noDataPlaceholderLine2: 'them to generate FRA values automatically.'
    }
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
    ofWhichAfforestation: '...of which afforestation',
    ofWhichNaturalExpansion: '...of which natural expansion',
    deforestation: 'Deforestation (b)',
    forestAreaNetChange: 'Forest area net change'
  },

  forestCharacteristics: {
    forestCharacteristics: 'Forest characteristics'
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
    primaryDesignatedManagementObjective: 'Primary designated management objective',
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
    ofWhichForest: '...of which on forest'
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
  }

}
