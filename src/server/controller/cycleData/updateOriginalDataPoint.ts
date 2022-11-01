import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle, ODPs, OriginalDataPoint, TableNames } from '@meta/assessment'
import { NodeUpdate, NodeUpdates } from '@meta/data'
import { Sockets } from '@meta/socket'
import { User } from '@meta/user'

import { calculateDependantNodes } from '@server/controller/cycleData/persistNodeValue/calculateDependantNodes'
import { validateNodeUpdates } from '@server/controller/cycleData/persistNodeValue/validateNodeUpdates'
import { BaseProtocol, DB } from '@server/db'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from '@server/repository/public/activityLog'
import { SocketServer } from '@server/service/socket'

type updateDependantsProps = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  user: User
  colName: string
  updatedOriginalDataPoint: OriginalDataPoint
  client: BaseProtocol
}

const handleWebsocket = (nodeUpdatesValidation: NodeUpdates) => {
  const { assessment, cycle, countryIso, nodes } = nodeUpdatesValidation
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  nodes.forEach((nodeUpdate: NodeUpdate) => {
    const { tableName, variableName, colName, value } = nodeUpdate
    const propsEvent = { countryIso, assessmentName, cycleName, tableName, variableName, colName }
    const nodeUpdateEvent = Sockets.getNodeUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { value })
  })
}

const updateExtentOfForestDependants = async (props: updateDependantsProps) => {
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

  const i = nodeUpdatesValidation.nodes.findIndex((n) => n.variableName === 'forestArea')
  nodeUpdatesValidation.nodes[i] = {
    tableName,
    variableName,
    colName,
    value: { raw, odp: true },
  }

  handleWebsocket(nodeUpdatesValidation)
}

const updateForestCharacteristicsDependants = async (props: updateDependantsProps) => {
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

  const _nodeExists = (node: NodeUpdate, nodeList: NodeUpdate[]) => {
    return nodeList.find(
      (mergedNode) =>
        mergedNode.tableName === node.tableName &&
        mergedNode.variableName === node.variableName &&
        mergedNode.colName === node.colName
    )
  }

  // Merge updates if they don't already exist
  nodeUpdatesValidations.forEach((nodeValidation) => {
    nodeValidation.nodes.forEach((currentNode) => {
      if (!_nodeExists(currentNode, nodeUpdatesValidationsMerged.nodes)) {
        nodeUpdatesValidationsMerged.nodes.push(currentNode)
      }
    })
  })

  // Add forestCharacteristics variables
  const tableName = TableNames.forestCharacteristics

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

  variableNames.forEach((variableName) => {
    const i = nodeUpdatesValidationsMerged.nodes.findIndex((n) => n.variableName === variableName)
    const nodeUpdateProps = {
      tableName,
      variableName,
      colName,
      value: { raw: values[variableName], odp: true },
    }
    // Replace if already exists, else prepend
    if (i > 0) {
      nodeUpdatesValidationsMerged.nodes[i] = nodeUpdateProps
    } else {
      nodeUpdatesValidationsMerged.nodes.unshift(nodeUpdateProps)
    }
  })

  handleWebsocket(nodeUpdatesValidationsMerged)
}

export const updateOriginalDataPoint = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    originalDataPoint: OriginalDataPoint
    user: User
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint, user } = props

  const updatedOriginalDataPoint = await OriginalDataPointRepository.update(
    { assessment, cycle, originalDataPoint },
    client
  )

  return client.tx(async (t) => {
    const colName = String(updatedOriginalDataPoint.year)
    const { countryIso } = updatedOriginalDataPoint

    await updateExtentOfForestDependants({
      countryIso,
      assessment,
      cycle,
      colName,
      user,
      updatedOriginalDataPoint,
      client: t,
    })

    await updateForestCharacteristicsDependants({
      countryIso,
      assessment,
      cycle,
      colName,
      user,
      updatedOriginalDataPoint,
      client: t,
    })

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedOriginalDataPoint,
          section: 'odp',
          message: ActivityLogMessage.originalDataPointUpdate,
          countryIso: originalDataPoint.countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return updatedOriginalDataPoint
  })
}
