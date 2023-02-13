// @ts-nocheck

export const getStatusAndTierTable = (table: string, variable: string, trend = false) => {
  const base = {
    name: `${table}_${variable}Status${trend ? 'AndTrend' : ''}`,
    rows: [
      {
        idx: 'header_0',
        cols: [
          {
            idx: 0,
            colSpan: 1,
            rowSpan: 1,
            labelKey: `${table}.${variable}`,
            className: 'fra-table__header-cell',
            type: 'header',
          },
          {
            idx: 1,
            colSpan: 1,
            rowSpan: 1,
            labelKey: 'common.tier',
            className: 'fra-table__header-cell',
            type: 'header',
          },
        ],
        type: 'header',
      },
      {
        idx: 0,
        type: 'data',
        cols: [
          {
            idx: 'header_0',
            type: 'header',
            colSpan: 1,
            labelKey: 'common.status',
            className: 'fra-table__category-cell',
          },
          {
            idx: 0,
            type: 'select',
            options: 'high medium low'.split(' ').map((option) => ({
              optionName: option,
            })),
            optionsLabelKeyPrefix: 'common.tiers',
            colName: 'status',
          },
        ],
        labelKey: 'common.status',
        variableName: 'status',
      },
    ],
    tableDataRequired: [],
    print: {
      colBreakPoints: [],
      pageBreakAfter: false,
    },
    dataExport: false,
    columnsExportAlways: [],
    migration: {
      cycles: ['2025'],
      columnNames: { '2025': ['status'] },
    },
  }
  if (trend) {
    base.migration.columnNames['2025'].push('trend')
    base.rows.push({
      idx: 0,
      type: 'data',
      cols: [
        {
          idx: 'header_0',
          type: 'header',
          colSpan: 1,
          labelKey: 'common.trend',
          className: 'fra-table__category-cell',
        },
        {
          idx: 0,
          type: 'select',
          options: 'high medium low'.split(' ').map((option) => ({
            optionName: option,
          })),
          optionsLabelKeyPrefix: 'common.tiers',
          colName: 'trend',
        },
      ],
      labelKey: 'common.trend',
      variableName: 'trend',
    })
  }
  return base
}
