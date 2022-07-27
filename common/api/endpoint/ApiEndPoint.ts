const joinPaths = (...parts: Array<string>): string => `/${parts.join('/')}`
const apiPath = (...parts: Array<string>): string => joinPaths('api', ...parts)

export const ApiEndPoint = {
  Assessment: {
    TableData: {
      one: () => apiPath('assessment', 'tableData'),
      Estimate: {
        many: () => apiPath('assessment', 'tableData', 'estimate'),
      },
    },
    Sections: {
      Metadata: {
        many: (
          countryIso = ':countryIso',
          assessmentName = ':assessmentName',
          cycleName = ':cycleName',
          section = ':section'
        ) =>
          apiPath(
            'countries',
            countryIso,
            'assessments',
            assessmentName,
            'cycles',
            cycleName,
            'sections',
            section,
            'metadata'
          ),
      },
    },

    sections: (countryIso = ':countryIso', assessmentName = ':assessmentName', cycleName = ':cycleName') =>
      apiPath('countries', countryIso, 'assessment', assessmentName, 'sections', cycleName),

    country: () => apiPath('country'),

    OriginalDataPoint: {
      one: (countryIso = ':countryIso', assessmentName = ':assessmentName', cycleName = ':cycleName', year = ':year') =>
        apiPath('country', countryIso, 'assessment', assessmentName, 'originalDataPoint', cycleName, year),
      ReservedYears: { many: () => apiPath('originalDataPoints', 'reservedYears') },
      TableData: {
        one: () => apiPath('originalDataPoint', 'data'),
      },
    },
  },
  Review: {
    status: { many: () => apiPath('review', 'status') },
    summary: { many: () => apiPath('review', 'summary') },
  },
  Auth: {
    changePassword: () => '/auth/local/changePassword',
    loggedInUser: () => apiPath('loggedInUser'),
    Login: {
      google: () => '/auth/google',
      googleCallback: () => '/auth/google/callback',
      local: () => '/auth/login',
    },
    logout: () => joinPaths('auth', 'logout'),
    ResetPassword: {
      one: () => '/auth/local/resetPassword',
    },
  },
  CycleData: {
    Nodes: {
      many: () => apiPath('cycleData', 'nodes'),
    },
  },
  Definitions: {
    one: (lang = ':lang', name = ':name') => joinPaths('definitions', lang, name),
  },
  File: {
    Dashboard: {
      one: () => apiPath('file', 'dashboard'),
    },
    DataDownload: {
      one: () => apiPath('file', 'dataDownload'),
    },
  },
  Geo: {
    sepalProxy: () => apiPath('geo', 'sepal'),
    Layers: {
      getForest: (countryIso = ':countryIso', forestSource = ':forestSource') =>
        apiPath('geo', 'layers', 'forest', countryIso, forestSource),
      getForestAgreement: (
        countryIso = ':countryIso',
        gteHansenTreeCoverPerc = ':gteHansenTreeCoverPerc',
        gteAgreementLevel = ':gteAgreementLevel'
      ) => apiPath('geo', 'layers', 'forestAgreement', countryIso, gteHansenTreeCoverPerc, gteAgreementLevel),
    },
  },
  Init: {
    one: () => apiPath('init'),
  },
  MessageCenter: {
    Topic: {
      get: () => apiPath('topic'),
      getMessage: () => apiPath('topic', 'message'),
      resolveTopic: () => apiPath('topic', 'resolve'),
    },
  },

  User: {
    one: () => apiPath('user'),
    invite: () => apiPath('user', 'invite'),
    getByInvitation: (uuid = ':uuid') => apiPath('user', 'invitation', uuid),
    acceptInvitation: (uuid = ':uuid') => apiPath('user', 'invitation', 'accept', uuid),
    removeInvitation: (uuid = ':uuid') => apiPath('user', 'invitation', 'remove', uuid),
    sendInvitationEmail: (uuid = ':uuid') => apiPath('user', 'invitation', 'sendEmail', uuid),
    getProfilePicture: (id = ':id') => apiPath('user', 'profilePicture', id),
    many: () => apiPath('users'),
  },
}
