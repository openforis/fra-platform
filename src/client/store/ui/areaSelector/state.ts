export enum AreaSelectorMode {
  collapsed = 'collapsed',
  expanded = 'expanded',
}

export type AreaSelectorSortBy = 'lastEdit' | 'lastInReview' | 'lastInApproval' | 'lastInAccepted' | 'lastUpdate' | null

export enum AreaSelectorSortDirection {
  asc = 'asc',
  desc = 'desc',
}

export type AreaSelectorFilters = {
  sortBy: AreaSelectorSortBy
  sortDirection: AreaSelectorSortDirection | null
}

export type AreaSelectorState = {
  mode: AreaSelectorMode
  filters: AreaSelectorFilters
}

export const initialState: AreaSelectorState = {
  mode: AreaSelectorMode.collapsed,
  filters: {
    sortBy: null,
    sortDirection: null,
  },
}
