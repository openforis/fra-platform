import { useMemo } from 'react'

import { Country, CountryIso, Global, Region, RegionCode, RegionGroup } from 'meta/area'

import { useCountriesRecord } from 'client/store/area/hooks/countries'
import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useRegionGroups = (): Record<string, RegionGroup> => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => AreaSelectors.getRegionGroups(state, assessmentName, cycleName))
}

type RegionsRecord = Partial<Record<RegionCode | Global.WO, Region>>
type CountriesRegionsRecord = RegionsRecord & Record<CountryIso, Country>

export const useCountriesRegionsRecord = (): CountriesRegionsRecord => {
  const countries = useCountriesRecord()
  const regionGroups = useRegionGroups()

  return useMemo<CountriesRegionsRecord>(() => {
    const regionsRecord = Object.values(regionGroups ?? {}).reduce<RegionsRecord>((acc, { regions }) => {
      regions?.forEach((region) => {
        acc[region.regionCode] = region
      })
      return acc
    }, {})

    return {
      ...countries,
      ...regionsRecord,
    }
  }, [countries, regionGroups])
}

export const useSecondaryRegionCodes = (): Array<RegionCode> => {
  const regionGroups = useRegionGroups()

  return useMemo<Array<RegionCode>>(() => {
    const entries = Object.entries(regionGroups).filter(([_, regionGroup]) => regionGroup.name === 'secondary')
    const regionGroup = entries?.at(0)?.[1]
    return regionGroup?.regions?.map((region) => region.regionCode) ?? []

    // return secondaryRegions.regions.map((region) => region.regionCode)
  }, [regionGroups])
}
