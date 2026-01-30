import './SortableHeader.scss'
import React, { useCallback } from 'react'
import classNames from 'classnames'

import { RoleName } from 'meta/user/role/name'

import { useAppDispatch } from 'client/store/hooks'
import { AreaSelectorActions } from 'client/store/ui/areaSelector/actions'
import { useAreaSelectorFilters } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { AreaSelectorSortBy, AreaSelectorSortDirection } from 'client/store/ui/areaSelector/state'
import Icon from 'client/components/Icon'

type Props = {
  label: string
  roleName: RoleName
  sortByProperty: AreaSelectorSortBy
}

const SortableHeader: React.FC<Props> = (props) => {
  const { label, roleName, sortByProperty } = props

  const dispatch = useAppDispatch()
  const filters = useAreaSelectorFilters()

  const current = filters[roleName]?.orderBy
  const active = current?.sortBy === sortByProperty
  const iconName =
    active && current?.sortDirection === AreaSelectorSortDirection.asc ? 'sort-amount-asc' : 'sort-amount-desc'

  const onClick = useCallback(() => {
    dispatch(AreaSelectorActions.setSortBy({ roleName, sortBy: sortByProperty }))
  }, [dispatch, roleName, sortByProperty])

  return (
    <button className={classNames('area-select__group-heading-sortable', { active })} onClick={onClick} type="button">
      <Icon name={iconName} />
      {label}
    </button>
  )
}

export default SortableHeader
