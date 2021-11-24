import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeChat } from '../../../../app/user/chat/actions'
import { closeCountryMessageBoard } from '../../../../app/countryLanding/views/messageBoard/actions'

import { getCountryOverview } from '../../../../app/countryLanding/actions'

import { useCountryIso } from '../../../../store/app'
import MessageBoard from './messageBoard'
import Users from './users'

const MessageBoardView = () => {
  const countryIso = useCountryIso()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCountryOverview(countryIso))
    return () => {
      dispatch(closeChat())
      dispatch(closeCountryMessageBoard())
    }
  }, [countryIso])

  return (
    <div className="landing__page-container">
      <div className="landing__message-board-container">
        <MessageBoard />
        <Users />
      </div>
    </div>
  )
}

export default MessageBoardView
