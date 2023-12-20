import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
// import axios from 'axios'
// import { Functions } from 'utils/functions'
// import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { NodeValue } from 'meta/assessment'
import { Contact, ContactField } from 'meta/cycleData'

type Props = CycleDataParams & {
  contact: Contact
  field: ContactField
  raw: NodeValue['raw']
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

const create = async (props: Props): Promise<void> => {
  const { assessmentName, cycleName, countryIso, sectionName, contact, field, raw } = props

  const body = { contact, field, raw }
  const params = { assessmentName, cycleName, countryIso, sectionName }
  await axios.post(ApiEndPoint.CycleData.Contacts.one(), body, { params })
}

export const upsertContact = createAsyncThunk<void, Props>('contact/upsert', async (props) => {
  const { contact } = props

  if (contact.placeholder) {
    await create(props)
  }
})
