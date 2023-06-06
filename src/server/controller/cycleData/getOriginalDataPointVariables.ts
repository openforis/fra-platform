// To further expand
import { Cycle, TableNames, VariableCache } from 'meta/assessment'

type Variable = {
  // metadata properties
  sectionName: string
  tableName: string
  variableName: string
}

const originalDataPointVariables: Array<Variable> = [
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

export const getOriginalDataPointVariables = (cycle: Cycle) => {
  if (cycle.name === '2025') {
    return [
      ...originalDataPointVariables,
      {
        sectionName: 'forestCharacteristics',
        tableName: TableNames.forestCharacteristics,
        variableName: 'primaryForest',
      },
    ]
  }
  return originalDataPointVariables
}

// Find given variable from ODPVariables
export const isODPVariable = (cycle: Cycle, variable: VariableCache): boolean => {
  return getOriginalDataPointVariables(cycle).some((odpVariable) => {
    const keys: Array<keyof VariableCache> = ['tableName', 'variableName']
    return keys.every((key) => variable[key] === odpVariable[key])
  })
}
