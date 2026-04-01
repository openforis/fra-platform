import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { NodeUpdates } from 'meta/data/nodeUpdates'
import { Sockets } from 'meta/socket/sockets'
import { Objects } from 'utils/objects'

import { ValidationRedisRepository } from 'server/cache/repository/validation'
import { SocketServer } from 'server/service/socket'

// import { updateSummary } from './summary/summary'
import { updateValidations } from './updateValidations'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  nodeUpdates: NodeUpdates
  notifyClients?: boolean
}

export async function updateValidationState(props: Props): Promise<void> {
  const { assessment, country, cycle, nodeUpdates, notifyClients = true } = props
  const { countryIso } = country
  const { assessmentName, cycleName } = nodeUpdates
  const result = await updateValidations({ assessment, country, cycle, nodeUpdates })
  const currentSummary = await ValidationRedisRepository.getSummary({ assessment, countryIso, cycle })

  let summary = undefined

  if (currentSummary && !Objects.isEmpty(result.tablesWithErrors)) {
    // TODO: implement update summary
    // summary = await updateSummary({ assessment, cycle, summary: currentSummary, tableHasErrors: result.tablesWithErrors })
    summary = {} as ValidationSummary
    await ValidationRedisRepository.setSummary({ assessment, countryIso, cycle, summary })
  }

  if (notifyClients && !Objects.isEmpty(result.tableValidations)) {
    const event = Sockets.getNodeValidationsUpdateEvent({ assessmentName, countryIso, cycleName })
    SocketServer.emit(event, { summary, tableValidations: result.tableValidations })
  }
}
