import { TableRedisRepository } from 'server/cache/repository/table'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'
import { updateTableValidations } from 'server/controller/cycleData/validations/tables/updateTableValidations'

import { CountryProps } from '../common/validateCountries'
import { buildTablesNodeUpdates } from './buildTablesNodeUpdates'

export const validateCountryTables = async (props: CountryProps): Promise<void> => {
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
