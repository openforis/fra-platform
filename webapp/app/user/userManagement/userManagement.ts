import * as R from 'ramda'

import { reviewer, nationalCorrespondent, alternateNationalCorrespondent, collaborator } from '@common/countryRole'

const roles = [reviewer.role, nationalCorrespondent.role, alternateNationalCorrespondent.role, collaborator.role]

const validName = (user: any) => !R.isEmpty(R.trim(user.name))
const validRole = (user: any) => R.contains(user.role, roles)
const validEmail = (user: any) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(user.email)
}

export const newUser = () => ({
  id: null,
  name: '',
  role: '',
  email: '',
}) as any

export const validUser = (user: any) => validName(user) && validRole(user) && validEmail(user)

export const validField = (user: any, field: any) =>
  field === 'name' ? validName(user) : field === 'role' ? validRole(user) : validEmail(user)

export const updateUserField = (field: any, value: any) => R.assoc(field, value)
