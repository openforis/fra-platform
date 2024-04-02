import React from 'react'
import { useTranslation } from 'react-i18next'

import { useHistory } from 'client/store/data/hooks/useHistory'
import Items from 'client/components/Navigation/History/Items'
import { useMaxHeight } from 'client/components/Navigation/NavAssessment/hooks/useMaxHeight'

import { useData } from './hooks/useData'
import { useGetData } from './hooks/useGetData'

const History: React.FC = () => {
  const { t } = useTranslation()
  const maxHeight = useMaxHeight()

  const history = useHistory()

  useGetData()
  const data = useData()

  return (
    <div className="nav no-print">
      <div className="nav-assessment" style={{ maxHeight }}>
        <div className="nav-section__header" role="button" tabIndex={0}>
          {Object.values(history?.items).map((h) => {
            return <div key={h.sectionKey}> {t(h.sectionLabelKey)} </div>
          })}
        </div>
        <Items values={data} />
      </div>
    </div>
  )
}

export default History
