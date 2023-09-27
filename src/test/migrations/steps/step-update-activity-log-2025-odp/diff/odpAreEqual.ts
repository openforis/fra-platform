import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

// Object key value can be : string | number | array
const deepCompare = (a: any, b: any): any => {
  if (typeof a !== typeof b) {
    return false
  }
  if (typeof a === 'string' || typeof a === 'number') {
    return a === b
  }
  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false
    }
    return a.every((aItem, index) => {
      return deepCompare(aItem, b[index])
    })
  }
  // a and b are objects
  const aKeys = Object.keys(a || {})
  const bKeys = Object.keys(b || {})
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every((key) => {
    return deepCompare(a[key], b[key])
  })
}

export const odpAreEqual = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  // When creating ODP id can be a number, after it is updated to string
  // eslint-disable-next-line no-param-reassign
  odpA.id = Number(odpA.id)
  // eslint-disable-next-line no-param-reassign
  odpB.id = Number(odpB.id)

  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  odpA.idLegacy = Number(odpA.idLegacy)
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  odpB.idLegacy = Number(odpB.idLegacy)

  const equal = deepCompare(odpA, odpB)

  if (equal) {
    return {
      diff: {
        field: 'EQUAL',
        before: JSON.stringify(odpB),
        after: JSON.stringify(odpA),
      },
      newMessage: 'EQUAL' as ActivityLogMessage,
    }
  }
  return undefined
}
