export enum TablePaginatedFilterType {
  COUNTRY = 'country',
  MULTI_SELECT = 'multi_select',
  SWITCH = 'switch',
  TEXT = 'text',
}

export type TablePaginatedFilterValues = boolean | string | Array<string>
