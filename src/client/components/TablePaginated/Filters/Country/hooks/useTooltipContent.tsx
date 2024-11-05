import React, { useCallback, useMemo, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
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

    const selectedRegions: Array<{
      regionLabel: string
      selectedCountries: Array<string>
    }> = []

    if (isPanEuropean) {
      selectedRegions.push({
        regionLabel: '', // Not visible when there is only one region
        selectedCountries: filterValue
          .map((countryIso) => t(`area.${countryIso}.listName`))
          .sort((a, b) => a.localeCompare(b)),
      })
    } else {
      countryOptionGroups.forEach((group) => {
        if (!Array.isArray((group as OptionsGroup).options)) return

        const regionCountries = (group as OptionsGroup).options.map((option) => option.value)
        const selectedCountriesInRegion = regionCountries.filter((country) => filterValue.includes(country))

        if (selectedCountriesInRegion.length > 0) {
          selectedRegions.push({
            regionLabel: group.label,
            selectedCountries: selectedCountriesInRegion
              .map((country) => t(`area.${country}.listName`))
              .sort((a, b) => a.localeCompare(b)),
          })
        }
      })
    }
    const gridTemplateColumns = `repeat(${selectedRegions.length},1fr)`

    return ReactDOMServer.renderToStaticMarkup(
      <div className="regions-container" style={{ gridTemplateColumns }}>
        {selectedRegions.length > 1 &&
          selectedRegions.map(({ regionLabel }) => (
            <div key={regionLabel} className="region-title">
              {regionLabel}
            </div>
          ))}

        {selectedRegions.map(({ regionLabel, selectedCountries }) => (
          <div key={regionLabel} className="countries-container">
            {selectedCountries.map((countryLabel) => (
              <span key={countryLabel} className="country">
                {countryLabel}
              </span>
            ))}
          </div>
        ))}
      </div>
    )
  }, [canDisplayTooltip, countryOptionGroups, filterValue, isPanEuropean, t])

  const hideTooltip = useCallback(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback(() => setCanDisplayTooltip(true), [])

  return {
    hideTooltip,
    showTooltip,
    tooltipContent,
  }
}
