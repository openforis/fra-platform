import './TooltipCountries.scss'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Tooltip } from 'react-tooltip'
import classNames from 'classnames'

import { TooltipId } from 'meta/tooltip/id'
import { Objects } from 'utils/objects'

import { useNavigationVisible } from 'client/store/ui/countryReport/hooks/navigation'
import { Breakpoints } from 'client/utils/breakpoints'

import { useRegionGroups } from './hooks/useRegionGroups'
import { PropsTooltipCountries } from './types'

const TooltipCountries: React.FC<PropsTooltipCountries> = (props) => {
  const { canDisplayTooltip, error, isMulti, tooltipId, value } = props
  const hasError = !Objects.isEmpty(error)

  const isMinLaptop = useMediaQuery({ minWidth: Breakpoints.laptop })
  const navigationVisible = useNavigationVisible()
  const regionGroups = useRegionGroups(props)
  const tooltipLevel = tooltipId === TooltipId.error ? TooltipId.error : TooltipId.info

  if (!canDisplayTooltip || !isMulti || !isMinLaptop || Objects.isEmpty(value)) return null

  return (
    <div className="tooltip-container">
      <Tooltip
        className={classNames(tooltipLevel, 'country-multiselect__tooltip', {
          ['navigation-visible']: navigationVisible,
        })}
        classNameArrow={`${tooltipLevel}-arrow`}
        delayHide={100}
        id={tooltipId}
        place="bottom-start"
      >
        {!hasError && (
          <div
            className="regions-container"
            style={{ gridTemplateColumns: `repeat(${regionGroups.length},max-content)` }}
          >
            {regionGroups.map(({ label }) => (
              <div key={label} className="region-title">
                {label}
              </div>
            ))}

            {regionGroups.map(({ countries, label }) => (
              <div key={label} className="countries-container">
                {countries.map((countryLabel) => (
                  <span key={countryLabel} className="country">
                    {countryLabel}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        {hasError && (
          <div className="regions-container" style={{ gridTemplateColumns: '1fr' }}>
            <div className="countries-container">
              <span className="country">{error}</span>
            </div>
          </div>
        )}
      </Tooltip>
    </div>
  )
}

export default TooltipCountries
