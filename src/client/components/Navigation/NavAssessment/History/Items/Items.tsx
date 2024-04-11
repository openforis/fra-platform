import './Items.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { HistoryItemState } from 'client/store/data'
import TablePaginated from 'client/components/TablePaginated'

import { useColumns } from './hooks/useColumns'
import { useResetState } from './hooks/useResetState'

type Props = {
  items: HistoryItemState
}

const Items: React.FC<Props> = (props: Props) => {
  const { items } = props
  const { labelKey, target } = items

  const { t } = useTranslation()
  const columns = useColumns({ target })
  useResetState(target)

  return (
    <div className="history-items">
      <div className="history-items__title">{t(labelKey)}</div>

      <TablePaginated
        className="history-items__activities"
        columns={columns}
        counter
        gridTemplateColumns="minmax(100px, auto) 1px 1fr"
        header={false}
        limit={12}
        path={ApiEndPoint.CycleData.history(target)}
        wrapCells={false}
      />
    </div>
  )
}

export default Items
