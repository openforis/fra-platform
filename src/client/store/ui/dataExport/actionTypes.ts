import { Action } from 'redux'

import { Country } from 'meta/area'

import { DataExportSelection } from 'client/store/ui/dataExport/stateType'

export enum DataExportActionType {
  countriesUpdate = 'dataExport/countries/update',
  selectionUpdate = 'dataExport/selection/update',
}

export interface DataExportCountriesAction extends Action<DataExportActionType.countriesUpdate> {
  payload: Array<Country>
}

export interface DataExportSelectionAction extends Action<DataExportActionType.selectionUpdate> {
  sectionName: string
  selection: DataExportSelection
}
