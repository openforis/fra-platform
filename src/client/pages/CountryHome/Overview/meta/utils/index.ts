import { UUIDs } from 'utils/uuids'

import { Col, ColStyle, ColType, Cycle, CycleUuid, Row, RowType, Table, VariableCache } from 'meta/assessment'

import { RowMetadata, RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'

const getStyle = (cycle: Cycle): Record<CycleUuid, ColStyle> => {
  return {
    [cycle.uuid]: {
      colSpan: 1,
      rowSpan: 1,
    },
  }
}

const getCols = (cycle: Cycle, cols: Array<string>, rowId: number): Array<Col> => {
  return cols.map((col) => {
    return {
      rowId,
      props: {
        cycles: [cycle.uuid],
        colName: col,
        colType: ColType.decimal,
        style: getStyle(cycle),
      },
      uuid: UUIDs.v4(),
    }
  })
}

const getHeaderRow = (cycle: Cycle, cols: Array<string>, tableId: number): Row => {
  return {
    cols: [
      {
        rowId: 1,
        props: {
          colType: ColType.header,
          cycles: [cycle.uuid],
          index: 0,
          style: getStyle(cycle),
        },
        uuid: UUIDs.v4(),
      },
      ...cols.map((colName, index) => {
        return {
          rowId: 1,
          props: {
            index: index + 1,
            cycles: [cycle.uuid],
            colName,
            colType: ColType.header,
            style: getStyle(cycle),
          },
          uuid: UUIDs.v4(),
        }
      }),
    ],
    id: 1,
    props: {
      type: RowType.header,
      index: 'header_1',
      cycles: [cycle.uuid],
    },
    tableId,
    uuid: UUIDs.v4(),
  }
}

type GetRowsProps = { cycle: Cycle; cols: Array<string>; tableId: number; rowMetadata: RowsMetadata }
export const getRows = (props: GetRowsProps): Array<Row> => {
  const { cycle, cols, tableId, rowMetadata } = props
  const headerRow: Row = getHeaderRow(cycle, cols, tableId)

  const _getRow = (row: RowMetadata): Row => {
    return {
      cols: [
        {
          rowId: row.id,
          props: {
            colType: ColType.header,
            cycles: [cycle.uuid],
            index: 'header_0',
            labels: {
              [cycle.uuid]: {
                key: row.label,
              },
            },
            style: getStyle(cycle),
          },
          uuid: UUIDs.v4(),
        },
        ...getCols(cycle, cols, row.id),
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
      tableId,
      uuid: UUIDs.v4(),
    }
  }

  return [headerRow, ...rowMetadata.map(_getRow)]
}

export const getCalculationDependencies = (rowMetadata: RowsMetadata): Record<string, VariableCache[]> => {
  const r: Record<string, VariableCache[]> = {}
  rowMetadata.forEach((row) => {
    r[row.variableName] = row.calculationDependencies
  })
  return r
}

type GetTableProps = {
  cycle: Cycle
  cols: Array<string>
  tableId: number
  rowMetadata: RowsMetadata
  tableName: string
}
export const getTable = (props: GetTableProps): Table => {
  const { cycle, cols, tableId, rowMetadata, tableName } = props
  const table: Table = {
    id: tableId,
    tableSectionId: -1,
    calculationDependencies: getCalculationDependencies(rowMetadata),
    props: {
      odp: false,
      name: tableName + cycle.name,
      cycles: [cycle.uuid],
      dataExport: true,
      columnNames: {
        [cycle.uuid]: cols,
      },
    },
    rows: getRows({ cycle, cols, tableId, rowMetadata }),
    uuid: UUIDs.v4(),
  }

  return table
}
