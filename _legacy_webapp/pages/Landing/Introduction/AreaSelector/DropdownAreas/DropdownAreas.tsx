import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FRA } from '@core/assessment'
// import PanEuropean from '@common/assessment/panEuropean'
import { RegionCode } from '@core/country'
import * as BasePaths from '../../../../../main/basePaths'
import { useI18n } from '../../../../../hooks'
import Icon from '../../../../../components/icon'
import { areas } from '../../../../../pages/Landing/Introduction/AreaSelector/AreaSelector'

type Props = {
  area: string
  areaISOs: string[]
  assessmentType: any // TODO: PropTypes.oneOf([Fra.type, PanEuropean.type])
  dropdownOpened: string
  setDropdownOpened: (area: string) => void
}

const DropdownAreas = (props: Props) => {
  const { area, areaISOs, assessmentType, dropdownOpened, setDropdownOpened } = props

  const i18n = useI18n()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogOpened = dropdownOpened === area
  const fra = assessmentType === FRA.type

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
      className="btn btn-country-select m-r"
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
                {areaISOs.map(({ regions, name }: any) => (
                  <div key={name} className="country-selection-list__section">
                    {regions.map(
                      ({ regionCode }: any) =>
                        regionCode !== RegionCode.FE && (
                          <Link
                            key={regionCode}
                            to={BasePaths.getAssessmentHomeLink(regionCode, assessmentType)}
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
                ))}
              </>
            ) : (
              <div className="country-selection-list__section">
                {areaISOs.map((iso) => (
                  <Link
                    key={iso}
                    to={BasePaths.getAssessmentHomeLink(iso, assessmentType)}
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
