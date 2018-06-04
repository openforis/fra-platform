import React from 'react'
import R from 'ramda'

import { acceptNextDecimal } from '../../utils/numberInput'
import { formatDecimal } from '../../utils/numberFormat'

import { subCategoryValidator } from '../../traditionalTable/validators'
import { Link } from '../../reusableUiComponents/link'
import { yearIntervals, decimalInputCell, eofNetChange } from './forestAreaChange'

const mapIndexed = R.addIndex(R.map)
const ofWhichRows = R.range(1, 3)
const expansionValidator = subCategoryValidator(0, ofWhichRows)

const decimalInputColumns = (extentOfForest, validator, disabled) => R.times(() => ({
  type: 'custom',
  render: props => decimalInputCell(props, extentOfForest, validator, disabled),
  acceptValue: acceptNextDecimal
}), 4)

export default (i18n, extentOfForest, countryIso, disabled) => {
  return {
    name: 'forestAreaChange', // used to uniquely identify table
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
        ...decimalInputColumns(extentOfForest, null, disabled)
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
          jsx: <th className="fra-table__header-cell-left">{i18n.t('forestAreaChange.deforestation')} (b)</th>
        },
        ...decimalInputColumns(extentOfForest, null, disabled)
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
