import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { NavLink } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentNames, SubSection, SubSections } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { NavigationActions } from '@client/store/ui/navigation'
import { useSectionReviewSummary } from '@client/store/ui/review/hooks'
import { useIsDataExportView } from '@client/hooks'
import { Breakpoints } from '@client/utils'

import ReviewStatusMarker from '../ReviewStatusMarker'

type Props = {
  subSection: SubSection
}

const SectionItemLink: React.FC<Props> = (props) => {
  const { subSection } = props

  const { id } = subSection
  const { name } = subSection.props

  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const isDataExport = useIsDataExportView()
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })
  const reviewStatus = useSectionReviewSummary(id)

  const assessmentName = assessment.props.name
  const labelPrefix = assessmentName === AssessmentNames.panEuropean ? 'panEuropean.' : ''
  const label = i18n.t(`${labelPrefix}${name}.${name}`)

  return (
    <NavLink
      to={name}
      className={(navData) =>
        classNames('nav-section__item', {
          selected: navData.isActive,
        })
      }
      onClick={() => {
        if (!laptop) {
          dispatch(NavigationActions.toggleNavigationVisible())
        }
      }}
    >
      <div className="nav-section__order">{SubSections.getAnchor({ cycle, subSection })}</div>
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
