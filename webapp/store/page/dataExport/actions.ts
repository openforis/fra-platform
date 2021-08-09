import { Country } from '@core/country'
import {
  DataExportActionType,
  DataExportCountriesAction,
  DataExportSelectionAction,
} from '@webapp/store/page/dataExport/actionTypes'
import { DataExportSelection } from '@webapp/store/page/dataExport/state'

const updateCountries = (countries: Array<Country>): DataExportCountriesAction => ({
  type: DataExportActionType.countriesUpdate,
  countries,
})

const updateSelection = (props: {
  assessmentSection: string
  selection: DataExportSelection
}): DataExportSelectionAction => ({
  type: DataExportActionType.selectionUpdate,
  assessmentSection: props.assessmentSection,
  selection: props.selection,
})

export const DataExportAction = {
  updateCountries,
  updateSelection,
}
