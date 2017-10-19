import * as R from 'ramda'

const validEmail = user => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(user.email)
}

const validString = value => R.pipe(
  R.isEmpty,
  R.not
)(value)

const validRole = user => validString(user.role)
const validName = user => validString(user.name)

export const newUser = () => ({
  id: null,
  name: '',
  role: '',
  email: ''
})

export const validationField = field => `${field}Valid`

const validUser = user => validName(user) && validRole(user) && validEmail(user)

const validField = (user, field) =>
  field === 'name'
    ? validName(user)
    : field === 'role'
    ? validRole(user)
    : validEmail(user)

const validateField = (user, field) => R.assoc(validationField(field), validField(user, field))(user)

export const validateUser = user => R.pipe(
  R.partialRight(validateField, ['name']),
  R.partialRight(validateField, ['role']),
  R.partialRight(validateField, ['email']),
  R.assoc('valid', validUser(user))
)(user)

export const updateUserField = (field, value) => R.pipe(
  R.assoc(field, value),
  R.partialRight(validateField, [field]),
  user => R.assoc('valid', validUser(user))(user)
)

export const updateListUserField = (userId, field, value) => R.pipe(
  R.find(R.propEq('id', userId)),
  updateUserField(field, value)
)
