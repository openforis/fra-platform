import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { TableRedisRepository } from 'server/cache/repository/table'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { updateTableValidations } from 'server/controller/cycleData/validations/tables/updateTableValidations'

import { buildTablesNodeUpdates } from './buildTablesNodeUpdates'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
}

export const validateCountryTables = async (props: Props): Promise<void> => {
  const { assessment, country, cycle } = props
  const { countryIso } = country

  const tables = await TableRedisRepository.getManyRecord({ assessment, cycle })
  const nodeUpdates = buildTablesNodeUpdates({ assessment, country, cycle, tables })

  await TableValidationRedisRepository.clearCountryValidations({ assessment, countryIso, cycle })

  await updateTableValidations({
    assessment,
    country,
    cycle,
    nodeUpdates,
    notifyClients: false,
  })
}
