import { ChangeEventHandler, ClipboardEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FRA, TableData, TableDatumODP } from '@core/assessment'
import { TypeSpec } from '@webapp/sectionSpec'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { persistTableData } from '@webapp/components/Assessment/DataTable/actions'
import * as Sanitizer from '../Cell/sanitizer'
import { Props } from './props'

type UseOnChange = {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
}

export default (props: Props): UseOnChange => {
  const { assessmentType, sectionName, tableSpec, variableName, data: tableData, datum } = props
  const { name: tableName, updateTableDataCell, odpVariables } = tableSpec

  const type = TypeSpec.decimal
  // table 1a,1b use name and table 2a uses year
  const datumKey = Object.prototype.hasOwnProperty.call(datum, 'name') ? 'name' : 'year'

  const dispatch = useDispatch()
  const state = useSelector((_state) => _state)
  const sectionData = AssessmentState.getSectionData(assessmentType, sectionName, tableName)(state)

  const _updateSectionData = (
    data: TableData,
    datumToUpdate: TableDatumODP,
    variable: keyof TableDatumODP,
    value: string
  ): { data: TableData; datum: TableDatumODP } => {
    const valuePrev = datumToUpdate[variable]
    const valueSanitized = Sanitizer.sanitize(type, value, valuePrev as string)
    const valueUpdate = valueSanitized && String(valueSanitized)
    const datumUpdate = { ...datumToUpdate, [variable]: valueUpdate, [`${variable}Estimated`]: false }
    return {
      datum: datumUpdate,
      data: updateTableDataCell({ state, variableName: variable, datum: datumUpdate })(data),
    }
  }

  const _persistSanitizedValue = (value: string) => {
    if (Sanitizer.isAcceptable(type, value)) {
      const update = _updateSectionData(sectionData, datum, variableName, value)
      dispatch(persistTableData({ assessmentType, sectionName, tableName, data: update.data, datum: update.datum }))
    }
  }

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    const { value } = event.target
    _persistSanitizedValue(value)
  }

  const onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { clipboardData } = event
    const el = document.createElement('html')
    el.innerHTML = clipboardData.getData('text/html')

    const rows = el.getElementsByTagName('tr')

    if (rows.length > 0) {
      let dataUpdate = { ...sectionData } // create a copy of section data (e,g, {fra:[], fraNoNDPs:[]}
      const datumToUpdateByKey: Record<string, TableDatumODP> = {} // keep a reference to updated datum
      const rowIdx = Object.values(odpVariables).findIndex((v) => v === variableName) // rowIdx is index of variable passed to props
      const colIdx = FRA.years.findIndex((y) => y === Number(datum.name) || y === Number(datum.year)) // colIdx is the index of variable fra year

      for (let i = 0; i < rows.length; i += 1) {
        const rowIdxCurrent = i + rowIdx
        const variableCurrent = odpVariables[rowIdxCurrent] as keyof TableDatumODP
        if (!variableCurrent) break

        const columns = rows[i].getElementsByTagName('td')
        for (let j = 0; j < columns.length; j += 1) {
          const colIdxCurrent = j + colIdx
          const yearCurrent = FRA.years[colIdxCurrent]
          if (!yearCurrent) break

          const valueUpdate = columns[j].innerText
          if (Sanitizer.isAcceptable(type, valueUpdate)) {
            // get current datum from cached values if there is otherwise from tableData prop
            const yearCurrentString = String(yearCurrent)
            let datumToUpdate = datumToUpdateByKey[yearCurrentString]
            if (!datumToUpdate) {
              datumToUpdate = tableData.find((d: TableDatumODP) => d[datumKey] === yearCurrentString) as TableDatumODP
            }

            // skip column odp
            if (datumToUpdate.type !== 'odp') {
              const update = _updateSectionData(dataUpdate, datumToUpdate, variableCurrent, valueUpdate)
              dataUpdate = update.data
              datumToUpdateByKey[yearCurrentString] = update.datum
            }
          }
        }
      }
      dispatch(persistTableData({ assessmentType, sectionName, tableName, data: dataUpdate, datum }))
    } else {
      const value = clipboardData.getData('text/plain')
      _persistSanitizedValue(value)
    }
  }

  return { onChange, onPaste }
}
