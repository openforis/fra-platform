import React from 'react'

import { useHistory } from 'client/store/data/hooks/useHistory'
import Items from 'client/components/Navigation/NavAssessment/History/Items'
import Title from 'client/components/Navigation/NavAssessment/History/Title'

import { useData } from './hooks/useData'
import { useGetData } from './hooks/useGetData'

const History: React.FC = () => {
  useGetData()

  const data = useData()
  const history = useHistory()

  return (
    <div className="nav-section">
      {Object.entries(history.items).map(([key, value]) => {
        return (
          <React.Fragment key={key}>
            <Title value={value} />
            <Items values={data} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default History
