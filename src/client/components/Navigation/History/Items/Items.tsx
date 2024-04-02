import React from 'react'

import { ActivityLog } from 'meta/assessment'
import { HistoryItemSectionKey } from 'meta/cycleData'

import Item from 'client/components/Navigation/History/Items/Item'
import { useMaxHeight } from 'client/components/Navigation/NavAssessment/hooks/useMaxHeight'

type Props = {
  sectionItemKey: HistoryItemSectionKey
  values: Array<ActivityLog<never>>
}
const Items: React.FC<Props> = (props: Props) => {
  const { sectionItemKey, values } = props
  const maxHeight = useMaxHeight()

  return (
    <div className="nav-assessment" style={{ maxHeight }}>
      <div>
        {values?.map((d) => (
          <div key={d.time} className="nav-section__item">
            <Item datum={d} sectionItemKey={sectionItemKey} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Items
