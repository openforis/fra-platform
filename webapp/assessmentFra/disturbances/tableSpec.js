import React from 'react'
import R from 'ramda'
import { totalSum } from '../../traditionalTable/aggregate'
import { formatDecimal } from '../../utils/numberFormat'
import { forestAreaLessThanOrEqualToExtentOfForestValidator } from '../../traditionalTable/validators'

const mapIndexed = R.addIndex(R.map)

const years = R.range(1990, 2018)
const sumRows = R.range(0,4)
const inputColumns = R.times(() => ({type: 'decimalInput'}), 18)

export default (i18n, extentOfForest) => ({
  name: 'disturbances', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('disturbances.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="18">{i18n.t('disturbances.areaUnitLabel')}</th>
  </tr>
  <tr>
    {
      mapIndexed((year, i) => <th key={i} className="fra-table__header-cell-right">{year}</th>, years)
    }
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.insects')}</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.diseases')}</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.severeWeatherEvents')}</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.other')}</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.total')}</th>
      },
      ...mapIndexed((year, i) =>
        ({
          type: 'calculated',
          calculateValue: props => totalSum(props.tableData, i+1, sumRows),
          valueFormatter: formatDecimal,
          validator: forestAreaLessThanOrEqualToExtentOfForestValidator(year, extentOfForest, sumRows)
        }), years)
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
