const joinPaths = (...parts: Array<string>): string => `/${parts.join('/')}`
const apiPath = (...parts: Array<string>): string => joinPaths('api', ...parts)

export const ApiEndPoint = {
  init: () => apiPath('init'),
  definitions: (lang = ':lang', name = ':name') => joinPaths('definitions', lang, name),
  Area: {
    country: () => apiPath('area', 'country'),
  },

  Auth: {
    changePassword: () => apiPath('auth', 'changePassword'),
    google: () => apiPath('auth', 'google'),
    googleCallback: () => apiPath('auth', 'google', 'callback'),
    login: () => joinPaths('auth', 'login'),
    logout: () => joinPaths('auth', 'logout'),
    resetPassword: () => joinPaths('auth', 'local', 'resetPassword'),
  },

  CycleData: {
    activities: () => apiPath('cycleData', 'activities'),
    descriptions: () => apiPath('cycleData', 'descriptions'),

    OriginalDataPoint: {
      one: () => apiPath('cycleData', 'originalDataPoints', 'originalDataPoint'),

      // Used for print view
      many: () => apiPath('cycleData', 'originalDataPoints'),

      // Table Data (1a, 1b)
      data: () => apiPath('cycleData', 'originalDataPoints', 'data'),
      reservedYears: () => apiPath('cycleData', 'originalDataPoints', 'reservedYears'),
    },
    Review: {
      status: () => apiPath('cycleData', 'review', 'status'),
      summary: () => apiPath('cycleData', 'review', 'summary'),
    },
    Table: {
      estimate: () => apiPath('cycleData', 'table', 'estimate'),
      nodes: () => apiPath('cycleData', 'table', 'nodes'),
      tableData: () => apiPath('cycleData', 'table', 'tableData'),
    },
  },

  File: {
    dashboard: () => apiPath('file', 'dashboard'),
    dataDownload: () => apiPath('file', 'dataDownload'),

    Assessment: {
      one: (id = ':id') => apiPath('file', 'assessment', id),
      many: () => apiPath('file', 'assessment'),
    },
  },

  MessageCenter: {
    topic: () => apiPath('messageCenter', 'topic'),
    topicMessage: () => apiPath('messageCenter', 'topic', 'message'),
    topicResolve: () => apiPath('messageCenter', 'topic', 'resolve'),
    topicUnreadMessages: () => apiPath('messageCenter', 'topic', 'unreadMessages'),
  },

  Sections: {
    metadata: () => apiPath('section', 'metadata'),
  },

  User: {
    many: () => apiPath('users'),
    one: () => apiPath('users', 'user'),

    invite: () => apiPath('users', 'invite'),
    invitation: () => apiPath('users', 'invitation'),
    invitationAccept: () => apiPath('users', 'invitation', 'accept'),
    invitationSendEmail: () => apiPath('users', 'invitation', 'sendEmail'),

    profilePicture: (id = ':id') => apiPath('users', 'profilePicture', id),
    sectionAuth: () => apiPath('users', 'sectionAuth'),
  },

  /**
   * @deprecated
   */

  Geo: {
    sepalProxy: () => apiPath('geo', 'sepal'),
    Layers: {
      getForest: (
        countryIso = ':countryIso',
        forestSource = ':forestSource',
        gteHansenTreeCoverPerc = ':gteHansenTreeCoverPerc?'
      ) => apiPath('geo', 'layers', 'forest', countryIso, forestSource, gteHansenTreeCoverPerc),
      getForestAgreement: (
        countryIso = ':countryIso',
        gteHansenTreeCoverPerc = ':gteHansenTreeCoverPerc',
        gteAgreementLevel = ':gteAgreementLevel'
      ) => apiPath('geo', 'layers', 'forestAgreement', countryIso, gteHansenTreeCoverPerc, gteAgreementLevel),
      getBoundaries: (countryIso = ':countryIso') => apiPath('geo', 'layers', 'boundaries', countryIso),
    },
  },

  MetaData: {
    sectionsMetadata: () => apiPath('metadata', 'sections', 'metadata'),
    sections: () => apiPath('metadata', 'sections'),
  },
}
