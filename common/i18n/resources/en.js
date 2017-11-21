module.exports.translation = {

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

  yesNoTextSelect: {
    yes: 'Yes',
    no: 'No',
    notSelected: '',
  },

  user: {
    roles: {
      reviewer: 'Reviewer',
      nationalCorrespondent: 'National correspondent',
      national_correspondent: 'National correspondent',
      reviewer_all: 'Reviewer',
      national_correspondent_all: 'National correspondent',
      collaborator: 'Collaborator',
      administrator: 'Administrator',
      noRole: 'N/A'
    }
  },

  fraClass: {
    forest: 'Forest',
    otherWoodedLand: 'Other wooded land',
    otherLand: 'Other land'
  },

  fraForestCharacteristicsClass: {
    naturallyRegeneratingForest: 'Naturally regenerating forest',
    plantationForest: 'Plantation forest',
    ofWhichIntroduced: '…of which introduced',
    otherPlantedForest: 'Other planted forest',
    totalForest: 'Total forest'
  },

  fraOtherLandClass: {
    palms: '…of which palms (oil, coconut, dates, etc)',
    treeOrchards: '…of which tree orchards (Includes fruit, nuts, olive, etc)',
    agroforestry: '…of which agroforestry',
    treesUrbanSettings: '…of which trees in urban settings'
  },

  dashboard: {
    dashboard: 'Dashboard',
    recentActivity: 'Recent activity',
    noRecentActivity: 'No recent activity',
    externalLinks: {
      title: 'External links',
      nationalFocalPoints: 'National focal points',
      unFcccReportedData: 'UNFCCC reported data',
      unReddPlatform: 'UN-REDD platform'
    },
    actions: {
      added: 'added',
      commented: 'commented on',
      deleted: 'deleted',
      edited: 'edited',
      resolved: 'resolved issue in',
      status: 'changed status to',
      addUser:'added {{user}} as {{role}}', //Legacy, no longer created
      updateUser:'edited {{user}}',
      removeUser:'removed {{user}}',
      acceptInvitation: 'joined as {{role}}',
      addInvitation: 'Invited {{user}} as {{role}}',
      removeInvitation: 'Removed invitation of {{user}} as {{role}}',
      updateInvitation: 'Invite updated for {{user}} as {{role}}'
    }
  },

  // error messages
  error: {
    access: {
      countryRoleNotSpecified: 'Error: User {{user}} tried to access {{countryIso}} but no role has been specified',
      countryUserNotReviewer: 'Error: User {{user}} tried to access {{countryIso}} of which is not reviewer',
      roleChangeNotAllowed: 'Error: User {{user}} tried to set another user\'s role to {{role}} which is not allowed for the logged in user',
      invitationAlreadyUsed: 'Error: invitation {{invitationUuid}} has already been used, hijacking by {{loginEmail}} not allowed!',
      countryDoesNotMatch: 'Error: country {{countyryIso}} does not match'
    },
    assessment: {
      transitionNotAllowed: 'Error: Transition from {{currentStatus}} to {{status}} is not allowed for role {{role}}',
      deskStudyNotAllowed: 'Error: Only administrator can change desk-study status'
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
    },
    assessmentDeskStudy: 'Desk study',
    support: {
      dontDelete: 'System information please don’t delete',
      sendFeedback: 'Send feedback',
      feedbackEmailSubject: 'FRA Platform Feedback',
      platformVersion: 'Platform version',
      userAgent: 'User agent',
      user: 'User',
      manageCollaborators: 'Manage collaborators'
    },
    sectionHeaders: {
      forestExtentCharacteristicsAndChanges: 'Forest extent, characteristics and changes',
      forestGrowingStockBiomassAndCarbon: 'Forest growing stock, biomass and carbon',
      forestDesignationAndManagement: 'Forest designation and management',
      forestOwnershipAndManagementRights: 'Forest ownership and management rights',
      forestDisturbances: 'Forest disturbances',
      forestPolicyAndLegislation: 'Forest policy and legislation',
      employmentEducationAndNwfp: 'Employment, education and NWFP'
    }
  },

  header: {
    profilePicture: 'Edit profile picture',
    logout: 'Logout',
    hideSidebar: 'Hide sidebar',
    showSidebar: 'Show sidebar',
    autoSave: {
      saving: 'Saving…',
      complete: 'All changes saved',
      lastSaveTimestampReceived: 'Last edited '
    }
  },

  time: {
    hour: '{{count}} hour ago',
    hour_plural: '{{count}} hours ago',
    day: '{{count}} day ago',
    day_plural: '{{count}} days ago',
    week: '{{count}} week ago',
    week_plural: '{{count}} weeks ago',
    aMomentAgo: 'a moment ago'
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
    dataSources: 'Data sources',
    originalData: 'Original data',
    nationalClassificationAndDefinitions: 'National classification and definitions',
  },

  nationalDataPoint: {
    nationalDataPoint: 'National data point',
    addNationalDataPoint: 'Add national data point',
    noNationalDataAdded: 'No national data added',
    nationalData: 'National data',
    reclassificationLabel: 'Original data and reclassification',
    forestCategoriesLabel: 'Forest, other wooded land and other land',
    referenceYearData: 'Reference year for the data',
    referenceYear: 'Reference year',
    references: 'References',
    selectYear: 'Select…',
    methods: 'Methods',
    methodsUsed: 'Methods used',
    dataSource: 'Data source',
    dataSources: 'Data sources',
    additionalComments: 'Additional comments',
    edit: 'Edit',
    copyPreviousValues: 'Copy previous values',
    nationalClass: 'National class',
    nationalClasses: 'Classifications and definitions',
    definition: 'Definition',
    fraClasses: 'FRA classes',
    class: 'Class',
    area: 'Area (1000 ha)',
    total: 'Total',
    delete: 'Delete',
    modifiedExplanation: 'National data point with modifications',
    confirmDelete: 'Are you sure you want to delete this data point? This cannot be undone.',
    discardChanges: 'Discard changes',
    doneEditing: 'Done editing',
    enterOrCopyPasteNationalClasses: 'Enter or copy and paste national classes',
    forestCharacteristics: 'Forest characteristics',
    otherLandCharacteristics: 'Other land with tree cover',
    plantationForest: 'Plantation forest',
    remindDirtyOdp: 'National data point has been updated, remember to regenerate values.',
    disabled: 'Disabled',
    dataSourceMethodsOptions: {
      nationalForestInventory: 'National Forest Inventory',
      sampleBasedRemoteSensingAssessment: 'Sample-based remote sensing assessment',
      fullCoverMaps: 'Full-cover forest/vegetation maps',
      registersQuestionnaires: 'Registers/questionnaires',
      other: 'Other (specify in comments)'
    },
    appliesToVariablesOptions: {
      forest: 'Forest',
      otherWoodedLand: 'Other wooded land',
      otherLand: 'Other land'
    }
  },

  userManagement: {
    manageCollaborators: 'Manage collaborators',
    name: 'Name',
    role: 'Role',
    email: 'Email',
    loginEmail: 'Login',
    noUsers: 'No collaborators added',
    remove: 'Remove',
    done: 'Done',
    edit: 'Edit',
    addUser: 'Add collaborator',
    insufficientPrivileges: 'Insufficient privileges',
    confirmDelete: 'Remove {{user}} from {{country}}?',
    invitationEmail:{
      subject:'Invited to {{country}} on FRA Platform',
      textMessage:`Dear {{invitedUser}},
%0D%0A%0D%0A
{{loggedInUser}} has invited you to join {{country}} on FRA Platfrom as a {{role}}.
%0D%0A%0D%0A
Accept this invitation and visit the country at the following URL:
%0D%0A
{{link}}
%0D%0A%0D%0A
Happy reporting, and don't hesitate to contact us with your feedback.
%0D%0A%0D%0A
The FRA team
%0D%0A
{{url}}
    `,
      htmlMessage:`Dear {{invitedUser}},
<br/><br/>
{{loggedInUser}} has invited you to join {{country}} on FRA Platfrom as a {{role}}.
<br/><br/>
<b><a href="{{link}}">Accept this invitation and visit the country</a></b>
<br/><br/>
Happy reporting, and don't hesitate to contact us with your feedback.
<br/><br/>
The FRA team
<br/>
{{url}}
    `
    }
  },

  // FRA 2020 questionare
  // Object name and title should have allways the same name

  extentOfForest: {
    extentOfForest: 'Extent of forest and other wooded land',
    estimationAndForecasting: 'Estimation and forecasting',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    forestArea: 'Forest',
    chart: {
      placeholderLine1: 'To get started, add new national data points and use',
      placeholderLine2: 'them to generate FRA values automatically.'
    },
    otherLandCategories: 'Other land categories',
    ofWhichPalms: '…of which palms (oil, coconut, dates, etc.)',
    ofWhichTreeOrchards: '…of which tree orchards (includes fruit, nuts, olive, etc.)',
    ofWhichAgroforestry: '…of which agroforestry',
    ofWhichTreesUrbanSettings: '…of which trees in urban settings',
    totalLandArea: 'Total land area',
    faoStatLandArea: 'FAOSTAT land area',
    faoStatMismatch: "Doesn't match FAOSTAT land area",
    forestAreaDoesNotMatchPreviouslyReported: "Forest area doesn't match FRA 2015 area: {{previous}}"
  },

  forestCharacteristics: {
    forestCharacteristics: 'Forest characteristics',
    estimationAndForecasting: 'Estimation and forecasting',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Forest area (1000 ha)',
    naturalForestArea: 'Naturally regenerating forest',
    plantationForestArea: 'Plantation forest',
    plantationForestIntroducedArea: '…of which introduced species',
    otherPlantedForestArea: 'Other planted forest',
    plantedForest: 'Planted forest',
    totalForestArea: 'Total forest area',
    total: 'Total',
    useOriginalDataPoints: 'Use national data points',
    dontUseOriginalDataPoints: "Don't use national data points"
  },

  tableWithOdp: {
    confirmGenerateFraValues: 'Generating FRA values will override previously generated values.',
    generateFraValues: 'Generate values',
    linearExtrapolation: 'Linear',
    repeatLastExtrapolation: 'Repeat last',
    annualChangeExtrapolation: 'Annual change',
    placeholderFuture: 'Future',
    placeholderPast: 'Past',
    clearTable: 'Clear table',
    copyToClipboard: 'Copy values',
    placeholderSelect: 'Choose…'
  },

  forestAreaChange: {
    forestAreaChange: 'Annual forest area loss, gain and net change',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha/year)',
    forestExpansion: 'Forest expansion',
    ofWhichAfforestation: '…of which afforestation',
    ofWhichNaturalExpansion: '…of which natural expansion',
    deforestation: 'Deforestation',
    forestAreaNetChange: 'Forest area net change',
    netChangeDoesNotMatch: "Doesn't match Forest area net change",
    total: 'Total'
  },

  annualReforestation: {
    annualReforestation: 'Annual reforestation',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha/year)',
    reforestation: 'Reforestation'
  },

  specificForestCategories: {
    specificForestCategories: 'Specific forest categories',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    bamboo: 'Bamboos',
    mangroves: 'Mangroves',
    temporarilyUnstocked: 'Temporarily unstocked and/or recently regenerated',
    primaryForest: 'Primary forest'
  },

  growingStock: {
    growingStock: 'Growing stock',
    supportText: 'Please make sure you have entered data in tables 1a & 1b before editing this table',
    categoryHeader: 'FRA categories',
    avgTableHeader: 'Average growing stock (m³/ha)',
    totalTableHeader: 'Total growing stock (million m³)',
    naturallyRegeneratingForest: 'Naturally regenerating forest',
    plantedForest: 'Planted forest',
    ofWhichPlantationForest: '…of which plantation forest',
    ofWhichOtherPlantedForest: '…of which other planted forest',
    totalForest: 'Total forest',
    otherWoodedLand: 'Other wooded land',
    copyToClipboard: 'Copy values'
  },

  growingStockComposition: {
    growingStockComposition: 'Growing stock composition',
    categoryHeader: 'FRA categories',
    nativeTreeSpecies: 'Native tree species',
    introducedTreeSpecies: 'Introduced tree species',
    areaUnitLabel: 'Growing stock in forest (million m³ o.b.)',
    scientificName: 'Scientific name',
    commonName: 'Common name',
    rank: 'Ranked in terms of volume',
    remainingNative: 'Remaining native tree species',
    remainingIntroduced: 'Remaining introduced tree species',
    totalNative: 'Total volume of native tree species',
    totalIntroduced: 'Total volume of introduced tree species',
    totalGrowingStock: 'Total growing stock'
  },

  biomassStock: {
    biomassStock: 'Biomass stock',
    categoryHeader: 'FRA categories',
    tableHeader: 'Forest biomass (tonnes/ha)',
    aboveGround: 'Above-ground biomass',
    belowGround: 'Below-ground biomass',
    deadWood: 'Dead wood',
    downloadExcel: 'Download excel calculator'
  },

  carbonStock: {
    carbonStock: 'Carbon stock',
    categoryHeader: 'FRA categories',
    tableHeader: 'Forest carbon (tonnes/ha)',
    carbonAboveGroundBiomass: 'Carbon in above-ground biomass',
    carbonBelowGroundBiomass: 'Carbon in below-ground biomass',
    carbonDeadwood: 'Carbon in dead wood',
    carbonLitter: 'Carbon in litter',
    carbonSoil: 'Soil carbon'
  },

  designatedManagementObjective: {
    designatedManagementObjective: 'Designated management objective',
    primaryDesignatedManagementObjective: 'Primary designated management objective',
    primaryDesignatedManagementObjectiveSupport: 'Primary designated management objective is significantly more important than other management objectives. The different primary management objectives are *exclusive* and areas reported under one primary management objective should not be reported for any other primary management objectives. The sum of the different management objectives should add up to the forest area.',
    totalAreaWithDesignatedManagementObjective: 'Total area with designated management objective',
    totalAreaWithDesignatedManagementObjectiveSupport: 'Designated management objective, regardless whether it is primary or not. The different designation categories are *not exclusive*. Hence, areas can be reported more than once e.g. Forest area reported as primary management objective "Multiple use" should be reported on for each management objectives. Thus the sum of the different management objectives can be larger than the total forest area.',
    categoryHeader: 'FRA 2020 categories',
    areaUnitLabel: 'Forest area (1000 ha)',
    production: 'Production',
    soilWaterProtection: 'Protection of soil and water',
    biodiversityConservation: 'Conservation of biodiversity',
    socialServices: 'Social Services',
    multipleUse: 'Multiple use',
    other: 'Other (specify in comments)',
    unknown: 'No/unknown',
    totalForestArea: 'Total forest area',
    total: 'Total'
  },

  forestAreaWithinProtectedAreas: {
    forestAreaWithinProtectedAreas: 'Forest area within protected areas and forest area with long-term management plans',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    header: 'Forest area within protected areas',
    forestAreaWithLongTermManagementPlan: 'Forest area with long-term management plan',
    ofWhichInProtectedAreas: '…of which in protected areas'
  },

  forestOwnership: {
    forestOwnership: 'Forest ownership',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Forest area (1000 ha)',
    privateOwnership: 'Private ownership',
    ofWhichIndividuals: '…of which owned by individuals',
    ofWhichPrivateBusinesses: '…of which owned by private business entities and institutions',
    ofWhichCommunities: '…of which owned by local, tribal and indigenous communities',
    publicOwnership: 'Public ownership',
    otherOrUnknown: 'Other/unknown (specify in comments)',
    totalForestArea: 'Total forest area',
    total: 'Total'
  },

  holderOfManagementRights: {
    holderOfManagementRights: 'Holder of management rights of public forests',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Forest area (1000 ha)',
    publicAdministration: 'Public Administration',
    individuals: 'Individuals',
    privateBusinesses: 'Private business entities and institutions',
    communities: 'Local, tribal and indigenous communities',
    other: 'Other (specify in comments)',
    totalPublicOwnership: 'Total public ownership',
    total: 'Total',
    publicOwnershipDoesNotMatch: 'Doesn’t match Total public ownership'
  },

  disturbances: {
    disturbances: 'Disturbances',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    insects: 'Insects',
    diseases: 'Diseases',
    severeWeatherEvents: 'Severe weather events',
    other: 'Other',
    totalForestArea: 'Total forest area',
    total: 'Total'
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Area affected by fire',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    totalLandAreaAffectedByFire: 'Total land area affected by fire',
    ofWhichForest: '…of which on forest'
  },

  degradedForest: {
    degradedForest: 'Degraded forest',
    doesYourCountryMonitor: 'Does your country monitor area of degraded forest',
    ifYes: 'If "yes"',
    whatIsDefinition: 'What is the national definition of "Degraded forest"?',
    howMonitored: 'How is it being monitored?',
  },

  forestPolicy: {
    forestPolicy: 'Policies, Legislation and national platform for stakeholder participation in forest policy',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Boolean (Yes/No)',
    national: 'National',
    subnational: 'Sub-national',
    policiesSFM: 'Policies supporting SFM',
    legislationsSFM: 'Legislations and regulations supporting SFM',
    stakeholderParticipation: 'Is there a national platform that promotes or allows for stakeholder participation in forest policy development?',
    existenceOfTraceabilitySystem: 'Existence of a traceability system for wood products'
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Area of permanent forest estate',
    categoryHeader: 'FRA 2020 categories',
    areaUnitLabel: 'Forest area (1000 ha)',
    applicable: 'Applicable?'
  },

  employment: {
    employment: 'Employment in forestry and logging',
    categoryHeader: 'FRA 2020 categories',
    unitHeader: 'Full-time equivalents (FTE)',
    inForestry: 'Employment in forestry and logging',
    ofWhichFemale: '…of which female',
    ofWhichSilviculture: '…of which silviculture and other forestry activities',
    ofWhichLogging: '…of which logging',
    ofWhichGathering: '…of which gathering of non wood forest products',
    ofWhichSupport: '…of which support services to forestry'
  },

  graduationOfStudents: {
    graduationOfStudents: 'Graduation of students in forest-related education',
    numberOfStudents: 'Number of graduated students',
    fra2020Categories: 'FRA 2020 categories',
    doctoralDegree: 'Doctoral degree (Ph. D.)',
    ofWhichFemale: '...of which female',
    mastersDegree: 'Master\'s degree (MSc)',
    bachelorsDegree: 'Bachelor\'s degree (BSc)',
    technicianCertificate: 'Technician certificate / diploma'
  },

  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals: 'Non wood forest products removals 2015',
    nameOfProduct: 'Name of NWFP product',
    keySpecies: 'Key species',
    quantity: 'Quantity',
    unit: 'Unit',
    value: 'Value (1000 currency)',
    category: 'NWFP category',
    plantProductsSelectHeading: 'Plant products / raw material',
    food: '1 Food',
    fodder: '2 Fodder',
    rawMaterialForMedicine: '3 Raw material for medicine and aromatic products',
    rawMaterialForColorants: '4 Raw material for colorants and dyes',
    rawMaterialForUtensils: '5 Raw material for utensils handicrafts construction',
    ornamentalPlants: '6 Ornamental plants',
    exudates: '7 Exudates',
    otherPlantProducts: '8 Other plant products',
    animalProductsSelectHeading: 'Animal products / raw material',
    livingAnimals: '9 Living animals',
    hidesSkins: '10 Hides skins and trophies',
    wildHoney: '11 Wild honey and bee wax',
    wildMeat: '12 Wild meat',
    animalRawMaterialForMedicine: '13 Raw material for medicine',
    animalRawMaterialForColorants: '14 Raw material for colorants',
    otherEdibleAnimalProducts: '15 Other edible animal products',
    otherNonEdibleAnimalProducts: '16 Other non-edible animal products',
    allOtherPlantProducts: 'All other plant products',
    allOtherAnimalProducts: 'All other animal products',
    total: 'Total',
    currency: 'Name of currency',
    notSelected: ''
  },

  multiSelect: {
    placeholder: 'Choose…'
  },

  generalValidation: {
    subCategoryExceedsParent: 'Subcategory exceeds parent',
    forestAreaDoesNotMatchExtentOfForest: 'Doesn‘t match Total forest area',
    forestAreaExceedsExtentOfForest: 'Exceeds Total forest area'
  }
}
