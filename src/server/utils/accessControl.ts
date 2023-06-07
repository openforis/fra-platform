export function AccessControlException(key: any, values: any) {
  // @ts-ignore
  this.error = { key, values }
  // @ts-ignore
  Error.captureStackTrace(this, AccessControlException)
}

AccessControlException.prototype = Object.create(Error.prototype)
AccessControlException.prototype.name = 'AccessControlException'
AccessControlException.prototype.constructor = AccessControlException
