import React, { useCallback, useMemo, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

import { CountryIso } from 'meta/area/countryIso'
import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import { useIsPanEuropeanRoute } from 'client/hooks/routes'
import { Props as CountrySelectProps } from 'client/components/CountryMultiSelect/types'
import { OptionsGroup } from 'client/components/Inputs/Select'
import { Breakpoints } from 'client/utils/breakpoints'

import { useCountriesByRegionOptions } from './useCountriesByRegionOptions'

type Props = Pick<CountrySelectProps, 'allowAtlantis' | 'allowedCountries' | 'isMulti'> & {
  value: Array<CountryIso>
  error?: string
}

export type TooltipContent = {
  hideTooltip: () => void
  showTooltip: () => void
  tooltipContent: string | null
  dataTooltipId: TooltipId
}

export const useTooltipContent = (props: Props): TooltipContent => {
  const { allowAtlantis, allowedCountries, error, isMulti, value } = props
  const [canDisplayTooltip, setCanDisplayTooltip] = useState<boolean>(true)
  const { t } = useTranslation()

  const countryOptionGroups = useCountriesByRegionOptions({ allowAtlantis, allowedCountries })
  const isPanEuropean = useIsPanEuropeanRoute()
  const isMinLaptop = useMediaQuery({ minWidth: Breakpoints.laptop })

  const tooltipContent = useMemo<string | null>(() => {
    if (!isMinLaptop) return null
    if (Objects.isEmpty(value) || !isMulti) return null
    if (!canDisplayTooltip) return null

    if (error) {
      return ReactDOMServer.renderToStaticMarkup(
        <div className="regions-container" style={{ gridTemplateColumns: '1fr' }}>
          <div className="countries-container">
            <span className="country">{error}</span>
          </div>
        </div>
      )
    }

    const selectedRegions: Array<{
      regionLabel: string
      selectedCountries: Array<string>
    }> = []

    if (isPanEuropean) {
      selectedRegions.push({
        regionLabel: '', // Not visible when there is only one region
        selectedCountries: value
          .map((countryIso) => t(`area.${countryIso}.listName`))
          .sort((a, b) => a.localeCompare(b)),
      })
    } else {
      countryOptionGroups.forEach((group) => {
        if (!Array.isArray((group as OptionsGroup).options)) return

        const regionCountries = (group as OptionsGroup).options.map((option) => option.value as CountryIso)
        const selectedCountriesInRegion = regionCountries.filter((country) => value.includes(country))

        if (selectedCountriesInRegion.length > 0) {
          selectedRegions.push({
            regionLabel: String(group.label),
            selectedCountries: selectedCountriesInRegion
              .map((country) => t(`area.${country}.listName`))
              .sort((a, b) => a.localeCompare(b)),
          })
        }
      })
    }

    const gridTemplateColumns = `repeat(${selectedRegions.length},max-content)`

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
  }, [canDisplayTooltip, countryOptionGroups, error, isMinLaptop, isMulti, isPanEuropean, t, value])

  const hideTooltip = useCallback(() => setCanDisplayTooltip(false), [])
  const showTooltip = useCallback(() => setCanDisplayTooltip(true), [])

  const dataTooltipId = useMemo(() => (error ? TooltipId.error : TooltipId.infoClickable), [error])

  return {
    hideTooltip,
    showTooltip,
    tooltipContent,
    dataTooltipId,
  }
}
