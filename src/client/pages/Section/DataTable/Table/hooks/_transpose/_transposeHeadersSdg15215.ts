import { Col, Row } from 'meta/assessment'

import { _getTransposedHeaders } from 'client/pages/Section/DataTable/Table/hooks/_transpose/_transposeHeadersDefault'
import { TransposeHeaders } from 'client/pages/Section/DataTable/Table/hooks/_transpose/_types'

export const transposeHeadersSdg15215: TransposeHeaders = (props) => {
  const { cycle, rowsData, rowsHeader: _rowsHeader } = props
  const { uuid: cycleUuid } = cycle

  const _firstRowHeader = _rowsHeader.at(0)
  const _firstColHeader = _firstRowHeader.cols.at(0)
  const _secondColHeader = _firstRowHeader.cols.at(1)
  const _secondRowHeader = _rowsHeader.at(1)
  const _firstRowData = rowsData.at(0)

  const headers = _getTransposedHeaders(rowsData)

  const firstRowCols: Array<Col> = [
    {
      ..._firstColHeader,
      props: { ..._firstColHeader.props, style: { [cycleUuid]: { colSpan: 1, rowSpan: 1 } } },
    },
    {
      ..._firstColHeader,
      id: _firstColHeader.id + 1,
      uuid: `${_firstColHeader.uuid}-ssss`,
      props: {
        ..._firstColHeader.props,
        labels: { [cycleUuid]: { key: `unit.haThousandShort` } },
        style: { [cycleUuid]: { colSpan: 1, rowSpan: 2 } },
      },
    },
  ]
  const firstRow: Row = { ..._firstRowHeader, cols: firstRowCols }

  const secondRowCols: Array<Col> = [
    {
      ..._secondColHeader,
      props: {
        ..._secondColHeader.props,
        labels: _firstRowData.cols.at(0).props.labels,
        style: { [cycleUuid]: { colSpan: 1, rowSpan: 1 } },
      },
    },
  ]

  const secondRow: Row = { ..._secondRowHeader, cols: secondRowCols }

  return { headers, rowsHeader: [firstRow, secondRow] }
}
