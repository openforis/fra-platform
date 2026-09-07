import { Col, ColType } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { RowType } from 'meta/assessment/row'
import { RecordRowCache, RowCache } from 'meta/assessment/rowCache'
import { RowCaches } from 'meta/assessment/rowCaches'

import { TableValidationTestCase } from '../types'

type Props = Pick<TableValidationTestCase, 'rows'> & {
  cycle: Cycle
}

export const buildRowCaches = (props: Props): RecordRowCache => {
  const { cycle, rows } = props
  const cycles = [cycle.uuid]

  return rows.reduce<RecordRowCache>((acc, row) => {
    const { cols, tableName, validateFns, variableName } = row
    const rowUuid = `${tableName}.${variableName}`

    const rowCols = cols.map<Col>((col) => ({
      props: { colName: col.colName, colType: ColType.decimal, cycles, validateFns: { [cycle.uuid]: col.validateFns } },
      rowUuid,
      uuid: `${rowUuid}.${col.colName}`,
    }))
    const rowCache: RowCache = {
      cols: rowCols,
      props: { cycles, index: 0, type: RowType.data, validateFns: { [cycle.uuid]: validateFns }, variableName },
      sectionName: tableName,
      tableName,
      tableUuid: tableName,
      uuid: rowUuid,
    }

    acc[RowCaches.getKey({ tableName, variableName })] = rowCache
    return acc
  }, {})
}
