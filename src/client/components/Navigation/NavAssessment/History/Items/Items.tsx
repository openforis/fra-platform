import React from 'react'

import { ActivityLog } from 'meta/assessment'

import Item from './Item'

type Props = {
  values: Array<ActivityLog<never>>
}
const Items: React.FC<Props> = (props: Props) => {
  const { values } = props

  return (
    <div className="nav-section__items-visible">
      {values?.map((d) => (
        <React.Fragment key={d.time}>
          <Item datum={d} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default Items
