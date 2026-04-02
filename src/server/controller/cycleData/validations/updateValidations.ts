import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdates } from 'meta/data/nodeUpdates'

import { ValidationRedisRepository } from 'server/cache/repository/validation'

import { ContextFactory } from './context/contextFactory'
import { validateNodeUpdates } from './validateNodeUpdates/validateNodeUpdates'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  nodeUpdates: NodeUpdates
  notifyClients?: boolean
}

export async function updateValidations(props: Props): Promise<void> {
  const { assessment, country, cycle, nodeUpdates } = props
  const context = await ContextFactory.newInstance({ assessment, country, cycle, nodeUpdates })
  const { countryIso, tableValidations } = context

  const updatedTableNames = await validateNodeUpdates({ context })

  await ValidationRedisRepository.setTableValidations({
    assessment,
    countryIso,
    cycle,
    tableNames: updatedTableNames,
    tableValidations,
  })
}
