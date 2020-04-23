import { useDispatch } from 'react-redux'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { persistTableTableCell } from '../../../../actions/persist'
import * as Sanitizer from './sanitizer'

export default (props) => {
  const { assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum } = props

  const type = col[SectionSpec.KEYS_COL.type]
  const colIdx = col[SectionSpec.KEYS_COL.idx]
  const options = col[SectionSpec.KEYS_COL.options]
  const params = { assessmentType, sectionName, tableName, rowIdx, colIdx, updateTableDataCell }

  const dispatch = useDispatch()

  return (event) => {
    const { value } = event.target
    if (Sanitizer.isAcceptable(type, value)) {
      const valueUpdate = Sanitizer.sanitize(type, value, datum, options)
      dispatch(persistTableTableCell({ ...params, value: valueUpdate }))
    }
  }
}
