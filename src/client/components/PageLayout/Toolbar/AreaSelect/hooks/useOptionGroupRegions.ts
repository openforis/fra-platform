import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'

import { useRegionGroups } from 'client/store/area/hooks/regions'
import { useShowRegions } from 'client/hooks/showRegions'
import { Option, OptionsGroup } from 'client/components/Inputs/Select'
import { OptionsGroupArea } from 'client/components/PageLayout/Toolbar/AreaSelect/types'

export const useOptionGroupRegions = (): ReadonlyArray<OptionsGroup> => {
  const { t } = useTranslation()
  const regionGroups = useRegionGroups()
  const showRegions = useShowRegions()

  return useMemo<ReadonlyArray<OptionsGroup>>(() => {
    if (showRegions) {
      return Object.values(regionGroups)
        .sort((r1, r2) => r1.order - r2.order)
        .map<OptionsGroupArea>((regionGroup) => {
          const { order, regions } = regionGroup

          const options = regions.reduce<Array<Option>>((acc, region) => {
            const { regionCode } = region
            if (!Areas.isAtlantis(regionCode)) {
              acc.push({ label: t(Areas.getTranslationKey(regionCode)), value: regionCode })
            }

            return acc
          }, [])

          return { options, order }
        })
    }

    return []
  }, [regionGroups, showRegions, t])
}
