import './OdpHeaderCell.scss'
import 'client/components/DiffText/DiffText.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment/table'
import { Routes } from 'meta/routes'
import { TooltipId } from 'meta/tooltip'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useOdpReviewSummary } from 'client/store/review/hooks/review'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataCell } from 'client/components/DataGrid'
import ReviewSummaryIndicator from 'client/components/ReviewSummaryIndicator'
import { ODPColHeader } from 'client/pages/Section/DataTable/Table/types'

import { useOdpHeaderLastApprovedHistoryInfo } from './hooks/useOdpHeaderLastApprovedHistoryInfo'

type Props = {
  className: string
  gridColumn: string
  gridRow: string
  lastCol?: boolean
  odpYear: ODPColHeader
  sectionName: string
  table: Table
}

const OdpHeaderCell: React.FC<Props> = (props) => {
  const { className, gridColumn, gridRow, lastCol, odpYear, sectionName, table } = props
  const { id: odpId, year } = odpYear

  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const { print } = useIsPrintRoute()
  const reviewStatus = useOdpReviewSummary(odpId)
  const historyInfo = useOdpHeaderLastApprovedHistoryInfo({ odpYear, table })

  if (print) {
    return (
      <DataCell className={classNames(className, 'header')} gridColumn={gridColumn} gridRow={gridRow}>
        {year}
      </DataCell>
    )
  }

  return (
    <DataCell
      className={classNames(className, 'table-grid__odp-cell')}
      gridColumn={gridColumn}
      gridRow={gridRow}
      header
      lastCol={lastCol}
    >
      <div className={classNames({ 'diff-text': !Objects.isNil(historyInfo) })}>
        <Link
          className={classNames('table-grid__odp-link', { added: historyInfo?.added, removed: historyInfo?.removed })}
          data-tooltip-content={t('nationalDataPoint.clickOnNDP')}
          data-tooltip-id={TooltipId.info}
          to={Routes.OriginalDataPoint.generatePath({ assessmentName, countryIso, cycleName, sectionName, year })}
        >
          {year}
        </Link>

        {!historyLastApprovedIsActive && <ReviewSummaryIndicator status={reviewStatus} />}
      </div>
    </DataCell>
  )
}

export default OdpHeaderCell
