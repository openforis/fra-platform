import React from 'react'
import R from 'ramda'
import { totalSum } from '../../traditionalTable/aggregate'
import { formatDecimal } from '../../utils/numberFormat'
import { forestAreaLessThanOrEqualToExtentOfForestValidator } from '../../traditionalTable/validators'
import { getForestAreaForYear } from '../extentOfForest/extentOfForestHelper'

const mapIndexed = R.addIndex(R.map)
const years = R.range(2000, 2018)
const sumRows = R.range(0,4)
const inputColumns = R.times(() => ({type: 'decimalInput'}), 18)

export default (i18n, extentOfForest) => ({
  name: 'disturbances', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('disturbances.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan="18">{i18n.t('disturbances.areaUnitLabel')}</th>
  </tr>
  <tr>
    {
      mapIndexed((year, i) => <th key={i} className="fra-table__header-cell">{year}</th>, years)
    }
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.insects')} (a)</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.diseases')} (b)</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.severeWeatherEvents')} (c)</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.other')} (d)</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx:
          <th key="total" className="fra-table__header-cell-left">
            {i18n.t('disturbances.total')} (a+b+c+d)
          </th>
      },
      ...mapIndexed((year, i) =>
        ({
          type: 'calculated',
          calculateValue: props => totalSum(props.tableData, i+1, sumRows),
          valueFormatter: formatDecimal,
          validator: forestAreaLessThanOrEqualToExtentOfForestValidator(year, extentOfForest, sumRows)
        }), years)
    ],
    [
      {
        type: 'readOnly',
        jsx:
          <th key="total_forest_area" className="fra-table__header-cell-left">
            {i18n.t('disturbances.totalForestArea')}
          </th>
      },
      ...mapIndexed((year, i) =>
        ({
          type: 'calculated',
          calculateValue: props => getForestAreaForYear(extentOfForest, year),
          valueFormatter: formatDecimal
        }), years)
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -2
  }
})
