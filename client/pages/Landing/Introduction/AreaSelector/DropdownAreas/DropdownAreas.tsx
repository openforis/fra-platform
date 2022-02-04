import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { RegionCode, RegionGroup } from '@meta/area'
import Icon from '@client/components/Icon'
import { useTranslation } from 'react-i18next'
import { AssessmentName } from '@meta/assessment'
import { BasePaths } from '@client/basePaths'

import { useCycle } from '@client/store/assessment'
import { areas } from '../AreaSelector'

type Props = {
  area: string
  areaISOs: string[] | Record<string, RegionGroup>
  assessmentType: any
  dropdownOpened: string
  setDropdownOpened: (area: string) => void
}

const DropdownAreas = (props: Props) => {
  const { area, areaISOs, assessmentType, dropdownOpened, setDropdownOpened } = props

  const cycle = useCycle()

  const { i18n } = useTranslation()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogOpened = dropdownOpened === area
  const fra = assessmentType === AssessmentName.fra

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
      <div>- {i18n.t('common.select')} -</div>
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
                              to={BasePaths.Assessment.root(regionCode, assessmentType, cycle?.name)}
                              className="country-selection-list__row"
                              target={fra ? '_self' : '_blank'}
                            >
                              <span className="country-selection-list__primary-col">
                                {i18n.t(`area.${regionCode}.listName`)}
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
                  areaISOs.map((iso) => (
                    <Link
                      key={iso}
                      to={BasePaths.Assessment.root(iso, assessmentType, cycle?.name)}
                      className="country-selection-list__row"
                      target={fra ? '_self' : '_blank'}
                    >
                      <span className="country-selection-list__primary-col">{i18n.t(`area.${iso}.listName`)}</span>
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
