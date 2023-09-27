import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

export const migrationError = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  // @ts-ignore idLegacy is old reference id that is not used, but we need to check if it was changed
  if (typeof odpA.idLegacy !== typeof odpB.idLegacy) {
    return {
      diff: {
        field: 'ERROR.idLegacy',
        // @ts-ignore
        before: JSON.stringify(odpB.idLegacy),
        // @ts-ignore
        after: JSON.stringify(odpA.idLegacy),
      },
      newMessage: 'ERROR' as ActivityLogMessage,
    }
  }

  // check 2
  if (typeof odpA.id !== typeof odpB.id) {
    return {
      diff: {
        field: 'ERROR.id',
        before: JSON.stringify(odpB.id),
        after: JSON.stringify(odpA.id),
      },
      newMessage: 'ERROR' as ActivityLogMessage,
    }
  }

  return undefined
}
