import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../../utils/numberFormat'
import { sub, div, abs, lessThan } from '../../../common/bignumberUtils'
import { subCategoryValidator } from '../../traditionalTable/validators'
import { getForestAreaForYear } from '../extentOfForest/extentOfForestHelper'
import { Link } from '../../reusableUiComponents/link'

const mapIndexed = R.addIndex(R.map)
const ofWhichRows = R.range(1, 3)
const expansionValidator = subCategoryValidator(0, ofWhichRows)
const ofWhichColumns = R.times(() => ({type: 'decimalInput', validator: expansionValidator}), 4)

const integerInputColumns = R.times(() => ({type: 'decimalInput'}), 4)

const eofNetChange = (extentOfForest, startYear, endYear) => {
  const timeSpan = endYear - startYear
  const startYearEofArea = getForestAreaForYear(extentOfForest, startYear)
  const endYearEofArea = getForestAreaForYear(extentOfForest, endYear)
  const eofNetChange = div(sub(endYearEofArea, startYearEofArea), timeSpan)
  return eofNetChange
}

const deforestationValue = (tableData, extentOfForest, startYear, endYear, column) => {
  const netChangeFromExtentOfForest = eofNetChange(extentOfForest, startYear, endYear)
  return sub(tableData[0][column], netChangeFromExtentOfForest)
}

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
      <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('forestAreaChange.categoryHeader')}</th>
      <th className="fra-table__header-cell" colSpan="4">{i18n.t('forestAreaChange.areaUnitLabel')}</th>
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
        ...integerInputColumns
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
            type: 'calculated',
            calculateValue: props => deforestationValue(props.tableData, extentOfForest, startYear, endYear, column),
            valueFormatter: formatDecimal
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
