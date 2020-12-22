const area = require('./en/area')
const statisticalFactsheets = require('./en/statisticalFactsheets')
const contentCheck = require('./en/contentCheck')

module.exports.translation = {
  area,
  contentCheck,
  statisticalFactsheets,

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский',
  },

  common: {
    resetAll: 'Reset all',
    done: 'Done',
    column: 'Column',
    countries: 'Countries',
    dataExport: 'Data Export',
    fraPlatform: 'Fra platform',
    globalFRA: 'Global Forest Resources Assessment',
    login: 'Login',
    other: 'Other',
    regions: 'Regions',
    select: 'Select',
    selectAll: 'Select all',
    selectArea: 'Select geographical area',
    statisticalFactsheets: 'Statistical factsheets',
    unknown: 'None/unknown',
    unselectAll: 'Unselect all',
    variable: 'FRA Variable',
    year: 'Year',
  },

  disclaimer: {
    part1: 'This website has been produced with the assistance of the ',
    europeanUnion: 'European Union',
    part2: ', the ',
    govFinland: 'Government of Finland',
    part3: ', the ',
    govNorway: 'Government of Norway',
    part4: ' and the ',
    gef: 'Global Environment Facility',
    part5:
      '. Its contents are the sole responsibility of FAO and can in no way be taken to reflect the views of the European Union, the Government of Finland, the Government of Norway and the Global Environment Facility.',
  },

  home: {
    keyFindings: `The world has a total forest area of 4.06 billion hectares (ha), which is 31 percent 
of the total land area. This area is equivalent to 0.52 ha per person - although 
forests are not distributed equally among the world's peoples or geographically. 
The tropical domain has the largest proportion of the world's forests (45 percent), 
followed by the boreal, temperate and subtropical domains.`,
  },

  footer: {
    contactUs: 'Contact us',
    termsAndConditions: 'Terms and Conditions',
    scamAlert: 'Scam Alert',
    reportMisconduct: 'Report Misconduct',
    userGuide: 'User guide',
    sendFeedback: 'Send feedback',
  },

  unit: {
    haThousand: '1000 ha',
    ha: 'ha',
    kmSq: 'km²',
    mileSq: 'mi²',
    acre1000: '1000 acres',
    acre: 'acre',
    haMillion: 'million ha',
    haThousandPerYear: '1000 ha/year',
    tonnesPerHa: 'tonnes/ha',
    millionsCubicMeterOverBark: 'million m³ over bark',
    billionCubicMeter: 'billion m³',
    gt: 'Gt',
    fte1000: '1000 FTE',
    numberOfStudents: '$t(graduationOfStudents.numberOfStudents)',
  },

  countrySelection: {
    selectCountry: 'Select country',
  },

  definition: {
    definitionLabel: 'See definitions',
    faqLabel: 'FAQ',
  },

  audit: {
    notStarted: 'Not started',
    edited: 'Edited',
  },

  yesNoTextSelect: {
    yes: 'Yes',
    no: 'No',
    notSelected: '',
  },

  user: {
    roles: {
      reviewer: 'Reviewer',
      reviewer_plural: 'Reviewers',
      nationalCorrespondent: 'National correspondent',
      nationalCorrespondent_plural: 'National correspondents',
      alternateNationalCorrespondent: 'Alternate national correspondent',
      alternateNationalCorrespondent_plural: 'Alternate national correspondents',
      collaborator: 'Collaborator',
      collaborator_plural: 'Collaborators',
      administrator: 'Administrator',
      noRole: 'N/A',
    },

    resetPasswordEmail: {
      subject: 'FRA platform - Reset password',
      textMessage: `Dear {{user}}

We have received a request to reset your password for your FRA account. 
If you didn't make this request, you can safely ignore this email.

Click the following link to reset your password
{{- link}}}


Thanks,
The FRA team fra@fao.org
{{- url}}`,
      htmlMessage: `Dear {{user}}
<br/><br/>
We have received a request to reset your password for your FRA account. 
<br/>
If you didn't make this request, you can safely ignore this email.
<br/><br/><br/>
<a href="{{link}}" style="text-decoration: none; background-color: #0098a6;border: 2px solid #00988F;color: white;font-size: 14px;font-weight: 700;    padding: 10px 50px;">Click here to reset your password</a>
<br/><br/><br/>
Thanks,
<br/>
The FRA team fra@fao.org
<br/>
{{- url}}
      `,
    },
  },

  fraClass: {
    forest: 'Forest',
    otherWoodedLand: 'Other wooded land',
    otherLand: 'Other land',
  },

  fraForestCharacteristicsClass: {
    naturallyRegeneratingForest: 'Naturally regenerating forest',
    plantationForest: 'Plantation forest',
    ofWhichIntroduced: '…of which introduced',
    otherPlantedForest: 'Other planted forest',
    totalForest: 'Total forest',
  },

  fraOtherLandClass: {
    palms: '…of which palms (oil, coconut, dates, etc)',
    treeOrchards: '…of which tree orchards (Includes fruit, nuts, olive, etc)',
    agroforestry: '…of which agroforestry',
    treesUrbanSettings: '…of which trees in urban settings',
  },

  landing: {
    home: 'Home',
    sections: {
      overview: 'Overview',
      messageBoard: 'Message board',
      about: 'About FRA',
      recentActivity: 'Recent activity',
      userManagement: 'Manage collaborators',
      externalData: 'External data',
      links: 'Links & Repository',
      contentCheck: 'Content / Check',
      versioning: 'Versioning',
    },
    overview: {
      loadingMap: 'Loading map…',
      withFinancialSupportOf: 'With the financial support of ',
    },
    milestones: {
      milestones: 'Milestones',
      milestone1: 'Global meeting of National Correspondents',
      milestone2: 'Regional and sub-regional workshops',
      milestone3: 'Deadline for submission of country reports',
      milestone4: 'Validation of final country reports',
      milestone5: 'FRA 2020 Preliminary Findings',
      milestone6: 'FRA 2020 Main Report',
      milestone7: 'Data analysis and report drafting',
      milestone8: 'Launch of analysis and dissemination platform',
      date1: 'March',
      date2: 'April – September',
      date3: 'October',
      date4: 'January – February',
      date5: 'March',
      date6: 'July',
      date7: 'March - December',
      date8: 'August',
    },
    users: {
      users: 'Contacts',
      message: 'Message',
    },
    about: {
      contact: 'Contact',
      seniorForestryOfficer: 'Senior Forestry Officer',
      faoForestryDepartment: 'FAO Forestry Department',
      email: 'Email',
      fraProcess:
        'FAO has been monitoring the world’s forests at 5 to 10 year intervals since 1946. The Global Forest Resources Assessments (FRA) are now produced every five years in an attempt to provide a consistent approach to describing the world’s forests and how they are changing. The Assessment is based on two primary sources of data: Country Reports prepared by National Correspondents and remote sensing that is conducted by FAO together with national focal points and regional partners. The scope of the FRA has changed regularly since the first assessment published in 1948. These assessments make an interesting history of global forest interests, both in terms of their substantive content, but also in their changing scope.',
      linkFraProcess: 'Read more about the FRA process',
      or: 'Or',
      selectArea: 'Select an area below to access FRA data',
    },
    recentActivity: {
      noRecentActivityTitle: 'Looks like there’s no recent activity',
      noRecentActivityBody:
        'Changes done in the platform will appear here, so that you can get up to speed on what’s been happening while you were away.',
      getStarted: 'Get started',
      actions: {
        added: 'added',
        addedFile: 'added {{file}}',
        commented: 'commented on',
        deleted: 'deleted',
        deletedFile: 'deleted {{file}}',
        edited: 'edited',
        resolved: 'resolved issue in',
        status: 'changed status to',
        addUser: 'added {{user}} as {{role}}',
        updateUser: 'edited {{user}}',
        removeUser: 'removed {{user}}',
        acceptInvitation: 'joined as {{role}}',
        addInvitation: 'invited {{user}} as {{role}}',
        removeInvitation: 'removed invitation of {{user}} as {{role}}',
        updateInvitation: 'invite updated for {{user}} as {{role}}',
        updateAssessmentStatus: 'changed the status of {{assessment}} to {{status}}',
      },
      fraProcess:
        'FAO has been monitoring the world’s forests at 5 to 10 year intervals since 1946. The Global Forest Resources Assessments (FRA) are now produced every five years in an attempt to provide a consistent approach to describing the world’s forests and how they are changing. The Assessment is based on two primary sources of data: Country Reports prepared by National Correspondents and remote sensing that is conducted by FAO together with national focal points and regional partners. The scope of the FRA has changed regularly since the first assessment published in 1948. These assessments make an interesting history of global forest interests, both in terms of their substantive content, but also in their changing scope.',
      linkFraProcess: 'Read more about the FRA process',
    },
    links: {
      links: 'Links',
      unfcccFocalPoints: 'UNFCCC focal points',
      sdgFocalPoints: 'National SDG focal points',
      reddPortal: 'Satellite Land Monitoring Systems (SLMS), empowered by UN-REDD/FAO',
      fraGeoSpatialTools: 'FRA Geospatial tools',
      repository: 'Repository',
      uploadFile: 'Upload a file',
      confirmDelete: 'Delete {{file}}? This cannot be undone.',
    },
    dataExport: {
      downloadData: 'Download data',
    },
    versioning: {
      status: {
        pending: 'Pending',
        running: 'Running',
        completed: 'Completed',
        failed: 'Failed',
      },
      form: {
        newVersion: 'New version',
        versionNumber: 'Version',
        date: 'Date',
        cancel: 'Cancel',
        error: 'There are errors in the form. Please, fix them and submit it again.',
      },
      table: {
        noVersions: 'No versions yet',
        databaseVersions: 'Database Versions',
        versionNumber: 'Version Number',
        publishedAt: 'Scheduled Time',
        createdBy: 'Created By',
        status: 'Status',
        delete: 'Delete',
        scheduledAt: 'Scheduled at',
      },
    },
  },
  userChat: {
    chatHeader: 'Messages with {{user}}',
    noMessages: 'No messages',
    writeMessage: 'Write a message…',
    send: 'Send',
    cancel: 'Cancel',
    notificationEmail: {
      subject: '{{sender}} sent you a message on {{country}}',
      textMessage: `Dear {{recipient}},

{{sender}} sent you a message on {{country}}.

Access the platform at the following URL to see and respond:
{{- link}}

The FRA team
{{- url}}
    `,
      htmlMessage: `Dear {{recipient}},
<br/><br/>
{{sender}} sent you a message on {{country}}.
<br/><br/>
<b><a href="{{- link}}">Access the platform to see and respond.</a></b>
<br/><br/>
The FRA team
<br/>
{{- url}}
    `,
    },
  },

  // error messages
  error: {
    access: {
      countryRoleNotSpecified: 'Error: User {{user}} tried to access {{countryIso}} but no role has been specified',
      countryUserNotReviewer: 'Error: User {{user}} tried to access {{countryIso}} of which is not reviewer',
      userNotAdministrator: 'Error: User {{user}} tried to access a resource available only to administrators',
      roleChangeNotAllowed:
        'Error: User {{user}} tried to set another user’s role to {{role}} which is not allowed for the logged in user',
      userAlreadyAddedToCountry: 'Error: User {{user}} is already added to country {{countryIso}}',
      invitationAlreadyUsed:
        'Error: invitation {{invitationUuid}} has already been used, hijacking by {{loginEmail}} not allowed!',
      countryDoesNotMatch: 'Error: country {{countyryIso}} does not match',
      assessmentEditingNotAllowed:
        'Error: User {{user}} in role {{role}} cannot edit assessment in state {{assessmentStatus}} for country {{countryIso}}',
      assessmentCommentingNotAllowed:
        'Error: User {{user}} in role {{role}} cannot comment assessment in state {{assessmentStatus}} for country {{countryIso}}',
    },
    assessment: {
      transitionNotAllowed: 'Error: Transition from {{currentStatus}} to {{status}} is not allowed for role {{role}}',
      deskStudyNotAllowed: 'Error: Only administrator can change desk-study status',
    },
    review: {
      commentDeleteNotOwner: 'Error: User {{user}} tried to delete a comment that doesn’t own',
      commentEnterResolvedIssue: 'Error: User {{user}} tried to enter a comment for a resolved issue',
    },
    ndp: {
      previousNdpNotFound: 'Unable to find any National data point prior to {{year}}',
    },
  },
  // components

  countryListing: {
    annuallyUpdated: 'Annually updated',
    fra2020: 'FRA 2020',
  },

  navigation: {
    bulkDownload: 'Bulk Download',
    hideAll: 'Hide all',
    showAll: 'Show all',
    support: {
      dontDelete: 'System information please don’t remove',
      feedbackEmailSubject: 'FRA Platform Feedback',
      platformVersion: 'Platform version',
      userAgent: 'User agent',
      user: 'User',
      manageCollaborators: 'Manage collaborators',
    },
    sectionHeaders: {
      introduction: 'Introduction',
      forestExtentCharacteristicsAndChanges: 'Forest extent, characteristics and changes',
      forestGrowingStockBiomassAndCarbon: 'Forest growing stock, biomass and carbon',
      forestDesignationAndManagement: 'Forest designation and management',
      forestOwnershipAndManagementRights: 'Forest ownership and management rights',
      forestDisturbances: 'Forest disturbances',
      forestPolicyAndLegislation: 'Forest policy and legislation',
      employmentEducationAndNwfp: 'Employment, education and NWFP',
      sustainableDevelopment: 'Sustainable Development Goal 15',
      panEuropeanIndicators: 'Pan-European Indicators',
    },
    submit: 'Submit',
    cancel: 'Cancel',
    changeStatusTextPlaceholder: 'Add an optional message',
    doNotNotifyUsers: "Don't notify users",
  },

  header: {
    editProfile: 'Edit profile',
    logout: 'Logout',
    hideSidebar: 'Hide sidebar',
    showSidebar: 'Show sidebar',
    autoSave: {
      saving: 'Saving…',
      complete: 'All changes saved',
      lastSaveTimestampReceived: 'Last edited ',
    },
  },

  time: {
    hour: '{{count}} hour ago',
    hour_plural: '{{count}} hours ago',
    day: '{{count}} day ago',
    day_plural: '{{count}} days ago',
    week: '{{count}} week ago',
    week_plural: '{{count}} weeks ago',
    aMomentAgo: 'a moment ago',
  },

  review: {
    comments: 'Comments',
    noComments: 'No comments',
    resolve: 'Resolve',
    confirmDelete: 'Delete this comment? This cannot be undone.',
    commentDeleted: 'Comment deleted',
    commentMarkedAsResolved: 'Marked as resolved',
    delete: 'Delete',
    writeComment: 'Write a comment…',
    commentingClosed: 'Commenting closed',
    add: 'Add',
    cancel: 'Cancel',
  },

  description: {
    edit: 'Edit',
    done: 'Done',
    loading: 'Loading content…',
    description: 'Description',
    dataSourcesTitle: 'Data sources, original data & national classification and definitions',
    generalCommentsTitle: 'Comments',
    dataSources: 'Data sources',
    dataSourcesPlus: 'Data sources + type of data source eg NFI, etc',
    originalData: 'Original data',
    nationalClassificationAndDefinitions: 'National classification and definitions',
    nationalData: 'National Data',
    analysisAndProcessing: 'Analysis and processing of national data',
    estimationAndForecasting: 'Estimation and forecasting',
    reclassification: 'Reclassification into FRA 2020 categories',
  },

  nationalDataPoint: {
    clickOnNDP: 'Click on the year to access original data',
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
    confirmDelete: 'Delete this data point? This cannot be undone.',
    discardChanges: 'Discard changes',
    doneEditing: 'Done editing',
    enterOrCopyPasteNationalClasses: 'Enter or copy and paste national classes',
    forestCharacteristics: 'Forest characteristics',
    otherLandCharacteristics: 'Other land with tree cover',
    plantationForest: 'Plantation forest',
    remindDirtyOdp: 'National data point has been updated, remember to regenerate values',
    disabled: 'Disabled, enable in section 1b',
    dataSourceMethodsOptions: {
      nationalForestInventory: 'National Forest Inventory',
      sampleBasedRemoteSensingAssessment: 'Sample-based remote sensing assessment',
      fullCoverMaps: 'Full-cover forest/vegetation maps',
      registersQuestionnaires: 'Registers/questionnaires',
      other: 'Other (specify in comments)',
    },
    appliesToVariablesOptions: {
      forest: 'Forest',
      otherWoodedLand: 'Other wooded land',
      otherLand: 'Other land',
    },
  },

  userManagement: {
    manageCollaborators: 'Manage collaborators',
    name: 'Name',
    role: 'Role',
    email: 'Email',
    loginEmail: 'Login',
    noUsers: 'No collaborators added',
    placeholder: 'Choose…',
    remove: 'Remove',
    done: 'Done',
    edit: 'Edit',
    addUser: 'Add collaborator',
    formErrors: 'There are errors in the form. Please, fix them and submit it again.',
    insufficientPrivileges: 'Insufficient privileges',
    confirmDelete: 'Remove {{user}}?',
    allUsers: 'All collaborators',
    info: 'Info',
    tableAccess: 'Table access',
    invitationLink: 'Invitation link',
    sendInvitation: 'Send invitation email',
    invitationEmail: {
      subject: 'FRA platform invitation',
      textMessage: `Dear {{invitedUser}},

You have been invited to access the FRA platform as {{role}} for {{country}}.

Accept this invitation and access the platform at the following URL:
{{- link}}

Happy reporting!

The FRA team fra@fao.org
{{- url}}
    `,
      htmlMessage: `Dear {{invitedUser}},
<br/><br/>
You have been invited to access the FRA platform as {{role}} for {{country}}.
<br/><br/>
<b><a href="{{- link}}">Accept this invitation and access the platform</a></b>
<br/><br/>
Happy reporting!
<br/><br/>
The FRA team fra@fao.org
<br/>
{{- url}}
    `,
    },
  },

  // FRA 2020 questionare
  // Object name and title should have always the same name

  contactPersons: {
    reportPreparationAndContactPersons: 'Report preparation and contact persons',
    contactPersons: 'Introduction',
    contactPersonsSupport: 'The present report was prepared by the following person(s)',
    introductoryText: 'Introductory text',
    introductoryTextSupport: 'Place an introductory text on the content of this report',
    firstName: 'First name',
    lastName: 'Last name',
    institution: 'Institution/address',
    email: 'Email',
    tables: 'Tables',
    all: 'All',
    none: 'None',
  },

  extentOfForest: {
    extentOfForest: 'Extent of forest and other wooded land',
    estimationAndForecasting: 'Estimation and forecasting',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    forestArea: 'Forest',
    chart: {
      placeholderLine1: 'To get started, add new national data points and use',
      placeholderLine2: 'them to generate FRA values automatically.',
    },
    otherLandCategories: 'Other land categories',
    ofWhichPalms: '…of which palms (oil, coconut, dates, etc.)',
    ofWhichTreeOrchards: '…of which tree orchards (includes fruit, nuts, olive, etc.)',
    ofWhichAgroforestry: '…of which agroforestry',
    ofWhichTreesUrbanSettings: '…of which trees in urban settings',
    totalLandArea: 'Total land area',
    fedAreasExceedTotalLandArea: 'Forest area and other wooded land exceed total land area',
    forestAreaDoesNotMatchPreviouslyReported: 'Forest area doesn’t match FRA 2015 area: {{previous}}',
    useOriginalDataPoints: 'Use national data points',
    dontUseOriginalDataPoints: 'Don’t use national data points',
    whatIsThis: 'What is this?',
    tableNoticeMessage: 'The FAOSTAT land area figure for the year 2015 is used for all reference years',
    ndpMissingValues: 'National data point has missing values',
    showNDPs: 'Show National data points',
    hideNDPs: 'Hide National data points',
  },

  climaticDomain: {
    climaticDomain: 'Climatic domain',
    percentOfForestArea2015: '% of forest area 2015',
    percentOfForestArea2015Override: 'Override value',
    selectDefault: 'Default',
    boreal: 'Boreal',
    temperate: 'Temperate',
    subtropical: 'Sub-tropical',
    tropical: 'Tropical',
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
    dontUseOriginalDataPoints: 'Don’t use national data points',
  },

  tableWithOdp: {
    confirmGenerateFraValues: 'Override existing values?',
    generateFraValues: 'Generate values',
    linearExtrapolation: 'Linear',
    repeatLastExtrapolation: 'Repeat last',
    annualChangeExtrapolation: 'Annual change',
    placeholderFuture: 'Future',
    placeholderPast: 'Past',
    clearTable: 'Clear table',
    copyToClipboard: 'Copy values',
    placeholderSelect: 'Estimation and forecasting',
    _1000haYear: '1000 ha/year',
  },

  forestAreaChange: {
    forestAreaChange: 'Annual forest expansion, deforestation and net change',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha/year)',
    forestExpansion: 'Forest expansion',
    ofWhichAfforestation: '…of which afforestation',
    ofWhichNaturalExpansion: '…of which natural expansion',
    deforestation: 'Deforestation',
    forestAreaNetChange: 'Forest area net change',
    netChangeDoesNotMatch: 'Doesn’t match Forest area net change',
  },

  annualReforestation: {
    annualReforestation: 'Annual reforestation',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha/year)',
    reforestation: 'Reforestation',
  },

  specificForestCategories: {
    specificForestCategories: 'Primary forest and special forest categories',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    bamboo: 'Bamboos',
    mangroves: 'Mangroves',
    temporarilyUnstocked: 'Temporarily unstocked and/or recently regenerated',
    primaryForest: 'Primary forest',
    exceedsNaturallyRegeneratingForest: 'Exceeds naturally regenerating forest (1b)',
    rubberWood: 'Rubber wood',
  },

  otherLandWithTreeCover: {
    otherLandWithTreeCover: 'Other land with tree cover',
    areaUnitLabel: 'Area (1000 ha)',
    categoryHeader: 'FRA categories',
    palms: 'Palms',
    treeorchards: 'Tree orchards',
    agroforestry: 'Agroforestry',
    treesinurbansettings: 'Trees in urban settings',
    total: 'Total',
    otherLandArea: 'Other land area',
    other: 'Other (specify in comments)',
  },

  growingStock: {
    growingStock: 'Growing stock',
    supportText: 'Please make sure you have entered data in tables 1a & 1b before editing this table',
    categoryHeader: 'FRA categories',
    avgTableHeader: 'Growing stock m³/ha (over bark)',
    totalTableHeader: 'Total growing stock (million m³ over bark)',
    naturallyRegeneratingForest: 'Naturally regenerating forest',
    plantedForest: 'Planted forest',
    plantationForest: '…of which plantation forest',
    otherPlantedForest: '…of which other planted forest',
    forest: 'Forest',
    otherWoodedLand: 'Other wooded land',
    copyToClipboard: 'Copy values',
  },

  growingStockComposition: {
    native: 'Native',
    introduced: 'Introduced',
    growingStockComposition: 'Growing stock composition',
    categoryHeader: 'FRA categories',
    nativeTreeSpecies: 'Native tree species',
    introducedTreeSpecies: 'Introduced tree species',
    areaUnitLabel: 'Growing stock in forest (million m³ over bark)',
    scientificName: 'Scientific name',
    commonName: 'Common name',
    rank: '#{{idx}} Ranked in terms of volume',
    remainingNative: 'Remaining native tree species',
    remainingIntroduced: 'Remaining introduced tree species',
    totalNative: 'Total volume of native tree species',
    totalIntroduced: 'Total volume of introduced tree species',
    totalGrowingStock: 'Total growing stock',
    rankingYear: 'Ranking year 2015',
  },

  biomassStock: {
    biomassStock: 'Biomass stock',
    categoryHeader: 'FRA categories',
    tableHeader: 'Forest biomass (tonnes/ha)',
    aboveGround: 'Above-ground biomass',
    belowGround: 'Below-ground biomass',
    deadWood: 'Dead wood',
    downloadExcel: 'Download excel calculator',
  },

  carbonStock: {
    carbonStock: 'Carbon stock',
    categoryHeader: 'FRA categories',
    tableHeader: 'Forest carbon (tonnes/ha)',
    carbonAboveGroundBiomass: 'Carbon in above-ground biomass',
    carbonBelowGroundBiomass: 'Carbon in below-ground biomass',
    carbonDeadwood: 'Carbon in dead wood',
    carbonLitter: 'Carbon in litter',
    carbonSoil: 'Soil carbon',
    soilDepthHeading: 'Soil depth (cm) used for soil carbon estimates',
  },

  designatedManagementObjective: {
    designatedManagementObjective: 'Designated management objective',
    primaryDesignatedManagementObjective: 'Primary designated management objective',
    primaryDesignatedManagementObjectiveSupport:
      'Primary designated management objective is significantly more important than other management objectives. The different primary management objectives are *exclusive* and areas reported under one primary management objective should not be reported for any other primary management objectives. The sum of the different management objectives should add up to the forest area.',
    totalAreaWithDesignatedManagementObjective: 'Total area with designated management objective',
    totalAreaWithDesignatedManagementObjectiveSupport:
      'Designated management objective, regardless whether it is primary or not. The different designation categories are *not exclusive*. Hence, areas can be reported more than once e.g. Forest area reported as primary management objective "Multiple use" should be reported on for each management objectives. Thus the sum of the different management objectives can be larger than the total forest area.',
    categoryHeader: 'FRA 2020 categories',
    areaUnitLabel: 'Forest area (1000 ha)',
    production: 'Production',
    soilWaterProtection: 'Protection of soil and water',
    biodiversityConservation: 'Conservation of biodiversity',
    socialServices: 'Social Services',
    multipleUse: 'Multiple use',
    other: 'Other (specify in comments)',
    unknown: 'None/unknown',
    totalForestArea: 'Total forest area',
    total: 'Total',
  },

  forestAreaWithinProtectedAreas: {
    forestAreaWithinProtectedAreas:
      'Forest area within protected areas and forest area with long-term management plans',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    header: 'Forest area within protected areas',
    forestAreaWithLongTermManagementPlan: 'Forest area with long-term forest management plan',
    ofWhichInProtectedAreas: '…of which in protected areas',
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
    otherOrUnknown: 'Unknown/other (specify in comments)',
    totalForestArea: 'Total forest area',
    total: 'Total',
  },

  holderOfManagementRights: {
    holderOfManagementRights: 'Holder of management rights of public forests',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Forest area (1000 ha)',
    publicAdministration: 'Public Administration',
    individuals: 'Individuals',
    privateBusinesses: 'Private business entities and institutions',
    communities: 'Local, tribal and indigenous communities',
    other: 'Unknown/other (specify in comments)',
    totalPublicOwnership: 'Total public ownership',
    total: 'Total',
    publicOwnershipDoesNotMatch: 'Doesn’t match Total public ownership',
  },

  disturbances: {
    disturbances: 'Disturbances',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    insects: 'Insects',
    diseases: 'Diseases',
    severeWeatherEvents: 'Severe weather events',
    other: 'Other (specify in comments)',
    totalForestArea: 'Total forest area',
    total: 'Total',
  },

  areaAffectedByFire: {
    areaAffectedByFire: 'Area affected by fire',
    categoryHeader: 'FRA categories',
    areaUnitLabel: 'Area (1000 ha)',
    totalLandAreaAffectedByFire: 'Total land area affected by fire',
    ofWhichForest: '…of which on forest',
  },

  degradedForest: {
    degradedForest: 'Degraded forest',
    doesYourCountryMonitor: 'Does your country monitor area of degraded forest',
    ifYes: 'If "yes"',
    whatIsDefinition: 'What is the national definition of "Degraded forest"?',
    howMonitored: 'Describe the monitoring process and results',
  },

  forestPolicy: {
    forestPolicy: 'Policies, Legislation and national platform for stakeholder participation in forest policy',
    categoryHeader: 'Indicate the existence of',
    areaUnitLabel: 'Boolean (Yes/No)',
    national: 'National',
    subnational: 'Sub-national',
    policiesSFM: 'Policies supporting SFM',
    legislationsSFM: 'Legislations and regulations supporting SFM',
    stakeholderParticipation:
      'Platform that promotes or allows for stakeholder participation in forest policy development',
    existenceOfTraceabilitySystem: 'Traceability system(s) for wood products',
  },

  areaOfPermanentForestEstate: {
    areaOfPermanentForestEstate: 'Area of permanent forest estate',
    categoryHeader: 'FRA 2020 categories',
    areaUnitLabel: 'Forest area (1000 ha)',
    applicable: 'Applicable?',
  },

  employment: {
    employment: 'Employment in forestry and logging',
    average: '3 year average',
    categoryHeader: 'FRA 2020 categories',
    unitHeader: 'Full-time equivalents (1000 FTE)',
    inForestry: 'Employment in forestry and logging',
    ofWhichSilviculture: '…of which silviculture and other forestry activities',
    ofWhichLogging: '…of which logging',
    ofWhichGathering: '…of which gathering of non wood forest products',
    ofWhichSupport: '…of which support services to forestry',
    total: 'Total',
    female: 'Female',
    male: 'Male',
  },

  graduationOfStudents: {
    graduationOfStudents: 'Graduation of students in forest-related education',
    average: '3 year average',
    numberOfStudents: 'Number of graduated students',
    fra2020Categories: 'FRA 2020 categories',
    doctoralDegree: 'Doctoral degree',
    mastersDegree: 'Master’s degree',
    bachelorsDegree: 'Bachelor’s degree',
    technicianCertificate: 'Technician certificate / diploma',
    total: 'Total',
    female: 'Female',
    male: 'Male',
  },

  nonWoodForestProductsRemovals: {
    nonWoodForestProductsRemovals: 'Non wood forest products removals and value 2015',
    nameOfProduct: 'Name of NWFP product',
    keySpecies: 'Key species',
    quantity: 'Quantity',
    unit: 'Unit',
    value: 'Value (1000 local currency)',
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
    notSelected: '',
  },

  sustainableDevelopment: {
    sustainableDevelopment: 'Sustainable Development Goal 15',
    indicator: 'Indicator',
    percent: 'Percent',
    nameOfAgencyResponsible: 'Name of agency responsible',
    sdgIndicator1: 'SDG Indicator 15.1.1 Forest area as proportion of total land area 2015',
    sdgIndicator2: 'SDG Indicator 15.2.1 Progress towards sustainable forest management',
    forestAreaProportionLandArea2015: 'Forest area as proportion of total land area 2015',
    subIndicator: 'Sub-Indicator {{no}}',
    forestAreaAnnualNetChangeRate: 'Forest area annual net change rate',
    aboveGroundBiomassStockForests: 'Above-ground biomass stock in forest',
    percent2015ForestAreaBaseline: 'Percent (2015 forest area baseline)',
    proportionForestAreaLegallyEstablishedProtectedAreas:
      'Proportion of forest area located within legally established protected areas',
    proportionForestAreaLongTermForestManagement: 'Proportion of forest area under long-term forest management plan',
    forestArea1000Ha: 'Forest area (1000 ha)',
    forestAreaVerifiedForestManagement:
      'Forest area under independently verified forest management certification schemes',
  },

  panEuropeanIndicators: {
    panEuropeanIndicators: 'Pan-European Quantitative Indicators for Sustainable Forest Management',
    uploadQuestionnaire: 'Upload questionnaire',
    chooseFile: 'Choose file',
    downloadQuestionnaire: 'Download questionnaire',
    download: 'Download',
    remove: 'Remove',
    noQuestionnaire: 'No questionnaire selected',
    panEuropeanQualitativeIndicators: 'Pan-European Qualitative Indicators for Sustainable Forest Management',
    accessReportingPage: 'Access reporting page',
  },

  assessment: {
    fra2020: 'FRA 2020',
    panEuropean: 'Pan European',
    deskStudy: 'Desk study',
    statusChangeNotification: {
      subject: '{{country}} status changed to {{status}} on FRA Platform',
      textMessage: `Dear {{recipientName}},

{{changer}} changed the status of {{assessment}} to "{{status}}" for {{country}} on FRA Platform.

{{message}}

Visit the platform at: {{- serverUrl}}

The FRA team
{{- serverUrl}}`,
      htmlMessage: `Dear {{recipientName}},
<br/><br/>
{{changer}} changed the status of {{assessment}} to "{{status}}" for {{country}} on FRA Platform.
<br/><br/>
{{message}}
<br/><br/>
<a href="{{- serverUrl}}"><b>Visit the platform</b></a>
<br/><br/>
The FRA team
<br/>
{{- serverUrl}}`,
    },
    status: {
      changing: {
        label: 'Changing…',
      },
      editing: {
        label: 'Editing',
        previous: 'Return to editing',
      },
      review: {
        label: 'In review',
        next: 'Send to review',
        previous: 'Return to review',
      },
      approval: {
        label: 'Awaiting approval',
        next: 'Send for approval',
        previous: 'Return to approval',
      },
      accepted: {
        label: 'Accepted',
        next: 'Accept',
        previous: '',
      },
    },
  },

  multiSelect: {
    placeholder: 'Choose…',
  },

  generalValidation: {
    subCategoryExceedsParent: 'Subcategory exceeds parent',
    forestAreaDoesNotMatchExtentOfForest: "Doesn't match Forest area (1a)",
    forestAreaExceedsExtentOfForest: 'Exceeds Forest area (1a)',
    otherLandExceedsExtentOfForest: 'Exceeds Other land area (1a)',
    valueMustBePositive: 'Value should be greater than zero',
    emptyField: 'This field is empty',
    mustBeEqualToTotalGrowingStock: 'Value should be equal to Total Growing Stock (2a)',
    valuesAreInconsistentWithNetChange: 'Values are inconsistent with Forest area net change',
    valuesAreInconsistent1aOr1b: 'Values are inconsistent with Areas reported in tables 1a or 1b',
  },

  emoji: {
    picker: {
      search: 'Search',
      categories: {
        search: 'Search Results',
        recent: 'Frequently Used',
        people: 'Smileys & People',
        nature: 'Animals & Nature',
        foods: 'Food & Drink',
        activity: 'Activity',
        places: 'Travel & Places',
        objects: 'Objects',
        symbols: 'Symbols',
        flags: 'Flags',
      },
    },
  },

  editUser: {
    chooseProfilePicture: 'Choose picture',
    name: 'Name',
    role: 'Role',
    email: 'Email',
    loginEmail: 'Login',
    institution: 'Institution',
    position: 'Position',
    done: 'Save',
    cancel: 'Cancel',
    deactivate: 'Deactivate',
    activate: 'Activate',
    picture1MbMax: 'Profile picture cannot exceed 1MB',
  },

  country: {
    region: {
      asia: 'Asia',
      europe: 'Europe',
      oceania: 'Oceania',
      north_and_central_america: 'North and Central America',
      south_america: 'South America',
      africa: 'Africa',
      atlantis: 'Atlantis',
      forest_europe: 'Forest Europe',
    },
  },

  admin: {
    admin: 'Admin',
    filter: 'Filter by',
    language: 'Language',
    country: 'Country',
    invitationPending: 'Invitation pending',
  },

  countryMessageBoard: {
    messageBoard: 'Message Board',
    messageBoardDesc: 'Messages posted here are visible to all country members',
    oneToOneMessages: 'One To One Messages',
  },

  fraReportPrint: {
    title: 'FRA 2020 report',
    titleTables: 'FRA 2020 reporting tables',
    tableOfContent: 'Table of contents',
    disclaimer: `FAO has been monitoring the world's forests at 5 to 10 year intervals since 1946. The Global Forest Resources Assessments (FRA) are now produced every five years in an attempt to provide a consistent approach to describing the world's forests and how they are changing. The FRA is a country-driven process and the assessments are based on reports prepared by officially nominated National Correspondents. If a report is not available, the FRA Secretariat prepares a desk study using earlier reports, existing information and/or remote sensing based analysis.`,
    disclaimerGenerated: `This document was generated automatically using the report made available as a contribution to the FAO Global Forest Resources Assessment 2020, and submitted to FAO as an official government document. The content and the views expressed in this report are the responsibility of the entity submitting the report to FAO. FAO cannot be held responsible for any use made of the information contained in this document.`,
    disclaimerGeneratedDeskStudy: `This document was generated automatically from a desk study. FAO cannot be held responsible for any use made of the information contained in this document.`,
  },

  panEuropean: {
    panEuropeanAssessment: 'Pan European Assessment',
    govSwitzerland: 'Government of Switzerland',
    landing: {
      link: 'Joint FOREST EUROPE / UNECE / FAO reporting on pan-European indicators for SFM : FOREST EUROPE',
    },
    home: {
      description1:
        'This dataset consists of information provided by the National Correspondents in response to the joint FOREST EUROPE, UNECE, FAO questionnaire on the quantitative pan-European indicators for sustainable forest management.',
      description2:
        'Note: The pan-European reporting 2020 was carried out in parallel to FRA 2020, however as they consist separate processes, some variables appear in both of them. Within the process of State of Europe’s Forest (SoEF) 2020 elaboration some information was further consulted with national correspondents and may differ from these presented in the FRA Platform.',
    },

    // navigation
    navigation: {
      forestResourcesAndCarbon: 'Forest Resources and Carbon',
      maintenanceOfForestEcosystemHealthAndVitality: 'Maintenance of Forest Ecosystem Health and Vitality',
      productiveFunctionsOfForestsWoodAndNonWood: 'Productive Functions of Forests (Wood and Non-Wood)',
      biologicalDiversityInForestEcosystems: 'Biological Diversity in Forest Ecosystems',
      protectiveFunctionsInForestManagement: 'Protective Functions in Forest Management',
      socioEconomicFunctionsAndConditions: 'Socio-economic functions and conditions',
    },

    // table 1.1a
    forestArea: {
      forestArea: 'Forest Area',
      categoryYear: 'Category - Year',
      area: 'Area (1000 ha)',
      forest: 'Forest - {{year}}',
      _of_which_available_for_wood_supply: '… of which available for wood supply - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
      other_land: 'Other land - {{year}}',
      _of_which_with_tree_cover: '… of which with tree cover - {{year}}',
    },

    // table 1.1b
    forestAreaByForestTypes: {
      forestAreaByForestTypes: 'Forest area by forest types',
      category: 'Category',
      forestArea1000Ha: 'Forest area (1000 ha)',
      predominantly_coniferous_forest: 'Predominantly coniferous forest',
      predominantly_broadleaved_forest: 'Predominantly broadleaved forest',
      mixed_forest: 'Mixed forest',
      forest_area_1990: 'Forest area (1000 ha) - 1990',
      forest_area_2000: 'Forest area (1000 ha) - 2000',
      forest_area_2005: 'Forest area (1000 ha) - 2005',
      forest_area_2010: 'Forest area (1000 ha) - 2010',
      forest_area_2015: 'Forest area (1000 ha) - 2015',
      forest_area_2020: 'Forest area (1000 ha) - 2020',
    },

    // table 1.2a
    growingStock: {
      growingStock: 'Growing Stock',
      categoryYear: 'Category - Year',
      growingStockMillionM3OB: 'Growing stock (million m³ o.b.)',
      total: 'Total',
      _ofWhich: '… of which',
      coniferous: 'Coniferous',
      broadleaved: 'Broadleaved',
      forest: 'Forest - {{year}}',
      _of_which_available_for_wood_supply: '… of which available for wood supply - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
    },

    // table 1.2b
    growingStockByForestType: {
      growingStockByForestType: 'Growing stock by forest type',
      category: 'Category',
      growingStockMillionM3OB: 'Growing stock (million m³ o.b.)',
      predominantly_coniferous_forest: 'Predominantly coniferous forest',
      predominantly_broadleaved_forest: 'Predominantly broadleaved forest',
      mixed_forest: 'Mixed forest',
      growing_stock_1990: 'Growing stock (million m³ o.b.) - 1990',
      growing_stock_2000: 'Growing stock (million m³ o.b.) - 2000',
      growing_stock_2005: 'Growing stock (million m³ o.b.) - 2005',
      growing_stock_2010: 'Growing stock (million m³ o.b.) - 2010',
      growing_stock_2015: 'Growing stock (million m³ o.b.) - 2015',
      growing_stock_2020: 'Growing stock (million m³ o.b.) - 2020',
    },

    // table 1.2c
    growingStockComposition: {
      growingStockComposition: 'Growing stock composition',
      speciesName: 'Species name',
      growingStockInForestMillionM3OB: 'Growing stock in forest (million m³ o.b.)',
      rank: 'Rank',
      scientificName: 'Scientific name',
      commonName: 'Common name',
      no1_ranked_in_terms_of_volume: '#1 Ranked in terms of volume',
      no2_ranked_in_terms_of_volume: '#2 Ranked in terms of volume',
      no3_ranked_in_terms_of_volume: '#3 Ranked in terms of volume',
      no4_ranked_in_terms_of_volume: '#4 Ranked in terms of volume',
      no5_ranked_in_terms_of_volume: '#5 Ranked in terms of volume',
      no6_ranked_in_terms_of_volume: '#6 Ranked in terms of volume',
      no7_ranked_in_terms_of_volume: '#7 Ranked in terms of volume',
      no8_ranked_in_terms_of_volume: '#8 Ranked in terms of volume',
      no9_ranked_in_terms_of_volume: '#9 Ranked in terms of volume',
      no10_ranked_in_terms_of_volume: '#10 Ranked in terms of volume',
      remaining: 'Remaining',
      total: 'TOTAL',
      scientific_name: 'Scientific name',
      common_name: 'Common name',
      growing_stock_in_forest_1990: 'Growing stock in forest (million m³ o.b.) - 1990',
      growing_stock_in_forest_2000: 'Growing stock in forest (million m³ o.b.) - 2000',
      growing_stock_in_forest_2005: 'Growing stock in forest (million m³ o.b.) - 2005',
      growing_stock_in_forest_2010: 'Growing stock in forest (million m³ o.b.) - 2010',
      growing_stock_in_forest_2015: 'Growing stock in forest (million m³ o.b.) - 2015',
      growing_stock_in_forest_2020: 'Growing stock in forest (million m³ o.b.) - 2020',
    },

    // table 1.3a1
    ageClassDistributionAreaOfEvenAgedStands: {
      ageClassDistributionAreaOfEvenAgedStands: 'Age class distribution (area of even-aged stands)',
      categoryYear: 'Category - Year',
      developmentPhases1000ha: 'Development phases (1 000 ha)',
      total_area: 'Total area (1000 ha)',
      regeneration_phase: 'Regeneration phase',
      intermediate_phase: 'Intermediate phase',
      mature_phase: 'Mature phase',
      unspecified: 'Unspecified',
      forest_even_aged_stands_of_which: 'Forest (even-aged stands), of which: - {{year}}',
      available_for_wood_supply_of_which: 'Available for wood supply, of which: - {{year}}',
      predominantly_coniferous_forest: 'Predominantly coniferous forest - {{year}}',
      predominantly_broadleaved_forest: 'Predominantly broadleaved forest - {{year}}',
      mixed_forest: 'Mixed forest - {{year}}',
    },

    // table 1.3a2
    ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply: {
      ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply:
        'Age class distribution (volume of even-aged stands) in forest available for wood supply',
      categoryYear: 'Category - Year',
      developmentPhases1000ha: 'Development phases (1 000 ha)',
      total_volume: 'Total volume (1 000 m³)',
      regeneration_phase: 'Regeneration phase',
      intermediate_phase: 'Intermediate phase',
      mature_phase: 'Mature phase',
      unspecified: 'Unspecified',
      forest_available_for_wood_supply_even_aged_stands_of_which:
        'Forest available for wood supply (even-aged stands), of which: - {{year}}',
      predominantly_coniferous_forest: 'Predominantly coniferous forest - {{year}}',
      predominantly_broadleaved_forest: 'Predominantly broadleaved forest - {{year}}',
      mixed_forest: 'Mixed forest - {{year}}',
    },

    // table 1.3b
    diameterDistributionAndTotalAreaUnevenAgedStands: {
      diameterDistributionAndTotalAreaUnevenAgedStands:
        'Table 1.3b Diameter distribution and total area (uneven-aged stands)',
      categoryYear: 'Category - Year',
      volumeByDiameterClasses1000mob: 'Volume by diameter classes (1 000 m³ o.b.)',
      area: 'Area (1000 ha)',
      total_volume: 'Total volume (1 000 m³ o.b.)',
      less_or_equal_20_cm: '<20 cm',
      _21_40_cm: '21-40 cm',
      _41_60_cm: '41-60 cm',
      greater_60_cm: '>60 cm',
      unspecified: 'Unspecified',
      forest_uneven_aged_stands: 'Forest uneven-aged stands - {{year}}',
      _of_which_forest_available_for_wood_supply: '... of which: Forest available for wood supply - {{year}}',
    },

    // table 1.4a
    carbonStock: {
      carbonStock: 'Carbon stock',
      categoryYear: 'Category - Year',
      carbonInAboveGroundAndBelowGroundLivingBiomass: 'Carbon in above-ground and below-ground living biomass',
      carbonInDeadwoodAndLitter: 'Carbon in deadwood and litter',
      millionMetricTonnes: 'Million metric tonnes',
      above_ground: 'Above-ground',
      below_ground: 'Below-ground',
      deadwood: 'Deadwood',
      litter: 'Litter',
      soil_carbon: 'Soil carbon',
      forest: 'Forest - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
    },

    // table 1.4b
    carbonStockInHarvestedWoodProductsHWP: {
      carbonStockInHarvestedWoodProductsHWP: 'Carbon Stock In Harvested Wood Products (HWP)',
      categoryYear: 'Category - Year',
      total_carbon_stock_in_hwp: 'Total carbon stock in HWP (million metric tonnes)',
      harvested_wood_products: 'Harvested wood products - {{year}}',
    },

    // table 2.4
    forestAreaWithDamage: {
      forestAreaWithDamage: 'Forest area with damage',
      categoryYear: 'Category - Year',
      areaWithDamageByDifferentAgents: 'Area with damage by different agents',
      primarilyDamagedByBioticAgents: 'Primarily damaged by biotic agents',
      damagePrimarilyHumanInduced: 'Damage primarily human induced',
      primarilyDamagedByFire: 'Primarily damaged by fire',
      thousandHa: '1000 ha',
      total_area_with_damage: 'Total area with damage',
      insects_and_disease: 'Insects and disease',
      wildlife_and_grazing: 'Wildlife and grazing',
      forest_operations: 'Forest operations',
      other: 'Other',
      primarily_damaged_by_abiotic_agents: 'Primarily damaged by abiotic agents (storm, wind, snow, etc.)',
      primarily_damaged_by_fire_total: 'Total',
      of_which_human_induced: 'of which human induced',
      unspecified_mixed_damage: 'Unspecified / Mixed damage',
      forest: 'Forest - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
    },

    // table 2.5
    areaWithForestLandDegradation: {
      areaWithForestLandDegradation: 'Area with forest land degradation',
      categoryYear: 'Category - Year',
      totalAreaOfDegradedLand: 'Total area of degraded land',
      areaPrimarilyDegradedBy: 'Area primarily degraded by',
      formerDegradedLandRestored: 'Former degraded land restored',
      grazing: 'Grazing',
      repeatedFires: 'Repeated fires',
      airPollution: 'Air pollution',
      desertification: 'Desertification',
      other1: 'Other 1',
      other2: 'Other 2',
      other3: 'Other 3',
      unknown: 'Unknown',
      nA: '',
      thousandHa: '1000 ha',
      forest: 'Forest - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
      otherNames: 'The names of the other factors that area is primarily degraded by',
      total_area_of_degraded_land: 'Total area of degraded land',
      repeated_fires: 'Repeated fires',
      air_pollution: 'Air pollution',
      other_1: 'Other 1',
      other_2: 'Other 2',
      other_3: 'Other 3',
      former_degraded_land_restored: 'Former degraded land restored',
    },

    // table 3.1
    incrementAndFellings: {
      incrementAndFellings: 'Increment and fellings',
      categoryYear: 'Category - Year',
      fellings: 'Fellings',
      volume1000mob: 'Volume (1000 m³ o.b.)',
      gross_annual_increment: 'Gross annual increment',
      natural_losses: 'Natural losses',
      net_annual_increment: 'Net annual increment',
      fellings_total: 'Total',
      _of_which_of_natural_losses: '... of which: of natural losses',
      forest: 'Forest - {{year}}',
      _of_which_forest_available_for_wood_supply: '... of which: Forest available for wood supply - {{year}}',
    },

    // table 3.2
    removals: {
      removals: 'Removals',
      categoryYear: 'Category - Year',
      woodRemovals: 'Wood removals',
      total: 'Total',
      industrialRoundwood: 'Industrial roundwood',
      woodfuel: 'Woodfuel',
      volume1000M3UB: 'Volume (1000 m³ u.b.)',
      marketValue1000NationalCurrency: 'Market Value (1000  national currency)',
      roundwood: 'Roundwood - {{year}}',
      total_volume: 'Wood removals - Total - Volume (1000 m³ u.b.)',
      industrial_roundwood_volume: 'Wood removals - Industrial roundwood - Volume (1000 m³ u.b.)',
      industrial_roundwood_market_value: 'Wood removals - Industrial roundwood - Market Value (1000  national currency)',
      woodfuel_volume: 'Wood removals - Woodfuel - Volume (1000 m³ u.b.)',
      woodfuel_market_value: 'Wood removals - Woodfuel - Market Value (1000  national currency)',
    },

    // table 3.3
    nonWoodGoods2015: {
      nonWoodGoods2015: 'Non-wood goods (2015)',
      rankValue: 'Rank (value)',
      nameOfGroupsOfProduct: 'Name of (groups of) product',
      keySpecies: 'Key species',
      totalHarvestedNonWoodGoods: 'Total harvested non-wood goods',
      unit: 'Unit',
      quantity: 'Quantity',
      marketValue1000NationalCurrency: 'Market value (1000 national currency)',
      nwfpCategory: 'NWFP category',
      _01st: '1st',
      _02nd: '2nd',
      _03rd: '3rd',
      _04th: '4th',
      _05th: '5th',
      _06th: '6th',
      _07th: '7th',
      _08th: '8th',
      _09th: '9th',
      _10th: '10th',
      all_other_plant_products: 'All other plant products',
      all_other_animal_products: 'All other animal products',
      total: 'TOTAL',
      name_of_groups_of_product: 'Name of (groups of) product',
      key_species: 'Key species',
      total_harvested_non_wood_goods_unit: 'Total harvested non-wood goods - Unit',
      total_harvested_non_wood_goods_quantity: 'Total harvested non-wood goods - Quantity',
      market_value_1000_national_currency: 'Market value (1000 national currency)',
      nwfp_category: 'NWFP category',
    },

    // table 3.4
    marketedServices2015: {
      marketedServices2015: 'Marketed Services (2015)',
      rankValue: 'Rank (value)',
      nameOfServiceProduct: 'Name of service/product',
      unit: 'Unit',
      serviceProvision: 'Service provision',
      forestServiceCategory: 'Forest service category',
      amountOfServiceProduct: 'Amount of service/product',
      value1000NationalCurrency: 'Value (1000 national currency)',
      _01st: '1st',
      _02nd: '2nd',
      _03rd: '3rd',
      _04th: '4th',
      _05th: '5th',
      _06th: '6th',
      _07th: '7th',
      _08th: '8th',
      _09th: '9th',
      _10th: '10th',
      remaining_total: 'Remaining total',
      total: 'Total',
      name_of_service_product: 'Name of service/product',
      service_provision_amount_of_service_product: 'Service provision - Amount of service/product',
      service_provision_value_1000_national_currency: 'Service provision - Value (1000 national currency)',
      forest_service_category: 'Forest service category',
    },

    // table 4.1
    treeSpeciesComposition: {
      treeSpeciesComposition: 'Tree species composition',
      categoryYear: 'Category - Year',
      areaWithNumberOfTreeSpeciesOccurring1000ha: 'Area with number of tree species occurring (1000 ha)',
      area_with_number_of_tree_species_occurring_1: '1',
      area_with_number_of_tree_species_occurring_2_3: '2-3',
      area_with_number_of_tree_species_occurring_4_5: '4-5',
      area_with_number_of_tree_species_occurring_6_pl: '6+',
      forest: 'Forest - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
    },

    // table 4.2a
    totalForestAreaByExpansionAndRegenerationType: {
      totalForestAreaByExpansionAndRegenerationType: 'Total forest area by expansion and regeneration type',
      categoryYear: 'Category - Year',
      totalAreaOfForestByExpansionRegenerationType1000ha:
        'Total area of forest by expansion/regeneration type (1000 ha)',
      natural_expansion_and_natural_regeneration: 'Natural expansion and natural regeneration',
      afforestation_and_regeneration_by_planting_and_or_seeding:
        'Afforestation and regeneration by planting and/or seeding',
      coppice: 'Coppice',
      forest: 'Forest - {{year}}',
    },

    // table 4.2b
    annualForestExpansionAndRegeneration: {
      annualForestExpansionAndRegeneration: 'Annual forest expansion and regeneration',
      categoryYear: 'Category - Year',
      annualForestExpansionAndRegeneration1000ha: 'Annual forest expansion and regeneration (1000 ha)',
      expansionOfForestArea: 'Expansion of forest area',
      regenerationOfForestArea: 'Regeneration of forest area',
      afforestation: 'Afforestation',
      natural_expansion: 'Natural expansion',
      natural_regeneration: 'Natural regeneration',
      planting_and_seeding: 'Planting and seeding',
      coppice: 'Coppice',
      forest: 'Forest - {{year}}',
    },

    // table 4.3a
    naturalness: {
      naturalness: 'Naturalness',
      categoryYear: 'Category - Year',
      area1000ha: 'Area (1000 ha)',
      undisturbed_by_man: 'Undisturbed by man',
      semi_natural: 'Semi-natural',
      plantations: 'Plantations',
      forest: 'Forest - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
    },

    // table 4.3b
    naturalnessBySubclasses: {
      naturalnessBySubclasses: 'Naturalness by subclasses',
      categoryYear: 'Category - Year',
      area1000ha: 'Area (1000 ha)',
      semiNatural: 'Semi-natural',
      plantations: 'Plantations',
      naturally_established: 'Naturally established',
      naturalised_introduced_species: 'Naturalised introduced species',
      established_by_planting_and_or_seeding: 'Established by planting and/or seeding',
      coppice: 'Coppice',
      unknown_origin: 'Unknown origin',
      native_species: 'Native species',
      introduced_species: 'Introduced species',
      forest: 'Forest - {{year}}',
    },

    // table4.4a
    introducedTreeSpecies: {
      introducedTreeSpecies: 'Introduced tree species',
      categoryYear: 'Category - Year',
      areaOfStandsDominatedByIntroducedTreeSpecies1000ha:
        'Area of stands dominated by introduced tree species (1000 ha)',
      total: 'Total',
      _of_which_invasive: '… of which: invasive',
      forest: 'Forest - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
    },

    // table 4.4b
    introducedTreeSpecies4_4b: {
      introducedTreeSpecies4_4b: 'Introduced tree species',
      no: '#',
      scientificNameOfIntroducedTreeSpecies: 'Scientific name of introduced tree species',
      forestAreaOccupied1000Ha: 'Forest area occupied (1000 ha)',
      _01: 1,
      _02: 2,
      _03: 3,
      _04: 4,
      _05: 5,
      _06: 6,
      _07: 7,
      _08: 8,
      _09: 9,
      _10: 10,
      _11: 11,
      _12: 12,
      _13: 13,
      _14: 14,
      _15: 15,
      _16: 16,
      _17: 17,
      _18: 18,
      _19: 19,
      _20: 20,
      scientific_name_of_introduced_tree_species: 'Scientific name of introduced tree species',
      forest_area_occupied_2005: 'Forest area occupied (1000 ha) - 2005',
      forest_area_occupied_2010: 'Forest area occupied (1000 ha) - 2010',
      forest_area_occupied_2015: 'Forest area occupied (1000 ha) - 2015',
    },

    // table 4.4c
    invasiveTreeSpecies: {
      invasiveTreeSpecies: 'Invasive tree species',
      no: '#',
      scientificNameOfInvasiveTreeSpecies: 'Scientific name of invasive tree species',
      forestAreaAffected1000Ha: 'Forest area affected (1000 ha)',
      _01: 1,
      _02: 2,
      _03: 3,
      _04: 4,
      _05: 5,
      _06: 6,
      _07: 7,
      _08: 8,
      _09: 9,
      _10: 10,
      _11: 11,
      _12: 12,
      _13: 13,
      _14: 14,
      _15: 15,
      _16: 16,
      _17: 17,
      _18: 18,
      _19: 19,
      _20: 20,
      scientific_name_of_invasive_tree_species: 'Scientific name of invasive tree species',
      forest_area_affected_2005: 'Forest area affected (1000 ha) - 2005',
      forest_area_affected_2010: 'Forest area affected (1000 ha) - 2010',
      forest_area_affected_2015: 'Forest area affected (1000 ha) - 2015',
    },

    // table4.5
    deadwood: {
      deadwood: 'Deadwood',
      categoryYear: 'Category - Year',
      volumeOfDeadwoodM3Ha: 'Volume of deadwood (m³/ha)',
      total: 'Total',
      standing: 'Standing',
      lying: 'Lying',
      forest: 'Forest - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
      volumeOfDeadwoodInFOWLBySpeciesGroups: 'Volume of deadwood in FOWL by species groups',
      coniferous: 'Coniferous - {{year}}',
      broadleaved: 'Broadleaved - {{year}}',
    },

    // table 4.8
    threatenedForestSpecies: {
      threatenedForestSpecies: 'Threatened forest species',
      categoryYear: 'Category - Year',
      threatenedForestSpeciesCol: 'Threatened forest species',
      absoluteNumber: 'Absolute number',
      total_of_taxa: 'Total of taxa',
      vulnerable: 'Vulnerable',
      endangered: 'Endangered',
      critically_endangered: 'Critically endangered',
      extinct_in_the_wild: 'Extinct in the wild',
      trees: 'Trees - {{year}}',
      birds: 'Birds - {{year}}',
      mammals: 'Mammals - {{year}}',
      other_vertebrates: 'Other vertebrates - {{year}}',
      invertebrates: 'Invertebrates - {{year}}',
      vascular_plants: 'Vascular plants - {{year}}',
      cryptogams_and_fungi: 'Cryptogams and fungi - {{year}}',
    },

    // table 4.9
    protectedForests: {
      protectedForests: 'Protected forests',
      categoryYear: 'Category - Year',
      ha1000: '1000 ha',
      mcpfe_class_1_1: 'MCPFE Class 1.1',
      mcpfe_class_1_2: 'MCPFE Class 1.2',
      mcpfe_class_1_3: 'MCPFE Class 1.3',
      mcpfe_class_2: 'MCPFE Class 2',
      forest: 'Forest - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
    },

    // table 5.1
    protectiveForestsSoilWaterAndOtherEcosystemFunctions: {
      protectiveForestsSoilWaterAndOtherEcosystemFunctions:
        'Protective forests – soil, water and other ecosystem functions; infrastructure and managed natural resources',
      categoryYear: 'Category - Year',
      protectiveForestsMCPFEClass31000ha: 'Protective forests - MCPFE Class 3 (1000 ha)',
      soil_water_and_other_forest_ecosystem_functions: 'Soil, water and other forest ecosystem functions',
      infrastructure_and_managed_natural_resources: 'Infrastructure and managed natural resources',
      total: 'Total',
      forest: 'Forest - {{year}}',
      other_wooded_land: 'Other wooded land - {{year}}',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
    },

    // table 6.1
    forestHoldings: {
      forestHoldings: 'Forest holdings',
      categoryYear: 'Category - Year',
      areaAndNumberOfForestHoldingsInSizeClasses: 'Area and number of forest holdings in size classes',
      less10ha: '≤ 10 ha',
      _11_500ha: '11 - 500 ha',
      more500ha: '≥ 500 ha',
      total_forest_area: 'Total forest area (1000 ha)',
      total_number_of_holdings: 'Total number of holdings',
      less_10_ha_area: 'Area (1000 ha)',
      less_10_ha_number: 'Number of holdings',
      _11_500_ha_area: 'Area (1000 ha)',
      _11_500_ha_number: 'Number of holdings',
      more_500_ha_area: 'Area (1000 ha)',
      more_500_ha_number: 'Number of holdings',
      in_public_ownership: 'In public ownership - {{year}}',
      in_private_ownership: 'In private ownership - {{year}}',
      other_types_of_ownership_unknown: 'Other types of ownership/unknown - {{year}}',
    },

    // table 6.2
    grossValueAdded: {
      grossValueAdded: 'Gross Value Added',
      categoryYear: 'Category - Year',
      grossValueAddedCol: 'Gross Value Added',
      million_national_currency: 'Million national currency',
      percent_of_total_gva: '% of total GVA',
      forestry: 'Forestry (ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood: 'Manufacture of wood and articles in wood (ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: 'Manufacture of paper and paper products (ISIC/NACE 17) - {{year}}',
    },

    // table 6.3
    factorIncomeAndEntrepreneurialIncome: {
      factorIncomeAndEntrepreneurialIncome: 'Factor income and entrepreneurial income',
      categoryYear: 'Category - Year',
      millionNationalCurrency: 'Million national currency',
      factor_income: 'Factor income',
      net_operating_surplus: 'Net operating surplus',
      forestry: 'Forestry (ISIC/NACE 02) - {{year}}',
    },

    // table 6.4a
    totalGrossFixedCapitalFormationInForestsAndForestry: {
      totalGrossFixedCapitalFormationInForestsAndForestry:
        'Total gross fixed capital formation in forests and forestry',
      categoryYear: 'Category - Year',
      grossFixedCapitalFormationMillionNationalCurrency: 'Gross fixed capital formation (million national currency)',
      plantingOfTreesToProvideRegularIncome: 'Planting of trees to provide regular income',
      equipmentAndBuildings: 'Equipment and buildings',
      otherGrossFixedCapitalFormation: 'Other Gross fixed capital formation',
      total: 'Total',
      forestry_isic_nace_02: 'Forestry (ISIC/NACE 02) - {{year}}',
      planting_of_trees_to_provide_regular_income: 'Planting of trees to provide regular income',
      equipment_and_buildings: 'Equipment and buildings',
      other_gross_fixed_capital_formation: 'Other Gross fixed capital formation',
    },

    // table 6.4b
    totalFixedCapitalConsumptionInForestsAndForestry: {
      totalFixedCapitalConsumptionInForestsAndForestry: 'Total Fixed Capital Consumption In Forests And Forestry',
      categoryYear: 'Category - Year',
      fixed_capital_consumption: 'Fixed capital consumption (million national currency)',
      forestry_isic_nace_02: 'Forestry (ISIC/NACE 02) - {{year}}',
    },

    // table 6.4c
    totalCapitalTransfersInForestsAndForestry: {
      totalCapitalTransfersInForestsAndForestry: 'Total Capital Transfers In Forests And Forestry',
      categoryYear: 'Category - Year',
      capital_transfers: 'Capital transfers (million national currency)',
      forestry_isic_nace_02: 'Forestry (ISIC/NACE 02) - {{year}}',
    },

    // table 6.5a
    employmentByGenderAndAge: {
      employmentByGenderAndAge: 'Employment by gender and age',
      categoryYear: 'Category - Year',
      total: 'Total',
      gender: 'Gender',
      ageGroup: 'Age group',
      male: 'Male',
      female: 'Female',
      _15_49: '15-49',
      _50_: '50+',
      _1000Persons: '1000 persons',
      forestry: 'Forestry (ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood: 'Manufacture of wood and articles in wood (ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: 'Manufacture of paper and paper products (ISIC/NACE 17) - {{year}}',
      gender_male: 'Gender - Male',
      gender_female: 'Gender - Female',
      age_group_15_49: 'Age group - 15-49',
      age_group_50_plus: 'Age group - 50+',
    },

    // table 6.5b
    employmentByEducationAndJobCharacteristics: {
      employmentByEducationAndJobCharacteristics: 'Employment by education and job characteristics',
      categoryYear: 'Category - Year',
      education: 'Education (Categories ISCED 1997)',
      jobCharacteristics: 'Job characteristics',
      _0_2: '0-2',
      _3_4: '3-4',
      _5_6: '5-6',
      employees: 'Employees',
      selfEmployed: 'Self-employed',
      _1000Persons: '1000 persons',
      forestry: 'Forestry (ISIC/NACE 02) - {{year}}',
      manufacture_of_wood_and_articles_in_wood: 'Manufacture of wood and articles in wood (ISIC/NACE 16) - {{year}}',
      manufacture_of_paper_and_paper_products: 'Manufacture of paper and paper products (ISIC/NACE 17) - {{year}}',
      education_0_2: 'Education (Categories ISCED 1997) - 0-2',
      education_3_4: 'Education (Categories ISCED 1997) - 3-4',
      education_5_6: 'Education (Categories ISCED 1997) - 5-6',
      self_employed: 'Self-employed',
    },

    // table 6.6
    occupationalAccidents: {
      occupationalAccidents: 'Occupational Accidents',
      categoryYear: 'Category - Year',
      fatalOccupationalAccidents: 'Fatal occupational accidents',
      nonFatalOccupationalAccidents: 'Non-fatal occupational accidents',
      number: 'Number',
      annualRatePer1000Workers: 'Annual rate per 1000 workers',
      forestry_isic_nace_02: 'Forestry (ISIC/NACE 02) - {{year}}',
      fatal_occupational_accidents_number: 'Fatal occupational accidents - Number',
      fatal_occupational_accidents_per_1000_workers: 'Fatal occupational accidents - Annual rate per 1000 workers',
      non_fatal_occupational_accidents_number: 'Non-fatal occupational accidents - Number',
      non_fatal_occupational_accidents_per_1000_workers: 'Non-fatal occupational accidents - Annual rate per 1000 workers',
    },

    // table 6.7
    woodConsumption: {
      woodConsumption: 'Wood consumption',
      category: 'Category',
      _1992: '1992',
      _1993: '1993',
      _1994: '1994',
      _1995: '1995',
      _1996: '1996',
      _1997: '1997',
      _1998: '1998',
      _1999: '1999',
      _2000: '2000',
      _2001: '2001',
      _2002: '2002',
      _2003: '2003',
      _2004: '2004',
      _2005: '2005',
      _2006: '2006',
      _2007: '2007',
      _2008: '2008',
      _2009: '2009',
      _2010: '2010',
      _2011: '2011',
      _2012: '2012',
      _2013: '2013',
      _2014: '2014',
      _2015: '2015',
      _2016: '2016',
      _2017: '2017',
      wood_consumption: 'Consumption of forest products (1000 m³ RWE)',
    },

    // table 6.8
    tradeInWood: {
      tradeInWood: 'Trade in wood',
      category: 'Category',
      _1992: '1992',
      _1993: '1993',
      _1994: '1994',
      _1995: '1995',
      _1996: '1996',
      _1997: '1997',
      _1998: '1998',
      _1999: '1999',
      _2000: '2000',
      _2001: '2001',
      _2002: '2002',
      _2003: '2003',
      _2004: '2004',
      _2005: '2005',
      _2006: '2006',
      _2007: '2007',
      _2008: '2008',
      _2009: '2009',
      _2010: '2010',
      _2011: '2011',
      _2012: '2012',
      _2013: '2013',
      _2014: '2014',
      _2015: '2015',
      _2016: '2016',
      _2017: '2017',
      exports_of_forest_products_quantity: 'Exports of forest products (million m³ RWE)',
      exports_of_forest_products_value: 'Exports of forest products (million Euro/ECU)',
      imports_of_forest_products_quantity: 'Imports of forest products (million m³ RWE)',
      imports_of_forest_products_value: 'Imports of forest products (million Euro/ECU)',
    },

    // table 6.9
    totalEnergySupplyFromWood: {
      totalEnergySupplyFromWood: 'Total energy supply from wood',
      category: 'Category',
      tj: 'TJ',
      _1000MetricTonnesDryMatter: '1000 metric tonnes dry matter',
      total_primary_energy_supply: 'Total primary energy supply',
      total_renewable_energy_supply: 'Total renewable energy supply',
      total_energy_supply_from_wood: 'Total energy supply from wood:',
      energy_from_direct_wood_fibre_sources: '- Energy from direct wood fibre sources:',
      of_which_from_forests: 'of which from forests',
      of_which_from_other_wooded_land: 'of which from other wooded land and other land (trees outside forests)',
      energy_from_co_products: '- Energy from co-products and residues of the wood processing industries:',
      of_which_solid_residues:
        'of which solid residues (chips, particles, wood residues, bark, excluding processed wood-based fuels)',
      energy_from_processed_wood_based_fuels:
        '- Energy from processed wood-based fuels (pellets, briquettes, charcoal):',
      of_which_imported: 'of which imported',
      energy_from_post_consumer_recovered_wood: '- Energy from post-consumer recovered wood',
      energy_from_unknown_unspecified_sources: '- Energy from unknown/unspecified sources',
      _2007_tj: '2007 - TJ',
      _2009_tj: '2009 - TJ',
      _2011_tj: '2011 - TJ',
      _2013_tj: '2013 - TJ',
      _2015_tj: '2015 - TJ',
      _2007__1000MetricTonnesDryMatter: '2007 - 1000 metric tonnes dry matter',
      _2009__1000MetricTonnesDryMatter: '2009 - 1000 metric tonnes dry matter',
      _2011__1000MetricTonnesDryMatter: '2011 - 1000 metric tonnes dry matter',
      _2013__1000MetricTonnesDryMatter: '2013 - 1000 metric tonnes dry matter',
      _2015__1000MetricTonnesDryMatter: '2015 - 1000 metric tonnes dry matter',
    },

    // table 6.10a
    accessibilityForRecreation: {
      accessibilityForRecreation: 'Accessibility for recreation',
      categoryYear: 'Category - Year',
      areaAvailableForPublicRecreation: 'Area available for public recreation',
      total1000Ha: 'Total (1000 ha)',
      _oftotal: '% of total',
      areaPrimarilyDesignatedOrManagedForPublicRecreation: 'Area primarily designated or managed for public recreation',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
      area_available_for_public_recreation_total: 'Area available for public recreation - Total (1000 ha)',
      area_available_for_public_recreation_percent: 'Area available for public recreation - % of total',
      area_designated_or_managed_for_public_recreation_total: 'Area primarily designated or managed for public recreation - Total (1000 ha)',
      area_designated_or_managed_for_public_recreation_percent: 'Area primarily designated or managed for public recreation - % of total',
    },

    // table 6.10b
    intensityOfUse: {
      intensityOfUse: 'Intensity of use',
      categoryYear: 'Category - Year',
      annualNumberOfVisitsMillion: 'Annual number of visits (million)',
      areaAvailableForPublicRecreation: 'Area available for public recreation',
      areaPrimarilyDesignatedAndOrManagedForPublicRecreation:
        'Area primarily designated and/or managed for public recreation',
      total_forest_and_other_wooded_land: 'Total forest and other wooded land - {{year}}',
      area_available_for_public_recreation: 'Area available for public recreation - Annual number of visits (million)',
      area_designated_and_or_managed_for_public_recreation: 
        'Area primarily designated and/or managed for public recreation - Annual number of visits (million)',
    },

    // table 6.10c
    recreationFacilities: {
      recreationFacilities: 'Recreation facilities',
      categoryYear: 'Category - Year',
      forestRoadsAndPathsAvailableForPublicRecreation: 'Forest roads and paths available for public recreation',
      _ofWhichDesignatedForHikingBikingCrossCountrySkiingEtc:
        '... of which designated for hiking, biking, cross country skiing, etc.',
      facilityLengthIn1000Km: 'Facility (length in 1000 km)',
      area_available_for_public_recreation: 'Area available for public recreation - {{year}}',
      forest_roads_and_paths_available_for_public_recreation: 'Forest roads and paths available for public recreation - Facility (length in 1000 km)',
      _of_which_designated_for_hiking_biking_cross_country_skiing_etc:
        '... of which designated for hiking, biking, cross country skiing, etc. - Facility (length in 1000 km)',
    },

    // table 6.10d
    otherRecreationFacilitiesPilotReporting2015: {
      otherRecreationFacilitiesPilotReporting2015: 'Other recreation facilities - pilot reporting (2015)',
      category: 'Category',
      facility: 'Facility',      
      measurement_unit: 'Measurement unit',
      extent_multiplicity: 'Extent / Multiplicity',
      facility_category: 'Facility category',
      no1_area_available_for_public_recreation: 'Area available for public recreation 1',
      no2_area_available_for_public_recreation: 'Area available for public recreation 2',
      no3_area_available_for_public_recreation: 'Area available for public recreation 3',
      no4_area_available_for_public_recreation: 'Area available for public recreation 4',
      no5_area_available_for_public_recreation: 'Area available for public recreation 5',
      no6_area_available_for_public_recreation: 'Area available for public recreation 6',
      no7_area_available_for_public_recreation: 'Area available for public recreation 7',
      no8_area_available_for_public_recreation: 'Area available for public recreation 8',
      no9_area_available_for_public_recreation: 'Area available for public recreation 9',
      no10_area_available_for_public_recreation: 'Area available for public recreation 10',
      no11_area_available_for_public_recreation: 'Area available for public recreation 11',
      no12_area_available_for_public_recreation: 'Area available for public recreation 12',
      no13_area_available_for_public_recreation: 'Area available for public recreation 13',
      no14_area_available_for_public_recreation: 'Area available for public recreation 14',
      no15_area_available_for_public_recreation: 'Area available for public recreation 15',
      no16_area_available_for_public_recreation: 'Area available for public recreation 16',
      no17_area_available_for_public_recreation: 'Area available for public recreation 17',
      no18_area_available_for_public_recreation: 'Area available for public recreation 18',
      no19_area_available_for_public_recreation: 'Area available for public recreation 19',
      no20_area_available_for_public_recreation: 'Area available for public recreation 20',
    },    
  },
}
