import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import { isTypePanEuropean } from '@common/assessment/assessment'
import * as BasePaths from '@webapp/main/basePaths'
import * as ReviewStatusState from '@webapp/app/country/reviewStatusState'
import { useCountryIso, useI18n, useIsDataExportView } from '@webapp/components/hooks'
import { toggleNavigation } from '@webapp/components/Navigation/actions'
import { Breakpoints } from '@webapp/utils/breakpoints'

import ReviewStatus from '@webapp/components/Navigation/NavAssessment/section/reviewStatus'

type Props = {
  assessmentType: string
  sectionName: string
  prefix: string
}

const Subsection = (props: Props) => {
  const { assessmentType, sectionName, prefix } = props

  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const isDataExport = useIsDataExportView()
  const reviewStatus = useSelector(ReviewStatusState.getStatusSection(sectionName))
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })

  const labelPrefix = isTypePanEuropean(assessmentType) ? 'panEuropean.' : ''
  const label = i18n.t(`${labelPrefix}${sectionName}.${sectionName}`)

  return (
    <NavLink
      to={BasePaths.getAssessmentSectionLink(countryIso, assessmentType, sectionName)}
      className="nav-section__item"
      activeClassName="selected"
      onClick={() => {
        if (!laptop) {
          dispatch(toggleNavigation())
        }
      }}
    >
      <div className="nav-section__order">{prefix}</div>
      <div className="nav-section__label">{label}</div>
      {!isDataExport && (
        <div className="nav-section__status-content">
          <ReviewStatus status={reviewStatus} />
        </div>
      )}
    </NavLink>
  )
}
export default Subsection
