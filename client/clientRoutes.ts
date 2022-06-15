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

type BasePath<Params> = {
  path: string
  generatePath: (params: Params) => string
}

const newInstance = <Params>(props: { path: string }): BasePath<Params> => {
  const { path } = props
  return {
    path,
    generatePath: (params: Params) => generatePath(`/${path}`, params),
  }
}

export const ClientRoutes = {
  Admin: {
    root: { path: '/admin' },
  },

  Assessment: {
    root: newInstance<{ countryIso: CountryIso; assessmentName: AssessmentName; cycleName: string }>({
      path: '/:countryIso/assessments/:assessmentName/:cycleName',
    }),

    home: newInstance<{
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      route?: AssessmentHomeRouteNames
    }>({
      path: '/:countryIso/assessments/:assessmentName/:cycleName/home/:route?',
    }),

    section: newInstance<{
      countryIso: CountryIso
      assessmentName: AssessmentName
      cycleName: string
      section: string
    }>({
      path: '/:countryIso/assessments/:assessmentName/:cycleName/:section',
    }),

    OriginalDataPoint: {
      root: newInstance<{
        countryIso: CountryIso
        assessmentName: AssessmentName
        cycleName: string
        year: string
      }>({
        path: '/:countryIso/assessments/:assessmentName/:cycleName/originalDataPoint/:year',
      }),
      section: newInstance<{
        countryIso: CountryIso
        assessmentName: AssessmentName
        cycleName: string
        year: string
        section: string
      }>({
        path: '/:countryIso/assessments/:assessmentName/:cycleName/originalDataPoint/:year/:section',
      }),
    },
  },

  Login: {
    root: { path: '/login' },
    resetPassword: { path: '/login/resetPassword' },
    invitation: { path: '/login/invitation' },
  },

  Geo: {
    root: newInstance<{ countryIso: CountryIso }>({ path: '/:countryIso/geo' }),
  },
}
