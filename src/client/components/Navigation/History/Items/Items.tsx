import React from 'react'

import { ActivityLog } from 'meta/assessment'

import RecentActivityItem from 'client/pages/CountryHome/FraHome/RecentActivity/RecentActivityItem'

import { useMaxHeight } from '../../NavAssessment/hooks/useMaxHeight'

type Props = {
  values: Array<ActivityLog<never>>
}
const Items: React.FC<Props> = (props: Props) => {
  const { values } = props
  const maxHeight = useMaxHeight()

  return (
    <div className="nav-assessment" style={{ maxHeight }}>
      <div>
        {values?.map((d, i) => (
          <div key={d.time} className="nav-section__item">
            <RecentActivityItem datum={d} rowIndex={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Items
