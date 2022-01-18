import { AssessmentName } from '@meta/assessment'
import { CountryIso } from '@meta/area'

enum defaults {
  assessmentType = ':assessmentType',
  countryIso = ':countryIso',
  id = ':id',
  section = ':section',
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
      assessmentType: AssessmentName | defaults.assessmentType = defaults.assessmentType
    ) => _generate('assessment', countryIso, assessmentType),

    section: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentType: AssessmentName | defaults.assessmentType = defaults.assessmentType,
      section: string | defaults.section = defaults.section
    ) => _generate('assessment', countryIso, assessmentType, section),
    dataDownload: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentType: AssessmentName | defaults.assessmentType = defaults.assessmentType
    ) => _generate('assessment', countryIso, assessmentType, 'dataDownload'),
    print: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentType: AssessmentName | defaults.assessmentType = defaults.assessmentType,
      tables = false
    ) => _generate(countryIso, assessmentType, 'print', tables && 'tables'),
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
