import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../utils/numberFormat'
import { sub, div, eq } from '../../common/bignumberUtils'
import { ofWhichValidator } from '../traditionalTable/validators'

const mapIndexed = R.addIndex(R.map)
const expansionValidator = ofWhichValidator(0, R.range(1, 3))

const integerInputColumns = R.times(() => ({type: 'decimalInput'}), 4)
const ofWhichColumns = R.times(() => ({type: 'decimalInput', validator: expansionValidator}), 4)

const netChange = (tableData, column) => sub(tableData[0][column], tableData[3][column])
const netChangeFormatted = (tableData, column) => formatDecimal(netChange(tableData, column))

const netChangeValid = (tableData, column, extentOfForest, startYear, endYear) => {
  if (!extentOfForest || R.isEmpty(extentOfForest)) return {valid: true}
  const groupedByYear = R.groupBy(R.prop('name'), extentOfForest.fra)
  const startYearEofArea = R.path([startYear, 0, 'forestArea'], groupedByYear)
  const endYearEofArea = R.path([endYear, 0, 'forestArea'], groupedByYear)
  const netChangeFromExtentOfForest = div(sub(endYearEofArea, startYearEofArea), "10")
  const netChangeFromThisTable = netChange(tableData, column)
  if (!netChangeFromExtentOfForest || ! netChangeFromThisTable) return {valid: true}
  return {
    valid: eq(netChangeFromExtentOfForest, netChangeFromThisTable),
    eofNetChange: netChangeFromExtentOfForest
  }
}

const netChangeCell = (column, extentOfForest, startYear, endYear) => (props) => {
  const {valid} = netChangeValid(props.tableData, column, extentOfForest, startYear, endYear)
  const validationClass =
    valid
      ? ''
      : 'validation-error'
  return <td key="" className={`fra-table__aggregate-cell ${validationClass}`}>
    {netChangeFormatted(props.tableData, column)}
  </td>
}

const yearIntervals = [
  [1, 1990, 2000],
  [2, 2000, 2010],
  [3, 2010, 2015],
  [4, 2015, 2020]
]

const validationErrors = extentOfForest => props => {
  return R.map(([column, startYear, endYear]) => {
      const {valid, eofNetChange} = netChangeValid(props.tableData, column, extentOfForest, startYear, endYear)
      if (!valid) {
        return `Net change doesn't match table 1a: ${formatDecimal(eofNetChange)}`
      } else {
        return null
      }
    },
    yearIntervals
  )
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
          ([_, startYear, endYear], i) =>  <td key={i} className="fra-table__header-cell-right">
              {`${startYear}-${endYear}`}
          </td>,
          yearIntervals
        )
      }
    </tr>
    </thead>,
    rows: [
      [{type: 'readOnly', jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('forestAreaChange.forestExpansion')}</td>},
        ...integerInputColumns
      ],
      [
        {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell-sub">{i18n.t('forestAreaChange.ofWhichAfforestation')}</td>},
        ...ofWhichColumns
      ],
      [
        {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell-sub">{i18n.t('forestAreaChange.ofWhichNaturalExpansion')}</td>},
        ...ofWhichColumns
      ],
      [
        {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell">{i18n.t('forestAreaChange.deforestation')}</td>},
        ...integerInputColumns
      ],
      [
        {type: 'readOnly', jsx: <td key="" className="fra-table__header-cell">{i18n.t('forestAreaChange.forestAreaNetChange')}</td>},
        ...mapIndexed(
          ([column, startYear, endYear]) => ({type: 'custom', render: netChangeCell(column, extentOfForest, startYear, endYear)}),
          yearIntervals
        )
      ]
    ],
    columnValidationErrors: validationErrors(extentOfForest),
    valueSlice: {
      rowStart: 0,
      rowEnd: -1,
      columnStart: 1,
      columnEnd: undefined
    }
  }
}
