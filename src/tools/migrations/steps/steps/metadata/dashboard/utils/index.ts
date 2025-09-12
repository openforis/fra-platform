import { Assessment } from 'meta/assessment/assessment'
import { Col, ColStyle, ColType } from 'meta/assessment/col'
import { Cycle, CycleUuid } from 'meta/assessment/cycle'
import { Label } from 'meta/assessment/label'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { Row, RowType } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'
import { UUIDs } from 'meta/uuid'

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
      uuid: UUIDs.getUuid(),
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
        uuid: UUIDs.getUuid(),
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
    tableId,
    uuid: UUIDs.getUuid(),
  }
}

type GetRowsProps = { cycle: Cycle; cols: Array<string>; tableId: number; rowMetadata: RowsMetadata }
export const getRows = (props: GetRowsProps): Array<Row> => {
  const { cols, cycle, rowMetadata, tableId } = props
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
              [cycle.uuid]: row.label,
            },
            style: getStyle(cycle),
          },
          uuid: UUIDs.getUuid(),
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
      uuid: UUIDs.getUuid(),
    }
  }

  return [headerRow, ...rowMetadata.map(_getRow)]
}

type GetTableProps = {
  assessment: Assessment
  cycle: Cycle
  cols: Array<string>
  tableId: number
  rowMetadata: RowsMetadata
  tableName: string
}

export const getCalculationDependencies = (
  props: Pick<GetTableProps, 'assessment' | 'cycle' | 'rowMetadata' | 'tableName'>
): Record<string, Array<VariableCache>> => {
  const { assessment, cycle, rowMetadata, tableName } = props
  const r: Record<string, Array<VariableCache>> = {}
  rowMetadata.forEach((row) => {
    const { variableName } = row

    const propsDeps = { assessment, cycle, tableName, variableName }
    r[row.variableName] = AssessmentMetaCaches.getCalculationsDependencies(propsDeps)
  })
  return r
}

type Returned = Table & { calculationDependencies: Record<VariableName, Array<VariableCache>> }
export const getTable = (props: GetTableProps): Returned => {
  const { assessment, cols, cycle, rowMetadata, tableId, tableName } = props
  const table: Returned = {
    id: tableId,
    tableSectionId: -1,
    calculationDependencies: getCalculationDependencies({ assessment, cycle, rowMetadata, tableName }),
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
    rows: getRows({ cycle, cols, tableId, rowMetadata }),
    uuid: UUIDs.getUuid(),
  }

  return table
}
