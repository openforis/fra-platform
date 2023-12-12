import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { Contact } from 'meta/cycleData'

export const getContacts = createAsyncThunk<Array<Contact>, CycleDataParams>('extNode/get/contacts', async (_props) => {
  const { countryIso, assessmentName, cycleName } = _props
  const params = { countryIso, assessmentName, cycleName }
  const config = { params }
  const { data: contacts } = await axios.get(ApiEndPoint.CycleData.Contacts.many(), config)

  return contacts
})
