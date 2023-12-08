import { createAsyncThunk } from '@reduxjs/toolkit'

// import axios from 'axios'
// import { Functions } from 'utils/functions'
// import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { Contact } from 'meta/user'

type Props = CycleDataParams & {
  contacts: Array<Contact>
}

// TODO: Implement backend endpoint
// const putContacts = Functions.debounce(
//   async (props: Props) => {
//     const { countryIso, assessmentName, cycleName, contacts } = props
//
//     const data = { contacts: Contacts.removePlaceholder() }
//     const params = { countryIso, assessmentName, cycleName }
//     const config = { params }
//     await axios.put(ApiEndPoint.CycleData.ExtNode.contacts(), data, config)
//   },
//   1000,
//   'putContacts'
// )

export const updateContacts = createAsyncThunk<Array<Contact>, Props>('extNode/put/contacts', async (props) => {
  // putContacts(props)
  return props.contacts
})
