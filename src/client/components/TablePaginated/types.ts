import React from 'react'

import { TablePaginatedCompareFn } from 'meta/tablePaginated/compareFn'
import { TablePaginatedCount } from 'meta/tablePaginated/count'
import { TablePaginatedFilterType } from 'meta/tablePaginated/filters/filter'

export type ColumnComponentProps<Datum> = {
  datum: Datum
  rowIndex: number
}

export type Column<Datum> = {
  component: React.FC<ColumnComponentProps<Datum>>
  header?: string | React.FC
  key: string
  orderByProperty?: string
}

export type Props<Datum extends object> = {
  columns: Array<Column<Datum>>
  compareFn?: TablePaginatedCompareFn<Datum>
  disableExport?: boolean
  disableFilters?: boolean
  export?: boolean
  extraActions?: Array<React.ReactElement>
  filterFn?: (datum: Datum) => boolean
  filters?: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  groups?: { headerLabel: (key: PropertyKey) => string; keySelector: (datum: Datum) => PropertyKey }
  limit?: number
  path: string
  skeleton?: TablePaginatedSkeleton
  wrapCells?: boolean
}

export type TablePaginatedCounterComponent = React.FC<{ count: TablePaginatedCount }>

export type TablePaginatedCounter = {
  show: boolean
  Component?: TablePaginatedCounterComponent
}

export type TablePaginatedEmptyListComponent = React.FC

type TablePaginatedFilterTypeMap = {
  [TablePaginatedFilterType.COUNTRY]: Array<string>
  [TablePaginatedFilterType.MULTI_SELECT]: Array<string>
  [TablePaginatedFilterType.SWITCH]: boolean
  [TablePaginatedFilterType.TEXT]: string
}

type BaseTablePaginatedFilter<FilterType extends TablePaginatedFilterType> = {
  defaultValue?: TablePaginatedFilterTypeMap[FilterType]
  disabled?: boolean
  fieldName: string
  hidden?: boolean
  label: string
  type: FilterType
}

export type MultiSelectItem = {
  label: string
  value: string
}

type MultiSelectFilter = BaseTablePaginatedFilter<TablePaginatedFilterType.MULTI_SELECT> & {
  multiLabelSummaryKey: string
  options: Array<MultiSelectItem>
}

export type TablePaginatedFilter<FilterType extends TablePaginatedFilterType> =
  FilterType extends TablePaginatedFilterType.MULTI_SELECT ? MultiSelectFilter : BaseTablePaginatedFilter<FilterType>

export type TablePaginatedSkeleton = {
  baseColor: string
  highlightColor: string
  Component: React.FC
}
