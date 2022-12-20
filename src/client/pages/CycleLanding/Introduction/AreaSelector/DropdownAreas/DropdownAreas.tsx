import React, { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { RegionCode, RegionGroup } from '@meta/area'
import { AssessmentName, AssessmentNames } from '@meta/assessment'

import Icon from '@client/components/Icon'

import { areas } from '../AreaSelector'

type Props = {
  area: string
  areaISOs: string[] | Record<string, RegionGroup>
  assessmentName: AssessmentName
  cycleName: string
  dropdownOpened: string
  setDropdownOpened: (area: string) => void
}

const DropdownAreas = (props: Props) => {
  const { area, areaISOs, assessmentName, cycleName, dropdownOpened, setDropdownOpened } = props

  const { i18n } = useTranslation()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogOpened = dropdownOpened === area
  const fra = assessmentName === AssessmentNames.fra

  const outsideClick = ({ target }: any) => {
    const button = buttonRef.current
    if (dialogOpened && button && !button.contains(target)) {
      setDropdownOpened('')
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('click', outsideClick)
    return () => {
      window.removeEventListener('click', outsideClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpened])

  return (
    <button
      ref={buttonRef}
      type="button"
      className="btn-country-select m-r"
      disabled={areaISOs.length === 0}
      onClick={() => {
        setDropdownOpened(dialogOpened ? '' : area)
      }}
    >
      <div>- {i18n.t<string>('common.select')} -</div>
      <Icon name="small-down" />

      {dialogOpened && (
        <div className="country-selection-list">
          <div className="country-selection-list__content">
            {areas.regions === area ? (
              <>
                {Object.entries(areaISOs).map(([order, regionGroup]: any) => {
                  return (
                    <div key={order} className="country-selection-list__section">
                      {regionGroup.regions.map(
                        ({ regionCode }: any) =>
                          regionCode !== RegionCode.FE && (
                            <Link
                              key={regionCode}
                              to={ClientRoutes.Assessment.Root.getLink({
                                countryIso: regionCode,
                                assessmentName,
                                cycleName,
                              })}
                              className="country-selection-list__row"
                              target={fra ? '_self' : '_blank'}
                            >
                              <span className="country-selection-list__primary-col">
                                {i18n.t<string>(`area.${regionCode}.listName`)}
                              </span>
                            </Link>
                          )
                      )}
                    </div>
                  )
                })}
              </>
            ) : (
              <div className="country-selection-list__section">
                {Array.isArray(areaISOs) &&
                  areaISOs.map((iso: any) => (
                    <Link
                      key={iso}
                      to={ClientRoutes.Assessment.Root.getLink({
                        countryIso: iso,
                        assessmentName,
                        cycleName,
                      })}
                      className="country-selection-list__row"
                      target={fra ? '_self' : '_blank'}
                    >
                      <span className="country-selection-list__primary-col">
                        {i18n.t<string>(`area.${iso}.listName`)}
                      </span>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </button>
  )
}

export default DropdownAreas
