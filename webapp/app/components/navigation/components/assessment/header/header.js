import './header.less'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as Assessment from '@common/assessment/assessment'
import { Area } from '@common/country'
import * as BasePaths from '@webapp/main/basePaths'

import Icon from '@webapp/components/icon'
import { useCountryIso, useUserInfo } from '@webapp/components/hooks'

import Title from './title'
import Status from './status'
import ToggleAllButton from './buttonToggleAll'

const Header = (props) => {
  const { assessment, showSections, setShowSections } = props

  const assessmentType = Assessment.getType(assessment)
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()

  const isCountry = Area.isISOCountry(countryIso)
  const isFRA = Assessment.isTypeFRA(assessmentType)

  return (
    <div className="nav-assessment-header">
      <div className="nav-assessment-header__label">
        <Title assessment={assessment} lockEnabled={Boolean(userInfo && isFRA && isCountry)} />

        {isFRA && isCountry && (
          <div className="links-download">
            <Link
              className="btn-s btn-secondary"
              to={BasePaths.getAssessmentPrintLink(countryIso, assessmentType, true)}
              target="_blank"
              alt=""
            >
              <Icon name="small-print" className="icon-margin-left" />
              <Icon name="icon-table2" className="icon-no-margin" />
            </Link>

            <Link
              className="btn-s btn-secondary"
              to={BasePaths.getAssessmentPrintLink(countryIso, assessmentType)}
              target="_blank"
              alt=""
            >
              <Icon name="small-print" className="icon-no-margin" />
            </Link>
          </div>
        )}
      </div>

      <div className="nav-assessment-header__status-container">
        {isFRA && isCountry ? <Status assessment={assessment} /> : <div />}
        <ToggleAllButton showSections={showSections} setShowSections={setShowSections} />
      </div>
    </div>
  )
}

Header.propTypes = {
  assessment: PropTypes.object.isRequired,
  showSections: PropTypes.bool.isRequired,
  setShowSections: PropTypes.func.isRequired,
}

export default Header
