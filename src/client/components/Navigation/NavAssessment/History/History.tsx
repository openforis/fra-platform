import React from 'react'

import { useHistoryActivities } from 'client/store/data'
import Items from 'client/components/Navigation/NavAssessment/History/Items'

import { useResetHistory } from './hooks/useResetHistory'

const History: React.FC = () => {
  const history = useHistoryActivities()

  useResetHistory()

  return (
    <div>
      {Object.entries(history.items).map(([key, items]) => {
        return <Items key={key} items={items} />
      })}
    </div>
  )
}

export default History
