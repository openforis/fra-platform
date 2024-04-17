import './Items.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { HistoryItemState } from 'client/store/data'
import { ItemSkeleton } from 'client/components/Navigation/NavAssessment/History/Items/Item'
import TablePaginated, { TablePaginatedCounterComponent } from 'client/components/TablePaginated'

import { useColumns } from './hooks/useColumns'

type Props = {
  items: HistoryItemState
}

const Counter: TablePaginatedCounterComponent = (props) => {
  const { count } = props

  const { t } = useTranslation()

  return <div className="history-items__counter">{t('common.change', { count: count.total })}</div>
}

const Items: React.FC<Props> = (props: Props) => {
  const { items } = props
  const { labelKey, target } = items

  const { t } = useTranslation()
  const columns = useColumns({ target })

  return (
    <div className="history-items">
      <div className="history-items__title">{t(labelKey)}</div>

      <TablePaginated
        className="history-items__activities"
        columns={columns}
        counter={{ show: true, Component: Counter }}
        gridTemplateColumns="1px 1fr"
        header={false}
        limit={12}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        path={ApiEndPoint.CycleData.history(target)}
        skeleton={{ baseColor: 'var(--ui-bg-hover)', highlightColor: '#c2c2c2', Component: ItemSkeleton }}
        wrapCells={false}
      />
    </div>
  )
}

export default Items
