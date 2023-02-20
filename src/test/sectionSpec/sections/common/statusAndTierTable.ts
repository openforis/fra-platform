// @ts-nocheck

const getDescriptionTable = (table: string, variable: string, trend = false) => {
  const name = `${table}_${variable}Status${trend ? 'AndTrend' : ''}_Description`
  const labelKey = `fra.${name}`

  const base = {
    name,
    rows: [
      {
        idx: 'header_0',
        cols: [
          {
            idx: 0,
            colSpan: 2,
            rowSpan: 1,
            labelKey: `${labelKey}.header_0`,
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
            idx: 0,
            colSpan: 1,
            rowSpan: 3,
            labelKey: `common.status`,
            className: 'fra-table__header-cell',
            type: 'placeholder',
          },
          {
            idx: 1,
            colSpan: 1,
            labelKey: `${labelKey}.status.high`,
            type: 'placeholder',
            className: 'fra-table__cell',
          },
          {
            idx: 2,
            colSpan: 1,
            labelKey: 'common.tiers.high',
            className: 'fra-table__header-cell',
            type: 'placeholder',
          },
        ],
        labelKey: 'common.status',
      },
      {
        idx: 1,
        type: 'data',
        cols: [
          {
            idx: 1,
            colSpan: 1,
            labelKey: `${labelKey}.status.medium`,
            type: 'header',
            className: 'fra-table__cell',
          },
          {
            idx: 2,
            colSpan: 1,
            labelKey: 'common.tiers.medium',
            className: 'fra-table__header-cell',
            type: 'placeholder',
          },
        ],
        labelKey: 'common.status',
      },
      {
        idx: 2,
        type: 'data',
        cols: [
          {
            idx: 1,
            colSpan: 1,
            labelKey: `${labelKey}.status.low`,
            type: 'header',
            className: 'fra-table__cell',
          },
          {
            idx: 2,
            colSpan: 1,
            labelKey: 'common.tiers.low',
            className: 'fra-table__header-cell',
            type: 'placeholder',
          },
        ],
        labelKey: 'common.status',
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
    base.rows.push(
      ...[
        {
          idx: 3,
          type: 'data',
          cols: [
            {
              idx: 0,
              colSpan: 1,
              rowSpan: 3,
              labelKey: `common.trend`,
              className: 'fra-table__header-cell',
              type: 'placeholder',
            },
            {
              idx: 1,
              colSpan: 1,
              labelKey: `${labelKey}.trend.high`,
              type: 'placeholder',
            },
            {
              idx: 2,
              colSpan: 1,
              labelKey: 'common.tiers.high',
              className: 'fra-table__header-cell',
              type: 'placeholder',
            },
          ],
          labelKey: 'common.trend',
        },
        {
          idx: 4,
          type: 'data',
          cols: [
            {
              idx: 1,
              colSpan: 1,
              labelKey: `${labelKey}.trend.medium`,
              type: 'header',
              className: 'fra-table__header-cell-left',
            },
            {
              idx: 2,
              colSpan: 1,
              labelKey: 'common.tiers.medium',
              className: 'fra-table__header-cell',
              type: 'placeholder',
            },
          ],
          labelKey: 'common.trend',
        },
        {
          idx: 5,
          type: 'data',
          cols: [
            {
              idx: 1,
              colSpan: 1,
              labelKey: `${labelKey}.trend.low`,
              type: 'header',
              className: 'fra-table__header-cell-left',
            },
            {
              idx: 2,
              colSpan: 1,
              labelKey: 'common.tiers.low',
              className: 'fra-table__header-cell',
              type: 'placeholder',
            },
          ],
          labelKey: 'common.trend',
        },
      ]
    )
  }
  return base
}

const getDropdownTable = (table: string, variable: string, trend = false) => {
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

export const getStatusAndTierTable = (table: string, variable: string, trend = false) => {
  const descriptionTable = getDescriptionTable(table, variable, trend)
  const dropdownTable = getDropdownTable(table, variable, trend)
  return [descriptionTable, dropdownTable]
}
