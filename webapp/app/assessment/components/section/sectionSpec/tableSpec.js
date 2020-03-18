import * as R from 'ramda'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

import { updateTableDataCell } from '@webapp/app/assessment/components/dataTable/actions'

export const KEYS_TABLE = {
  name: 'name',
  rows: 'rows',
  odp: 'odp',
  showOdpChart: 'showOdpChart',
  // Functions
  getSectionData: 'getSectionData',
  isSectionDataEmpty: 'isSectionDataEmpty',
  canGenerateValues: 'canGenerateValues',
  updateTableDataCell: 'updateTableDataCell',
}

const tableDefault = {
  [KEYS_TABLE.name]: '',
  [KEYS_TABLE.rows]: [],
  [KEYS_TABLE.getSectionData]: AssessmentState.getSectionData,
  [KEYS_TABLE.isSectionDataEmpty]: AssessmentState.isSectionDataEmpty,
  [KEYS_TABLE.odp]: false,
  [KEYS_TABLE.showOdpChart]: false,
  [KEYS_TABLE.canGenerateValues]: null,
  [KEYS_TABLE.updateTableDataCell]: updateTableDataCell,
}

const assocRows = tableSpec => {
  let idxHeader = -1
  let idxData = -1

  const rows = tableSpec[KEYS_TABLE.rows].map(row => {
    const header = row.type === 'header'
    idxHeader += header ? 1 : 0
    idxData += header ? 0 : 1
    return {
      idx: header ? `header_${idxHeader}` : idxData,
      ...row,
    }
  })

  return {
    ...tableSpec,
    [KEYS_TABLE.rows]: rows,
  }
}

export const newTableSpec = R.pipe(R.mergeDeepRight(tableDefault), assocRows)
