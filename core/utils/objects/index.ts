// @ts-ignore
import * as cloneDeep from 'lodash.clonedeep'
// @ts-ignore
import * as isEqual from 'lodash.isequal'
// @ts-ignore
import * as isFunction from 'lodash.isfunction'
// @ts-ignore
import * as isNil from 'lodash.isnil'

import { camelize } from './camelize'
import { isEmpty } from './isEmpty'
import { propertyOf } from './propertyOf'
import { setInPath } from './setInPath'

export const Objects = {
  camelize,
  cloneDeep,
  isEmpty,
  isEqual,
  isFunction,
  isNil,
  propertyOf,
  setInPath,
}
