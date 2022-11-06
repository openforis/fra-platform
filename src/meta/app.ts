import { generatePath } from 'react-router'

import { CountryIso, Global } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

type ClientRoute<Params> = {
  path: {
    absolute: string
    relative: string
  }
  getLink: (params: Params) => string
}

const newInstance = <Params extends { [x: string]: string | number | boolean }>(
  ...parts: Array<string>
): ClientRoute<Params> => {
  const absolute = `/${parts.join('/')}`
  return {
    path: {
      absolute,
      relative: parts[parts.length - 1],
    },
    getLink: (params: Params) => generatePath(absolute, params),
  }
}

type AssessmentParams = {
  countryIso: CountryIso | Global
  assessmentName: AssessmentName
  cycleName: string
}

export enum AssessmentHomeRouteNames {
  overview = 'overview',
  messageBoard = 'messageBoard',
  contentCheck = 'contentCheck',
  userManagement = 'userManagement',
  recentActivity = 'recentActivity',
  links = 'links',
}

export enum AdminRouteNames {
  userManagement = 'userManagement',
  // dataExport = 'dataExport',
}

const assessmentParts = [':countryIso', 'assessments', ':assessmentName', ':cycleName']

export const ClientRoutes = {
  Root: { path: '/' },

  Admin: {
    Root: newInstance<void>('admin'),
    Section: newInstance<{ sectionName: AssessmentHomeRouteNames }>('admin', ':sectionName'),
    User: newInstance<{ id: number }>('admin', 'users/:id'),
  },

  Assessment: {
    Root: newInstance<AssessmentParams>(...assessmentParts),
    Home: {
      Root: newInstance<AssessmentParams>(...assessmentParts, 'home'),
      Section: newInstance<AssessmentParams & { sectionName: AssessmentHomeRouteNames }>(
        ...assessmentParts,
        'home',
        ':sectionName'
      ),
      Users: {
        User: newInstance<AssessmentParams & { id: number }>(...assessmentParts, 'home', 'users/:id'),
      },
    },
    Section: newInstance<AssessmentParams & { sectionName: string }>(...assessmentParts, ':sectionName'),
    OriginalDataPoint: {
      Section: newInstance<AssessmentParams & { year: string; sectionName: string }>(
        ...assessmentParts,
        'originalDataPoint/:year/:sectionName'
      ),
    },
    DataDownload: newInstance<AssessmentParams>(...assessmentParts, 'dataDownload'),
    Print: newInstance<AssessmentParams>(...assessmentParts, 'print'),
    PrintTables: newInstance<AssessmentParams>(...assessmentParts, 'print', 'tables'),
  },

  Login: {
    Root: newInstance<void>('login'),
    Invitation: newInstance('login', 'invitation'),
    ResetPassword: newInstance<void>('login', 'resetPassword'),
  },

  Geo: {
    Root: newInstance(':countryIso', 'geo'),
  },

  Users: {
    User: newInstance<{ id: number }>('users', ':id'),
  },
}
