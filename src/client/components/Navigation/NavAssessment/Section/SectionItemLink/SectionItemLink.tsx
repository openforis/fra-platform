import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { NavLink } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from 'meta/app'
import { Labels, SubSection, SubSections } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { NavigationActions } from 'client/store/ui/navigation'
import { useSectionReviewSummary } from 'client/store/ui/review/hooks'
import { useCountryIso, useIsDataExportView } from 'client/hooks'
import ReviewSummaryIndicator from 'client/components/ReviewSummaryIndicator'
import { Breakpoints } from 'client/utils'

type Props = {
  subSection: SubSection
}

const SectionItemLink: React.FC<Props> = (props) => {
  const { subSection } = props

  const { id } = subSection
  const { name: sectionName } = subSection.props

  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const isDataExport = useIsDataExportView()
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })
  const reviewStatus = useSectionReviewSummary(id)

  return (
    <NavLink
      to={ClientRoutes.Assessment.Cycle.Country.Section.getLink({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
        sectionName,
      })}
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
      <div className="nav-section__order">
        {t(SubSections.getAnchorLabel({ assessment, cycle, subSection }), SubSections.getAnchor({ cycle, subSection }))}
      </div>
      <div className="nav-section__label">{Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}</div>
      {!isDataExport && (
        <div className="nav-section__status-content">
          <ReviewSummaryIndicator status={reviewStatus} />
        </div>
      )}
    </NavLink>
  )
}

export default SectionItemLink
