import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { Sockets } from 'meta/socket/sockets'
import { Promises } from 'utils/promises'

import { updateExternalDependents } from 'server/controller/cycleData/updateDependencies/updateExternalDependents'
import worker from 'server/controller/cycleData/updateDependencies/worker'
import { updateValidations } from 'server/controller/cycleData/validations/updateValidations'
import { BaseProtocol } from 'server/db/db'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

import { UpdateDependenciesJob, UpdateDependenciesProps, UpdateDependenciesResult } from './props'

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

  await updateValidations({ assessment, country, cycle, nodeUpdates: validationNodeUpdates, notifyClients })
  // TODO: Notify for validations

  // 3. schedule external assessment/cycle updates
  await Promises.each(workerResult.externalDependants, async (externalNodeUpdates) => {
    Logger.debug(`[updateDependencies] [${logKey}] scheduling ${externalNodeUpdates.nodes.length} external dependents`)
    await updateExternalDependents({ countryIso, nodeUpdates: externalNodeUpdates, notifyClients, user }, client)
  })

  // 4. end
  return Promise.resolve()
}
