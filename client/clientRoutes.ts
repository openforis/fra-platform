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
      root: { path: 'originalDataPoint/:year/*' },

      section: {
        path: ':section',

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
    resetPassword: { path: 'resetPassword' },
    invitation: { path: 'invitation' },
  },

  Geo: {
    root: { path: '/:countryIso/geo/*' },
  },
}
