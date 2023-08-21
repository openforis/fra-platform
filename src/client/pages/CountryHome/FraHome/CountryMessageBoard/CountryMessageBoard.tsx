import './CountryMessageBoard.scss'
import React from 'react'

import { Authorizer } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

import MessageBoard from './MessageBoard'
import MessageBoardUsers from './MessageBoardUsers'

const CountryMessageBoard: React.FC = () => {
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const user = useUser()

  return (
    <div className="landing__page-container">
      <div className="landing__message-board-container">
        <MessageBoard />
        {Authorizer.canViewUsers({ countryIso, cycle, user }) && <MessageBoardUsers />}
      </div>
    </div>
  )
}

export default CountryMessageBoard
