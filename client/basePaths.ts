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
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName
    ) => _generate('assessment', countryIso, assessmentName),

    section: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      section: string | defaults.section = defaults.section
    ) => _generate('assessment', countryIso, assessmentName, section),
    dataDownload: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName
    ) => _generate('assessment', countryIso, assessmentName, 'dataDownload'),
    print: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      tables = false
    ) => _generate(countryIso, assessmentName, 'print', tables && 'tables'),
  },
  Login: {
    root: () => '/login',
    resetPassword: () => `/login/resetPassword`,
    invitation: () => '/login/invitation',
  },
  OriginalDataPoint: {
    root: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName,
      odpId = ':odpId'
    ) => _generate(countryIso, assessmentName, cycleName, 'originalDataPoint', odpId),
    section: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentName: AssessmentName | defaults.assessmentName = defaults.assessmentName,
      cycleName: string = defaults.cycleName,
      odpId = ':odpId',
      section: string
    ) => _generate(countryIso, assessmentName, cycleName, 'originalDataPoint', odpId, section),
    tab: (section: string | defaults.section = defaults.section) =>
      _generate(
        defaults.countryIso,
        defaults.assessmentName,
        defaults.cycleName,
        'originalDataPoint',
        defaults.odpId,
        section
      ),
  },
  User: {
    root: (id: number | defaults.id = defaults.id) => `/user/${id}`,
  },
}
