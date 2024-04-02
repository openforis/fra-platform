import React from 'react'

import { ActivityLog } from 'meta/assessment'

import RecentActivityItem from 'client/pages/CountryHome/FraHome/RecentActivity/RecentActivityItem'

type Props = {
  values: Array<ActivityLog<never>>
}
const Items: React.FC<Props> = (props: Props) => {
  const { values } = props

  return (
    <div>
      {values?.map((d, i) => (
        <div key={d.time} className="nav-section__item">
          <RecentActivityItem datum={d} rowIndex={i} />
        </div>
      ))}
    </div>
  )
}

export default Items
