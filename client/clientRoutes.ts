import { generatePath } from 'react-router'

import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

type ClientRoute<Params> = {
  path: {
    absolute: string
    relative: string
  }
  getLink: (params: Params) => string
}

const newInstance = <Params>(...parts: Array<string>): ClientRoute<Params> => {
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
  countryIso: CountryIso
  assessmentName: AssessmentName
  cycleName: string
}

const assessmentParts = [':countryIso', 'assessments', ':assessmentName', ':cycleName']

export const ClientRoutes = {
  Admin: {
    Root: newInstance<void>('admin'),
    root: { path: '/admin/*' },
  },
  Assessment: {
    Root: newInstance<AssessmentParams>(...assessmentParts),
    Home: {
      Root: newInstance<AssessmentParams>(...assessmentParts, 'home'),
      Section: newInstance<AssessmentParams & { section: string }>(...assessmentParts, 'home', ':section'),
    },
    Section: newInstance<AssessmentParams & { section: string }>(...assessmentParts, ':section'),
    OriginalDataPoint: {
      Section: newInstance<AssessmentParams & { year: string; section: string }>(
        ...assessmentParts,
        'originalDataPoint/:year/:section'
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

  User: {
    Root: newInstance<{ id: number }>('user', ':id'),
  },
}
