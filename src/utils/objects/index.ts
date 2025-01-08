import cloneDeep from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'
import isFunction from 'lodash.isfunction'
import merge from 'lodash.merge'
import pick from 'lodash.pick'
import unset from 'lodash.unset'

import { camelize } from './camelize'
import { getDiff } from './getDiff'
import { getInPath } from './getInPath'
import { isEmpty } from './isEmpty'
import { isNil } from './isNil'
import { propertyOf } from './propertyOf'
import { setInPath } from './setInPath'

export const Objects = {
  camelize,
  cloneDeep,
  getDiff,
  getInPath,
  isEmpty,
  isEqual,
  isFunction,
  isNil,
  merge,
  pick,
  propertyOf,
  setInPath,
  unset,
}
