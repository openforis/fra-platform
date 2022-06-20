import { generatePath } from 'react-router'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export enum AssessmentHomeRouteNames {
  overview = 'overview',
  messageBoard = 'messageBoard',
  contentCheck = 'contentCheck',
  userManagement = 'userManagement',
  recentActivity = 'recentActivity',
  links = 'links',
}

export const ClientRoutes = {
  Admin: {
    root: { path: '/admin/*' },
  },

  Assessment: {
    root: {
      path: '/:countryIso/assessments/:assessmentName/:cycleName/*',

      getAbsolutePath: (params: {
        countryIso: CountryIso
        assessmentName: AssessmentName
        cycleName: string
      }): string => generatePath('/:countryIso/assessments/:assessmentName/:cycleName', params),
    },

    dataDownload: { path: 'dataDownload' },

    section: { path: ':section' },

    Home: {
      root: { path: 'home/*' },

      route: { path: ':route' },
    },

    OriginalDataPoint: {
      section: {
        path: 'originalDataPoint/:year/:section',

        getAbsolutePath: (params: {
          countryIso: CountryIso
          assessmentName: AssessmentName
          cycleName: string
          year: string
          section: string
        }) =>
          generatePath('/:countryIso/assessments/:assessmentName/:cycleName/originalDataPoint/:year/:section', params),
      },
    },
  },

  Login: {
    root: { path: '/login/*' },
    invitation: { path: 'invitation' },
    resetPassword: { path: 'resetPassword' },
  },

  Geo: {
    root: { path: '/:countryIso/geo/*' },
  },
}
