import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { NavLink } from 'react-router'
import classNames from 'classnames'

import { Labels } from 'meta/assessment/labels'
import { SubSection } from 'meta/assessment/section'
import { SubSections } from 'meta/assessment/subSections'
import { Routes } from 'meta/routes/routes'

import { useAppDispatch } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSectionReviewSummary } from 'client/store/review/hooks/review'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useCountryIso } from 'client/hooks/country'
import { useIsDataExportView } from 'client/hooks/dataExport'
import Flex from 'client/components/Layout/Flex'
import ReviewSummaryIndicator from 'client/components/ReviewSummaryIndicator'
import ValidationErrorIndicator from 'client/components/ValidationErrorIndicator'
import { Breakpoints } from 'client/utils/breakpoints'

type Props = {
  subSection: SubSection
}

const SectionItemLink: React.FC<Props> = (props) => {
  const { subSection } = props

  const { uuid } = subSection
  const { name: sectionName } = subSection.props

  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const isDataExport = useIsDataExportView()
  const laptop = useMediaQuery({ minWidth: Breakpoints.laptop })
  const reviewStatus = useSectionReviewSummary(uuid)

  return (
    <NavLink
      className={(navData): string =>
        classNames('nav-section__item', {
          selected: navData.isActive,
        })
      }
      onClick={(): void => {
        if (!laptop) {
          dispatch(CountryReportActions.setNavigationVisible())
        }
      }}
      to={Routes.Section.generatePath({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countryIso,
        sectionName,
      })}
    >
      <div className="nav-section__order">
        {t(SubSections.getAnchorLabel({ assessment, cycle, subSection }), SubSections.getAnchor({ cycle, subSection }))}
      </div>
      <Flex alignItems="center">
        <div className="nav-section__label">{Labels.getCycleLabel({ cycle, labels: subSection.props.labels, t })}</div>
      </Flex>
      {!isDataExport && (
        <div className="nav-section__status-content">
          <ReviewSummaryIndicator status={reviewStatus} />
          <ValidationErrorIndicator target="subSection" uuid={uuid} />
        </div>
      )}
    </NavLink>
  )
}

export default SectionItemLink
