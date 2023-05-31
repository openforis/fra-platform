import { generatePath } from 'react-router'

import { CountryIso, Global, RegionCode } from 'meta/area'
import { AssessmentName } from 'meta/assessment'

type ClientRoute<Params> = {
  path: {
    absolute: string
    relative: string
  }
  getLink: (params?: Params) => string
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

type CycleParams = {
  assessmentName: AssessmentName
  cycleName: string
}

type AssessmentParams = CycleParams & {
  countryIso: CountryIso | Global | RegionCode
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

const cycleParts = ['assessments', ':assessmentName', ':cycleName']

const assessmentParts = cycleParts.concat(':countryIso')

export const ClientRoutes = {
  Root: { path: '/' },

  Assessment: {
    Landing: newInstance<{ assessmentName: AssessmentName }>('assessments', ':assessmentName'),
    Cycle: {
      Landing: newInstance<CycleParams>('assessments', ':assessmentName', ':cycleName'),
      Admin: {
        Root: newInstance<CycleParams>(...cycleParts, 'admin'),
        Section: newInstance<CycleParams & { sectionName: AssessmentHomeRouteNames }>(
          ...cycleParts,
          'admin',
          ':sectionName'
        ),
      },
      Login: {
        Root: newInstance<CycleParams>(...cycleParts, 'login'),
        Invitation: newInstance<CycleParams>(...cycleParts, 'login', 'invitation'),
        ResetPassword: newInstance<CycleParams>(...cycleParts, 'login', 'resetPassword'),
      },
      Users: {
        User: newInstance<CycleParams & { id: number }>(...cycleParts, 'users/:id'),
      },
      Country: {
        DataDownload: newInstance<AssessmentParams>(...assessmentParts, 'dataDownload'),
        Landing: newInstance<AssessmentParams>(...assessmentParts),
        Geo: newInstance<AssessmentParams>(...assessmentParts, 'geo'),
        Home: {
          Root: newInstance<AssessmentParams>(...assessmentParts, 'home'),
          Section: newInstance<AssessmentParams & { sectionName: AssessmentHomeRouteNames }>(
            ...assessmentParts,
            'home',
            ':sectionName'
          ),
        },
        OriginalDataPoint: {
          Section: newInstance<AssessmentParams & { year: string; sectionName: string }>(
            ...assessmentParts,
            'originalDataPoints/:year/:sectionName'
          ),
        },
        Print: newInstance<AssessmentParams>(...assessmentParts, 'print'),
        PrintTables: newInstance<AssessmentParams>(...assessmentParts, 'print', 'tables'),
        Section: newInstance<AssessmentParams & { sectionName: string }>(...assessmentParts, 'sections/:sectionName'),
        Users: {
          User: newInstance<AssessmentParams & { id: number }>(...assessmentParts, 'users/:id'),
        },
      },
    },
  },
}
