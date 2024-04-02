import React from 'react'
import { useTranslation } from 'react-i18next'

import { useHistory } from 'client/store/data/hooks/useHistory'
import { useData } from 'client/components/Navigation/NavAssessment/History/hooks/useData'
import { useGetData } from 'client/components/Navigation/NavAssessment/History/hooks/useGetData'
import Items from 'client/components/Navigation/NavAssessment/History/Items'

const History: React.FC = () => {
  const { t } = useTranslation()

  const history = useHistory()

  useGetData()
  const data = useData()

  return (
    <>
      <div className="nav-section__header" role="button" tabIndex={0}>
        {Object.values(history?.items).map((h) => {
          return <div key={h.sectionKey}> {t(h.sectionLabelKey)} </div>
        })}
      </div>
      <Items values={data} />
    </>
  )
}

export default History
