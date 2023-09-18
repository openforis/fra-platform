import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

export const diffNationalClasses = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  // if length is different, a class was added/removed
  if (odpA.nationalClasses.length !== odpB.nationalClasses.length) {
    return {
      diff: {
        field: 'nationalClasses',
        before: JSON.stringify(odpA.nationalClasses.map((nc) => nc.name)),
        after: JSON.stringify(odpB.nationalClasses.map((nc) => nc.name)),
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateNationalClasses,
    }
  }

  for (let i = 0; i < odpA.nationalClasses.length; i += 1) {
    const odpANationalClass = odpA.nationalClasses[i]
    const odpBNationalClass = odpB.nationalClasses.find((nc) => nc.name === odpANationalClass.name)
    if (!odpBNationalClass) {
      return undefined
    }

    if (odpANationalClass.definition !== odpBNationalClass.definition) {
      return {
        diff: {
          field: `nationalClasses.${odpANationalClass.name}.definition`,
          before: odpANationalClass.definition,
          after: odpBNationalClass.definition,
        },
        newMessage: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      }
    }

    if (odpANationalClass.name !== odpBNationalClass.name) {
      return {
        diff: {
          field: `nationalClasses.${odpANationalClass.name}.name`,
          before: odpANationalClass.name,
          after: odpBNationalClass.name,
        },
        newMessage: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      }
    }
  }

  return undefined
}
