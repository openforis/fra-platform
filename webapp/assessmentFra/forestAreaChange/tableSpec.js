import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../../utils/numberFormat'
import { sub, div, eq, toFixed } from '../../../common/bignumberUtils'
import { subCategoryValidator } from '../../traditionalTable/validators'
import { getForestAreaForYear } from '../extentOfForest/extentOfForestHelper'

const mapIndexed = R.addIndex(R.map)
const ofWhichRows = R.range(1, 3)
const expansionValidator = subCategoryValidator(0, ofWhichRows)
const ofWhichColumns = R.times(() => ({type: 'decimalInput', validator: expansionValidator}), 4)

const integerInputColumns = R.times(() => ({type: 'decimalInput'}), 4)

const netChange = (tableData, column) => sub(tableData[0][column], tableData[3][column])

const netChangeValid = (tableData, column, extentOfForest, startYear, endYear) => {
  const startYearEofArea = getForestAreaForYear(extentOfForest, startYear)
  const endYearEofArea = getForestAreaForYear(extentOfForest, endYear)
  const netChangeFromExtentOfForest = toFixed(div(sub(endYearEofArea, startYearEofArea), '10'))
  const netChangeFromThisTable = toFixed(netChange(tableData, column))
  if (!netChangeFromExtentOfForest || !netChangeFromThisTable) return {valid: true}
  return {
    valid: eq(netChangeFromExtentOfForest, netChangeFromThisTable),
    eofNetChange: netChangeFromExtentOfForest
  }
}

const yearIntervals = [
  [1, 1990, 2000],
  [2, 2000, 2010],
  [3, 2010, 2015],
  [4, 2015, 2020]
]

const netChangeValidator =
  (i18n, extentOfForest, startYear, endYear) =>  (props, row, column) => {
    const {valid, eofNetChange} = netChangeValid(props.tableData, column, extentOfForest, startYear, endYear)
    return {
      valid,
      message: valid
        ? null
        : i18n.t('forestAreaChange.netChangeDoesNotMatch', {eofNetChange: formatDecimal(eofNetChange)})
    }
}

export default (i18n, extentOfForest) => {
  return {
    name: 'forestAreaChange', // used to uniquely identify table
    header: <thead>
    <tr>
      <th className="fra-table__header-cell" rowSpan="2">{i18n.t('forestAreaChange.categoryHeader')}</th>
      <th className="fra-table__header-cell-middle" colSpan="4">{i18n.t('forestAreaChange.areaUnitLabel')}</th>
    </tr>
    <tr>
      {
        mapIndexed(
          ([_, startYear, endYear], i) => <td key={i} className="fra-table__header-cell-right">
            {`${startYear}-${endYear}`}
          </td>,
          yearIntervals
        )
      }
    </tr>
    </thead>,
    rows: [
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__category-cell">{i18n.t('forestAreaChange.forestExpansion')}</th>
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
          jsx: <th className="fra-table__category-cell">{i18n.t('forestAreaChange.deforestation')}</th>
        },
        ...integerInputColumns
      ],
      [
        {
          type: 'readOnly',
          jsx: <th className="fra-table__header-cell">{i18n.t('forestAreaChange.forestAreaNetChange')}</th>
        },
        ...mapIndexed(
          ([column, startYear, endYear]) => ({
            type: 'calculated',
            calculateValue: props => netChange(props.tableData, column),
            valueFormatter: formatDecimal,
            validator: netChangeValidator(i18n, extentOfForest, startYear, endYear)
          }),
          yearIntervals
        )

      ]
    ],
    valueSlice: {
      rowStart: 0,
      rowEnd: -1,
      columnStart: 1,
      columnEnd: undefined
    }
  }
}
