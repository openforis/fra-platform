import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { Sockets } from 'meta/socket/sockets'
import { Promises } from 'utils/promises'

import { updateExternalDependents } from 'server/controller/cycleData/updateDependencies/updateExternalDependents'
import worker from 'server/controller/cycleData/updateDependencies/worker'
import { updateValidations } from 'server/controller/cycleData/validations/updateValidations'
import { BaseProtocol } from 'server/db/db'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

import { UpdateDependenciesJob, UpdateDependenciesProps } from './props'

type Props = Omit<UpdateDependenciesProps, 'client'> & {
  notifyClients?: boolean
}

export const updateDependents = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, country, cycle, includeSourceNodes, notifyClients = true, user } = props
  const { countryIso, nodes } = props.nodeUpdates
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  Logger.debug(`[scheduleUpdateDependencies] ${countryIso} ${nodes.length} nodes added to updateDependencies queue`)

  // avoid executing worker when nodes have no calculation dependents.
  const hasCalculationDependants = nodes.some(({ tableName, variableName }) => {
    return AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName }).length > 0
  })
  if (!hasCalculationDependants && !includeSourceNodes) {
    // nodes with no calculation dependents may have validation dependents
    await updateValidations({ assessment, country, cycle, nodeUpdates: props.nodeUpdates, notifyClients })
    return Promise.resolve()
  }

  // 1. exec job
  const jobKey = `${assessmentName}-${cycleName}-${countryIso}`
  const data: UpdateDependenciesJob['data'] = { ...props, client }
  const job = { id: Math.random(), name: `job-name-${jobKey}`, data } as unknown as UpdateDependenciesJob
  const { externalDependants, nodeUpdates } = await worker(job)

  // 2. notify client
  if (notifyClients) {
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent({ assessmentName, cycleName, countryIso })
    SocketServer.emit(nodeUpdateEvent, { nodeUpdates })
    // TODO: Notify for validations
  }

  const validationNodeUpdates = { ...props.nodeUpdates, nodes: [...props.nodeUpdates.nodes, ...nodeUpdates.nodes] }
  await updateValidations({ assessment, country, cycle, nodeUpdates: validationNodeUpdates, notifyClients })

  Logger.debug(`[updateDependencies] [job-${job.id}] completed with ${nodeUpdates.nodes.length} nodes updated`)

  // 3. schedule external assessment/cycle updates
  await Promises.each(externalDependants, async (externalNodeUpdates) => {
    Logger.debug(
      `[updateDependencies] [job-${job.id}] scheduling ${externalNodeUpdates.nodes.length} external dependents`
    )
    await updateExternalDependents({ countryIso, nodeUpdates: externalNodeUpdates, notifyClients, user }, client)
  })
  // TODO: Update external validations

  // 4. end
  return Promise.resolve()
}
