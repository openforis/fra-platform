// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

const types = {
  fn: 'Function',
}

const _isType = (type: any) => R.pipe(R.type, R.equals(type))

const isFunction = _isType(types.fn)

module.exports = {
  isFunction,
}
