import './Country.scss'
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
      data-tooltip-class-name="filter-country__tooltip"
      data-tooltip-delay-hide={100}
      data-tooltip-html={tooltipContent}
      data-tooltip-id={TooltipId.infoClickable}
      data-tooltip-place="bottom"
    >
      <CountryMultiSelect
        classNames={{
          container: classNames('filter-multiselect__container filter-country', {
            active: filterValue?.length > 0,
          }),
        }}
        collapsibleGroups
        isMulti
        onChange={handleChange}
        onMenuClose={showTooltip}
        onMenuOpen={hideTooltip}
        placeholder={label}
        selectableGroups
        toggleAll
        value={filterValue}
      />
    </div>
  )
}

export default Country
