export const EndPoint = {
  Assessment: {
    createEmail: '/api/assessment/:countryIso',
    export: '/api/assessment/admin/export',
  },

  Audit: {
    getFeed: '/api/audit/getAuditFeed/:countryIso',
    getLatestLogTimestamp: '/api/audit/getLatestAuditLogTimestamp/:countryIso',
  },
  Auth: {
    changePassword: '/auth/local/changePassword',
    getInvitation: '/auth/invitation/:uuid',
    Login: {
      local: '/auth/local/login',
      google: '/auth/google',
      googleCallback: '/auth/google/callback',
    },
    logout: '/auth/logout',
    ResetPassword: {
      create: '/auth/local/resetPassword',
      get: '/auth/local/resetPassword/:uuid',
    },
  },
  BiomassStock: {
    download: '/api/biomassStock/:countryIso/:domain/:lang/download',
  },
  Collaborators: {
    create: '/api/collaboratorCountryAccess/:countryIso',
  },
  Country: {
    GetAll: {
      userCountries: '/api/country/all',
      generalCountries: '/api/countries/',
    },
    getConfig: '/api/country/config/:countryIso',
    getOverviewStatus: '/api/country/overviewStatus/:countryIso',
    getRegionGroups: '/api/country/regionGroups',
    getRegions: '/api/country/regions',
    updateConfig: '/api/country/config/:countryIso',
  },
  CountryMessageBoard: {
    create: '/api/countryMessageBoard/:countryIso/message',
    get: '/api/countryMessageBoard/:countryIso/messages/new',
    getAll: '/api/countryMessageBoard/:countryIso/messages/all',
  },
  DataExport: {
    bulkDownload: '/api/export/bulk-download',
    get: '/api/export/:assessmentType/:section',
  },
  Definitions: {
    // NOTE: This should not have 'api' prefix
    get: '/definitions/:lang/:name',
  },
  Descriptions: {
    create: '/api/country/descriptions/:countryIso/:section/:name',
    get: '/api/country/descriptions/:countryIso/:section/:name',
  },
  FileRepository: {
    create: '/api/fileRepository/:countryIso/upload',
    delete: '/api/fileRepository/:countryIso/file/:fileId',
    get: '/api/fileRepository/:countryIso/file/:fileId',
    getDataDownload: '/api/fileRepository/dataDownload/:key/:fileType',
    getFileList: '/api/fileRepository/:countryIso/filesList',
    getStatisticalFactsheets: '/api/fileRepository/statisticalFactsheets/:countryIso/:lang',
    getUserGuide: '/api/fileRepository/userGuide/:lang',
  },
  GrowingStock: {
    create: '/api/growingStock/:countryIso',
    get: '/api/growingStock/:countryIso',
  },
  Landing: {
    Get: {
      overview: '/api/landing/:countryIso/overview',
      sdgFocalPoints: '/api/landing/sdgFocalPoints',
    },
  },
  Odp: {
    createDraft: '/api/odp/draft',
    delete: '/api/odp',
    deleteDraft: '/api/odp/draft',
    get: '/api/odps/:countryIso',
    getMany: '/api/odp',
    getPrevious: '/api/prevOdp/:countryIso/:year',
    markAsActual: '/api/odp/markAsActual',
  },
  Review: {
    create: '/api/review/:issueId',
    createIssueWithComments: '/api/review/:countryIso/:section',
    delete: '/api/review/:countryIso/comments/:commentId',
    getComments: '/api/review/:countryIso/:section',
    getSummary: '/api/review/:countryIso/:section/summary',
    markResolved: '/api/issue/markAsResolved',
  },
  StatisticalFactsheets: {
    get: '/api/statisticalFactsheets/',
  },
  TraditionalTable: {
    create: '/api/traditionalTable/:countryIso/:tableSpecName',
    get: '/api/traditionalTable/:assessmentType/:countryIso/:tableSpecName',
  },
  UserChat: {
    create: '/api/userChat/:countryIso/message',
    getAll: '/api/userChat/:countryIso/messages/all',
    getNew: '/api/userChat/:countryIso/messages/new',
  },
  Versioning: {
    create: '/api/versioning/',
    delete: '/api/versioning/:id',
    getAll: '/api/versioning/',
    getLatest: '/api/versioning/latest',
  },
}
