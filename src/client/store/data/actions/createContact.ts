import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { Contact, Contacts } from 'meta/contact'

type Props = CycleDataParams & {
  contact: Contact
  contacts: Array<Contact>
}
export const createContact = createAsyncThunk<Array<Contact>, Props>('extNode/post/contact', async (props) => {
  const { countryIso, assessmentName, cycleName, sectionName, contact, contacts } = props

  const data = { contact }
  const params = { countryIso, assessmentName, cycleName, sectionName }
  const config = { params }
  const { data: newContact } = await axios.post(ApiEndPoint.Contacts.many(), data, config)

  const _contacts = Contacts.removePlaceholder(contacts)
  _contacts.push(newContact)

  return Contacts.addPlaceholder(_contacts)
})
