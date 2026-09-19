import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { Sockets } from 'meta/socket/sockets'
import { Promises } from 'utils/promises'

import {
  UpdateDependenciesJob,
  UpdateDependenciesProps,
  UpdateDependenciesResult,
} from 'server/controller/cycleData/tableData/updateDependencies/props'
import { updateExternalDependents } from 'server/controller/cycleData/tableData/updateDependencies/updateExternalDependents'
import worker from 'server/controller/cycleData/tableData/updateDependencies/worker'
import { BaseProtocol } from 'server/db/db'
import { DataValidationService } from 'server/service/dataValidation'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

type Props = Omit<UpdateDependenciesProps, 'client'> & {
  notifyClients?: boolean
}

export const updateDependents = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, country, cycle, includeSourceNodes, notifyClients = true, user } = props
  const { countryIso, nodes } = props.nodeUpdates
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const logKey = `${assessmentName}-${cycleName}-${countryIso}`

  Logger.debug(`[scheduleUpdateDependencies] ${countryIso} ${nodes.length} nodes added to updateDependencies queue`)

  // avoid executing worker when nodes have no calculation dependents.
  const hasCalculationDependants = nodes.some(({ tableName, variableName }) => {
    return AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName }).length > 0
  })
  const shouldRunCalculations = hasCalculationDependants || includeSourceNodes
  let workerResult: UpdateDependenciesResult = {
    externalDependants: [],
    nodeUpdates: { assessmentName, countryIso, cycleName, nodes: [] },
  }

  if (shouldRunCalculations) {
    const jobKey = logKey
    const data: UpdateDependenciesJob['data'] = { ...props, client }
    const job = { id: Math.random(), name: `job-name-${jobKey}`, data } as unknown as UpdateDependenciesJob
    workerResult = await worker(job)

    if (notifyClients && workerResult.nodeUpdates.nodes.length > 0) {
      const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent({ assessmentName, cycleName, countryIso })
      SocketServer.emit(nodeUpdateEvent, { nodeUpdates: workerResult.nodeUpdates })
    }

    Logger.debug(
      `[updateDependencies] [job-${job.id}] completed with ${workerResult.nodeUpdates.nodes.length} nodes updated`
    )
  }

  const validationNodeUpdates = {
    ...props.nodeUpdates,
    nodes: [...props.nodeUpdates.nodes, ...workerResult.nodeUpdates.nodes],
  }

  await DataValidationService.validateNodes(
    {
      assessment,
      country,
      cycle,
      nodeUpdates: validationNodeUpdates,
      notifyClients,
    },
    client
  )

  // 3. schedule external assessment/cycle updates
  await Promises.each(workerResult.externalDependants, async (externalNodeUpdates) => {
    Logger.debug(`[updateDependencies] [${logKey}] scheduling ${externalNodeUpdates.nodes.length} external dependents`)
    await updateExternalDependents({ countryIso, nodeUpdates: externalNodeUpdates, notifyClients, user }, client)
  })

  // 4. end
  return Promise.resolve()
}
