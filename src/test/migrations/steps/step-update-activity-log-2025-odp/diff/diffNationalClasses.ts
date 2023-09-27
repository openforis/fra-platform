import { ActivityLogMessage, OriginalDataPoint } from 'meta/assessment'

export const diffNationalClasses = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  // if length is different, a class was added/removed
  const diffLength = odpA.nationalClasses.length !== odpB.nationalClasses.length
  if (diffLength) {
    return {
      diff: {
        field: 'nationalClasses',
        before: JSON.stringify(odpB.nationalClasses.map((nc) => nc.name)),
        after: JSON.stringify(odpA.nationalClasses.map((nc) => nc.name)),
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateNationalClasses,
    }
  }

  const ncAUUIDs = odpA.nationalClasses.map((nc) => nc.uuid)
  const ncBUUIDs = odpB.nationalClasses.map((nc) => nc.uuid)
  const diffUUIDs =
    ncAUUIDs.some((uuid) => !ncBUUIDs.includes(uuid)) || ncBUUIDs.some((uuid) => !ncAUUIDs.includes(uuid))

  if (diffUUIDs) {
    return {
      diff: {
        field: 'nationalClasses',
        before: JSON.stringify(odpB.nationalClasses.map((nc) => nc.name)),
        after: JSON.stringify(odpA.nationalClasses.map((nc) => nc.name)),
      },
      newMessage: ActivityLogMessage.originalDataPointUpdateNationalClasses,
    }
  }

  for (let i = 0; i < odpA.nationalClasses.length; i += 1) {
    const odpANationalClass = odpA.nationalClasses[i]
    const odpBNationalClass = odpB.nationalClasses.find((nc) => nc.uuid === odpANationalClass.uuid)

    if (!odpBNationalClass) {
      return undefined
    }

    const diffDefinition = odpANationalClass.definition !== odpBNationalClass.definition
    if (diffDefinition) {
      return {
        diff: {
          field: `nationalClasses.${odpANationalClass.name}.definition`,
          before: odpBNationalClass.definition,
          after: odpANationalClass.definition,
        },
        newMessage: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      }
    }

    const diffName = odpANationalClass.name !== odpBNationalClass.name
    if (diffName) {
      return {
        diff: {
          field: `nationalClasses.${odpANationalClass.name}.name`,
          before: odpBNationalClass.name,
          after: odpANationalClass.name,
        },
        newMessage: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      }
    }
  }
  return undefined
}
