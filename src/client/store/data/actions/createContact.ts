import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { Contact } from 'meta/contact'

type Props = CycleDataParams & {
  contact: Contact
}
export const createContact = createAsyncThunk<Contact, Props>('extNode/post/contact', async (props) => {
  const { countryIso, assessmentName, cycleName, sectionName, contact } = props

  const data = { contact }
  const params = { countryIso, assessmentName, cycleName, sectionName }
  const config = { params }
  const { data: newContact } = await axios.post(ApiEndPoint.Contacts.many(), data, config)

  return newContact
})
