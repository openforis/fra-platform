import { Express } from 'express'
import { CountryGetAll } from './getAll'
import { CountryGetConfig } from './getConfig'
import { CountryGetOverviewStatus } from './getOverviewStatus'
import { CountryGetRegionGroups } from './getRegionGroups'
import { CountryGetRegions } from './getRegions'
import { CountryUpdateConfig } from './updateConfig'

export const CountryApi = {
  init: (express: Express): void => {
    CountryGetAll.init(express)
    CountryGetConfig.init(express)
    CountryGetOverviewStatus.init(express)
    CountryGetRegionGroups.init(express)
    CountryGetRegions.init(express)
    CountryUpdateConfig.init(express)
  },
}
