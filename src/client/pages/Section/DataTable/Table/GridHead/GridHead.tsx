import React from 'react'
import { useTranslation } from 'react-i18next'

import { Col as TypeCol, Cols, Row as TypeRow, RowType, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useAssessmentCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useOriginalDataPointYears } from 'client/store/data'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { DataCell } from 'client/components/DataGrid'
import { getODPColSpan } from 'client/pages/Section/DataTable/Table/utils/getODPColSpan'

import OdpHeaderCell from './OdpHeaderCell'

type Props = {
  assessmentName: string
  data: RecordAssessmentData
  headers: Array<string>
  table: Table
}

const GridHead: React.FC<Props> = (props) => {
  const { assessmentName, data, headers, table } = props

  const { t } = useTranslation()

  const country = useAssessmentCountry()
  const cycle = useCycle()
  const odpYears = useOriginalDataPointYears()
  const showODP = useShowOriginalDatapoints()

  const { odp: isOdp } = table.props
  const rowsHeader = table.rows.filter((row) => row.props.type === RowType.header)

  return (
    <>
      {rowsHeader.map((row: TypeRow, rowIndex: number) =>
        row.cols.map((col: TypeCol, colIndex: number) => {
          const { index } = col.props
          const { colSpan: defaultColSpan, rowSpan } = Cols.getStyle({ cycle, col })
          const columnName = headers[colIndex]

          let odpHeader =
            showODP && table.props.odp && !col.props.labels && odpYears?.find((odp) => odp.year === columnName)

          if (table.props.name === 'forestCharacteristics') {
            odpHeader = country.props.forestCharacteristics.useOriginalDataPoint && odpHeader
          }

          const headerLeft = (index === 0 && rowIndex === 0) || row.props?.readonly
          const className = `table-grid__data-cell ${headerLeft ? 'left' : ''}`

          const colSpan =
            isOdp && !defaultColSpan
              ? getODPColSpan({ assessmentName, cycleName: cycle.name, headers, table, data })
              : defaultColSpan

          if (odpHeader) {
            return (
              <OdpHeaderCell
                key={col.uuid}
                className={className}
                colSpan={colSpan}
                lastCol={colIndex === row.cols.length - 1}
                odpId={odpHeader.id}
                odpYear={odpHeader.year}
                rowSpan={rowSpan}
                sectionName={table.props.name}
              />
            )
          }

          return (
            <DataCell
              key={col.uuid}
              className={className}
              gridColumn={`span ${colSpan}`}
              gridRow={`span ${rowSpan}`}
              header
              lastCol={colIndex === row.cols.length - 1}
            >
              {Cols.getLabel({ cycle, col, t })}
            </DataCell>
          )
        })
      )}
    </>
  )
}

export default GridHead
