import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { deleteContact } from 'client/store/data/contacts/actions/deleteContact'
import { ContactsState } from 'client/store/data/contacts/state'

export const deleteContactsReducer = (builder: ActionReducerMapBuilder<ContactsState>) => {
  builder.addCase(deleteContact.pending, (state, action) => {
    const { assessmentName, contact, countryIso, cycleName } = action.meta.arg

    const contacts = state[assessmentName][cycleName][countryIso]

    const path = [assessmentName, cycleName, countryIso]
    const value = contacts.filter((c) => c.uuid !== contact.uuid)
    Objects.setInPath({ obj: state, path, value })
  })

  builder.addCase(deleteContact.rejected, (state, action) => {
    const { assessmentName, contact, countryIso, cycleName } = action.meta.arg

    const contacts = state[assessmentName][cycleName][countryIso]
    contacts.push(contact)
  })
}
