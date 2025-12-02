import cloneDeep from 'lodash.clonedeep'
import isEqual from 'lodash.isequal'
import isFunction from 'lodash.isfunction'
import merge from 'lodash.merge'
import pick from 'lodash.pick'
import set from 'lodash.set'
import unset from 'lodash.unset'

import { camelize } from 'utils/objects/camelize'
import { flatten } from 'utils/objects/flatten'
import { getDiff } from 'utils/objects/getDiff'
import { getInPath } from 'utils/objects/getInPath'
import { isEmpty } from 'utils/objects/isEmpty'
import { isNil } from 'utils/objects/isNil'
import { propertyOf } from 'utils/objects/propertyOf'
import { setInPath } from 'utils/objects/setInPath'

export const Objects = {
  camelize,
  cloneDeep,
  flatten,
  getDiff,
  getInPath,
  isEmpty,
  isEqual,
  isFunction,
  isNil,
  merge,
  pick,
  propertyOf,
  set,
  setInPath,
  unset,
}
