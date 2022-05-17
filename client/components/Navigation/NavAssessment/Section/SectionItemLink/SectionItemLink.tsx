import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { NavLink } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useCycle } from '@client/store/assessment'
import { NavigationActions } from '@client/store/ui/navigation'
import { useSectionReviewSummary } from '@client/store/ui/review/hooks'
import { useCountryIso, useIsDataExportView } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import { Breakpoints } from '@client/utils'

import ReviewStatusMarker from '../ReviewStatusMarker'

type Props = {
  assessmentType: AssessmentName
  sectionName: string
  prefix: string
  id: number
}

const SectionItemLink: React.FC<Props> = (props) => {
  const { assessmentType, sectionName, prefix, id } = props
  const cycle = useCycle()

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const { i18n } = useTranslation()
  const isDataExport = useIsDataExportView()
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })
  const reviewStatus = useSectionReviewSummary(id)

  const labelPrefix = assessmentType === AssessmentName.panEuropean ? 'panEuropean.' : ''
  const label = i18n.t(`${labelPrefix}${sectionName}.${sectionName}`)

  return (
    <NavLink
      to={BasePaths.Assessment.section(countryIso, assessmentType, cycle?.name, sectionName)}
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
          <ReviewStatusMarker status={reviewStatus} />
        </div>
      )}
    </NavLink>
  )
}

export default SectionItemLink
