export enum ColumnNodeExtType {
  text = 'text',
  select = 'select',
  multiselect = 'multiselect',
}

export type ColumnNodeExt = {
  type: ColumnNodeExtType
  colName: string
  header: string
  items?: Array<{ label: string; value: string }>
}
