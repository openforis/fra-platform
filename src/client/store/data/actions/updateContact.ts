import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { Contact } from 'meta/user'

type Props = CycleDataParams & {
  contacts: Array<Contact>
  contact: Contact
}

const putContact = Functions.debounce(
  async (props: Props) => {
    const { countryIso, assessmentName, cycleName, sectionName, contact } = props

    const data = { contact }
    const params = { countryIso, assessmentName, cycleName, sectionName }
    const config = { params }
    await axios.put(ApiEndPoint.Contacts.many(), data, config)
  },
  1000,
  'putContact'
)

export const updateContact = createAsyncThunk<Array<Contact>, Props>('extNode/put/contact', async (props) => {
  putContact(props)
  return props.contacts
})
