import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { RegionGroupName } from 'meta/area/regionGroup'
import { Lang } from 'meta/lang'

import { AreaRedisRepository } from 'server/cache/repository/area'
import { PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'

export const getCountries = async (props: PropsBulkDownload): Promise<Array<Country>> => {
  const { assessment, cycle } = props

  const [countries, regionGroups] = await Promise.all([
    AreaRedisRepository.getManyCountries({ assessment, cycle }),
    AreaRedisRepository.getManyRegionGroups({ assessment, cycle }),
  ])
  const fraRegionGroup = regionGroups.find((rg) => rg.name === RegionGroupName.fra2020)
  const allowedRegionCodes = fraRegionGroup.regions.map((r) => r.regionCode)

  return countries
    .reduce<Array<Country>>((acc, country) => {
      if (!Areas.isAtlantis(country.countryIso)) {
        const regionCodes = country.regionCodes.filter((r) => allowedRegionCodes.includes(r))
        acc.push({ ...country, regionCodes })
      }
      return acc
    }, [])
    .sort((c1, c2) => Areas.getCompareListName(c1, c2, Lang.en))
}
