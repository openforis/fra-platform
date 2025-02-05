import { useMemo } from 'react'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Cols } from 'meta/assessment'

import { useAssessmentCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { getODPColSpan } from 'client/pages/Section/DataTable/Table/utils/getODPColSpan'

import { useOriginalDataPointYearsWithHistory } from '../../hooks/useOriginalDataPointYearsWithHistory'
import { ODPYear } from '../../types'
import { GridHeadCellProps } from '../types'
import { getODPHeader } from './getODPHeader'

type Returned = {
  className: string
  gridColumn: string
  gridRow: string
  lastCol: boolean
  odpYear?: ODPYear
}

export const useGridHeadCellProps = (props: GridHeadCellProps): Returned => {
  const { assessmentName, col, colIndex, data, headers, row, rowIndex, table } = props

  const country = useAssessmentCountry()
  const cycle = useCycle()
  const showOdp = useShowOriginalDatapoints()
  const odpYears = useOriginalDataPointYearsWithHistory(props)

  return useMemo<Returned>(() => {
    const { odp } = table.props

    const { colSpan: defaultColSpan, gridRow } = Cols.getStyle({ col, cycle })
    const { columnName } = headers[colIndex] ?? {}

    const odpYear = getODPHeader({ col, columnName, country, odpYears, showOdp, table })

    let colSpan = defaultColSpan
    if (odp && !defaultColSpan) {
      colSpan = getODPColSpan({ assessmentName, cycleName: cycle.name, data, headers, table })
    }
    const gridColumn = Objects.isNil(colSpan) ? undefined : `span ${colSpan}`

    const { index } = col.props
    const isHeaderLeft = (index === 0 && rowIndex === 0) || row.props?.readonly
    const className = classNames('table-grid__data-cell', { left: isHeaderLeft })

    const lastCol = colIndex === row.cols.length - 1

    return { className, gridColumn, gridRow, lastCol, odpYear }
  }, [assessmentName, col, colIndex, country, cycle, data, headers, odpYears, row, rowIndex, showOdp, table])
}
