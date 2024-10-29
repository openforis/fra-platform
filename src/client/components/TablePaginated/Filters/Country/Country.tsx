import React from 'react'

import classNames from 'classnames'

import { TablePaginatedFilterType } from 'meta/tablePaginated'
import { TooltipId } from 'meta/tooltip'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useTablePaginatedFilterValue } from 'client/store/ui/tablePaginated/hooks'
import CountryMultiSelect from 'client/components/CountryMultiSelect/CountryMultiSelect'
import { TablePaginatedFilter } from 'client/components/TablePaginated/types'

import { useTooltipContent } from './hooks/useTooltipContent'

type Props = TablePaginatedFilter<TablePaginatedFilterType.COUNTRY> & {
  path: string
}

const Country: React.FC<Props> = (props: Props) => {
  const { fieldName, label, path } = props

  const dispatch = useAppDispatch()

  const { hideTooltip, showTooltip, tooltipContent } = useTooltipContent({ fieldName, path })

  const filterValue = useTablePaginatedFilterValue<Array<string>>(path, fieldName)

  const handleChange = (value: Array<string>) => {
    dispatch(
      TablePaginatedActions.setFilterValue({
        fieldName,
        path,
        value,
      })
    )
  }

  return (
    <div
      className="filter-multiselect__tooltip-trigger"
      data-tooltip-content={tooltipContent}
      data-tooltip-id={TooltipId.info}
    >
      <CountryMultiSelect
        classNames={{
          container: classNames('filter-multiselect__container', {
            active: filterValue?.length > 0,
          }),
        }}
        isMulti
        onChange={handleChange}
        onMenuClose={showTooltip}
        onMenuOpen={hideTooltip}
        placeholder={label}
        toggleAll
        value={filterValue}
      />
    </div>
  )
}

export default Country
