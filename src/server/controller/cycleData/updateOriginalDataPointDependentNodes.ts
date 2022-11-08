import { CountryIso } from '@meta/area'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol } from '@server/db'

import { calculateAndValidateDependentNodes } from './persistNodeValue/calculateAndValidateDependentNodes'

const dependencies: Array<{ sectionName: string; tableName: string; variableName: string }> = [
  { sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'forestArea' },
  { sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'otherLand' },
  { sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'otherWoodedLand' },
  { sectionName: 'extentOfForest', tableName: 'extentOfForest', variableName: 'totalLandArea' },
]

export const updateOriginalDataPointDependentNodes = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    countryIso: CountryIso
    originalDataPoint: OriginalDataPoint
    user: User
  },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, countryIso, cycle, originalDataPoint, user } = props

  for (let i: 0; i < dependencies.length; i += 1) {
    const { sectionName, tableName, variableName } = dependencies[i]

    // eslint-disable-next-line no-await-in-loop
    await calculateAndValidateDependentNodes(
      {
        colName: String(originalDataPoint.year),
        cycle,
        nodeUpdates: { assessment, cycle, countryIso, nodes: [] },
        sectionName,
        tableName,
        user,
        variableName,
        assessment,
        countryIso,
      },
      client
    )
  }
}
