import './EditUserForm.scss'
import React from 'react'

import { User } from '@meta/user'

const EditUserForm: React.FC<{ user: User }> = ({ user }) => <div>{user.id}</div>

export default EditUserForm
