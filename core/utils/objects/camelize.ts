export const _camelCase = (str: string): string => str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase())

export const _walk = (options: { object: any; skip?: string[] }): any => {
  const { object, skip = [] } = options
  if (!object || !(object instanceof Object) || object instanceof Date || object instanceof RegExp) {
    return object
  }
  if (Array.isArray(object)) {
    return object.map((item) => _walk({ object: item }))
  }
  return Object.entries(object).reduce((objAcc, [key, value]) => {
    const skipped = skip.includes(key)
    const keyTransformed = skipped ? key : _camelCase(key)
    const valueTransformed: any = skipped ? value : _walk({ object: value })
    return { ...objAcc, [keyTransformed]: valueTransformed }
  }, {})
}

/**
 * Recursively transform the keys of the specified object to camel-case.
 *
 * @param {!object} [object] - Object to be camelized
 * @param {!object} [options] - The camelize options.
 * @param {Array} [options.skip=array[]] - An optional list of keys to skip.
 *
 * @returns {any} - The object with keys in camel case or the value in camel case.
 */

export const camelize = (object: any, options: { skip?: string[] } = {}): any => {
  if (object instanceof String || typeof object === 'string') {
    return _camelCase(object as string)
  }

  const { skip } = options
  return _walk({ object, skip })
}
