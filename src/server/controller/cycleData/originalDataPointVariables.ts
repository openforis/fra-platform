// To further expand
import { TableNames } from '@meta/assessment'

type Variable = {
  // metadata properties
  sectionName: string
  tableName: string
  variableName: string
}
export const originalDataPointVariables: Array<Variable> = [
  // 1a
  { sectionName: 'extentOfForest', tableName: TableNames.extentOfForest, variableName: 'forestArea' },
  { sectionName: 'extentOfForest', tableName: TableNames.extentOfForest, variableName: 'otherLand' },
  { sectionName: 'extentOfForest', tableName: TableNames.extentOfForest, variableName: 'otherWoodedLand' },
  { sectionName: 'extentOfForest', tableName: TableNames.extentOfForest, variableName: 'totalLandArea' },
  // 1b
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
