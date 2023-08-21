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

export enum AdminRouteNames {
  userManagement = 'userManagement',
  // dataExport = 'dataExport',
}

const cycleParts = ['assessments', ':assessmentName', ':cycleName']

const assessmentParts = cycleParts.concat(':countryIso')

/**
 * @deprecated
 */
export const ClientRoutes = {
  Root: { path: '/' },

  Assessment: {
    Cycle: {
      Country: {
        OriginalDataPoint: {
          Section: newInstance<AssessmentParams & { year: string; sectionName: string }>(
            ...assessmentParts,
            'originalDataPoints/:year/:sectionName'
          ),
        },
        Section: newInstance<AssessmentParams & { sectionName: string }>(...assessmentParts, 'sections/:sectionName'),
        Users: {
          User: newInstance<AssessmentParams & { id: number }>(...assessmentParts, 'users/:id'),
        },
      },
    },
  },
}
