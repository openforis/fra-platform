import { useDispatch, useSelector } from 'react-redux'

import { FRA } from '@core/assessment'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import { TableSpec, ColSpec } from '@webapp/app/assessment/components/section/sectionSpec'
import { persistTableData } from '../../../../actions'
import * as Sanitizer from '../cell/sanitizer'

export default (props: any) => {
  const { assessmentType, sectionName, tableSpec, variableName, data: tableData, datum } = props
  const tableName = TableSpec.getName(tableSpec)
  const updateTableDataCell: any = TableSpec.getUpdateTableDataCell(tableSpec)
  const odpVariables = Object.values(TableSpec.getOdpVariables(tableSpec))
  const type = ColSpec.TypeSpec.decimal
  const datumKey = Object.prototype.hasOwnProperty.call(datum, 'name') ? 'name' : 'year' // table 1a,1b use name and table 2a uses year

  const dispatch = useDispatch()
  const state = useSelector((_state) => _state)
  const sectionData = AssessmentState.getSectionData(assessmentType, sectionName, tableName)(state)

  const _updateSectionData = (data: any, datumToUpdate: any, variable: any, value: any) => {
    const valuePrev = datumToUpdate[variable]
    const valueSanitized = Sanitizer.sanitize(type, value, valuePrev)
    const valueUpdate = valueSanitized && String(valueSanitized)
    const datumUpdate = { ...datumToUpdate, [variable]: valueUpdate, [`${variable}Estimated`]: false }
    return {
      datum: datumUpdate,
      data: updateTableDataCell({ state, variableName: variable, datum: datumUpdate })(data),
    }
  }

  const _persistSanitizedValue = (value: any) => {
    if (Sanitizer.isAcceptable(type, value)) {
      const update = _updateSectionData(sectionData, datum, variableName, value)
      dispatch(persistTableData({ assessmentType, sectionName, tableName, data: update.data, datum: update.datum }))
    }
  }

  const onChange = (event: any) => {
    const { value } = event.target
    _persistSanitizedValue(value)
  }

  const onPaste = (event: any) => {
    event.stopPropagation()
    event.preventDefault()

    const { clipboardData } = event
    const el = document.createElement('html')
    el.innerHTML = clipboardData.getData('text/html')

    const rows = el.getElementsByTagName('tr')

    if (rows.length > 0) {
      let dataUpdate = { ...sectionData } // create a copy of section data (e,g, {fra:[], fraNoNDPs:[]}
      const datumToUpdateByKey: any = {} // keep a reference to updated datum
      const rowIdx = odpVariables.findIndex((v) => v === variableName) // rowIdx is index of variable passed to props
      const colIdx = FRA.years.findIndex((y: any) => y === Number(datum.name) || y === Number(datum.year)) // colIdx is the index of variable fra year

      for (let i = 0; i < rows.length; i += 1) {
        const rowIdxCurrent = i + rowIdx
        const variableCurrent = odpVariables[rowIdxCurrent]
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
              datumToUpdate = tableData.find((d: any) => {
                return d[datumKey] === yearCurrentString
              })
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
