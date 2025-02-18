import React, { useCallback, useMemo, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { TooltipId } from 'meta/tooltip'

import { useCountriesByRegionOptions } from 'client/components/CountryMultiSelect/hooks/useCountriesByRegionOptions'
import { OptionsGroup } from 'client/components/Inputs/Select'

type Returned = {
  hideTooltip: () => void
  showTooltip: () => void
  tooltipContent: string | null
  dataTooltipId: TooltipId
}

type Props = {
  selection: Array<CountryIso>
  error: boolean
  errorMessage: string
}

export const useTooltipContent = (props: Props): Returned => {
  const { selection, error, errorMessage } = props
  const [canDisplayTooltip, setCanDisplayTooltip] = useState<boolean>(true)
  const { t } = useTranslation()
  const countryOptionGroups = useCountriesByRegionOptions()

  const tooltipContent = useMemo<string | null>(() => {
    if (Objects.isEmpty(selection)) return null
    if (!canDisplayTooltip) return null

    const selectedRegions: Array<{
      regionLabel: string
      selectedCountries: Array<string>
    }> = []

    countryOptionGroups.forEach((group) => {
      if (!Array.isArray((group as OptionsGroup).options)) return

      const regionCountries = (group as OptionsGroup).options.map(({ value }) => value as CountryIso)
      const selectedCountriesInRegion = regionCountries.filter((countryIso) => selection.includes(countryIso))

      if (selectedCountriesInRegion.length > 0) {
        selectedRegions.push({
          regionLabel: group.label,
          selectedCountries: selectedCountriesInRegion
            .map((country) => t(`area.${country}.listName`))
            .sort((a, b) => a.localeCompare(b)),
        })
      }
    })

    const gridTemplateColumns = `repeat(${selectedRegions.length},1fr)`

    if (error) {
      return ReactDOMServer.renderToStaticMarkup(
        <div className="regions-container" style={{ gridTemplateColumns }}>
          <div className="countries-container">
            <span className="country">{errorMessage}</span>
          </div>
        </div>
      )
    }

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
  }, [canDisplayTooltip, countryOptionGroups, error, errorMessage, selection, t])

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
