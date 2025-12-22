import { useMemo } from 'react'

import { OptionsGroup } from 'client/components/Inputs/Select'

import { useOptionGroupCountries } from './useOptionGroupCountries'
import { useOptionGroupRegions } from './useOptionGroupRegions'

export const useOptionGroups = (): ReadonlyArray<OptionsGroup> => {
  const groupRegions = useOptionGroupRegions()
  const groupCountries = useOptionGroupCountries({ regionGroupsLength: groupRegions.length })

  return useMemo<ReadonlyArray<OptionsGroup>>(() => {
    const groups: Array<OptionsGroup> = []

    groups.push(...groupRegions)
    groups.push(...groupCountries)

    return groups
  }, [groupCountries, groupRegions])
}
