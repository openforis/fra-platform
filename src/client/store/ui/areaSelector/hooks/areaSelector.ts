import { useAppSelector } from 'client/store/hooks'
import { AreaSelectorSelectors } from 'client/store/ui/areaSelector/selectors'
import { AreaSelectorFilters } from 'client/store/ui/areaSelector/state'

export const useIsAreaSelectorExpanded = (): boolean => useAppSelector(AreaSelectorSelectors.isExpanded)

export const useAreaSelectorFilters = (): AreaSelectorFilters => useAppSelector(AreaSelectorSelectors.getFilters)
