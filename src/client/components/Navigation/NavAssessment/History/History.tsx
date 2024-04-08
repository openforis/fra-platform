import React from 'react'

import { useHistory } from 'client/store/data/hooks/useHistory'
import Items from 'client/components/Navigation/NavAssessment/History/Items'
import Title from 'client/components/Navigation/NavAssessment/History/Title'

import { useResetHistory } from './hooks/useResetHistory'

const History: React.FC = () => {
  const history = useHistory()

  useResetHistory()

  return (
    <div className="nav-section">
      {Object.entries(history.items).map(([key, value]) => {
        return (
          <React.Fragment key={key}>
            <Title value={value} />
            <Items sectionKey={value.sectionKey} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default History
