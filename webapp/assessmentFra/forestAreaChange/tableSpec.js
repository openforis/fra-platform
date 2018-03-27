import React from 'react'
import R from 'ramda'

import { formatDecimal } from '../../utils/numberFormat'
import { add, sub } from '../../../common/bignumberUtils'
import { subCategoryValidator } from '../../traditionalTable/validators'
import { Link } from '../../reusableUiComponents/link'
import { forestExpansionMirrorCell, eofNetChange } from './forestAreaChange'

const mapIndexed = R.addIndex(R.map)
const ofWhichRows = R.range(1, 3)
const expansionValidator = subCategoryValidator(0, ofWhichRows)
const ofWhichColumns = R.times(() => ({type: 'decimalInput', validator: expansionValidator}), 4)

const yearIntervals = [
  [1, 1990, 2000],
  [2, 2000, 2010],
  [3, 2010, 2015],
  [4, 2015, 2020]
]

export default (i18n, extentOfForest, countryIso) => {
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
        ...mapIndexed(
          ([column, startYear, endYear]) => ({
            type: 'custom',
            render: props => forestExpansionMirrorCell(props, extentOfForest, startYear, endYear, 3, sub)
          }), yearIntervals)
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__subcategory-cell">{i18n.t('forestAreaChange.ofWhichAfforestation')}</th>
        },
        ...ofWhichColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__subcategory-cell">{i18n.t('forestAreaChange.ofWhichNaturalExpansion')}</th>
        },
        ...ofWhichColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__header-cell-left">{i18n.t('forestAreaChange.deforestation')} (b)</th>
        },
        ...mapIndexed(
          ([column, startYear, endYear]) => ({
            type: 'custom',
            render: props => forestExpansionMirrorCell(props, extentOfForest, startYear, endYear, 0, add)
          }), yearIntervals)
      ],
      [
        {
          type: 'readOnly',
          jsx:
            <th className="fra-table__header-cell-left">
              <Link to={`/country/${countryIso}/extentOfForest`} className="link">
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
