import { Col, ColStyle, ColType } from 'meta/assessment/col'
import { Cycle, CycleUuid } from 'meta/assessment/cycle'
import { Label } from 'meta/assessment/label'
import { VariableCache } from 'meta/assessment/metaCache'
import { Row, RowType } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { UUID, UUIDs } from 'meta/uuid'

export type RowMetadata = {
  id: number
  label: Label
  variableName: string
  calculateFn: string
  calculationDependencies: Array<VariableCache>
}

export type RowsMetadata = Array<RowMetadata>

const getStyle = (cycle: Cycle): Record<CycleUuid, ColStyle> => {
  return {
    [cycle.uuid]: {
      colSpan: 1,
      rowSpan: 1,
    },
  }
}

const getCols = (cycle: Cycle, cols: Array<string>, rowUuid: UUID): Array<Col> => {
  return cols.map((col) => {
    return {
      rowUuid,
      props: {
        cycles: [cycle.uuid],
        colName: col,
        colType: ColType.decimal,
        style: getStyle(cycle),
      },
      uuid: UUIDs.getUuid(),
    }
  })
}

const getHeaderRow = (cycle: Cycle, cols: Array<string>, tableUuid: UUID): Row => {
  const rowUuid = UUIDs.getUuid()
  return {
    cols: [
      {
        rowUuid,
        props: {
          colType: ColType.header,
          cycles: [cycle.uuid],
          index: 0,
          style: getStyle(cycle),
        },
        uuid: UUIDs.getUuid(),
      },
      ...cols.map((colName, index) => {
        return {
          rowUuid,
          props: {
            index: index + 1,
            cycles: [cycle.uuid],
            colName,
            colType: ColType.header,
            style: getStyle(cycle),
          },
          uuid: UUIDs.getUuid(),
        }
      }),
    ],
    id: 1,
    props: {
      type: RowType.header,
      index: 'header_1',
      cycles: [cycle.uuid],
    },
    tableUuid,
    uuid: rowUuid,
  }
}

type GetRowsProps = { cycle: Cycle; cols: Array<string>; rowMetadata: RowsMetadata; tableUuid: UUID }
export const getRows = (props: GetRowsProps): Array<Row> => {
  const { cols, cycle, rowMetadata, tableUuid } = props
  const headerRow: Row = getHeaderRow(cycle, cols, tableUuid)

  const _getRow = (row: RowMetadata): Row => {
    const rowUuid = UUIDs.getUuid()
    return {
      cols: [
        {
          rowUuid,
          props: {
            colType: ColType.header,
            cycles: [cycle.uuid],
            index: 'header_0',
            labels: {
              [cycle.uuid]: row.label,
            },
            style: getStyle(cycle),
          },
          uuid: UUIDs.getUuid(),
        },
        ...getCols(cycle, cols, rowUuid),
      ],
      id: row.id,
      props: {
        type: RowType.data,
        index: row.id,
        cycles: [cycle.uuid],
        readonly: false,
        variableName: row.variableName,
        calculateFn: {
          [cycle.uuid]: row.calculateFn,
        },
      },
      tableUuid,
      uuid: rowUuid,
    }
  }

  return [headerRow, ...rowMetadata.map(_getRow)]
}

type GetTableProps = {
  cycle: Cycle
  cols: Array<string>
  tableId: number
  rowMetadata: RowsMetadata
  tableName: string
}

export const getCalculationDependencies = (
  props: Pick<GetTableProps, 'rowMetadata'>
): Record<string, Array<VariableCache>> => {
  const { rowMetadata } = props
  const r: Record<string, Array<VariableCache>> = {}
  rowMetadata.forEach((row) => {
    r[row.variableName] = row.calculationDependencies
  })
  return r
}

type Returned = Table & { calculationDependencies: Record<VariableName, Array<VariableCache>> }
export const getTable = (props: GetTableProps): Returned => {
  const { cols, cycle, rowMetadata, tableId, tableName } = props

  // e.g. '000.....-000000000001' where 1 is tableId
  const tableUuid = `00000000-0000-0000-0000-${String(tableId).padStart(12, '0')}` as UUID

  const table: Returned = {
    id: tableId,
    tableSectionUuid: '00000000-0000-0000-0000-000000000000' as UUID,
    calculationDependencies: getCalculationDependencies({ rowMetadata }),
    props: {
      odp: false,
      readonly: true,
      name: tableName + cycle.name,
      cycles: [cycle.uuid],
      dataExport: true,
      columnNames: {
        [cycle.uuid]: cols,
      },
    },
    rows: getRows({ cycle, cols, rowMetadata, tableUuid }),
    uuid: tableUuid,
  }

  return table
}
