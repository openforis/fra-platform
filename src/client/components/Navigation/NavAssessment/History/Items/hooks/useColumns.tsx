import React, { useMemo } from 'react'

import { ActivityLog } from 'meta/assessment'
import { HistoryTarget } from 'meta/cycleData'

import Item from 'client/components/Navigation/NavAssessment/History/Items/Item'
import { Column } from 'client/components/TablePaginated'

type Props = {
  target: HistoryTarget
}

export const useColumns = (props: Props): Array<Column<ActivityLog<never>>> => {
  const { target } = props

  return useMemo<Array<Column<ActivityLog<never>>>>(() => {
    return [
      {
        component: ({ datum }) => <Item datum={datum} target={target} />,
        key: 'target',
      },
    ]
  }, [target])
}
