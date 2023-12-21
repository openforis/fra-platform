import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Functions } from 'utils/functions'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { NodeValue } from 'meta/assessment'
import { Contact, ContactField } from 'meta/cycleData'

type Props = CycleDataParams & {
  contact: Contact
  field: ContactField
  raw: NodeValue['raw']
}

const _create = async (props: Props): Promise<void> => {
  const { assessmentName, cycleName, countryIso, sectionName, contact, field, raw } = props

  const body = { contact, field, raw }
  const params = { assessmentName, cycleName, countryIso, sectionName }
  await axios.post(ApiEndPoint.CycleData.Contacts.one(), body, { params })
}

const _update = async (props: Props): Promise<void> => {
  const { assessmentName, cycleName, countryIso, sectionName, contact, field, raw } = props

  const body = { contact, field, raw }
  const params = { assessmentName, cycleName, countryIso, sectionName }
  await axios.put(ApiEndPoint.CycleData.Contacts.one(), body, { params })
}

const create = Functions.debounce(_create, 1_000, 'createContact')
const update = Functions.debounce(_update, 1_000, 'updateContact')

export const upsertContact = createAsyncThunk<void, Props>('contact/upsert', async (props) => {
  const { contact } = props

  if (contact.placeholder) {
    await create(props)
  } else {
    await update(props)
  }
})
