// Values come from the env file (.env / .env.$NODE_ENV_SCRIPT — see .env.template); k6 -e flags override
const required = (name: string): string => {
  const value = __ENV[name]
  if (!value) throw new Error(`missing env var ${name} (see the stress test section in .env.template)`)
  return value
}

export const baseUrl = required('APP_URI')

// TODO:
// export const assessmentName = required('STRESS_TEST_ASSESSMENT_NAME')
// export const cycleName = required('STRESS_TEST_CYCLE_NAME')
// export const countries = required('STRESS_TEST_COUNTRIES').split(',')
// export const editors = Number(required('STRESS_TEST_EDITORS'))
// export const duration = required('STRESS_TEST_DURATION')
