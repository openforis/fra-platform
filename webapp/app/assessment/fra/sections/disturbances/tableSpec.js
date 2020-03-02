import React from 'react'
import * as R from 'ramda'
import { totalSum } from '@common/aggregate'
import { formatDecimal } from '@common/numberFormat'
import { forestAreaLessThanOrEqualToExtentOfForestValidator } from '@webapp/app/assessment/components/traditionalTable/validators'
import { getForestAreaForYear } from '@common/extentOfForestHelper'
import { Link } from 'react-router-dom'

const mapIndexed = R.addIndex(R.map)
const sumRows = R.range(0, 4)

export const tableProps = {
  disturbances: {
    name: 'disturbances',
    startYear: 2000,
    endYear: 2017,
  },
  disturbancesPrint1: {
    name: 'disturbancesPrint1',
    startYear: 2000,
    endYear: 2008,
  },
  disturbancesPrint2: {
    name: 'disturbancesPrint2',
    startYear: 2009,
    endYear: 2017,
  }
}

export default (i18n, extentOfForest, countryIso, tableProp = tableProps.disturbances) => {

  const {startYear, endYear, name} = tableProp

  const years = R.range(startYear, endYear + 1)
  const inputColumns = R.times(() => ({type: 'decimalInput'}), years.length)

  return {
    name, // used to uniquely identify table
    header: <thead>
    <tr>
      <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('disturbances.categoryHeader')}</th>
      <th className="fra-table__header-cell" colSpan={years.length}>{i18n.t('disturbances.areaUnitLabel')}</th>
    </tr>
    <tr>
      {
        R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years)
      }
    </tr>
    </thead>,
    rows: [
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__category-cell">{i18n.t('disturbances.insects')} (a)</th>
        },
        ...inputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__category-cell">{i18n.t('disturbances.diseases')} (b)</th>
        },
        ...inputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__category-cell">{i18n.t('disturbances.severeWeatherEvents')} (c)</th>
        },
        ...inputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__category-cell">{i18n.t('disturbances.other')} (d)</th>
        },
        ...inputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx:
            <th className="fra-table__header-cell-left">
              {i18n.t('disturbances.total')} (a+b+c+d)
            </th>
        },
        ...mapIndexed((year, i) =>
          ({
            type: 'calculated',
            calculateValue: props => totalSum(props.tableData, i + 1, sumRows),
            valueFormatter: formatDecimal,
            validator: forestAreaLessThanOrEqualToExtentOfForestValidator(year, extentOfForest, sumRows)
          }), years)
      ],
      [
        {
          type: 'readOnly',
          jsx:
            <th className="fra-table__header-cell-left">
              <div className="only-print">
                {i18n.t('disturbances.totalForestArea')}
              </div>
              <Link to={`/country/${countryIso}/extentOfForest`} className="link no-print">
                {i18n.t('disturbances.totalForestArea')}
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
      rowEnd: -2
    }
  }

}
