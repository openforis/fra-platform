// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'keys'.
const keys = {
  id: 'id',
  name: 'name',
  roles: 'roles',
}
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getId'.
const getId = R.prop((keys as any).id)
const getName = R.prop((keys as any).names)
const getRoles = R.propOr([], (keys as any).roles)
module.exports = {
  getId,
  getName,
  getRoles,
}
