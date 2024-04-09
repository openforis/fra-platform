import './Items.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { HistoryItemState } from 'client/store/data'

import { useData } from '../hooks/useData'
import { useGetData } from '../hooks/useGetData'
import { useResetState } from './hooks/useResetState'
import Item from './Item'

type Props = {
  items: HistoryItemState
}

const Items: React.FC<Props> = (props: Props) => {
  const { items } = props
  const { sectionKey, sectionLabelKey } = items

  const { t } = useTranslation()
  useGetData(sectionKey)
  const data = useData(sectionKey)

  useResetState(sectionKey)

  return (
    <div className="history-items">
      <div className="history-items__title">{t(sectionLabelKey)}</div>

      <div className="history-items__activities">
        {data?.map((datum, index) => (
          <Item key={`${datum.time}-${String(index)}`} datum={datum} sectionKey={sectionKey} />
        ))}
      </div>
    </div>
  )
}

export default Items
