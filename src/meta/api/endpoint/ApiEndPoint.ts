const joinPaths = (...parts: Array<string>): string => `/${parts.join('/')}`
const apiPath = (...parts: Array<string>): string => joinPaths('api', ...parts)

export const ApiEndPoint = {
  init: (): string => apiPath('init'),
  definitions: (lang = ':lang', name = ':name', assessmentName = ':assessmentName', cycleName = ':cycleName'): string =>
    joinPaths('definitions', assessmentName, cycleName, lang, name),

  Admin: {
    countries: (): string => apiPath('admin', 'countries'),
    countriesCount: (): string => apiPath('admin', 'countries', 'count'),
    invitations: (): string => apiPath('admin', 'invitations'),
    invitationsCount: (): string => apiPath('admin', 'invitations', 'count'),
    users: (): string => apiPath('admin', 'users'),
    usersCount: (): string => apiPath('admin', 'users', 'count'),
    usersExport: (): string => apiPath('admin', 'users', 'export'),
  },

  Area: {
    country: (): string => apiPath('area', 'country'),
    countryProp: (): string => apiPath('area', 'country', 'prop'),
    areas: (): string => apiPath('area', 'areas'),
  },

  Auth: {
    changePassword: (): string => apiPath('auth', 'change-password'),
    google: (): string => apiPath('auth', 'google'),
    googleCallback: (): string => apiPath('auth', 'google', 'callback'),
    login: (): string => joinPaths('auth', 'login'),
    logout: (): string => joinPaths('auth', 'logout'),
    resetPassword: (): string => joinPaths('auth', 'local', 'reset-password'),
  },

  CycleData: {
    activities: (): string => apiPath('cycle-data', 'activities'),
    activitiesCount: (): string => apiPath('cycle-data', 'activities', 'count'),

    Dashboard: {
      one: (): string => apiPath('cycle-data', 'dashboard'),
    },

    Descriptions: {
      many: (): string => apiPath('cycle-data', 'descriptions'),
      history: (): string => apiPath('cycle-data', 'descriptions', 'history'),

      DataSources: {
        many: (): string => apiPath('cycle-data', 'descriptions', 'data-sources'),
        one: (): string => apiPath('cycle-data', 'descriptions', 'data-sources', 'data-source'),
      },
    },
    DescriptionDataSources: {
      many: (): string => apiPath('cycle-data', 'descriptions', 'data-sources'),
      one: (): string => apiPath('cycle-data', 'descriptions', 'data-sources', 'data-source'),
    },

    Contacts: {
      many: (): string => apiPath('cycle-data', 'contacts'),
      one: (): string => apiPath('cycle-data', 'contacts', 'contact'),
    },

    History: {
      Activities: {
        one: (target = ':target'): string => apiPath('cycle-data', 'history', 'activities', target),
        count: (target = ':target'): string => apiPath('cycle-data', 'history', 'activities', target, 'count'),
      },
    },

    Links: {
      count: (): string => apiPath('cycle-data', 'links', 'count'),
      export: (): string => apiPath('cycle-data', 'links', 'export'),
      many: (): string => apiPath('cycle-data', 'links'),
      one: (): string => apiPath('cycle-data', 'links', 'link'),
      verify: (): string => apiPath('cycle-data', 'links', 'verify'),
      verifyStatus: (): string => apiPath('cycle-data', 'links', 'verify', 'status'),
    },

    OriginalDataPoint: {
      one: (): string => apiPath('cycle-data', 'original-data-points', 'original-data-point'),
      many: (): string => apiPath('cycle-data', 'original-data-points'),
      history: (): string => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'history'),

      dataSources: (): string => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'data-sources'),
      description: (): string => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'description'),
      originalData: (): string => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'original-data'),
      nationalClasses: (): string =>
        apiPath('cycle-data', 'original-data-points', 'original-data-point', 'national-classes'),
      nationalClass: (): string =>
        apiPath('cycle-data', 'original-data-points', 'original-data-point', 'national-class'),
      year: (): string => apiPath('cycle-data', 'original-data-points', 'original-data-point', 'year'),

      copyNationalClasses: (): string =>
        apiPath('cycle-data', 'original-data-points', 'original-data-point', 'copy-national-classes'),

      // Table Data (1a, 1b)
      reservedYears: (): string => apiPath('cycle-data', 'original-data-points', 'reserved-years'),
    },

    Print: {
      Report: {
        one: (): string => apiPath('cycle-data', 'print', 'report'),
      },
    },

    Repository: {
      File: {
        one: (uuid = ':uuid'): string => apiPath('cycle-data', 'repository', 'file', uuid),
        many: (): string => apiPath('cycle-data', 'repository', 'files'),
      },

      many: (): string => apiPath('cycle-data', 'repository', 'items'),
      one: (): string => apiPath('cycle-data', 'repository', 'items', 'item'),
      fileMeta: (): string => apiPath('cycle-data', 'repository', 'items', 'item', 'file-meta'),
    },

    Review: {
      status: (): string => apiPath('cycle-data', 'review', 'status'),
      summary: (): string => apiPath('cycle-data', 'review', 'summary'),
    },

    Table: {
      estimate: (): string => apiPath('cycle-data', 'table', 'estimate'),
      nodes: (): string => apiPath('cycle-data', 'table', 'nodes'),
      tableData: (): string => apiPath('cycle-data', 'table', 'table-data'),
      tableDataHistory: (): string => apiPath('cycle-data', 'table', 'table-data', 'history'),
      tableClear: (): string => apiPath('cycle-data', 'table', 'clear'),
      nodeValuesEstimations: (): string => apiPath('cycle-data', 'table', 'node-values-estimations'),
    },
  },

  ExtData: {
    Taxa: {
      search: (): string => apiPath('ext-data', 'taxa', 'search'),
    },
  },

  File: {
    many: (): string => apiPath('files'),
    bulkDownload: (): string => apiPath('file', 'bulk-download'),
  },

  MessageCenter: {
    topic: (): string => apiPath('message-center', 'topic'),
    topicMessage: (): string => apiPath('message-center', 'topic', 'message'),
    topicResolve: (): string => apiPath('message-center', 'topic', 'resolve'),
    topicUnreadMessages: (): string => apiPath('message-center', 'topic', 'unread-messages'),
  },

  User: {
    many: (): string => apiPath('users'),
    one: (): string => apiPath('users', 'user'),

    invite: (): string => apiPath('users', 'invite'),
    invitation: (): string => apiPath('users', 'invitation'),

    invitationAccept: (): string => apiPath('users', 'invitation', 'accept'),
    invitationSendEmail: (): string => apiPath('users', 'invitation', 'send-email'),

    resetPassword: (): string => apiPath('users', 'reset-password'),

    profilePicture: (id = ':id'): string => apiPath('users', 'profile-picture', id),
  },

  Geo: {
    bounds: (): string => apiPath('geo', 'bounds'),
    sepalProxy: (): string => apiPath('geo', 'sepal'),
    Layers: {
      forest: (): string => apiPath('geo', 'layers', 'forest'),
      forestAgreement: (): string => apiPath('geo', 'layers', 'forest-agreement'),
      protectedArea: (): string => apiPath('geo', 'layers', 'protected-area'),
      burnedArea: (): string => apiPath('geo', 'layers', 'burned-area'),
      boundaries: (): string => apiPath('geo', 'layers', 'boundaries'),
    },
    Estimations: {
      forest: (): string => apiPath('geo', 'estimations', 'forest'),
      forestAgreement: (): string => apiPath('geo', 'estimations', 'forest-agreement'),
      intersectionArea: (): string => apiPath('geo', 'estimations', 'intersection-area'),
    },
  },

  Kiosk: {
    latestActivities: (): string => apiPath('kiosk', 'latest-activities'),
  },

  MetaData: {
    metaCache: (): string => apiPath('metadata', 'metaCache'),
    sections: (): string => apiPath('metadata', 'sections'),
    sectionsMetadata: (): string => apiPath('metadata', 'sections', 'metadata'),
  },

  Explorer: {
    sectionsMetadata: (): string => apiPath('explorer', 'sections', 'metadata'),
  },

  _Legacy: {
    File: {
      // Note: Some users might use this still
      // Legacy API Endpoint to return hidden files, replaced with redirect to RepositoryAPI get file
      hidden: (): string => apiPath('file', 'hidden'),
    },
  },

  Static: {
    file: (s3path = ':s3path(*)'): string => apiPath('static', 'file', s3path),
    files: (): string => apiPath('static', 'files'),
  },
}
