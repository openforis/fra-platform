const joinPaths = (...parts: Array<string>): string => `/${parts.join('/')}`
const apiPath = (...parts: Array<string>): string => joinPaths('api', ...parts)

export const ApiEndPoint = {
  Assessment: {
    createEmail: (countryIso = ':countryIso') => apiPath('assessment', countryIso),
    export: () => apiPath('assessment', 'admin', 'export'),
  },

  Audit: {
    getFeed: (countryIso = ':countryIso') => apiPath('audit', 'getAuditFeed', countryIso),
    getLatestLogTimestamp: (countryIso = ':countryIso') => apiPath('audit', 'getLatestAuditLogTimestamp', countryIso),
  },

  Auth: {
    loggedInUser: () => apiPath('loggedInUser'),
    changePassword: () => '/auth/local/changePassword',
    getInvitation: (uuid = ':uuid') => `/auth/invitation/${uuid}`,
    Login: {
      local: () => '/auth/local/login',
      google: () => '/auth/google',
      googleCallback: () => '/auth/google/callback',
    },
    logout: () => joinPaths('auth', 'logout'),
    ResetPassword: {
      create: () => '/auth/local/resetPassword',
      get: (uuid = ':uuid') => `/auth/local/resetPassword/${uuid}`,
    },
  },

  BiomassStock: {
    download: (countryIso = ':countryIso', domain = ':domain', lang = ':lang') =>
      apiPath('biomassStock', countryIso, domain, lang, 'download'),
  },

  Collaborators: {
    create: (countryIso = ':countryIso') => apiPath('collaboratorCountryAccess', countryIso),
  },
  Country: {
    GetAll: {
      userCountries: () => apiPath('country', 'all'),
      generalCountries: () => apiPath('countries'),
    },
    getConfig: (countryIso = ':countryIso') => apiPath('country', 'config', countryIso),
    getOverviewStatus: (countryIso = ':countryIso') => apiPath('country', 'overviewStatus', countryIso),
    getRegionGroups: () => apiPath('country', 'regionGroups'),
    getRegions: () => apiPath('country', 'regions'),
    updateConfig: (countryIso = ':countryIso') => apiPath('country', 'config', countryIso),
  },

  CountryMessageBoard: {
    create: (countryIso = ':countryIso') => apiPath('countryMessageBoard', countryIso, 'message'),
    getNew: (countryIso = ':countryIso') => apiPath('countryMessageBoard', countryIso, 'messages', 'new'),
    getAll: (countryIso = ':countryIso') => apiPath('countryMessageBoard', countryIso, 'messages', 'all'),
  },

  DataExport: {
    bulkDownload: () => apiPath('export', 'bulk-download'),
    get: (assessmentType = ':assessmentType', section = ':section') => apiPath('export', assessmentType, section),
  },
  Definitions: {
    // NOTE: This should not have 'api' prefix
    get: (lang = ':lang', name = ':name') => joinPaths('definitions', lang, name),
  },
  Descriptions: {
    create: (countryIso = ':countryIso', section = ':section', name = ':name') =>
      apiPath('country', 'descriptions', countryIso, section, name),
    get: (countryIso = ':countryIso', section = ':section', name = ':name') =>
      apiPath('country', 'descriptions', countryIso, section, name),
  },
  FileRepository: {
    create: (countryIso = ':countryIso') => apiPath('fileRepository', countryIso, 'upload'),
    delete: (countryIso = ':countryIso', fileId = ':fileId') => apiPath('fileRepository', countryIso, 'file', fileId),
    get: (countryIso = ':countryIso', fileId = ':fileId') => apiPath('fileRepository', countryIso, 'file', fileId),
    getDataDownload: (key = ':key', fileType = ':fileType') => apiPath('fileRepository', 'dataDownload', key, fileType),
    getFileList: (countryIso = ':countryIso') => apiPath('fileRepository', countryIso, 'filesList'),
    getStatisticalFactsheets: (countryIso = ':countryIso', lang = ':lang') =>
      apiPath('fileRepository', 'statisticalFactsheets', countryIso, lang),
    getUserGuide: (lang = ':lang') => apiPath('fileRepository', 'userGuide', lang),
  },
  GrowingStock: {
    create: (countryIso = ':countryIso') => apiPath('growingStock', countryIso),
    get: (countryIso = ':countryIso') => apiPath('growingStock', countryIso),
  },
  Landing: {
    Get: {
      overview: (countryIso = ':countryIso') => apiPath('landing', countryIso, 'overview'),
      sdgFocalPoints: () => apiPath('landing', 'sdgFocalPoints'),
    },
  },
  OriginalDataPoint: {
    create: (countryIso = ':countryIso') => apiPath('originalDataPoint', countryIso),
    remove: (id = ':id') => apiPath('originalDataPoint', id),
  },
  // Old routes, deprecated
  Odp: {
    createDraft: () => apiPath('odp', 'draft'),
    delete: () => apiPath('odp'),
    deleteDraft: () => apiPath('odp', 'draft'),
    get: (countryIso = ':countryIso') => apiPath('odps', countryIso),
    getMany: () => apiPath('odp'),
    getPrevious: (countryIso = ':countryIso', year = ':year') => apiPath('prevOdp', countryIso, year),
    markAsActual: () => apiPath('odp', 'markAsActual'),
  },
  Review: {
    create: (issueId = ':issueId') => apiPath('review', issueId),
    createIssueWithComments: (countryIso = ':countryIso', section = ':section') =>
      apiPath('review', countryIso, section),
    delete: (countryIso = ':countryIso', commentId = ':commentId') =>
      apiPath('review', countryIso, 'comments', commentId),
    getComments: (countryIso = ':countryIso', section = ':section') => apiPath('review', countryIso, section),
    getSummary: (countryIso = ':countryIso', section = ':section') => apiPath('review', countryIso, section, 'summary'),
    markResolved: () => apiPath('issue', 'markAsResolved'),
  },
  StatisticalFactsheets: {
    get: () => apiPath('statisticalFactsheets'),
  },
  DataTable: {
    create: (countryIso = ':countryIso', tableSpecName = ':tableSpecName') =>
      apiPath('dataTable', countryIso, tableSpecName),
    get: (assessmentType = ':assessmentType', countryIso = ':countryIso', tableSpecName = ':tableSpecName') =>
      apiPath('dataTable', assessmentType, countryIso, tableSpecName),
  },
  UserChat: {
    create: (countryIso = ':countryIso') => apiPath('userChat', countryIso, 'message'),
    getAll: (countryIso = ':countryIso') => apiPath('userChat', countryIso, 'message', 'all'),
    getNew: (countryIso = ':countryIso') => apiPath('userChat', countryIso, 'message', 'new'),
  },
  Versioning: {
    create: () => apiPath('versioning'),
    delete: (id = ':id') => apiPath('versioning', id),
    getAll: () => apiPath('versioning'),
    getLatest: () => apiPath('versioning', 'latest'),
  },
}
