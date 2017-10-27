import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../utils/numberFormat'
import { totalSum } from '../traditionalTable/aggregate'
import { eq } from '../../common/bignumberUtils'

const mapIndexed = R.addIndex(R.map)

const createDmoInputRow = (rowHeader) => [
  {type: 'readOnly', jsx: <th key="protection" className="fra-table__category-cell">{rowHeader}</th>},
  ...(R.times(() => ({type: 'decimalInput'}), 5))
]

const totalForestArea = (tableData, column) => totalSum(tableData, column, R.range(0, 7))

const totalForestAreaValid = (year, extentOfForest) => (props, _, column) => {
  if (!extentOfForest || R.isEmpty(extentOfForest)) return {valid: true}
  const groupedByYear = R.groupBy(R.prop('name'), extentOfForest.fra)
  const eofForestArea = R.path([year, 0, 'forestArea'], groupedByYear)
  const forestArea = totalForestArea(props.tableData, column)
  if (!eofForestArea || !forestArea) return {valid: true}
  const result = eq(eofForestArea, forestArea)
  return {
    valid: result,
    message: result
      ? null
      : props.i18n.t('generalValidation.forestAreaDoesNotMatchExtentOfForest', {eofForestArea: formatDecimal(eofForestArea)})
  }
}

const years = [1990, 2000, 2010, 2015, 2020]

const totalForestAreaCell = (column, year, extentOfForest) => (props) => {
  const {valid} = totalForestAreaValid(year, extentOfForest)(props, null, column)
  const validationClass =
    valid
      ? ''
      : 'validation-error'
  return <td key="" className={`fra-table__calculated-cell ${validationClass}`}>
    {formatDecimal(totalForestArea(props.tableData, column))}
  </td>
}

const thead = i18n =>
  <thead>
    <tr>
      <th className="fra-table__header-cell" rowSpan="2">{i18n.t('designatedManagementObjective.categoryHeader')}</th>
      <th className="fra-table__header-cell-middle" colSpan="5">{i18n.t('designatedManagementObjective.areaUnitLabel')}</th>
    </tr>
    <tr>
      {
        mapIndexed((year, i) => <th key={i} className="fra-table__header-cell-right">{year}</th>, years)
      }
    </tr>
  </thead>

export const primaryDesignatedManagementObjectiveTableSpec = (i18n, extentOfForest) => ({
  name: 'primaryDesignatedManagementObjective',
  header: thead(i18n),
  rows: [
    createDmoInputRow(i18n.t('designatedManagementObjective.production')),
    createDmoInputRow(i18n.t('designatedManagementObjective.soilWaterProtection')),
    createDmoInputRow(i18n.t('designatedManagementObjective.biodiversityConservation')),
    createDmoInputRow(i18n.t('designatedManagementObjective.socialServices')),
    createDmoInputRow(i18n.t('designatedManagementObjective.multipleUse')),
    createDmoInputRow(i18n.t('designatedManagementObjective.other')),
    createDmoInputRow(i18n.t('designatedManagementObjective.unknown')),
    [
      {
        type: 'readOnly',
        jsx:
          <th key="total_forest_area" className="fra-table__header-cell">
            {i18n.t('designatedManagementObjective.totalForestArea')}
          </th>
      },
      ...mapIndexed((year, i) =>
        ({
          type: 'custom',
          render: totalForestAreaCell(i+1, year, extentOfForest),
          validator: totalForestAreaValid(year, extentOfForest)
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
