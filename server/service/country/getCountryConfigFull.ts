import * as traditionalTableRepository from '@server/repository/traditionalTable/traditionalTableRepository'
import { CountryService } from '@server/service'

export const getCountryConfigFull = async (countryIso: string, schemaName = 'public') => {
  const [config, result] = await Promise.all([
    CountryService.getCountryConfig(countryIso, schemaName),
    traditionalTableRepository.read(countryIso, 'climaticDomain', schemaName),
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
