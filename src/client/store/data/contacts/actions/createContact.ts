import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { Contact } from 'meta/cycleData/contact/contact'
import { Contacts } from 'meta/cycleData/contacts'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleDataParams

export const createContact = createAsyncThunk<Contact, Props, ThunkApiConfig>(
  'data/contacts/create',
  async (props, { getState }) => {
    const contacts = getState().data.contacts[props.assessmentName][props.cycleName][props.countryIso] as Array<Contact>
    const contact = Contacts.newContact({
      countryIso: props.countryIso,
      rowIndex: contacts.filter((c) => !c.props.readOnly).length - 1,
    })

    const { assessmentName, countryIso, cycleName, sectionName } = props

    const body = { contact }
    const params = { assessmentName, cycleName, countryIso, sectionName }
    await axios.post(ApiEndPoint.CycleData.Contacts.one(), body, { params })

    return contact
  }
)
