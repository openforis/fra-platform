const joinPaths = (...parts: Array<string>): string => `/${parts.join('/')}`
const apiPath = (...parts: Array<string>): string => joinPaths('api', ...parts)

export const ApiEndPoint = {
  init: () => apiPath('init'),
  definitions: (lang = ':lang', name = ':name') => joinPaths('definitions', lang, name),
  Area: {
    country: () => apiPath('country'),
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
    descriptions: () => apiPath('cycleData', 'descriptions'),
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

  Assessment: {
    Data: {
      descriptions: () => apiPath('assessment', 'data', 'descriptions'),
    },

    OriginalDataPoint: {
      one: (countryIso = ':countryIso', assessmentName = ':assessmentName', cycleName = ':cycleName', year = ':year') =>
        apiPath('country', countryIso, 'assessment', assessmentName, 'originalDataPoint', cycleName, year),

      many: (countryIso = ':countryIso', assessmentName = ':assessmentName', cycleName = ':cycleName') =>
        apiPath('country', countryIso, 'assessment', assessmentName, 'originalDataPoints', cycleName),

      ReservedYears: { many: () => apiPath('originalDataPoints', 'reservedYears') },
      TableData: {
        one: () => apiPath('originalDataPoint', 'data'),
      },
    },
  },

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

  User: {
    invite: () => apiPath('users', 'invite'),
    getByInvitation: (uuid = ':uuid') => apiPath('users', 'invitation', uuid),
    acceptInvitation: (uuid = ':uuid') => apiPath('users', 'invitation', 'accept', uuid),
    removeInvitation: (uuid = ':uuid') => apiPath('users', 'invitation', 'remove', uuid),
    sendInvitationEmail: (uuid = ':uuid') => apiPath('users', 'invitation', 'sendEmail', uuid),
    getProfilePicture: (id = ':id') => apiPath('users', 'profilePicture', id),
    sectionAuth: () => apiPath('users', 'sectionAuth'),
    many: () => apiPath('users'),
    get: () => apiPath('user'),
  },
}
