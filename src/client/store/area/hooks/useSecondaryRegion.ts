import { useRegionGroups } from './useRegionGroups'

export const useSecondaryRegion = () => {
  const regionGroups = useRegionGroups()
  return Object.fromEntries(Object.entries(regionGroups).filter(([_, value]) => value.name === 'secondary'))['1']
}
