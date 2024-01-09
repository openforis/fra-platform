import { useAppSelector } from 'client/store/store'
import { AreaSelectorSelectors } from 'client/store/ui/areaSelector/selectors'

export const useIsAreaSelectorExpanded = (): boolean => useAppSelector(AreaSelectorSelectors.isExpanded)
