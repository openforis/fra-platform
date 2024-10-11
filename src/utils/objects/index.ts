// @ts-ignore
import * as cloneDeep from 'lodash.clonedeep'
// @ts-ignore
import * as isEqual from 'lodash.isequal'
// @ts-ignore
import * as isFunction from 'lodash.isfunction'
// @ts-ignore
import * as isNil from 'lodash.isnil'
// @ts-ignore
import * as pick from 'lodash.pick'
// @ts-ignore
import * as unset from 'lodash.unset'
import { getInPath } from 'utils/objects/getInPath'

import { camelize } from './camelize'
import { getDiffAsPartialObject } from './getDiffAsPartialObject'
import { isEmpty } from './isEmpty'
import { mergePartial } from './mergePartial'
import { propertyOf } from './propertyOf'
import { setInPath } from './setInPath'

export const Objects = {
  camelize,
  cloneDeep,
  getDiffAsPartialObject,
  getInPath,
  isEmpty,
  isEqual,
  isFunction,
  isNil,
  mergePartial,
  pick,
  propertyOf,
  setInPath,
  unset,
}
