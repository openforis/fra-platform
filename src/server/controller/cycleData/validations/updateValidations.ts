import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { NodeUpdates } from 'meta/data/nodeUpdates'
import { Objects } from 'utils/objects'

import { ValidationRedisRepository } from 'server/cache/repository/validation'

import { ContextFactory } from './context/contextFactory'
import { validateNodeUpdates } from './validateNodeUpdates/validateNodeUpdates'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  nodeUpdates: NodeUpdates
}

export type UpdateValidationsResult = {
  tablesWithErrors: Record<TableName, boolean>
  tableValidations: RecordTableValidationsState
}

const _getUpdatedTableValidations = (
  tableNames: Array<TableName>,
  tableValidations: RecordTableValidationsState
): RecordTableValidationsState => {
  return tableNames.reduce<RecordTableValidationsState>((acc, tableName) => {
    acc[tableName] = tableValidations[tableName] ?? {}
    return acc
  }, {})
}

const _getUpdatedTablesWithErrors = (
  tableValidations: RecordTableValidationsState
): UpdateValidationsResult['tablesWithErrors'] => {
  return Object.entries(tableValidations).reduce<Record<TableName, boolean>>((acc, [tableName, value]) => {
    acc[tableName] = !Objects.isEmpty(value)
    return acc
  }, {})
}

export async function updateValidations(props: Props): Promise<UpdateValidationsResult> {
  const { assessment, country, cycle, nodeUpdates } = props
  const context = await ContextFactory.newInstance({ assessment, country, cycle, nodeUpdates })
  const { countryIso, tableValidations } = context

  const updatedTableNames = await validateNodeUpdates({ context })
  const updatedTableValidations = _getUpdatedTableValidations(updatedTableNames, tableValidations)

  await ValidationRedisRepository.setTableValidations({
    assessment,
    countryIso,
    cycle,
    tableNames: updatedTableNames,
    tableValidations,
  })

  return {
    tablesWithErrors: _getUpdatedTablesWithErrors(updatedTableValidations),
    tableValidations: updatedTableValidations,
  }
}
