export enum AreaSelectorMode {
  collapsed = 'collapsed',
  expanded = 'expanded',
}

export type AreaSelectorState = {
  mode: AreaSelectorMode
}

export const initialState: AreaSelectorState = {
  mode: AreaSelectorMode.collapsed,
}
