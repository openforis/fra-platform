import { ActivityLogMessage, ODPNationalClass, OriginalDataPoint } from 'meta/assessment'

export const diffOriginalData = (odpA: OriginalDataPoint, odpB: OriginalDataPoint) => {
  const diffNationalClassesLength = odpA.nationalClasses.length !== odpB.nationalClasses.length

  if (diffNationalClassesLength) {
    return undefined
  }

  const fields = [
    'area',
    'forestPercent',
    'forestNaturalPercent',
    'otherPlantedForestPercent',
    'otherWoodedLandPercent',
    'forestPlantationIntroducedPercent',
    'forestPlantationPercent',
    'forestNaturalForestOfWhichPrimaryForestPercent',
  ] as Array<keyof ODPNationalClass>

  for (let i = 0; i < odpA.nationalClasses.length; i += 1) {
    const odpANationalClass = odpA.nationalClasses[i]
    const odpBNationalClass = odpB.nationalClasses.find((nc) => nc.uuid === odpANationalClass.uuid)
    if (!odpBNationalClass) {
      return undefined
    }

    for (let j = 0; j < fields.length; j += 1) {
      const field = fields[j]
      const fieldDiff = odpANationalClass[field] !== odpBNationalClass[field]

      if (fieldDiff) {
        return {
          diff: {
            field: `nationalClasses.${odpANationalClass.name}.${field}`,
            before: JSON.stringify(odpB.nationalClasses[i][field]),
            after: JSON.stringify(odpA.nationalClasses[i][field]),
          },
          newMessage: ActivityLogMessage.originalDataPointUpdateOriginalData,
        }
      }
    }
  }

  return undefined
}
