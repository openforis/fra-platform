import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { UserEditForm } from 'meta/form/userEdit'

type Props = CycleParams & { userEdit: UserEditForm }

export const editUser = createAsyncThunk<void, Props>('userManagement/post/edit', async (props) => {
  const { userEdit, ...params } = props

  const formData = new FormData()
  formData.append('userEdit', JSON.stringify(userEdit))

  if (userEdit.profilePicture) formData.append('profilePicture', userEdit.profilePicture)

  const headers = { 'Content-Type': 'multipart/form-data' }
  await axios.post(ApiEndPoint.User.one(), formData, { params, headers })
})
