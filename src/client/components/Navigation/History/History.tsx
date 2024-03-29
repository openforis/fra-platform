import React from 'react'

import { useHistory } from 'client/store/data/hooks/useHistory'
import Items from 'client/components/Navigation/History/Items'
import Title from 'client/components/Navigation/History/Title'

const History: React.FC = () => {
  const history = useHistory()
  return (
    <div className="nav no-print">
      {Object.entries(history.items).map(([key, value]) => (
        <div key={key}>
          <Title value={value} />
          <Items value={value} />
        </div>
      ))}
    </div>
  )
}

export default History
