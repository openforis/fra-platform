import React, { ReactElement, useCallback } from 'react'

import classNames from 'classnames'

import { TablePaginatedOrderBy, TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedOrderBy } from 'client/store/tablePaginated/hooks/tablePaginated'
import Icon from 'client/components/Icon'
import { Column } from 'client/components/TablePaginated/types'

type Props<Datum> = {
  column: Column<Datum>
  path: string
}

const OrderBy = <Datum extends object>(props: Props<Datum>): ReactElement => {
  const { column, path } = props
  const { orderByProperty } = column

  const dispatch = useAppDispatch()
  const orderBy = useTablePaginatedOrderBy(path)

  const active = orderBy?.property === orderByProperty
  const activeAsc = active && orderBy?.direction === TablePaginatedOrderByDirection.asc
  const activeDesc = active && orderBy?.direction === TablePaginatedOrderByDirection.desc
  const iconName = activeDesc ? 'sort-amount-desc' : 'sort-amount-asc'

  const onClick = useCallback(() => {
    let orderByUpdate: TablePaginatedOrderBy
    if (!active) orderByUpdate = { property: orderByProperty, direction: TablePaginatedOrderByDirection.asc }
    if (activeAsc) orderByUpdate = { property: orderByProperty, direction: TablePaginatedOrderByDirection.desc }

    dispatch(TablePaginatedActions.setOrderBy({ orderBy: orderByUpdate, path }))
  }, [active, activeAsc, dispatch, orderByProperty, path])

  return (
    <button className={classNames('btn-sort', { active })} onClick={onClick} type="button">
      <Icon name={iconName} />
    </button>
  )
}

export default OrderBy
