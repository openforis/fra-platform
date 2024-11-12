import './OdpHeaderCell.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { TooltipId } from 'meta/tooltip'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useOdpReviewSummary } from 'client/store/ui/review/hooks'
import { useCountryIso } from 'client/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { DataCell } from 'client/components/DataGrid'
import ReviewSummaryIndicator from 'client/components/ReviewSummaryIndicator'

type Props = {
  className: string
  gridColumn: string
  gridRow: string
  lastCol?: boolean
  odpId: number
  odpYear: string
  sectionName: string
}

const OdpHeaderCell: React.FC<Props> = (props) => {
  const { className, gridColumn, gridRow, lastCol, odpId, odpYear, sectionName } = props

  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const { print } = useIsPrintRoute()
  const { t } = useTranslation()

  const reviewStatus = useOdpReviewSummary(odpId)

  return !print ? (
    <DataCell
      className="table-grid__data-cell table-grid__odp-header-cell"
      gridColumn={gridColumn}
      gridRow={gridRow}
      header
      lastCol={lastCol}
    >
      <Link
        className="link"
        data-tooltip-content={t('nationalDataPoint.clickOnNDP')}
        data-tooltip-id={TooltipId.info}
        to={Routes.OriginalDataPoint.generatePath({
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
    </DataCell>
  ) : (
    <DataCell className={className} gridColumn={gridColumn} gridRow={gridRow}>
      {odpYear}
    </DataCell>
  )
}

OdpHeaderCell.defaultProps = {
  lastCol: false,
}

export default OdpHeaderCell
