import './CountryMessageBoard.scss'
import React, { useEffect } from 'react'

import { useCountryIso } from '@client/hooks'

import MessageBoard from './MessageBoard'
import MessageBoardUsers from './MessageBoardUsers'

const CountryMessageBoard = () => {
  const countryIso = useCountryIso()
  // const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getCountryOverview(countryIso))
    return () => {
      // dispatch(closeChat())
      // dispatch(closeCountryMessageBoard())
    }
  }, [countryIso])

  return (
    <div className="landing__page-container">
      <div className="landing__message-board-container">
        <MessageBoard />
        <MessageBoardUsers />
      </div>
    </div>
  )
}

export default CountryMessageBoard
