import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeChat } from '@webapp/app/user/chat/actions'
import { closeCountryMessageBoard } from '@webapp/app/landing/views/messageBoard/actions'

import * as AppState from '@webapp/app/appState'

import { getCountryOverview } from '@webapp/app/landing/actions'

import MessageBoard from './messageBoard'
import Users from './users'

const MessageBoardView = () => {
  const countryIso = useSelector(AppState.getCountryIso)
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
