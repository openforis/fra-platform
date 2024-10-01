import './TablePaginated.scss'
import React, { HTMLAttributes, useMemo, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { useTablePaginatedCount, useTablePaginatedData, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { useOnUpdate } from 'client/hooks'
import DataGrid from 'client/components/DataGridDeprecated'
import { PaginatorProps } from 'client/components/Paginator'
import Filters from 'client/components/TablePaginated/Filters/Filters'

import ExportButton from './ExportButton/ExportButton'
import { useFetchData } from './hooks/useFetchData'
import Body from './Body'
import Count from './Count'
import DefaultEmptyList from './DefaultEmptyList'
import Header from './Header'
import Paginator from './Paginator'
import { Props as BaseProps, TablePaginatedCounter, TablePaginatedSkeleton } from './types'

type Props<Datum extends object> = Pick<HTMLAttributes<HTMLDivElement>, 'className'> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridTemplateColumns'> &
  Pick<PaginatorProps, 'marginPagesDisplayed' | 'pageRangeDisplayed'> &
  BaseProps<Datum> & {
    counter?: TablePaginatedCounter
    EmptyListComponent?: React.FC
    export?: boolean
    header?: boolean
    skeleton?: TablePaginatedSkeleton
    wrapCells?: boolean
  }

const TablePaginated = <Datum extends object>(props: Props<Datum>) => {
  const { className, gridTemplateColumns } = props // HTMLDivElement Props
  const { marginPagesDisplayed, pageRangeDisplayed } = props // Paginator Props
  const { columns, filters, limit, path } = props // Base Props
  const { counter, EmptyListComponent, export: exportTable, header, skeleton, wrapCells } = props // Component Props

  useFetchData({ counter, filters, limit, path })
  const count = useTablePaginatedCount(path)
  const data = useTablePaginatedData(path)
  const page = useTablePaginatedPage(path)

  const withFilters = useMemo<boolean>(() => filters.filter((filter) => !filter.hidden).length > 0, [filters])
  const divRef = useRef<HTMLDivElement>()

  // on page update -> scroll on top
  useOnUpdate(() => {
    if (!Objects.isNil(data)) {
      setTimeout(() => {
        const opts: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start', inline: 'nearest' }
        divRef.current?.parentElement?.parentElement?.scrollIntoView(opts)
      })
    }
  }, [page])

  return (
    <div ref={divRef} className={classNames('table-paginated', className)}>
      <div>
        {(exportTable || withFilters) && (
          <div className="table-paginated-actions">
            {exportTable && <ExportButton path={path} />}
            {exportTable && withFilters && <div className="table-paginated-actions-sep" />}
            {withFilters && <Filters filters={filters} path={path} />}
          </div>
        )}
        <DataGrid
          className="table-paginated-datagrid"
          style={{ gridTemplateColumns: gridTemplateColumns ?? `repeat(${columns.length}, auto)` }}
        >
          {header && <Header columns={columns} path={path} />}
          {count?.total === 0 && <EmptyListComponent />}
          <Body columns={columns} limit={limit} path={path} skeleton={skeleton} wrapCells={wrapCells} />
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

TablePaginated.defaultProps = {
  counter: { show: true },
  EmptyListComponent: DefaultEmptyList,
  export: false,
  // eslint-disable-next-line react/default-props-match-prop-types
  filters: [],
  header: true,
  // eslint-disable-next-line react/default-props-match-prop-types
  limit: 30,
  skeleton: {
    baseColor: 'white',
    highlightColor: 'var(--ui-bg)',
    Component: () => <Skeleton borderRadius="2px" height="20px" width="100%" />,
  },
  wrapCells: true,
}

export default TablePaginated
