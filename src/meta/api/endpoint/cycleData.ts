import { apiPath } from 'meta/api/endpoint/_utils'
import { Print } from 'meta/api/endpoint/print'

export const CycleData = {
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

  Links: {
    count: (): string => apiPath('cycle-data', 'links', 'count'),
    export: (): string => apiPath('cycle-data', 'links', 'export'),
    many: (): string => apiPath('cycle-data', 'links'),
    one: (): string => apiPath('cycle-data', 'links', 'link'),
    verify: (): string => apiPath('cycle-data', 'links', 'verify'),
    verifySummary: (): string => apiPath('cycle-data', 'links', 'verify', 'summary'),
    verifyStatus: (): string => apiPath('cycle-data', 'links', 'verify', 'status'),
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

  NationalDataPoint: {
    one: (): string => apiPath('cycle-data', 'national-data-points', 'national-data-point'),
    many: (): string => apiPath('cycle-data', 'national-data-points'),
    history: (): string => apiPath('cycle-data', 'national-data-points', 'national-data-point', 'history'),

    dataSources: (): string => apiPath('cycle-data', 'national-data-points', 'national-data-point', 'data-sources'),
    description: (): string => apiPath('cycle-data', 'national-data-points', 'national-data-point', 'description'),
    originalData: (): string => apiPath('cycle-data', 'national-data-points', 'national-data-point', 'original-data'),
    nationalClasses: (): string =>
      apiPath('cycle-data', 'national-data-points', 'national-data-point', 'national-classes'),
    nationalClass: (): string => apiPath('cycle-data', 'national-data-points', 'national-data-point', 'national-class'),
    year: (): string => apiPath('cycle-data', 'national-data-points', 'national-data-point', 'year'),

    copyNationalClasses: (): string =>
      apiPath('cycle-data', 'national-data-points', 'national-data-point', 'copy-national-classes'),

    // Table Data (1a, 1b)
    reservedYears: (): string => apiPath('cycle-data', 'national-data-points', 'reserved-years'),
  },

  Print,

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

  Validations: {
    descriptions: (): string => apiPath('cycle-data', 'validations', 'descriptions'),
    summary: (): string => apiPath('cycle-data', 'validations', 'summary'),
    tableData: (): string => apiPath('cycle-data', 'validations', 'table-data'),
  },
}
