import { Action } from 'redux'

import { Country } from '@core/country'
import { DataExportSelection } from '@webapp/store/page/dataExport/state'

export enum DataExportActionType {
  countriesUpdate = 'dataExport/countries/update',
  selectionUpdate = 'dataExport/selection/update',
}

export interface DataExportCountriesAction extends Action<DataExportActionType.countriesUpdate> {
  countries: Array<Country>
}

export interface DataExportSelectionAction extends Action<DataExportActionType.selectionUpdate> {
  assessmentSection: string
  selection: DataExportSelection
}
