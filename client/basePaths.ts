import { AssessmentName } from '@meta/assessment'
import { CountryIso } from '@meta/area'

enum defaults {
  assessmentName = ':assessmentName',
  countryIso = ':countryIso',
  cycleName = ':cycleName',
  id = ':id',
  section = ':section',
  odpId = ':odpId',
}

const _generate = (...parts: any[]) => `/${parts.filter(Boolean).join('/')}`

export const BasePaths = {
  Root: () => '/',
  Admin: {
    root: () => '/admin',
  },
  Assessment: {
    root: (
      countryIso: CountryIso | defaults.countryIso | string = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName
    ) => _generate(countryIso, 'assessments', assessmentName, cycleName),

    section: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName,
      section: string | defaults.section = defaults.section
    ) => _generate(countryIso, 'assessments', assessmentName, cycleName, section),
    dataDownload: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName
    ) => _generate(countryIso, 'assessments', assessmentName, cycleName, 'dataDownload'),
    print: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName,
      tables = false
    ) => _generate(countryIso, assessmentName, cycleName, 'print', tables && 'tables'),
    OriginalDataPoint: {
      one: (
        countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
        assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
        cycleName: string = defaults.cycleName,
        odpId = ':odpId'
      ) => _generate(countryIso, 'assessments', assessmentName, cycleName, 'originalDataPoint', odpId),
      section: (
        countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
        assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
        cycleName: string = defaults.cycleName,
        odpId = ':odpId',
        section: string
      ) => _generate(countryIso, 'assessments', assessmentName, cycleName, 'originalDataPoint', odpId, section),
      tab: (section: string | defaults.section = defaults.section) =>
        _generate(
          defaults.countryIso,
          'assessments',
          defaults.assessmentName,
          defaults.cycleName,
          'originalDataPoint',
          defaults.odpId,
          section
        ),
    },
  },
  Login: {
    root: () => '/login',
    resetPassword: () => `/login/resetPassword`,
    invitation: () => '/login/invitation',
  },

  User: {
    root: (id: number | defaults.id = defaults.id) => `/user/${id}`,
  },
}
