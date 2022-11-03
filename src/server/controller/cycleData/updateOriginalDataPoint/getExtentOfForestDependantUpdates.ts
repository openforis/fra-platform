import { ODPs, TableNames } from '@meta/assessment'

import { calculateDependantNodes } from '@server/controller/cycleData/persistNodeValue/calculateDependantNodes'
import { validateNodeUpdates } from '@server/controller/cycleData/persistNodeValue/validateNodeUpdates'
import { updateDependantsProps } from '@server/controller/cycleData/updateOriginalDataPoint/updateDependantsProps'

export const getExtentOfForestDependantUpdates = async (props: updateDependantsProps) => {
  const { countryIso, assessment, user, colName, cycle, client, updatedOriginalDataPoint } = props

  const tableName = TableNames.extentOfForest
  const variableName = 'forestArea'
  const nodeUpdates = await calculateDependantNodes(
    {
      countryIso,
      assessment,
      cycle,
      sectionName: 'extentOfForest',
      tableName,
      user,
      colName,
      variableName,
    },
    client
  )

  const nodeUpdatesValidation = await validateNodeUpdates({ nodeUpdates }, client)

  const raw = String(ODPs.calcTotalFieldArea({ originalDataPoint: updatedOriginalDataPoint, field: 'forestPercent' }))

  nodeUpdatesValidation.nodes.unshift({
    tableName: 'originalDataPointValue',
    variableName,
    colName,
    value: { raw, odp: true },
  })

  return nodeUpdatesValidation
}
