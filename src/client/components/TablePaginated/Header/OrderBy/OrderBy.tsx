import React, { useCallback } from 'react'

import classNames from 'classnames'

import { TablePaginatedOrderBy, TablePaginatedOrderByDirection } from 'meta/tablePaginated'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions, useTablePaginatedOrderBy } from 'client/store/ui/tablePaginated'
import Icon from 'client/components/Icon'
import { Column } from 'client/components/TablePaginated/types'

type Props<Datum> = {
  column: Column<Datum>
  path: string
}

const OrderBy = <Datum extends object>(props: Props<Datum>) => {
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
  }, [active, activeAsc, orderByProperty, dispatch, path])

  return (
    <button className={classNames('btn-sort', { active })} onClick={onClick} type="button">
      <Icon name={iconName} />
    </button>
  )
}

export default OrderBy
