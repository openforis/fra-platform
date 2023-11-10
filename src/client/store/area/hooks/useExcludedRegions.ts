import { useMemo } from 'react'

import { useSecondaryRegion } from 'client/store/area/hooks/useSecondaryRegion'

export const useExcludedRegions = () => {
  const secondaryRegions = useSecondaryRegion()

  return useMemo(() => {
    return secondaryRegions.regions.map((region) => region.regionCode)
  }, [secondaryRegions.regions])
}
