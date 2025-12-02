import './TablePaginated.scss'
import React, { HTMLAttributes, useMemo, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import classNames from 'classnames'

import { useTablePaginatedCount } from 'client/store/tablePaginated/hooks/tablePaginated'
import { DataGrid } from 'client/components/DataGrid'
import Actions from 'client/components/TablePaginated/Actions'
import { PaginatorProps } from 'client/components/TablePaginated/Paginator/ReactPaginator'

import { useFetchData } from './hooks/useFetchData'
import { useInitTablePaginated } from './hooks/useInitTablePaginated'
import { useResetOnUnmount } from './hooks/useResetOnUnmount'
import { useScrollToTopOnPageUpdate } from './hooks/useScrollToTopOnPageUpdate'
import Body from './Body'
import Count from './Count'
import DefaultEmptyList from './DefaultEmptyList'
import Header from './Header'
import Paginator from './Paginator'
import { Props as BaseProps, TablePaginatedCounter } from './types'

type Props<Datum extends object> = Pick<HTMLAttributes<HTMLDivElement>, 'className'> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridTemplateColumns'> &
  Pick<PaginatorProps, 'marginPagesDisplayed' | 'pageRangeDisplayed'> &
  BaseProps<Datum> & {
    counter?: TablePaginatedCounter
    EmptyListComponent?: React.FC
    header?: boolean
  }

const defaults: Readonly<Partial<Props<object>>> = {
  counter: { show: true },
  EmptyListComponent: DefaultEmptyList,
  filters: [],
  skeleton: {
    baseColor: 'white',
    highlightColor: 'var(--ui-bg)',
    Component: () => <Skeleton borderRadius="2px" duration={1} height="20px" width="100%" />,
  },
}

const TablePaginated = <Datum extends object>(props: Props<Datum>): React.ReactElement => {
  const { className, gridTemplateColumns: gridTemplateColumnsProps } = props // HTMLDivElement Props
  const { marginPagesDisplayed, pageRangeDisplayed } = props // Paginator Props
  const { columns, filterFn, filters = defaults.filters, groups, limit = 30, path } = props // Base Props
  const {
    EmptyListComponent = defaults.EmptyListComponent,
    compareFn,
    counter = defaults.counter,
    export: exportTable,
    extraActions,
    header = true,
    skeleton = defaults.skeleton,
    wrapCells = true,
  } = props // Component Props

  const divRef = useRef<HTMLDivElement>(null)

  useInitTablePaginated({ filters, path })
  useFetchData({ counter, limit, path })
  useResetOnUnmount({ path })
  useScrollToTopOnPageUpdate({ divRef, path })
  const count = useTablePaginatedCount(path)

  const gridTemplateColumns = useMemo<string | number>(
    () => gridTemplateColumnsProps ?? `repeat(${columns.length}, auto)`,
    [columns.length, gridTemplateColumnsProps]
  )

  return (
    <div ref={divRef} className={classNames('table-paginated', className)}>
      <div>
        <Actions export={exportTable} extraActions={extraActions} filters={filters} path={path} />
        <DataGrid className="table-paginated-datagrid" gridTemplateColumns={gridTemplateColumns}>
          {header && <Header columns={columns} path={path} />}
          {count?.total === 0 && <EmptyListComponent />}
          <Body
            columns={columns}
            compareFn={compareFn}
            filterFn={filterFn}
            groups={groups}
            limit={limit}
            path={path}
            skeleton={skeleton}
            wrapCells={wrapCells}
          />
        </DataGrid>
      </div>

      <Paginator
        limit={limit}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        path={path}
      />

      {counter.show && <Count counter={counter} path={path} />}
    </div>
  )
}

export default TablePaginated
