// @ts-ignore
import * as isEqual from 'lodash.isequal'
// @ts-ignore
import * as isFunction from 'lodash.isfunction'

import { camelize } from './camelize'
import { isEmpty } from './isEmpty'
import { propertyOf } from './propertyOf'
import { setInPath } from './setInPath'

export const Objects = {
  camelize,
  isEmpty,
  isEqual,
  isFunction,
  propertyOf,
  setInPath,
}
