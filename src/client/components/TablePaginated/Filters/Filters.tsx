import './Filters.scss'
import React from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import Icon from 'client/components/Icon'
import Text from 'client/components/TablePaginated/Filters/Text/Text'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

const componentsByFilterType: Record<
  TablePaginatedFilterType,
  React.FC<TablePaginatedFilter<TablePaginatedFilterType> & { path: string }>
> = {
  [TablePaginatedFilterType.TEXT]: Text,
  [TablePaginatedFilterType.SWITCH]: () => null,
}

type Props = {
  filters: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  path: string
}

const Filters: React.FC<Props> = (props: Props) => {
  const { filters, path } = props

  return (
    <div className="table-paginated-filters-container">
      <Icon name="filter" />
      {filters.map((filter) => {
        if (filter.isHidden) return null
        const Component = componentsByFilterType[filter.type]
        return (
          <Component
            key={filter.fieldName}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...filter}
            path={path}
          />
        )
      })}
    </div>
  )
}

export default Filters
