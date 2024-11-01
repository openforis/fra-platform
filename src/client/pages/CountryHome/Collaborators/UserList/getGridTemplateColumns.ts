const COLUMN_WIDTHS = {
  info: '32px',
  name: 'minmax(120px, 0.8fr)',
  email: 'minmax(120px, 0.8fr)',
  role: 'minmax(120px, 0.8fr)',
  actions: '105px', // approx. size for 3 buttons | required constant for columns to align
} as const

const getGridTemplateColumns = () => {
  return Object.values(COLUMN_WIDTHS).join(' ')
}

/*
  Helper const to set same gridTemplateColumns for table paginated
 */
export const GRID_TEMPLATE_COLUMNS = getGridTemplateColumns()
