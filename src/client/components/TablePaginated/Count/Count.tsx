import './Count.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'
import { TablePaginatedCounter, TablePaginatedCounterComponent } from 'client/components/TablePaginated/types'

type Props = {
  counter: TablePaginatedCounter
  path: string
}

const DefaultCounter: TablePaginatedCounterComponent = (props) => {
  const { count } = props

  const { t } = useTranslation()

  return (
    <div className="table-paginated-counts">
      <div className="table-paginated-count-item">{`${t(`common.total`)} ${count.total || 0}`}</div>
    </div>
  )
}

const Count: React.FC<Props> = (props) => {
  const { counter, path } = props

  const count = useTablePaginatedCount(path)
  const Counter: TablePaginatedCounterComponent = counter.Component ?? DefaultCounter

  if (!count) return null

  return <Counter count={count} />
}

export default Count
