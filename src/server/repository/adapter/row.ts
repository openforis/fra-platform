import { Objects } from 'utils/objects'

import { Row, RowProps } from 'meta/assessment/row'
import { RowCache } from 'meta/assessment/rowCache'

import { ColAdapter, ColDB } from 'server/repository/adapter/col'

export interface RowDB {
  id: number
  uuid: string
  props: RowProps
  table_id: number
  cols?: Array<ColDB>
}

export const RowAdapter = (rowDB: RowDB): Row => {
  const {
    props: { calculateFn, calculateIf, chart, excludeFromDataExport, linkToSection, validateFns, withReview, ...rest },
    ...row
  } = rowDB

  const _row = {
    ...Objects.camelize(row),
    props: {
      ...Objects.camelize(rest),
      calculateFn,
      calculateIf,
      chart,
      excludeFromDataExport,
      linkToSection,
      validateFns,
      withReview,
    },
  }

  if (_row.cols) {
    _row.cols = row.cols.map(ColAdapter)
  }
  return _row
}

export const RowCacheAdapter = (rowDB: RowDB): RowCache => RowAdapter(rowDB) as RowCache
