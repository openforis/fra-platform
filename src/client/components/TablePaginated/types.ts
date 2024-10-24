import React from 'react'

import { TablePaginatedCount, TablePaginatedFilterType } from 'meta/tablePaginated'

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

export type Props<Datum> = {
  columns: Array<Column<Datum>>
  filters?: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  limit?: number
  path: string
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
  fieldName: string
  hidden?: boolean
  label: string
  type: FilterType
}

type MultiSelectItem = {
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
