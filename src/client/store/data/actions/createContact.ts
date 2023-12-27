import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { Contact, Contacts } from 'meta/cycleData'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleDataParams

export const createContact = createAsyncThunk<Contact, Props, ThunkApiConfig>(
  'contact/create',
  async (props, { getState }) => {
    const contacts = getState().data.contacts[props.assessmentName][props.cycleName][props.countryIso]
    const contact = Contacts.newContact({
      countryIso: props.countryIso,
      rowIndex: contacts.filter((c) => !c.props.readOnly).length - 1,
    })

    const { assessmentName, cycleName, countryIso, sectionName } = props

    const body = { contact }
    const params = { assessmentName, cycleName, countryIso, sectionName }
    await axios.post(ApiEndPoint.CycleData.Contacts.one(), body, { params })

    return contact
  }
)
