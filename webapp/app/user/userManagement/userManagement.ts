// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { reviewer, nationalCorrespondent, alternateNationalCorrespondent, collaborator } from '@common/countryRole'

const roles = [reviewer.role, nationalCorrespondent.role, alternateNationalCorrespondent.role, collaborator.role]

const validName = (user: any) => !R.isEmpty(R.trim(user.name))
const validRole = (user: any) => R.contains(user.role, roles)
const validEmail = (user: any) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(user.email)
}

export const newUser = () => ({
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'id' implicitly has an '... Remove this comment to see the full error message
  id: null,
  name: '',
  role: '',
  email: '',
})

export const validUser = (user: any) => validName(user) && validRole(user) && validEmail(user)

export const validField = (user: any, field: any) =>
  field === 'name' ? validName(user) : field === 'role' ? validRole(user) : validEmail(user)

export const updateUserField = (field: any, value: any) => R.assoc(field, value)
