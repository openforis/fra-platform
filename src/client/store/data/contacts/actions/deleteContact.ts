import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'
import { Contact } from 'meta/cycleData/contact/contact'

type Props = CycleDataParams & {
  contact: Contact
}

export const deleteContact = createAsyncThunk<void, Props>('data/contacts/delete', async (props) => {
  const { contact, ...rest } = props
  const { uuid } = contact
  const params = { ...rest, uuid }
  const config = { params }
  await axios.delete(ApiEndPoint.CycleData.Contacts.one(), config)
})
