import { createAsyncThunk } from '@reduxjs/toolkit'

import { CycleDataParams } from 'meta/api/request'
import { Contact, RoleName } from 'meta/user'

const placeholder: Array<Contact> = [
  {
    id: 1,
    uuid: 'foo-bar-1',
    countryIso: 'X01',
    props: {
      index: 1,
      role: RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      appellation: 'Mr.',
      name: 'John',
      surname: 'Doe',
      institution: 'Ministry of Health',
      contribution: ['1a', '1b'],
      readOnly: true,
    },
  },
  {
    id: 2,
    uuid: 'foo-bar-2',
    countryIso: 'X01',
    props: {
      index: 0,
      role: RoleName.NATIONAL_CORRESPONDENT,
      appellation: 'Mr.',
      name: 'John',
      surname: 'Doe',
      institution: 'Ministry of Health',
      contribution: ['2a'],
      readOnly: true,
    },
  },
  {
    id: 3,
    uuid: 'foo-bar-3',
    countryIso: 'X01',
    props: {
      index: 2,
      role: RoleName.NATIONAL_CORRESPONDENT,
      appellation: 'Mr.',
      name: 'John',
      surname: 'Doe',
      institution: 'Ministry of Health',
      contribution: ['1a'],
    },
  },
  {
    id: 4,
    uuid: 'foo-bar-4',
    countryIso: 'X01',
    props: {
      index: 3,
      role: RoleName.NATIONAL_CORRESPONDENT,
      appellation: 'Mr.',
      name: 'John',
      surname: 'Doe',
      institution: 'Ministry of Health',
      contribution: ['1b'],
    },
  },
  {
    id: 5,
    uuid: 'foo-bar-5',
    countryIso: 'X01',
    props: {
      index: 4,
      role: RoleName.NATIONAL_CORRESPONDENT,
      appellation: 'Mr.',
      name: 'John',
      surname: 'Doe',
      institution: 'Ministry of Health',
      contribution: ['1a', '1b'],
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
