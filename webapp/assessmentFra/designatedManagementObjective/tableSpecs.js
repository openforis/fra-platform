import React from 'react'
import * as R from 'ramda'
import { Link } from 'react-router-dom'
import { formatDecimal } from '../../utils/numberFormat'
import { totalSum } from '../../traditionalTable/aggregate'
import { forestAreaSameAsExtentOfForestValidator } from '../../traditionalTable/validators'
import { getForestAreaForYear } from '../../../common/extentOfForestHelper'
import { sub } from '../../../common/bignumberUtils'

const mapIndexed = R.addIndex(R.map)

const createDmoInputRow = (rowHeader) => [
  {type: 'readOnly', jsx: <th className="fra-table__category-cell">{rowHeader}</th>},
  ...(R.times(() => ({type: 'decimalInput'}), 5))
]

const years = [1990, 2000, 2010, 2015, 2020]
const sumRows = R.range(0, 7)
const totalForestArea = (tableData, column) => totalSum(tableData, column, sumRows)

const thead = i18n =>
  <thead>
  <tr>
    <th className="fra-table__header-cell-left"
        rowSpan="2">{i18n.t('designatedManagementObjective.categoryHeader')}</th>
    <th className="fra-table__header-cell"
        colSpan={years.length}>{i18n.t('designatedManagementObjective.areaUnitLabel')}</th>
  </tr>
  <tr>
    {
      R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years)
    }
  </tr>
  </thead>

export const primaryDesignatedManagementObjectiveTableSpec = (i18n, extentOfForest, countryIso) => ({
  name: 'primaryDesignatedManagementObjective',
  header: thead(i18n),
  rows: [
    createDmoInputRow(i18n.t('designatedManagementObjective.production') + ' (a)'),
    createDmoInputRow(i18n.t('designatedManagementObjective.soilWaterProtection') + ' (b)'),
    createDmoInputRow(i18n.t('designatedManagementObjective.biodiversityConservation') + ' (c)'),
    createDmoInputRow(i18n.t('designatedManagementObjective.socialServices') + ' (d)'),
    createDmoInputRow(i18n.t('designatedManagementObjective.multipleUse') + ' (e)'),
    createDmoInputRow(i18n.t('designatedManagementObjective.other') + ' (f)'),
    [
      {
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">{`${i18n.t('designatedManagementObjective.unknown')} (g)`}</th>
      },
      ...mapIndexed((year, i) =>
        ({
          type: 'calculated',
          calculateValue: props => {

            const getValue = (row, col) => R.pipe(
              R.prop(row),
              R.prop(col),
              R.defaultTo(0)
            )(props.tableData)

            const rows = R.range(0, 6)
            const value = R.reduce(
              (value, row) => sub(value, getValue(row, i + 1)),
              getForestAreaForYear(extentOfForest, year),
              rows
            )

            return value
          },
          valueFormatter: formatDecimal
        }), years)
    ],
    // [
    //   {
    //     type: 'readOnly',
    //     jsx:
    //       <th className="fra-table__header-cell-left">
    //         {i18n.t('designatedManagementObjective.total')} (a+b+c+d+e+f+g)
    //       </th>
    //   },
    //   ...mapIndexed((year, i) =>
    //     ({
    //       type: 'calculated',
    //       calculateValue: props => totalForestArea(props.tableData, i + 1),
    //       valueFormatter: formatDecimal,
    //       validator: forestAreaSameAsExtentOfForestValidator(year, extentOfForest, sumRows)
    //     }), years)
    // ],
    [
      {
        type: 'readOnly',
        jsx:
          <th className="fra-table__header-cell-left">
            <div className="only-print">
              {i18n.t('designatedManagementObjective.totalForestArea')}
            </div>
            <Link to={`/country/${countryIso}/extentOfForest`} className="link no-print">
              {i18n.t('designatedManagementObjective.totalForestArea')}
            </Link>
          </th>
      },
      ...R.map(year =>
        ({
          type: 'calculated',
          calculateValue: props => getForestAreaForYear(extentOfForest, year),
          valueFormatter: formatDecimal
        }), years)
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})

export const totalAreaWithDesignatedManagementObjectiveTableSpec = (i18n) => ({
  name: 'totalAreaWithDesignatedManagementObjective',
  header: thead(i18n),
  rows: [
    createDmoInputRow(i18n.t('designatedManagementObjective.production')),
    createDmoInputRow(i18n.t('designatedManagementObjective.soilWaterProtection')),
    createDmoInputRow(i18n.t('designatedManagementObjective.biodiversityConservation')),
    createDmoInputRow(i18n.t('designatedManagementObjective.socialServices')),
    createDmoInputRow(i18n.t('designatedManagementObjective.other'))
  ],
  valueSlice: {columnStart: 1}
})
