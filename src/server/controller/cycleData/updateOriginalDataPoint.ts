import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
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
  nodeUpdatesValidation.nodes.forEach((nodeUpdate: NodeUpdate) => {
    const { tableName, variableName, colName, value } = nodeUpdate
    const propsEvent = {
      countryIso: nodeUpdatesValidation.countryIso,
      assessmentName: nodeUpdatesValidation.assessment.props.name,
      cycleName: nodeUpdatesValidation.cycle.name,
      tableName,
      variableName,
      colName,
    }
    const nodeUpdateEvent = Sockets.getNodeUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { value })
  })
}

const updateExtentOfForestDependants = async (props: updateDependantsProps) => {
  const { countryIso, assessment, user, colName, cycle, updatedOriginalDataPoint, client } = props

  const nodeUpdates = await calculateDependantNodes(
    {
      countryIso,
      assessment,
      cycle,
      sectionName: 'extentOfForest',
      tableName: 'extentOfForest',
      user,
      colName,
      variableName: 'forestArea',
    },
    client
  )

  const raw = updatedOriginalDataPoint.nationalClasses.find((nc) => nc.name === 'Forest')?.area
  nodeUpdates.nodes.unshift({ tableName: 'extentOfForest', variableName: 'forestArea', colName, value: { raw } })

  const nodeUpdatesValidation = await validateNodeUpdates({ nodeUpdates }, client)
  handleWebsocket(nodeUpdatesValidation)
}

const updateForestCharacteristicsDependants = async (props: updateDependantsProps) => {
  const { countryIso, assessment, user, colName, cycle, client } = props

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
          tableName: 'forestCharacteristics',
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
  nodeUpdatesValidations.forEach((nodeUpdatesValidation) => handleWebsocket(nodeUpdatesValidation))
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

  return client.tx(async (t) => {
    const updatedOriginalDataPoint = await OriginalDataPointRepository.update(
      { assessment, cycle, originalDataPoint },
      t
    )

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
