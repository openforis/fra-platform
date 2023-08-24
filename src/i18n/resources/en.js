const area = require('./en/area')
const assessmentSection = require('./en/assessmentSection')
const common = require('./en/common')
const contentCheck = require('./en/contentCheck')
const dataDownload = require('./en/dataDownload')
const dataSource = require('./en/dataSource')
const fra = require('./en/fra')
const panEuropean = require('./en/panEuropean/panEuropean')
const statisticalFactsheets = require('./en/statisticalFactsheets')
const login = require('./en/login')
const uc = require('./en/uc')
const print = require('./en/print')

module.exports.translation = {
  area,
  common,
  contentCheck,
  dataDownload,
  dataSource,
  fra,
  login,
  panEuropean,
  print,
  statisticalFactsheets,
  uc,

  page: {
    assessmentSection,
  },

  language: {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    ru: 'Русский',
    ar: 'العربية',
    zh: '中文',
  },

  disclaimer: {
    statisticalFactsheets: 'Disclaimer: may contain FAO estimates, may contain missing values',
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
    termsOfUse: 'Statistical Database Terms of Use',
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
    tutorials: 'Tutorials',
    sendFeedback: 'Send feedback',
    licenses: 'Licenses',
    platformVersion: 'Platform version',
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
    cubicMeterPerHa: 'm³/ha',
    millionTonnes: 'million metric tonnes',
    millionsCubicMeterOverBark: 'million m³ over bark',
    thousandCubicMeterOverBark: '1000 m³ over bark',
    billionCubicMeter: 'billion m³',
    thousandCubicMeter: '1000 m³',
    thousandCubicMeterRWE: '1000 m³ round-wood equivalent',
    thousandPersons: '1000 persons',
    gt: 'Gt',
    fte1000: '1000 FTE',
    numberOfStudents: '$t(graduationOfStudents.numberOfStudents)',
    absoluteNumber: 'absolute number',
    annualNumberOfVisitsMillion: 'annual number of visits (million)',
    millionNationalCurrency: 'million national currency',
    facilityLengthIn1000Km: 'facility (length in 1000 km)',
    growingStockPercent: '% of total growing stock in forest',
  },

  countrySelection: {
    selectCountry: 'Select country',
  },

  definition: {
    definitionLabel: 'See definitions',
    faqLabel: 'FAQ',
    seeReportingNotes: 'See Reporting Notes',
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
      REVIEWER: 'Reviewer',
      NATIONAL_CORRESPONDENT: 'National correspondent',
      ALTERNATE_NATIONAL_CORRESPONDENT: 'Alternate national correspondent',
      COLLABORATOR: 'Collaborator',
      ADMINISTRATOR: 'Administrator',
      VIEWER: 'Viewer',
      noRole: '',
      // unused?
      reviewer_plural: 'Reviewers',
      nationalCorrespondent_plural: 'National correspondents',
      alternateNationalCorrespondent_plural: 'Alternate national correspondents',
      collaborator_plural: 'Collaborators',
      // deprecated
      // reviewer: 'Reviewer',
      // nationalCorrespondent: 'National correspondent',
      // alternateNationalCorrespondent: 'Alternate national correspondent',
      // collaborator: 'Collaborator',
      // administrator: 'Administrator',
    },

    resetPasswordEmail: {
      subject: 'FRA platform - Reset password',
      textMessage: `Dear {{user}}

We have received a request to reset your password for your FRA account. 
If you didn't make this request, you can safely ignore this email.

Click the following link to reset your password
{{- link}}


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
    ofWhichPrimaryForest: '$t(fra.forestCharacteristics.primaryForest)',
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
      fileUploaded: 'File successfully uploaded',
      confirmDelete: 'Delete {{file}}? This cannot be undone.',
      fileDeleted: 'File successfully deleted',
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
  messageBoard: {
    messageBoard: '$t(landing.sections.messageBoard)',
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
    loading: 'Loading',
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
    reclassification: 'Reclassification into FRA {{cycleName}} categories',
  },

  nationalDataPoint: {
    clickOnNDP: 'Click on the year to access original data',
    nationalDataPoint: 'National data point',
    addNationalDataPoint: 'Add national data point',
    noNationalDataAdded: 'No national data added',
    nationalData: 'National data',
    reclassificationLabel: 'Original data and reclassification',
    forestCategoriesLabel: 'Forest, other wooded land and other land',
    forestCategoriesLabel2025: 'Forest, other wooded land and remaining land',
    referenceYearData: 'Reference year for the data',
    referenceYear: 'Reference year',
    references: 'References',
    prefill: 'Prefill',
    prefillWith: 'Prefill with',
    selectYear: 'Select year',
    methods: 'Methods',
    methodsUsed: 'Methods used',
    dataSource: 'Data source',
    dataSources: 'Data sources',
    dataSource2025ExplanatoryText:
      'The data sources listed were reported in FRA 2020. Please copy and paste relevant data sources in table above.',
    additionalComments: 'Additional comments',
    edit: 'Edit',
    confirmCopyPreviousValues: 'Do you want to override previous values? This operation cannot be undone.',
    copyPreviousValues: 'Copy previous references',
    nationalClassifications: 'National classifications',
    nationalClass: 'National class',
    nationalClasses: 'Classifications and definitions',
    definition: 'Definition',
    categories: 'Categories',
    class: 'Class',
    fraClasses: 'FRA classes',
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
      other: '$t(common.otherSpecifyInComments)',
    },
    appliesToVariablesOptions: {
      forest: 'Forest',
      otherWoodedLand: 'Other wooded land',
      otherLand: 'Other land',
    },
  },

  userManagement: {
    addUser: 'Add collaborator',
    allUsers: 'All collaborators',
    confirmDelete: 'Remove {{user}}?',
    done: 'Done',
    edit: 'Edit',
    editPermissions: 'Edit permissions',
    formErrors: 'There are errors in the form. Please, fix them and submit it again.',
    info: 'Info',
    insufficientPrivileges: 'Insufficient privileges',
    invitationDeleted: 'The invitation has been deleted',
    invitationEmailSent: 'An invitation email has been sent',
    invitationLinkCopied: 'The invitation link has been copied',
    invitationLink: 'Invitation link',
    loginEmail: 'Login',
    manageCollaborators: 'Manage collaborators',
    noUsers: 'No collaborators added',
    permissions: 'Permissions',
    personalInfoRequired: 'Please complete your personal information before continuing',
    placeholder: 'Choose…',
    remove: 'Remove',
    sendInvitation: 'Send invitation email',
    userAdded: '{{email}} has been added',
    userModified: '{{user}} has been modified',
    view: 'View',
    invitationEmail: {
      subject: 'FRA platform invitation',
      textMessage: `Dear {{invitedUser}},

You have been invited to access {{assessmentName}} {{cycleName}} as {{role}} for {{country}}.

Accept this invitation and access the platform at the following URL:
{{- link}}

Please access the platform within two weeks after receiving the invitation after that the invitation is invalid. Should you need a new invitation then please contact fra@fao.org.

Happy reporting!

The FRA team fra@fao.org
{{- url}}
    `,
      htmlMessage: `Dear {{invitedUser}},
<br/><br/>
You have been invited to access {{assessmentName}} {{cycleName}} as {{role}} for {{country}}.
<br/><br/>
<b><a href="{{- link}}">Accept this invitation and access the platform</a></b>
<br/><br/>
<b>Please access the platform within two weeks after receiving the invitation after that the invitation is invalid. Should you need a new invitation then please contact <a href="mailto:fra@fao.org">fra@fao.org</a>.</b>
<br /><br />
Happy reporting!
<br/><br/>
The FRA team fra@fao.org
<br/>
{{- url}}
    `,
    },
    permissionNames: {
      tableData: 'Table Data',
      descriptions: 'Descriptions',
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
    forestAreaDoesNotMatchPreviouslyReported: 'Forest area doesn’t match FRA {{year}} area: {{previous}}',
    forestAreaNetChangeDoesNotMatch:
      'Forest area net change is different from what was reported in table 1a, provide a comment to explain why',
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
    generatingFraValues: 'Generating...',
    linearExtrapolation: 'Linear',
    repeatLastExtrapolation: 'Repeat last',
    annualChangeExtrapolation: 'Annual change',
    placeholderFuture: 'Future',
    placeholderPast: 'Past',
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
    forestAreaNetChangeFrom1a: 'Forest area net change from table 1a',
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
    other: '$t(common.otherSpecifyInComments)',
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
    growingStockPercent: '$t(fra.growingStockComposition.growingStockPercent)',
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
    other: '$t(common.otherSpecifyInComments)',
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
    other: '$t(common.otherSpecifyInComments)',
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
    fra: 'FRA',
    panEuropean: 'pan-European',
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
      notStarted: {
        label: 'Not started',
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
    forestAreaExceedsExtentOfForest: 'Exceeds Forest area (1a) ({{value}})',
    otherLandExceedsExtentOfForest: 'Exceeds Other land area (1a)',
    remainingLandExceedsExtentOfForest: 'Exceeds Remaining land area (1a)',
    valueMustBePositive: 'Value should be greater than zero',
    valueMustBeYear: 'Value should be a valid year',
    emptyField: 'This field is empty',
    mustBeEqualToTotalGrowingStock: 'The summed value should be equal to the Total Forest',
    countryReportYearGreaterThanCurrentYear: 'Value should be greater or equal than {{minValue}}',
    valueNotGreaterThan: 'Value should be not greater than {{maxValue}}',
    sumNotGreaterThan: 'Sum should not exceed {{maxValue}}',
    sumEqualTo: 'The sum of {{categoryLabels}} ({{categoriesSum}}) must be equal to {{maxValue}}',
    notEmpty: 'Value cannot be empty',
    valuesAreInconsistentWithNetChange: 'Values are inconsistent with Forest area net change',
    valuesAreInconsistent1aOr1b: 'Values are inconsistent with Areas reported in tables 1a or 1b',
    mustBeEqualToPrivateOwnership: 'Subcategories sum should be equal to Private Ownership',
    mustBeEqualToForestExpansion: 'Subcategories sum should be equal to Forest Expansion',
    mustBeEqualToPlantedForest: 'Subcategories sum should be equal to Planted Forest',
    mustBeEqualToPrimaryForest: 'Subcategories sum should be equal to Primary Forest',
    mustBeEqualToForestArea: 'Sum of Naturally regenerating forest and Planted forest not equal to the total forest',
    mustBeLessThanPrivateOwnership: 'Subcategories sum should be less than Private Ownership',
    columnEmpty: "Column '$t({{columName}})' must have a value",
    forestSumAreaExceedsExtentOfForest:
      'The sum of the reported FRA categories exceeds the forest area reported in table 1a',
    valueEqualToSum: 'Total value should be equal to sum of subcategories',
    valueEqualToSumParent:
      'The sum of subcategories {{subcategories}} is not equal to {{parentVariable}} {{parentCol}} {{parentTable}} <{{valueRounded}}>',
    landAreaExceedsTotalLandArea: 'Land area exceeds total land area (1a) ({{value}})',
    classValueNotGreaterThan: '{{name}} should be not greater than {{value}}',
    classValuesMustBeEqualTo: '{{name}} sum must be equal to {{value}}',
    valueCannotExceedMaximumValueReportedForForestArea:
      'Value cannot exceed the maximum value ({{maxForestArea}}) reported for forest area (1a)',
    valueCannotExceedMaximumValueReportedForForestAreaYear:
      'The sum of year {{year}} cannot exceed the maximum value ({{maxForestArea}}) reported for forest area (1a)',
    valueCannotExceedMaximumValueReportedForLandArea:
      'Value cannot exceed the maximum value ({{maxLandArea}}) reported for land area (1a)',
    shouldContainAtLeastOneCharacter: 'Value should contain at least one character',
    forestAreaReportedIsDifferentFromPreviousCycle:
      'Reported area ({{forestArea2025}}) differs from previously reported ({{forestArea2020}}). Please provide a comment explaining why it is different.',
    sumSubCategoriesExceedParent:
      'The sum of {{categoryLabels}} ({{categoriesSum}}) exceed {{parentLabel}} ({{parentValue}})',
    sumSubCategoriesNotEqualToParent:
      'The sum of {{categoryLabels}} ({{categoriesSum}}) is not equal to {{parentLabel}} ({{parentValue}})',
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
    title: 'Appellation',
    name: 'Name',
    surname: 'Surname(s)',
    professionalTitle: 'Professional title',
    organizationalUnit: 'Organizational unit',
    organization: 'Organization',
    street: 'Street address',
    zipCode: 'Zip code',
    poBox: 'P.O. Box',
    city: 'City',
    countryIso: 'Country',
    primaryEmail: 'Primary email address',
    secondaryEmail: 'Secondary email address',
    primaryPhoneNumber: 'Primary telephone number',
    secondaryPhoneNumber: 'Secondary telephone number',
    skype: 'Skypename',
    contactPreference: 'Preferred way of contacting',
    contactPreferenceMethod: 'Contacting method',
    platformChat: 'PlatformChat',
    signal: 'Signal',
    whatsapp: 'Whatsapp',
    role: 'Role',
    email: 'Email',
    loginEmail: 'Login',
    institution: 'Institution',
    position: 'Position',
    done: 'Save',
    deactivate: 'Deactivate',
    activate: 'Activate',
    picture1MbMax: 'Profile picture cannot exceed 1MB',
    activated: 'Activated',
    status: 'Status',
    demoteToUser: 'Are you sure you want to remove Admin privileges?',
    promoteToAdmin: 'Are you sure you want to grant Admin privileges?',
    mandatoryFields: '* are mandatory fields',
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
    country: 'Country',
    invitationPending: 'Invitation pending',
  },

  countryMessageBoard: {
    messageBoard: 'Message Board',
    messageBoardDesc: 'Messages posted here are visible to all country members',
    oneToOneMessages: 'One To One Messages',
  },

  tutorial: {
    watch: 'Watch',
    passwordLogin: 'The FRA platform user tutorial - How to log in with a self-defined password',
    googleLogin: 'The FRA platform user tutorial - How to log in using Google authentication',
    collaboratorAdd: 'The FRA platform user tutorial - How to add a collaborator',
    platformNavigation: 'The FRA platform user tutorial – Platform navigation',
    documentUpload: 'The FRA platform user tutorial - How to upload a document',
    ndpAdd: 'The FRA platform user tutorial - How to add a national data point',
    passwordLoginShort: 'How to log in with a self-defined password',
    googleLoginShort: 'How to log in using Google authentication',
  },
}
