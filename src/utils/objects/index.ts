// @ts-ignore
import * as cloneDeep from 'lodash.clonedeep'
// @ts-ignore
import * as isEqual from 'lodash.isequal'
// @ts-ignore
import * as isFunction from 'lodash.isfunction'
// @ts-ignore
import * as merge from 'lodash.merge'
// @ts-ignore
import * as pick from 'lodash.pick'
// @ts-ignore
import * as unset from 'lodash.unset'

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
