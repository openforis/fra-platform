import * as R from 'ramda'

const validName = user => !R.isEmpty(user.name)
const validRole = user => R.contains(user.role, ['REVIEWER', 'NATIONAL_CORRESPONDENT', 'COLLABORATOR'])
const validEmail = user => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(user.email)
}

export const newUser = () => ({
  id: null,
  name: '',
  role: '',
  email: ''
})

export const validUser = user => validName(user) && validRole(user) && validEmail(user)

export const validField = (user, field) =>
  field === 'name'
    ? validName(user)
    : field === 'role'
      ? validRole(user)
      : validEmail(user)

export const updateUserField = (field, value) => R.assoc(field, value)

export const updateListUserField = (userId, field, value) => R.pipe(
  R.find(R.propEq('id', userId)),
  updateUserField(field, value)
)
