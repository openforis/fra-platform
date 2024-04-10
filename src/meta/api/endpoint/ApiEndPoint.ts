const joinPaths = (...parts: Array<string>): string => `/${parts.join('/')}`
const apiPath = (...parts: Array<string>): string => joinPaths('api', ...parts)

export const ApiEndPoint = {
  init: () => apiPath('init'),
  definitions: (lang = ':lang', name = ':name', assessmentName = ':assessmentName', cycleName = ':cycleName') =>
    joinPaths('definitions', assessmentName, cycleName, lang, name),

  Admin: {
    countries: () => apiPath('admin', 'countries'),
    countriesCount: () => apiPath('admin', 'countries', 'count'),
    invitations: () => apiPath('admin', 'invitations'),
    invitationsCount: () => apiPath('admin', 'invitations', 'count'),
    users: () => apiPath('admin', 'users'),
    usersCount: () => apiPath('admin', 'users', 'count'),
  },

  Area: {
    country: () => apiPath('area', 'country'),
    countryProp: () => apiPath('area', 'country', 'prop'),
    areas: () => apiPath('area', 'areas'),
  },

  Auth: {
    changePassword: () => apiPath('auth', 'change-password'),
    google: () => apiPath('auth', 'google'),
    googleCallback: () => apiPath('auth', 'google', 'callback'),
    login: () => joinPaths('auth', 'login'),
    logout: () => joinPaths('auth', 'logout'),
    resetPassword: () => joinPaths('auth', 'local', 'reset-password'),
  },

  CycleData: {
    activities: () => apiPath('cycle-data', 'activities'),
    activitiesCount: () => apiPath('cycle-data', 'activities', 'count'),
    history: (target = ':target') => apiPath('cycle-data', 'history', target),

    Descriptions: {
      many: () => apiPath('cycle-data', 'descriptions'),

      DataSources: {
        many: () => apiPath('cycle-data', 'descriptions', 'data-sources'),
        one: () => apiPath('cycle-data', 'descriptions', 'data-sources', 'data-source'),
      },
    },
    DescriptionDataSources: {
      many: () => apiPath('cycle-data', 'descriptions', 'data-sources'),
      one: () => apiPath('cycle-data', 'descriptions', 'data-sources', 'data-source'),
    },

    Contacts: {
      many: () => apiPath('cycle-data', 'contacts'),
      one: () => apiPath('cycle-data', 'contacts', 'contact'),
    },

    OriginalDataPoint: {
      one: () => apiPath('cycle-data', 'original-data-points', 'original-data-point'),
      many: () => apiPath('cycle-data', 'original-data-points'),
      lastUpdatedTimestamp: () => apiPath('cycle-data', 'original-data-points', 'last-updated-timestamp'),

      dataSources: () => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'data-sources'),
      description: () => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'description'),
      originalData: () => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'original-data'),
      nationalClasses: () => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'national-classes'),
      nationalClass: () => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'national-class'),
      year: () => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'year'),

      copyNationalClasses: () =>
        apiPath('cycle-data', 'original-data-points', 'original-data-point', 'copy-national-classes'),

      // Table Data (1a, 1b)
      reservedYears: () => apiPath('cycle-data', 'original-data-points', 'reserved-years'),
    },

    Print: {
      Report: {
        one: () => apiPath('cycle-data', 'print', 'report'),
      },
    },

    Repository: {
      File: {
        one: (uuid = ':uuid') => apiPath('cycle-data', 'repository', 'file', uuid),
        many: () => apiPath('cycle-data', 'repository', 'files'),
      },

      many: () => apiPath('cycle-data', 'repository', 'items'),
      one: () => apiPath('cycle-data', 'repository', 'items', 'item'),
      fileMeta: () => apiPath('cycle-data', 'repository', 'items', 'item', 'file-meta'),
    },

    Review: {
      status: () => apiPath('cycle-data', 'review', 'status'),
      summary: () => apiPath('cycle-data', 'review', 'summary'),
    },

    Table: {
      estimate: () => apiPath('cycle-data', 'table', 'estimate'),
      nodes: () => apiPath('cycle-data', 'table', 'nodes'),
      tableData: () => apiPath('cycle-data', 'table', 'table-data'),
      tableClear: () => apiPath('cycle-data', 'table', 'clear'),
      nodeValuesEstimations: () => apiPath('cycle-data', 'table', 'node-values-estimations'),
    },
  },

  ExtData: {
    Taxa: {
      search: () => apiPath('ext-data', 'taxa', 'search'),
    },
  },

  File: {
    many: () => apiPath('files'),
    biomassStock: ({
      assessmentName = ':assessmentName',
      cycleName = ':cycleName',
      countryIso = ':countryIso',
      sectionName = ':sectionName',
      language = ':language',
      selectedDomain = ':selectedDomain',
    }) =>
      apiPath('file', 'biomass-stock', assessmentName, cycleName, countryIso, sectionName, selectedDomain, language),
    dashboard: () => apiPath('file', 'dashboard'),
    dataDownload: () => apiPath('file', 'data-download'),
    bulkDownload: () => apiPath('file', 'bulk-download'),
    userGuide: (language = ':language') => apiPath('file', 'user-guide', language),
  },

  MessageCenter: {
    topic: () => apiPath('message-center', 'topic'),
    topicMessage: () => apiPath('message-center', 'topic', 'message'),
    topicResolve: () => apiPath('message-center', 'topic', 'resolve'),
    topicUnreadMessages: () => apiPath('message-center', 'topic', 'unread-messages'),
  },

  User: {
    many: () => apiPath('users'),
    one: () => apiPath('users', 'user'),

    invite: () => apiPath('users', 'invite'),
    invitation: () => apiPath('users', 'invitation'),

    invitationAccept: () => apiPath('users', 'invitation', 'accept'),
    invitationSendEmail: () => apiPath('users', 'invitation', 'send-email'),

    resetPassword: () => apiPath('users', 'reset-password'),

    profilePicture: (id = ':id') => apiPath('users', 'profile-picture', id),
    roles: () => apiPath('users', 'roles'),
    adminRole: () => apiPath('users', 'admin-role'),
    sectionAuth: () => apiPath('users', 'section-auth'),
    roleProps: () => apiPath('users', 'role', 'props'),
  },

  Geo: {
    bounds: () => apiPath('geo', 'bounds'),
    sepalProxy: () => apiPath('geo', 'sepal'),
    Layers: {
      forest: () => apiPath('geo', 'layers', 'forest'),
      forestAgreement: () => apiPath('geo', 'layers', 'forest-agreement'),
      protectedArea: () => apiPath('geo', 'layers', 'protected-area'),
      burnedArea: () => apiPath('geo', 'layers', 'burned-area'),
      boundaries: () => apiPath('geo', 'layers', 'boundaries'),
    },
    Estimations: {
      forest: () => apiPath('geo', 'estimations', 'forest'),
      forestAgreement: () => apiPath('geo', 'estimations', 'forest-agreement'),
      intersectionArea: () => apiPath('geo', 'estimations', 'intersection-area'),
    },
  },

  MetaData: {
    metaCache: () => apiPath('metadata', 'metaCache'),
    sections: () => apiPath('metadata', 'sections'),
    sectionsMetadata: () => apiPath('metadata', 'sections', 'metadata'),
  },

  _Legacy: {
    File: {
      // Note: Some users might use this still
      // Legacy API Endpoint to return hidden files, replaced with redirect to RepositoryAPI get file
      hidden: () => apiPath('file', 'hidden'),
    },
  },
}
