import * as R from 'ramda'

const types = {
  fn: 'Function',
}

const _isType = (type: any) => R.pipe(R.type, R.equals(type))

/**
 * @deprecated.
 * use Objects.isFunction
 */
export const isFunction = _isType(types.fn)

export default {
  isFunction,
}
