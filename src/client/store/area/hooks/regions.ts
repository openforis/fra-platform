import { useMemo } from 'react'

import { RegionCode, RegionGroup } from 'meta/area'

import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useRegionGroups = (): Record<string, RegionGroup> => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => AreaSelectors.getRegionGroups(state, assessmentName, cycleName))
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
