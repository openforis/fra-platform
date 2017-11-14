import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../../utils/numberFormat'
import { totalSum } from '../../traditionalTable/aggregate'
import { forestAreaSameAsExtentOfForestValidator } from '../../traditionalTable/validators'
import { getForestAreaForYear } from '../extentOfForest/extentOfForestHelper'
import { Link } from '../../reusableUiComponents/link'

const mapIndexed = R.addIndex(R.map)

const createDmoInputRow = (rowHeader) => [
  {type: 'readOnly', jsx: <th key="protection" className="fra-table__category-cell">{rowHeader}</th>},
  ...(R.times(() => ({type: 'decimalInput'}), 5))
]

const years = [1990, 2000, 2010, 2015, 2020]
const sumRows = R.range(0, 7)
const totalForestArea = (tableData, column) => totalSum(tableData, column, sumRows)

const thead = i18n =>
  <thead>
    <tr>
      <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('designatedManagementObjective.categoryHeader')}</th>
      <th className="fra-table__header-cell" colSpan="5">{i18n.t('designatedManagementObjective.areaUnitLabel')}</th>
    </tr>
    <tr>
      {
        mapIndexed((year, i) => <th key={i} className="fra-table__header-cell">{year}</th>, years)
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
    createDmoInputRow(i18n.t('designatedManagementObjective.unknown') + ' (g)'),
    [
      {
        type: 'readOnly',
        jsx:
          <th key="total" className="fra-table__header-cell-left">
            {i18n.t('designatedManagementObjective.total')} (a+b+c+d+e+f+g)
          </th>
      },
      ...mapIndexed((year, i) =>
        ({
          type: 'calculated',
          calculateValue: props => totalForestArea(props.tableData, i+1),
          valueFormatter: formatDecimal,
          validator: forestAreaSameAsExtentOfForestValidator(year, extentOfForest, sumRows)
        }), years)
    ],
    [
      {
        type: 'readOnly',
        jsx:
          <th key="total_forest_area" className="fra-table__header-cell-left">
            <Link to={`/country/${countryIso}/extentOfForest`} className="link">
              {i18n.t('designatedManagementObjective.totalForestArea')}
            </Link>
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
