import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import * as BasePaths from '@webapp/main/basePaths'

import { NavLink } from 'react-router-dom'
import ReviewStatus from '@webapp/app/components/navigation/components/assessment/section/reviewStatus'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

import * as ReviewStatusState from '@webapp/app/country/reviewStatusState'
import { useIsDataExportView } from '@webapp/components/hooks'

const Subsection = (props) => {
  const { assessmentType, sectionName, prefix } = props
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const isDataExport = useIsDataExportView()

  const reviewStatus = useSelector(ReviewStatusState.getStatusSection(sectionName))

  return (
    <NavLink
      to={BasePaths.getAssessmentSectionLink(countryIso, assessmentType, sectionName)}
      className="nav-section__item"
      activeClassName="selected"
    >
      <div className="nav-section__order">{prefix}</div>
      <div className="nav-section__label">{i18n.t(`${sectionName}.${sectionName}`)}</div>
      {!isDataExport && (
        <div className="nav-section__status-content">
          <ReviewStatus status={reviewStatus} />
        </div>
      )}
    </NavLink>
  )
}

Subsection.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
}

export default Subsection
