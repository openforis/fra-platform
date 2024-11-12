import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Col, Cols, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useAssessmentCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useOriginalDataPointYears } from 'client/store/data'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { DataCell } from 'client/components/DataGrid'
import OdpHeaderCell from 'client/pages/Section/DataTable/Table/GridHead/OdpHeaderCell'
import { getODPColSpan } from 'client/pages/Section/DataTable/Table/utils/getODPColSpan'
import { getODPHeader } from 'client/pages/Section/DataTable/Table/utils/getODPHeader'

type Props = {
  assessmentName: string
  data: RecordAssessmentData
  headers: Array<string>
  table: Table
}

type RenderCellProps = {
  col: Col
  colIndex: number
  row: Row
  rowIndex: number
}

type Returned = (props: RenderCellProps) => React.ReactNode

export const useRenderCell = (props: Props): Returned => {
  const { assessmentName, data, headers, table } = props

  const country = useAssessmentCountry()
  const cycle = useCycle()
  const odpYears = useOriginalDataPointYears()
  const showOdp = useShowOriginalDatapoints()

  const { odp: isOdpTable } = table.props
  const { t } = useTranslation()

  return useCallback<Returned>(
    (props: RenderCellProps) => {
      const { col, colIndex, row, rowIndex } = props
      const { index } = col.props
      const { colSpan: defaultColSpan, rowSpan } = Cols.getStyle({ col, cycle })
      const columnName = headers[colIndex]

      const odpHeader = getODPHeader({ col, columnName, country, odpYears, showOdp, table })

      let colSpan = defaultColSpan
      if (isOdpTable && !defaultColSpan) {
        colSpan = getODPColSpan({ assessmentName, cycleName: cycle.name, data, headers, table })
      }

      const isHeaderLeft = (index === 0 && rowIndex === 0) || row.props?.readonly
      const className = `table-grid__data-cell ${isHeaderLeft ? 'left' : ''}`

      const gridColumn = `span ${colSpan}`
      const gridRow = `span ${rowSpan}`
      const lastCol = colIndex === row.cols.length - 1

      if (odpHeader) {
        return (
          <OdpHeaderCell
            key={col.uuid}
            className={className}
            gridColumn={gridColumn}
            gridRow={gridRow}
            lastCol={lastCol}
            odpId={odpHeader.id}
            odpYear={odpHeader.year}
            sectionName={table.props.name}
          />
        )
      }
      return (
        <DataCell
          key={col.uuid}
          className={className}
          gridColumn={gridColumn}
          gridRow={gridRow}
          header
          lastCol={lastCol}
        >
          {Cols.getLabel({ cycle, col, t })}
        </DataCell>
      )
    },
    [assessmentName, country, cycle, data, headers, isOdpTable, odpYears, showOdp, t, table]
  )
}
