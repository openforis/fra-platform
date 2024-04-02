import React from 'react'

import { useHistory } from 'client/store/data/hooks/useHistory'
import { useData } from 'client/components/Navigation/History/hooks/useData'
import { useGetData } from 'client/components/Navigation/History/hooks/useGetData'
import Items from 'client/components/Navigation/History/Items'
import Title from 'client/components/Navigation/History/Title'

const History: React.FC = () => {
  const history = useHistory()

  useGetData()
  const values = useData()

  return (
    <div className="nav no-print">
      {Object.entries(history.items).map(([key, value]) => (
        <div key={key}>
          <Title value={value} />
          <Items sectionItemKey={value.sectionKey} values={values} />
        </div>
      ))}
    </div>
  )
}

export default History
