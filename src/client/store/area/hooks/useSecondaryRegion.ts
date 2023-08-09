import { useMemo } from 'react'

import { RegionGroup } from 'meta/area'

import { useRegionGroups } from './useRegionGroups'

export const useSecondaryRegion = () => {
  const regionGroups = useRegionGroups()
  // return Object.fromEntries(Object.entries(regionGroups).filter(([_, value]) => value.name === 'secondary'))['1']
  return useMemo(() => {
    const filterFn = ([_, value]: [string, RegionGroup]) => value.name === 'secondary'
    return Object.fromEntries(Object.entries(regionGroups).filter(filterFn))['1']
  }, [regionGroups])
}
