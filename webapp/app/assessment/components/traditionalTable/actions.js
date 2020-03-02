import * as table from './table'
import * as R from 'ramda'
import axios from 'axios'
import * as autosave from '../../../components/autosave/actions'
import { applicationError } from '@webapp/app/components/error/actions'

export const tableValueChangedAction = 'traditionalTable/tableValueChanged'

const createNewTableState = (tableSpec, rowIdx, colIdx, newValue, getState) => {
  const traditionalTableState = getState().traditionalTable
  if (tableSpec && !tableSpec.name) {
    console.error('tableSpec missing name')
  }
  const tableValues = R.path([tableSpec.name, 'tableData'], traditionalTableState) || table.createTableData(tableSpec)
  return table.updateCellValue(tableSpec, tableValues, rowIdx, colIdx, newValue)
}

const saveChanges = (countryIso, tableSpec, tableData) => {
  const debounced = dispatch =>
    axios.post(
      `/api/traditionalTable/${countryIso}/${tableSpec.name}`,
      table.getValueSliceFromTableData(tableSpec, tableData)
    ).then(() => {
      dispatch(autosave.complete)
    }).catch((err) => {
      dispatch(applicationError(err))
      dispatch(autosave.complete)
    })

  debounced.meta = {
    debounce: {
      time: 800,
      key: 'saveTraditionalTable-' + tableSpec.name
    }
  }
  return debounced
}

export const tableChanged = (countryIso, tableSpec, newTableState) => dispatch => {
  dispatch({type: tableValueChangedAction, tableSpec, newTableState})
  dispatch(autosave.start)
  dispatch(saveChanges(countryIso, tableSpec, newTableState))
}

export const tableValueChanged = (countryIso, tableSpec, rowIdx, colIdx, newValue) => (dispatch, getState) => {
  const newTableState = createNewTableState(tableSpec, rowIdx, colIdx, newValue, getState)
  dispatch({type: tableValueChangedAction, tableSpec, newTableState})
  dispatch(autosave.start)
  dispatch(saveChanges(countryIso, tableSpec, newTableState))
}

export const fetchTableData = (countryIso, tableSpec) => dispatch => {
  axios.get(`/api/traditionalTable/${countryIso}/${tableSpec.name}`).then(resp => {
    const emptyTableData = table.createTableData(tableSpec)
    if (resp.data) {
      const filled = table.fillTableDatafromValueSlice(tableSpec, emptyTableData, resp.data)
      dispatch({type: tableValueChangedAction, tableSpec, newTableState: filled})
    } else {
      dispatch({type: tableValueChangedAction, tableSpec, newTableState: emptyTableData})
    }
  }).catch((err) => {
    dispatch(applicationError(err))
  })
}
