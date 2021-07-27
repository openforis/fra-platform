import React from 'react'
import { useSelector } from 'react-redux'
import * as BasePaths from '@webapp/main/basePaths'
import { NavLink } from 'react-router-dom'
import ReviewStatus from '@webapp/components/Navigation/Assessment/section/reviewStatus'
import { useCountryIso, useI18n, useIsDataExportView } from '@webapp/components/hooks'
import * as ReviewStatusState from '@webapp/app/country/reviewStatusState'
import { isTypePanEuropean } from '@common/assessment/assessment'

type Props = {
  assessmentType: string
  sectionName: string
  prefix: string
}
const Subsection = (props: Props) => {
  const { assessmentType, sectionName, prefix } = props
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const isDataExport = useIsDataExportView()
  const reviewStatus = useSelector(ReviewStatusState.getStatusSection(sectionName))
  const labelPrefix = isTypePanEuropean(assessmentType) ? 'panEuropean.' : ''
  const label = (i18n as any).t(`${labelPrefix}${sectionName}.${sectionName}`)
  return (
    <NavLink
      to={BasePaths.getAssessmentSectionLink(countryIso, assessmentType, sectionName)}
      className="nav-section__item"
      activeClassName="selected"
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
