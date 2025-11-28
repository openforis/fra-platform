import React, { ReactElement, useCallback } from 'react'

import { TablePaginatedOrderBy, TablePaginatedOrderByDirection } from 'meta/tablePaginated/orderBy'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedOrderBy } from 'client/store/tablePaginated/hooks/tablePaginated'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
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
    <Button
      bgTransparent
      className="table-paginated__btn-sort"
      iconName={iconName}
      inverse
      noBorder
      onClick={onClick}
      size={ButtonSize.m}
      type={active ? ButtonType.primary : ButtonType.anonymous}
    />
  )
}

export default OrderBy
