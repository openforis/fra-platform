import * as R from 'ramda'

import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['2'].children.a

const _getTableData = tableName => () =>
  R.pipe(
    AssessmentState.getSectionData(FRA.type, section.name, section.name),
    R.propOr(null, tableName),
    R.unless(R.isNil, R.values)
  )

export const getTableDataAvg = _getTableData(section.tables.avgTable)

export const getTableDataTotal = _getTableData(section.tables.totalTable)
