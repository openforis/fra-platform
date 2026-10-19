import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { Sockets } from 'meta/socket/sockets'
import { Promises } from 'utils/promises'

import {
  UpdateDependenciesJob,
  UpdateDependenciesProps,
} from 'server/controller/cycleData/tableData/updateDependencies/props'
import { updateExternalDependents } from 'server/controller/cycleData/tableData/updateDependencies/updateExternalDependents'
import worker from 'server/controller/cycleData/tableData/updateDependencies/worker'
import { BaseProtocol } from 'server/db/db'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

type Props = Omit<UpdateDependenciesProps, 'client'> & {
  notifyClients?: boolean
}

export const updateDependents = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle, includeSourceNodes, notifyClients = true, user } = props
  const { countryIso, nodes } = props.nodeUpdates
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  Logger.debug(`[scheduleUpdateDependencies] ${countryIso} ${nodes.length} nodes added to updateDependencies queue`)

  // avoid executing worker when nodes have no dependents.
  const dependants = nodes.flatMap(({ tableName, variableName }) => {
    return AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName })
  })
  if (dependants.length === 0 && !includeSourceNodes) {
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
  }

  Logger.debug(`[updateDependencies] [job-${job.id}] completed with ${nodeUpdates.nodes.length} nodes updated`)

  // 3. schedule external assessment/cycle updates
  await Promises.each(externalDependants, async (externalNodeUpdates) => {
    Logger.debug(
      `[updateDependencies] [job-${job.id}] scheduling ${externalNodeUpdates.nodes.length} external dependents`
    )
    await updateExternalDependents({ countryIso, nodeUpdates: externalNodeUpdates, notifyClients, user }, client)
  })

  // 4. end
  return Promise.resolve()
}
