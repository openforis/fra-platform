import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'

type Props = CycleDataParams & {
  uuid: string
}

export const deleteContact = createAsyncThunk<void, Props>('contact/delete', async (props) => {
  const config = { params: props }
  await axios.delete(ApiEndPoint.CycleData.Contacts.one(), config)
})
