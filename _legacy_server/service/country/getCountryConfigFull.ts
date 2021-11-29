import { DataTableService, CountryService } from '@server/controller'
import { CountryIso } from '@core/country'

export const getCountryConfigFull = async (countryIso: CountryIso, schemaName = 'public') => {
  const [config, result] = await Promise.all([
    CountryService.getCountryConfig(countryIso, schemaName),
    DataTableService.read({ countryIso, tableSpecName: 'climaticDomain', schemaName }),
  ])

  const climaticDomainPercents = {
    boreal: (result && result[0][0]) || (config.climaticDomainPercents2015 && config.climaticDomainPercents2015.boreal),
    temperate:
      (result && result[1][0]) || (config.climaticDomainPercents2015 && config.climaticDomainPercents2015.temperate),
    subtropical:
      (result && result[2][0]) || (config.climaticDomainPercents2015 && config.climaticDomainPercents2015.subtropical),
    tropical:
      (result && result[3][0]) || (config.climaticDomainPercents2015 && config.climaticDomainPercents2015.tropical),
  }

  config.climaticDomainPercents = climaticDomainPercents

  return config
}
