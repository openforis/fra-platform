import React from 'react'

import { User } from 'meta/user'

import ActionsContainer from '../../ActionsContainer'
import Edit from './Edit'

type Props = {
  user: User
}

const Actions: React.FC<Props> = (props: Props) => {
  const { user } = props
  return (
    <ActionsContainer>
      <Edit user={user} />
    </ActionsContainer>
  )
}

export default Actions
