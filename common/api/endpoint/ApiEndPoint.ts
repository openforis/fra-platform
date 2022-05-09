const joinPaths = (...parts: Array<string>): string => `/${parts.join('/')}`
const apiPath = (...parts: Array<string>): string => joinPaths('api', ...parts)

export const ApiEndPoint = {
  Assessment: {
    TableData: {
      one: () => apiPath('assessment', 'tableData'),
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

    review: () => apiPath('review'),

    OriginalDataPoint: {
      one: (countryIso = ':countryIso', assessmentName = ':assessmentName', cycleName = ':cycleName', year = ':year') =>
        apiPath('country', countryIso, 'assessment', assessmentName, 'originalDataPoint', cycleName, year),
      ReservedYears: { many: () => apiPath('originalDataPoints', 'reservedYears') },
      TableData: {
        one: () => apiPath('originalDataPoint', 'data'),
      },
    },
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
  Geo: {
    sepalProxy: () => apiPath('geo', 'sepal'),
  },
  Init: {
    one: () => apiPath('init'),
  },
  MessageCenter: {
    Topic: {
      get: () => apiPath('topic'),
      addMessage: () => apiPath('topic', 'message'),
      resolveTopic: () => apiPath('topic', 'resolve'),
    },
  },

  User: {
    getByInvitation: (uuid = ':uuid') => apiPath('user', 'invitation', uuid),
    acceptInvitation: (uuid = ':uuid') => apiPath('user', 'invitation', 'accept', uuid),
    getProfilePicture: (id = ':id') => apiPath('user', 'profilePicture', id),
  },
}
