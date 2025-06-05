import { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getContacts } from 'client/store/data/contacts/actions/getContacts'
import { ContactsState } from 'client/store/data/contacts/state'

export const getContactsReducer = (builder: ActionReducerMapBuilder<ContactsState>) => {
  builder.addCase(getContacts.fulfilled, (state: Draft<ContactsState>, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName } = meta.arg
    const path = [assessmentName, cycleName, countryIso]
    Objects.setInPath({ obj: state, path, value: payload ?? [] })
  })
}
