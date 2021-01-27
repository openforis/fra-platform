const R = require('ramda')

const types = {
  fn: 'Function',
}

const _isType = type => R.pipe(R.type, R.equals(type))

const isFunction = _isType(types.fn)

module.exports = {
  isFunction,
}
