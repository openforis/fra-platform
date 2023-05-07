const getTableDataWithOdpViewName = (props: { tableName: string }): string => `${props.tableName}____with_odp`

export const Tables = {
  getTableDataWithOdpViewName,
}
