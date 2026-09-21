import type { CountryIso } from '../../meta/area/countryIso'

// Values are passed by run.sh as k6 -e flags (see README.md)
const required = (name: string): string => {
  const value = __ENV[name]
  if (!value) throw new Error(`missing env var ${name} (run through run.sh, or pass it as a k6 -e flag)`)
  return value
}

export const baseUrl = required('HOST')
export const assessmentName = __ENV.ASSESSMENT_NAME || 'fra'
export const cycleName = __ENV.CYCLE_NAME || '2025'

// Auth: either a ready-made token, or credentials to log in with (see auth.ts)
export const token = __ENV.TOKEN
export const email = __ENV.STRESS_TEST_EMAIL
export const password = __ENV.STRESS_TEST_PASSWORD

// Load shape
export const users = Number(__ENV.USERS || 100)
export const duration = __ENV.DURATION || '5m'
export const countries = (__ENV.COUNTRIES || 'X09,X10').split(',') as Array<CountryIso>

export const cycleParams = (countryIso: CountryIso): string =>
  `assessmentName=${assessmentName}&cycleName=${cycleName}&countryIso=${countryIso}`
