import * as R from 'ramda'

const keys = {
  id: 'id',
  name: 'name',
  roles: 'roles',
}
export const getId = R.prop((keys as any).id)
export const getName = R.prop((keys as any).names)
export const getRoles = R.propOr([], (keys as any).roles)
export default {
  getId,
  getName,
  getRoles,
}
