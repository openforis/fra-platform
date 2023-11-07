import { createAsyncThunk } from '@reduxjs/toolkit'

import { CycleDataParams } from 'meta/api/request'
import { Contact, RoleName } from 'meta/user'

const placeholder: Array<Contact> = [
  {
    id: 1,
    uuid: 'foo-bar-1',
    countryIso: 'X01',
    props: {
      rowIndex: 1,
      readOnly: true,
    },
    value: {
      role: RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      appellation: 'mr',
      name: 'Read',
      surname: 'Only',
      institution: 'Ministry of Health',
      contributions: ['1a', '1b'],
    },
  },
  {
    id: 2,
    uuid: 'foo-bar-2',
    countryIso: 'X01',
    props: {
      rowIndex: 0,
      readOnly: true,
    },
    value: {
      role: RoleName.NATIONAL_CORRESPONDENT,
      appellation: 'ms',
      name: 'Read',
      surname: 'Onla',
      institution: 'Ministry of Health',
      contributions: ['2a'],
    },
  },
  {
    id: 3,
    uuid: 'foo-bar-3',
    countryIso: 'X01',
    props: {
      rowIndex: 2,
    },
    value: {
      role: RoleName.NATIONAL_CORRESPONDENT,
      appellation: 'mr',
      name: 'John',
      surname: 'Doe',
      institution: 'Ministry of Health',
      contributions: ['1a'],
    },
  },
  {
    id: 4,
    uuid: 'foo-bar-4',
    countryIso: 'X01',
    props: {
      rowIndex: 3,
    },
    value: {
      role: RoleName.NATIONAL_CORRESPONDENT,
      appellation: 'mr',
      name: 'John',
      surname: 'Doe',
      institution: 'Ministry of Health',
      contributions: ['1b'],
    },
  },
  {
    id: 5,
    uuid: 'foo-bar-5',
    countryIso: 'X01',
    props: {
      rowIndex: 4,
    },
    value: {
      role: RoleName.NATIONAL_CORRESPONDENT,
      appellation: 'mr',
      name: 'John',
      surname: 'Doe',
      institution: 'Ministry of Health',
      contributions: ['1a', '1b'],
    },
  },
]

export const getContacts = createAsyncThunk<Array<Contact>, CycleDataParams>('extNode/get/contacts', async (_props) => {
  // TODO: implement backend endpoint
  // const params = { countryIso, assessmentName, cycleName }
  // const config = { params }
  // const contacts = await axios.get(ApiEndPoint.CycleData.ExtNode.contacts(), config)

  // return contacts.data
  return placeholder
})
