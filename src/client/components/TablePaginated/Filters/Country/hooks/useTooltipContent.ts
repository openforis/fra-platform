import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import { useIsPanEuropeanRoute } from 'client/hooks'
import { useCountriesByRegionOptions } from 'client/components/CountryMultiSelect/hooks/useCountriesByRegionOptions'
import { OptionsGroup } from 'client/components/Inputs/Select'

type Props = {
  fieldName: string
  path: string
}

type Returned = {
  hideTooltip: () => void
  showTooltip: () => void
  tooltipContent: string | null
}

export const useTooltipContent = (props: Props): Returned => {
  const { fieldName, path } = props
  const filterValue = useTablePaginatedFilterValue<Array<string>>(path, fieldName)
  const [canDisplayTooltip, setCanDisplayTooltip] = useState(true)
  const { t } = useTranslation()

  const countryOptionGroups = useCountriesByRegionOptions()
  const isPanEuropean = useIsPanEuropeanRoute()

  const tooltipContent = useMemo<string | null>(() => {
    if (Objects.isEmpty(filterValue)) return null
    if (!canDisplayTooltip) return null
    const MAX_VISIBLE_LABELS = 50

    let tooltipLabels: Array<string> = []

    if (isPanEuropean) {
      tooltipLabels = filterValue
        .map((countryIso) => t(`area.${countryIso}.listName`))
        .sort((a, b) => a.localeCompare(b))
    } else {
      const fullySelectedRegions: Array<string> = []
      const partiallySelectedCountries: Array<string> = []

      countryOptionGroups.forEach((group) => {
        if (!Array.isArray((group as OptionsGroup).options)) return
        const regionCountries = (group as OptionsGroup).options.map((option) => option.value)
        const areAllCountriesSelected = regionCountries.every((country) => filterValue.includes(country))

        if (areAllCountriesSelected) {
          fullySelectedRegions.push(group.label)
        } else {
          regionCountries.forEach((country) => {
            if (filterValue.includes(country)) {
              partiallySelectedCountries.push(t(`area.${country}.listName`))
            }
          })
        }
      })
      tooltipLabels = [...fullySelectedRegions, ...partiallySelectedCountries.sort((a, b) => a.localeCompare(b))]
    }

    const allLabelsCount = tooltipLabels.length
    const overflowCount = allLabelsCount - MAX_VISIBLE_LABELS

    tooltipLabels = tooltipLabels.slice(0, MAX_VISIBLE_LABELS)
    if (overflowCount > 0) {
      tooltipLabels.push(t('common.plusCountMore', { count: overflowCount }))
    }

    return tooltipLabels.join(', ')
  }, [canDisplayTooltip, countryOptionGroups, filterValue, isPanEuropean, t])

  const hideTooltip = useCallback(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback(() => setCanDisplayTooltip(true), [])

  return {
    hideTooltip,
    showTooltip,
    tooltipContent,
  }
}
