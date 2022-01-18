import React from 'react'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import { Breakpoints } from '@client/utils'

import { AssessmentName } from '@meta/assessment'
import { BasePaths } from '@client/basePaths'
import { useCountryIso, useIsDataExportView } from '@client/hooks'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@client/store'
import { NavigationActions } from '@client/store/ui/navigation'
// import ReviewStatusMarker from '../ReviewStatusMarker'

type Props = {
  assessmentType: AssessmentName
  sectionName: string
  prefix: string
}

const SectionItemLink: React.FC<Props> = (props) => {
  const { assessmentType, sectionName, prefix } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const { i18n } = useTranslation()
  const isDataExport = useIsDataExportView()
  // const reviewStatus = useSelector(ReviewStatusState.getStatusSection(sectionName))
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })

  const labelPrefix = assessmentType === AssessmentName.panEuropean ? 'panEuropean.' : ''
  const label = i18n.t(`${labelPrefix}${sectionName}.${sectionName}`)

  return (
    <NavLink
      to={BasePaths.Assessment.section(countryIso, assessmentType, sectionName)}
      className="nav-section__item"
      activeClassName="selected"
      onClick={() => {
        if (!laptop) {
          dispatch(NavigationActions.toggleNavigationVisible())
        }
      }}
    >
      <div className="nav-section__order">{prefix}</div>
      <div className="nav-section__label">{label}</div>
      {!isDataExport && (
        <div className="nav-section__status-content">
          {/* <ReviewStatusMarker status={reviewStatus as ReviewStatus} /> */}
        </div>
      )}
    </NavLink>
  )
}

export default SectionItemLink
