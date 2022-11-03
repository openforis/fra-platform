import { ODPs, TableNames } from '@meta/assessment'

import { calculateDependantNodes } from '@server/controller/cycleData/persistNodeValue/calculateDependantNodes'
import { validateNodeUpdates } from '@server/controller/cycleData/persistNodeValue/validateNodeUpdates'
import { nodeExists } from '@server/controller/cycleData/updateOriginalDataPoint/nodeExists'
import { updateDependantsProps } from '@server/controller/cycleData/updateOriginalDataPoint/updateDependantsProps'

export const getForestCharacteristicsDependantUpdates = async (props: updateDependantsProps) => {
  const { countryIso, assessment, user, colName, cycle, client, updatedOriginalDataPoint } = props

  const variableNames = [
    'naturalForestArea',
    'plantationForestArea',
    'plantationForestIntroducedArea',
    'otherPlantedForestArea',
  ]

  const nodeUpdates = await Promise.all(
    variableNames.map((variableName) =>
      calculateDependantNodes(
        {
          countryIso,
          assessment,
          cycle,
          sectionName: 'forestCharacteristics',
          tableName: TableNames.forestCharacteristics,
          user,
          colName,
          variableName,
        },
        client
      )
    )
  )

  const nodeUpdatesValidations = await Promise.all(
    nodeUpdates.map((nodeUpdate) => validateNodeUpdates({ nodeUpdates: nodeUpdate }, client))
  )
  // Merge updates to avoid multiple updates on same node
  // Base values (assessment, cycle, countryIso) are the same
  const nodeUpdatesValidationsMerged = nodeUpdatesValidations.shift()

  // Merge updates if they don't already exist
  nodeUpdatesValidations.forEach((nodeValidation) => {
    nodeValidation.nodes.forEach((currentNode) => {
      if (!nodeExists(currentNode, nodeUpdatesValidationsMerged.nodes)) {
        nodeUpdatesValidationsMerged.nodes.push(currentNode)
      }
    })
  })

  // Add forestCharacteristics variables
  const values: Record<string, string> = {
    naturalForestArea: String(
      ODPs.calcTotalSubFieldArea({
        originalDataPoint: updatedOriginalDataPoint,
        field: 'forestPercent',
        subField: 'forestNaturalPercent',
      })
    ),
    plantationForestArea: String(
      ODPs.calcTotalSubFieldArea({
        originalDataPoint: updatedOriginalDataPoint,
        field: 'forestPercent',
        subField: 'forestPlantationPercent',
      })
    ),
    plantationForestIntroducedArea: String(
      ODPs.calcTotalSubSubFieldArea({
        originalDataPoint: updatedOriginalDataPoint,
        field: 'forestPercent',
        subField: 'forestPlantationPercent',
        subSubField: 'forestPlantationIntroducedPercent',
      })
    ),
    otherPlantedForestArea: String(
      ODPs.calcTotalSubFieldArea({
        originalDataPoint: updatedOriginalDataPoint,
        field: 'forestPercent',
        subField: 'otherPlantedForestPercent',
      })
    ),
  }

  const tableName = 'originalDataPointValue'
  variableNames.forEach((variableName) => {
    const nodeUpdateProps = {
      tableName,
      variableName,
      colName,
      value: { raw: values[variableName], odp: true },
    }
    // Replace if already exists, else prepend
    nodeUpdatesValidationsMerged.nodes.unshift(nodeUpdateProps)
  })

  return nodeUpdatesValidationsMerged
}
