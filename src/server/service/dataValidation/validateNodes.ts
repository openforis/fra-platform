import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { NodeUpdates } from 'meta/data/nodeUpdates'
import { Sockets } from 'meta/socket/sockets'

import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { ContextFactory } from 'server/controller/cycleData/validations/tables/context/contextFactory'
import { validateNodeUpdates } from 'server/controller/cycleData/validations/tables/validateNodeUpdates'
import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  nodeUpdates: NodeUpdates
  notifyClients?: boolean
}

export const validateNodes = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, nodeUpdates, notifyClients = true } = props
  const context = await ContextFactory.newInstance({ assessment, country, cycle, nodeUpdates })
  const { countryIso, tableValidations } = context
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const updatedTableNames = await validateNodeUpdates({ context })

  await TableValidationRedisRepository.setValidations({
    assessment,
    countryIso,
    cycle,
    tableNames: updatedTableNames,
    tableValidations,
  })

  if (notifyClients && updatedTableNames.length > 0) {
    const eventName = Sockets.getTableValidationsUpdateEvent({ assessmentName, countryIso, cycleName })
    const updatedTableValidations = updatedTableNames.reduce<RecordTableValidationsState>((acc, tableName) => {
      acc[tableName] = tableValidations[tableName] ?? {}
      return acc
    }, {})

    SocketServer.emit(eventName, { tableValidations: updatedTableValidations })
  }
}
