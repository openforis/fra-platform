import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { createContact } from 'client/store/data/contacts/actions/createContact'
import { ContactsState } from 'client/store/data/contacts/state'

export const createContactsReducer = (builder: ActionReducerMapBuilder<ContactsState>) => {
  builder.addCase(createContact.fulfilled, (state, action) => {
    const { assessmentName, countryIso, cycleName } = action.meta.arg
    const contactAction = action.payload

    const contacts = state[assessmentName][cycleName][countryIso]
    contacts.push(contactAction)
  })
}
