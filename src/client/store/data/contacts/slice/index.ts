import { createSlice } from '@reduxjs/toolkit'

import { createContactsReducer } from 'client/store/data/contacts/slice/extraReducers/createContactsReducer'
import { deleteContactsReducer } from 'client/store/data/contacts/slice/extraReducers/deleteContactsReducer'
import { getContactsReducer } from 'client/store/data/contacts/slice/extraReducers/getContactsReducer'
import { updateContactsReducer } from 'client/store/data/contacts/slice/extraReducers/updateContactsReducer'
import { initialState } from 'client/store/data/contacts/state'

export const ContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    createContactsReducer(builder)
    deleteContactsReducer(builder)
    getContactsReducer(builder)
    updateContactsReducer(builder)
  },
})
