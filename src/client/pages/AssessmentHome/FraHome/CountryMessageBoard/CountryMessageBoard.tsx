import './CountryMessageBoard.scss'
import React from 'react'

import MessageBoard from './MessageBoard'
import MessageBoardUsers from './MessageBoardUsers'

const CountryMessageBoard: React.FC = () => {
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
