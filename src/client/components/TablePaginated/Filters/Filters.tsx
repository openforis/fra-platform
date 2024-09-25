import './Filters.scss'
import React from 'react'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import Icon from 'client/components/Icon'
import Text from 'client/components/TablePaginated/Filters/Text/Text'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

const componentsByFilterType: Record<TablePaginatedFilterType, React.FC<TablePaginatedFilter & { path: string }>> = {
  [TablePaginatedFilterType.TEXT]: Text,
}

type Props = {
  filters: Array<TablePaginatedFilter>
  path: string
}

const Filters: React.FC<Props> = (props: Props) => {
  const { filters, path } = props

  return (
    <div className="table-paginated-filters-container">
      <Icon name="filter" />
      {filters.map((filter) => {
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
