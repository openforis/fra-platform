import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { ContactNode } from 'meta/cycleData'

import { updateContact } from 'client/store/data/contacts/actions/updateContact'
import { ContactsState } from 'client/store/data/contacts/state'

export const updateContactsReducer = (builder: ActionReducerMapBuilder<ContactsState>) => {
  builder.addCase(updateContact.pending, (state, action) => {
    const { assessmentName, contact: contactAction, countryIso, cycleName, field, raw } = action.meta.arg

    const fieldUpdate: ContactNode = { ...contactAction[field], value: { raw } }
    const contactUpdate = { ...contactAction, [field]: fieldUpdate }

    const contacts = state[assessmentName][cycleName][countryIso]
    const contactIdx = contacts.findIndex((c) => c.uuid === contactAction.uuid)
    if (contactIdx >= 0) {
      contacts[contactIdx] = contactUpdate
    } else {
      contacts.push(contactUpdate)
    }
  })

  builder.addCase(updateContact.fulfilled, (state, action) => {
    const { assessmentName, contact: contactAction, countryIso, cycleName } = action.meta.arg

    const contacts = state[assessmentName][cycleName][countryIso]
    const contactIdx = contacts.findIndex((c) => c.uuid === contactAction.uuid)
    if (contactIdx >= 0) {
      contacts[contactIdx] = { ...contacts[contactIdx] }
    } else {
      throw new Error(`Contact not found`)
    }
  })
}
