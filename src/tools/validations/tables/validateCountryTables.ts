import { TableRedisRepository } from 'server/cache/repository/table'
import { DataValidationService } from 'server/service/dataValidation'

import { CountryProps } from '../common/validateCountries'
import { buildTablesNodeUpdates } from './buildTablesNodeUpdates'

export const validateCountryTables = async (props: CountryProps): Promise<void> => {
  const { assessment, country, cycle } = props
  const { countryIso } = country

  const tables = await TableRedisRepository.getManyRecord({ assessment, cycle })
  const nodeUpdates = buildTablesNodeUpdates({ assessment, country, cycle, tables })

  await DataValidationService.removeTableValidations({ assessment, countryIso, cycle })

  await DataValidationService.validateNodes({
    assessment,
    country,
    cycle,
    nodeUpdates,
    notifyClients: false,
  })
}
