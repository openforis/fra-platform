export enum AreaSelectorMode {
  collapsed = 'collapsed',
  expanded = 'expanded',
}

export type AreaSelectorSortBy = 'lastEdit' | 'lastInReview' | 'lastInApproval' | 'lastInAccepted' | 'lastUpdate' | null

export enum AreaSelectorSortDirection {
  asc = 'asc',
  desc = 'desc',
}

export type AreaSelectorOrderBy = {
  sortBy: AreaSelectorSortBy
  sortDirection: AreaSelectorSortDirection
}

export type AreaSelectorFilters = {
  orderBy: Record<string, AreaSelectorOrderBy | undefined>
}

export type AreaSelectorState = {
  mode: AreaSelectorMode
  filters: AreaSelectorFilters
}

export const initialState: AreaSelectorState = {
  mode: AreaSelectorMode.collapsed,
  filters: {
    orderBy: {},
  },
}
