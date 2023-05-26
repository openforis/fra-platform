import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useOdpReviewSummary } from '@client/store/ui/review/hooks'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import ReviewSummaryIndicator from '@client/components/ReviewSummaryIndicator'

type Props = {
  className: string
  colSpan: number
  rowSpan: number
  odpId: number
  odpYear: string
  sectionName: string
}

const HeaderCell: React.FC<Props> = (props) => {
  const { className, colSpan, rowSpan, odpId, odpYear, sectionName } = props

  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const { print } = useIsPrint()
  const { t } = useTranslation()

  const reviewStatus = useOdpReviewSummary(odpId)

  return !print ? (
    <th
      className="odp-header-cell"
      colSpan={colSpan}
      rowSpan={rowSpan}
      data-tooltip-id="odp-header-cell-tooltip"
      data-tooltip-content={t('nationalDataPoint.clickOnNDP')}
    >
      <Link
        className="link"
        to={ClientRoutes.Assessment.Cycle.Country.OriginalDataPoint.Section.getLink({
          countryIso,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          year: odpYear,
          sectionName,
        })}
      >
        {odpYear}
      </Link>
      <ReviewSummaryIndicator status={reviewStatus} />
    </th>
  ) : (
    <th className={className} colSpan={colSpan} rowSpan={rowSpan}>
      {odpYear}
    </th>
  )
}

export default HeaderCell
