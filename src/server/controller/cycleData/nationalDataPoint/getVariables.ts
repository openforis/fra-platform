// To further expand
import { Cycle } from 'meta/assessment/cycle'
import { VariableCache } from 'meta/assessment/metaCache'
import { TableNames } from 'meta/assessment/table'

type Variable = {
  // metadata properties
  sectionName: string
  tableName: string
  variableName: string
}

export const getVariables = (props: { cycle: Cycle; sectionName?: string }): Array<Variable> => {
  const { cycle, sectionName } = props
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
    {
      sectionName: 'forestCharacteristics',
      tableName: TableNames.forestCharacteristics,
      variableName: 'primaryForest',
    },
    {
      sectionName: 'forestCharacteristics',
      tableName: TableNames.forestCharacteristics,
      variableName: 'plantedForest',
    },
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

  if (cycle.name === '2025') {
    originalDataPointVariables.push({
      sectionName: 'forestCharacteristics',
      tableName: TableNames.forestCharacteristics,
      variableName: 'primaryForest',
    })
  }

  if (sectionName) {
    return originalDataPointVariables.filter((variable) => variable.sectionName === sectionName)
  }

  return originalDataPointVariables
}

// Find given variable from ODPVariables
export const isODPVariable = (cycle: Cycle, variable: VariableCache): boolean => {
  return getVariables({ cycle }).some((odpVariable) => {
    return ['tableName', 'variableName'].every(
      (key) => variable[key as keyof VariableCache] === odpVariable[key as keyof Variable]
    )
  })
}
