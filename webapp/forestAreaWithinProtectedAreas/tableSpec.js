import React from 'react'
import R from 'ramda'
import { subCategoryValidator } from '../traditionalTable/validators'
import { greaterThanOrEqualTo } from '../../common/bignumberUtils'
import { getForestAreaForYear } from '../extentOfForest/extentOfForestHelper'
import { formatDecimal } from '../utils/numberFormat'

const mapIndexed = R.addIndex(R.map)

const years = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

const forestAreaValueValid = (year, extentOfForest) => (props, row, column) => {
  const eofForestArea = getForestAreaForYear(extentOfForest, year)
  const forestAreaValue = props.tableData[row][column]
  if (!eofForestArea || !forestAreaValue) return {valid: true}
  const result = greaterThanOrEqualTo(eofForestArea, forestAreaValue)
  return {
    valid: result,
    message: result
      ? null
      : props.i18n.t('generalValidation.forestAreaExceedsExtentOfForest', {eofForestArea: formatDecimal(eofForestArea)})
  }
}


export default (i18n, extentOfForest) => {
  const inputColumns = R.map(
    year => ({type: 'decimalInput', validator: forestAreaValueValid(year, extentOfForest)}),
    years
  )
  return {
    name: 'forestAreaWithinProtectedAreas',
    header: <thead>
    <tr>
      <th className="fra-table__header-cell" rowSpan="2">{i18n.t('forestAreaWithinProtectedAreas.categoryHeader')}</th>
      <th className="fra-table__header-cell-middle"
          colSpan="9">{i18n.t('forestAreaWithinProtectedAreas.areaUnitLabel')}</th>
    </tr>
    <tr>
      {
        mapIndexed((year, i) => <th key={i} className="fra-table__header-cell-right">{year}</th>, years)
      }
    </tr>
    </thead>,
    rows: [
      [{
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">
          {i18n.t('forestAreaWithinProtectedAreas.header')}
        </th>
      },
        ...inputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th key=""
                   className="fra-table__category-cell">{i18n.t('forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan')}</th>
        },
        ...inputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th key=""
                   className="fra-table__subcategory-cell">{i18n.t('forestAreaWithinProtectedAreas.ofWhichInProtectedAreas')}</th>
        },
        ...R.times(() => ({type: 'decimalInput', validator: subCategoryValidator(1, [2])}), 9)
      ]
    ],
    valueSlice: {
      columnStart: 1,
    }
  }
}
