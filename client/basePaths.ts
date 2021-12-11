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
    ) => _generate(countryIso, assessmentType),
    section: (
      countryIso: CountryIso | defaults.countryIso = defaults.countryIso,
      assessmentType: AssessmentName | defaults.assessmentType = defaults.assessmentType,
      section: string | defaults.section = defaults.section
    ) => _generate(countryIso, assessmentType, section),
  },
  Login: {
    root: () => '/login',
    resetPassword: () => `/login/resetPassword`,
  },
  User: {
    root: (id: number | defaults.id = defaults.id) => `/user/${id}`,
  },
}
