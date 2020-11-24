import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as Fra from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'
import * as BasePaths from '@webapp/main/basePaths'

import { useI18n } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'

const DropdownAreas = (props) => {
  const { area, areaISOs, assessmentType, dropdownOpened, setDropdownOpened } = props
  const dialogOpened = dropdownOpened === area

  const i18n = useI18n()
  const buttonRef = useRef(null)

  const fra = assessmentType === Fra.type

  useLayoutEffect(() => {
    const outsideClick = ({ target }) => dialogOpened && !buttonRef.current.contains(target) && setDropdownOpened('')

    window.addEventListener('click', outsideClick)
    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [dialogOpened])

  return (
    <button
      ref={buttonRef}
      type="button"
      className="btn btn-country-selection m-r"
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
          </div>
        </div>
      )}
    </button>
  )
}

DropdownAreas.propTypes = {
  area: PropTypes.string.isRequired,
  areaISOs: PropTypes.arrayOf(String).isRequired,
  assessmentType: PropTypes.oneOf([Fra.type, PanEuropean.type]).isRequired,
  dropdownOpened: PropTypes.string.isRequired,
  setDropdownOpened: PropTypes.func.isRequired,
}

export default DropdownAreas
