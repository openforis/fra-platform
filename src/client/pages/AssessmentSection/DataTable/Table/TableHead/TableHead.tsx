import React from 'react'
import { useTranslation } from 'react-i18next'

import { Col as TypeCol, Cols, Row as TypeRow, RowType, Table } from '@meta/assessment'
import { TableData } from '@meta/data'

import { useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useOriginalDataPointYears, useShowOriginalDatapoints } from '@client/store/ui/assessmentSection'
import { getODPColSpan } from '@client/pages/AssessmentSection/DataTable/Table/utils/getODPColSpan'

import OdpHeaderCell from './OdpHeaderCell'

type Props = {
  headers: string[]
  table: Table
  data: TableData
}

const TableHead: React.FC<Props> = (props) => {
  const { headers, table, data } = props

  const { t } = useTranslation()

  const cycle = useCycle()
  const country = useAssessmentCountry()
  const showODP = useShowOriginalDatapoints()
  const odpYears = useOriginalDataPointYears()

  const { odp: isOdp } = table.props
  const rowsHeader = table.rows.filter((row) => row.props.type === RowType.header)

  return (
    <thead>
      {rowsHeader.map((row: TypeRow, rowIndex: number) => (
        <tr key={row.uuid}>
          {row.cols.map((col: TypeCol, colIndex: number) => {
            const { index } = col.props

            const { colSpan: defaultColSpan, rowSpan } = Cols.getStyle({ cycle, col })

            const columnName = headers[colIndex]

            let isOdpHeaderCell = showODP && isOdp && !col.props.labels && odpYears?.includes(columnName)

            if (table.props.name === 'forestCharacteristics')
              isOdpHeaderCell = isOdpHeaderCell && country.props.forestCharacteristics.useOriginalDataPoint

            const headerLeft = (index === 0 && rowIndex === 0) || row.props?.readonly

            const className = `fra-table__header-cell${headerLeft ? '-left' : ''}`

            const colSpan = isOdp && !defaultColSpan ? getODPColSpan({ headers, table, data }) : defaultColSpan

            return isOdpHeaderCell ? (
              <OdpHeaderCell
                key={col.uuid}
                className={rowIndex > 0 ? 'odp-header-cell' : className}
                colSpan={colSpan}
                rowSpan={rowSpan}
                columnName={columnName}
                sectionName={table.props.name}
              />
            ) : (
              <th key={col.uuid} className={className} colSpan={colSpan} rowSpan={rowSpan}>
                {Cols.getLabel({ cycle, col, t })}
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}

export default TableHead
