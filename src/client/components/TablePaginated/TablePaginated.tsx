import './TablePaginated.scss'
import React, { HTMLAttributes, useMemo, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'

import classNames from 'classnames'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'
import DataGrid from 'client/components/DataGridDeprecated'
import Hr from 'client/components/Hr'
import { PaginatorProps } from 'client/components/Paginator'
import Filters from 'client/components/TablePaginated/Filters/Filters'

import ExportButton from './ExportButton/ExportButton'
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
    export?: boolean
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

const TablePaginated = <Datum extends object>(props: Props<Datum>) => {
  const { className, gridTemplateColumns: gridTemplateColumnsProps } = props // HTMLDivElement Props
  const { marginPagesDisplayed, pageRangeDisplayed } = props // Paginator Props
  const { columns, filters = defaults.filters, groups, limit = 30, path } = props // Base Props
  const {
    counter = defaults.counter,
    EmptyListComponent = defaults.EmptyListComponent,
    export: exportTable,
    header = true,
    skeleton = defaults.skeleton,
    wrapCells = true,
    compareFn,
  } = props // Component Props

  const divRef = useRef<HTMLDivElement>()

  useInitTablePaginated({ filters, path })
  useFetchData({ counter, limit, path })
  useResetOnUnmount({ path })
  useScrollToTopOnPageUpdate({ divRef, path })
  const count = useTablePaginatedCount(path)

  const gridTemplateColumns = useMemo<string | number>(
    () => gridTemplateColumnsProps ?? `repeat(${columns.length}, auto)`,
    [columns.length, gridTemplateColumnsProps]
  )
  const withFilters = useMemo<boolean>(() => filters.filter((filter) => !filter.hidden).length > 0, [filters])

  return (
    <div ref={divRef} className={classNames('table-paginated', className)}>
      <div>
        {(exportTable || withFilters) && (
          <div className="table-paginated-actions">
            {exportTable && <ExportButton path={path} />}
            {exportTable && withFilters && <Hr vertical />}
            {withFilters && <Filters filters={filters} path={path} />}
          </div>
        )}
        <DataGrid className="table-paginated-datagrid" style={{ gridTemplateColumns }}>
          {header && <Header columns={columns} path={path} />}
          {count?.total === 0 && <EmptyListComponent />}
          <Body
            columns={columns}
            compareFn={compareFn}
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
