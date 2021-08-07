import { exportReducer } from '@webapp/utils/reduxUtils'

import AppActionTypes from '@webapp/store/app/actions/actionTypes'

import {
  DataExportActionType,
  DataExportCountriesAction,
  DataExportSelectionAction,
} from '@webapp/store/page/dataExport/actionTypes'
import { DataExportSelection, DataExportState } from '@webapp/store/page/dataExport/state'
import { HomeActionType } from '@webapp/store/page/home'

const initialState: DataExportState = {
  countries: [],
  selection: {},
}

const actionHandlers = {
  [AppActionTypes.appCountryIsoUpdate]: () => ({ ...initialState }),

  [DataExportActionType.countriesUpdate]: (
    state: DataExportState,
    action: DataExportCountriesAction
  ): DataExportState => ({
    ...state,
    countries: action.countries,
  }),

  [DataExportActionType.selectionUpdate]: (
    state: DataExportState,
    action: DataExportSelectionAction
  ): DataExportState => ({
    ...state,
    selection: {
      ...state.selection,
      [action.assessmentSection]: action.selection,
    },
  }),

  // reset countries when filtered countries in home changes
  [HomeActionType.countriesFilterUpdate]: (state: DataExportState): DataExportState => ({
    ...state,
    countries: [],
    selection: Object.entries(state.selection).reduce<Record<string, DataExportSelection>>(
      (accumulator, [section, sectionSelection]) => {
        return {
          ...accumulator,
          [section]: {
            ...sectionSelection,
            countryISOs: [],
          },
        }
      },
      {}
    ),
  }),
}

export const dataExportReducer = exportReducer(actionHandlers, initialState)
