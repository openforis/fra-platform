import React from 'react'

import { HistoryItemSectionKey } from 'meta/cycleData'

import { useData } from '../hooks/useData'
import { useGetData } from '../hooks/useGetData'
import { useResetState } from './hooks/useResetState'
import Item from './Item'

type Props = {
  sectionKey: HistoryItemSectionKey
}
const Items: React.FC<Props> = (props: Props) => {
  const { sectionKey } = props
  useGetData(sectionKey)
  const data = useData(sectionKey)

  useResetState(sectionKey)

  return (
    <div className="nav-section__items-visible">
      {data?.map((d) => (
        <React.Fragment key={d.time}>
          <Item datum={d} sectionKey={sectionKey} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default Items
