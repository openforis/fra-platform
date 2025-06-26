import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { toggleEditDescription } from 'client/store/ui/countryReport/actions/toggleEditDescription'
import { CountryReportState } from 'client/store/ui/countryReport/state'

export const toggleEditDescriptionReducer = (builder: ActionReducerMapBuilder<CountryReportState>) => {
  builder.addCase(toggleEditDescription, (state, action) => {
    const { name, sectionName } = action.payload

    const editable = state.descriptionsEditEnabled?.[sectionName]?.[name] ?? false
    const path = ['descriptionsEditEnabled', sectionName, name]
    Objects.setInPath({ obj: state, path, value: !editable })
  })
}
