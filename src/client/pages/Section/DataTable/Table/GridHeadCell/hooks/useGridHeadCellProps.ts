import { useMemo } from 'react'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Cols } from 'meta/assessment/cols'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection/hooks/originalDataPoints'
import { ODPColHeader } from 'client/pages/Section/DataTable/Table/types'

import { useOriginalDataPointYearsWithHistory } from '../../hooks/useOriginalDataPointYearsWithHistory'
import { GridHeadCellProps } from '../types'
import { getODPHeader } from './getODPHeader'

type Returned = {
  className: string
  gridColumn: string
  gridRow: string
  lastCol: boolean
  odpYear?: ODPColHeader
}

export const useGridHeadCellProps = (props: GridHeadCellProps): Returned => {
  const { col, colIndex, headers, row, rowIndex, table } = props

  const country = useAssessmentCountry()
  const cycle = useCycle()
  const showOdp = useShowOriginalDatapoints()
  const odpYears = useOriginalDataPointYearsWithHistory(props)

  return useMemo<Returned>(() => {
    const { odp } = table.props
    const { columnName } = headers[colIndex] ?? {}

    const { colSpan: _colSpan, gridRow } = Cols.getStyle({ col, cycle })
    const colSpan = odp && !_colSpan ? headers.length : _colSpan
    const gridColumn = Objects.isNil(colSpan) ? undefined : `span ${colSpan}`
    const odpYear = getODPHeader({ col, columnName, country, odpYears, showOdp, table })

    const { index } = col.props
    const isHeaderLeft = (index === 0 && rowIndex === 0) || row.props?.readonly
    const className = classNames('table-grid__data-cell', { left: isHeaderLeft })

    const lastCol = colIndex === row.cols.length - 1

    return { className, gridColumn, gridRow, lastCol, odpYear }
  }, [col, colIndex, country, cycle, headers, odpYears, row, rowIndex, showOdp, table])
}
