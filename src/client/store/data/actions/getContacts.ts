import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { Contact, Contacts } from 'meta/contact'

export const getContacts = createAsyncThunk<Array<Contact>, CycleDataParams>('extNode/get/contacts', async (props) => {
  const { assessmentName, cycleName, countryIso } = props
  const params = { countryIso, assessmentName, cycleName }
  const config = { params }
  const contacts = await axios.get(ApiEndPoint.Contacts.many(), config)

  return Contacts.addPlaceholder(contacts.data)
})
