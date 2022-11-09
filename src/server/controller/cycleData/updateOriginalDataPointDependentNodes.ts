import { CountryIso } from '@meta/area'
import { Assessment, Cycle, OriginalDataPoint, TableNames } from '@meta/assessment'
import { NodeUpdates } from '@meta/data'
import { User } from '@meta/user'

import { BaseProtocol } from '@server/db'

import { calculateAndValidateDependentNodes } from './persistNodeValue/calculateAndValidateDependentNodes'

const dependencies: Array<{ sectionName: string; tableName: string; variableName: string }> = [
  { sectionName: 'extentOfForest', tableName: TableNames.extentOfForest, variableName: 'forestArea' },
  { sectionName: 'extentOfForest', tableName: TableNames.extentOfForest, variableName: 'otherLand' },
  { sectionName: 'extentOfForest', tableName: TableNames.extentOfForest, variableName: 'otherWoodedLand' },
  { sectionName: 'extentOfForest', tableName: TableNames.extentOfForest, variableName: 'totalLandArea' },

  {
    sectionName: 'forestCharacteristics',
    tableName: TableNames.forestCharacteristics,
    variableName: 'naturalForestArea',
  },
  { sectionName: 'forestCharacteristics', tableName: TableNames.forestCharacteristics, variableName: 'primaryForest' },
  { sectionName: 'forestCharacteristics', tableName: TableNames.forestCharacteristics, variableName: 'plantedForest' },
  {
    sectionName: 'forestCharacteristics',
    tableName: TableNames.forestCharacteristics,
    variableName: 'plantationForestArea',
  },
  {
    sectionName: 'forestCharacteristics',
    tableName: TableNames.forestCharacteristics,
    variableName: 'plantationForestIntroducedArea',
  },
  {
    sectionName: 'forestCharacteristics',
    tableName: TableNames.forestCharacteristics,
    variableName: 'otherPlantedForestArea',
  },
  {
    sectionName: 'forestCharacteristics',
    tableName: TableNames.forestCharacteristics,
    variableName: 'totalForestArea',
  },
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

  for (let i = 0; i < dependencies.length; i += 1) {
    const { sectionName, tableName, variableName } = dependencies[i]

    const colName = String(originalDataPoint.year)
    const nodeUpdates: NodeUpdates = { assessment, cycle, countryIso, nodes: [] }

    // eslint-disable-next-line no-await-in-loop
    await calculateAndValidateDependentNodes(
      { colName, cycle, nodeUpdates, sectionName, tableName, user, variableName, assessment, countryIso },
      client
    )
  }
}
