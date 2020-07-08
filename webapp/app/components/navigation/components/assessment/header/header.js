import './header.less'

import React from 'react'
import PropTypes from 'prop-types'

import * as Assessment from '@common/assessment/assessment'

import * as BasePaths from '@webapp/main/basePaths'
import Icon from '@webapp/components/icon'
import { Link } from 'react-router-dom'
import { useCountryIso, useIsDataExportView } from '@webapp/components/hooks'

import Lock from './lock'
import Status from './status'
import AssessmentTitle from './title'
import ToggleAllButton from './buttonToggleAll'

const Header = (props) => {
  const {
    assessment,
    assessment: { type: assessmentType },
    showSections,
    setShowSections,
  } = props

  const countryIso = useCountryIso()
  const isDataExportView = useIsDataExportView()

  if (Assessment.isTypePanEuropean(assessmentType) || isDataExportView) {
    return (
      <div className="nav-assessment-header">
        <div className="nav-assessment-header__label">
          <AssessmentTitle type={assessmentType} />
          <ToggleAllButton setShowSections={setShowSections} showSections={showSections} />
        </div>
      </div>
    )
  }

  return (
    <div className="nav-assessment-header">
      <div className="nav-assessment-header__label">
        <Lock assessment={assessment} />

        <div>
          <Link
            className="btn-s btn-secondary"
            to={BasePaths.getAssessmentPrintLink(countryIso, assessmentType, true)}
            target="_blank"
          >
            <Icon name="small-print" className="icon-margin-left" />
            <Icon name="icon-table2" className="icon-no-margin" />
          </Link>
          <Link
            className="btn-s btn-secondary"
            to={BasePaths.getAssessmentPrintLink(countryIso, assessmentType)}
            target="_blank"
          >
            <Icon name="small-print" className="icon-no-margin" />
          </Link>
        </div>
      </div>

      <div className="nav-assessment-header__status-container">
        <Status assessment={assessment} />
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
