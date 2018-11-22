import React from 'react'
import R from 'ramda'

import { acceptNextDecimal } from '../../utils/numberInput'
import { formatDecimal } from '../../utils/numberFormat'

import { subCategoryValidator, positiveOrZero } from '../../traditionalTable/validators'
import { Link } from '../../reusableUiComponents/link'
import { yearIntervals, decimalInputCell, eofNetChange, calculateMirrorValue, rowMirrors } from './forestAreaChange'

const mapIndexed = R.addIndex(R.map)
const ofWhichRows = R.range(1, 3)
const expansionValidator = subCategoryValidator(0, ofWhichRows)

const decimalInputColumns = (extentOfForest, validator, disabled) => R.times(() => ({
  type: 'custom',
  render: props => decimalInputCell(props, extentOfForest, validator, disabled),
  acceptValue: acceptNextDecimal,
  validator,
}), 4)

export const sectionName = 'forestAreaChange'

const forestChangeValidator = extentOfForest => (props, row, column) => {
  const positiveOrZeroRes = positiveOrZero()(props, row, column)
  if (positiveOrZeroRes.valid) {
    const {tableData, i18n} = props

    const value = tableData[row][column]

    const rowMirror = R.find(R.propEq('rowMirrorIdx', row), rowMirrors)
    const yearInterval = yearIntervals[column - 1]
    const {fn, row: rowMirrorRow} = rowMirror

    const calculatedValue = calculateMirrorValue(tableData, extentOfForest, yearInterval[1], yearInterval[2], rowMirrorRow, column, fn)

    if (value && calculatedValue && value !== calculatedValue) {
      return {
        valid: false,
        message: i18n.t('generalValidation.forestAreaDoesNotMatchExtentOfForest')
      }
    } else {
      return {valid: true}
    }

  }
  else {
    return positiveOrZeroRes
  }
}

export default (i18n, extentOfForest, countryIso, disabled) => {
  return {
    name: sectionName, // used to uniquely identify table
    header: <thead>
    <tr>
      <th className="fra-table__header-cell-left" rowSpan="2">
        {i18n.t('forestAreaChange.categoryHeader')}
      </th>
      <th className="fra-table__header-cell" colSpan={yearIntervals.length}>
        {i18n.t('forestAreaChange.areaUnitLabel')}
      </th>
    </tr>
    <tr>
      {
        mapIndexed(
          ([_, startYear, endYear], i) =>
            <th key={i} className="fra-table__header-cell">
              {`${startYear}-${endYear}`}
            </th>,
          yearIntervals
        )
      }
    </tr>
    </thead>,
    rows: [
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__category-cell">{i18n.t('forestAreaChange.forestExpansion')} (a)</th>
        },
        ...decimalInputColumns(extentOfForest, forestChangeValidator(extentOfForest), disabled)
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__subcategory-cell">{i18n.t('forestAreaChange.ofWhichAfforestation')}</th>
        },
        ...decimalInputColumns(extentOfForest, expansionValidator, disabled)
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__subcategory-cell">{i18n.t('forestAreaChange.ofWhichNaturalExpansion')}</th>
        },
        ...decimalInputColumns(extentOfForest, expansionValidator, disabled)
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__category-cell">{i18n.t('forestAreaChange.deforestation')} (b)</th>
        },
        ...decimalInputColumns(extentOfForest, forestChangeValidator(extentOfForest), disabled)
      ],
      [
        {
          type: 'readOnly',
          jsx:
            <th className="fra-table__header-cell-left">
              <div className="only-print">
                {i18n.t('forestAreaChange.forestAreaNetChange')} (a-b)
              </div>
              <Link to={`/country/${countryIso}/extentOfForest`} className="link no-print">
                {i18n.t('forestAreaChange.forestAreaNetChange')} (a-b)
              </Link>
            </th>
        },
        ...mapIndexed(
          ([column, startYear, endYear]) => ({
            type: 'calculated',
            calculateValue: props => eofNetChange(extentOfForest, startYear, endYear),
            valueFormatter: formatDecimal
          }), yearIntervals)
      ]
    ],
    valueSlice: {
      columnStart: 1,
      rowEnd: -1
    }
  }
}
