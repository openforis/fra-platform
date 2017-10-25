import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../utils/numberFormat'
import { sub, div, eq } from '../../common/bignumberUtils'
import { ofWhichValidator } from '../traditionalTable/validators'

const expansionValidator = ofWhichValidator(0, R.range(1, 3))

const integerInputColumns = R.times(() => ({type: 'decimalInput'}), 4)
const ofWhichColumns = R.times(() => ({type: 'decimalInput', validator: expansionValidator}), 4)

const netChange = (tableData, column) => sub(tableData[0][column], tableData[3][column])
const netChangeFormatted = (tableData, column) => formatDecimal(netChange(tableData, column))

const netChangeNotValid = (tableData, column, extentOfForest, startYear, endYear) => {
  if (!extentOfForest || R.isEmpty(extentOfForest)) return false
  const groupedByYear = R.groupBy(R.prop('name'), extentOfForest.fra)
  const startYearEofArea = R.path([startYear, 0, 'forestArea'], groupedByYear)
  const endYearEofArea = R.path([endYear, 0, 'forestArea'], groupedByYear)
  const netChangeFromExtentOfForest = div(sub(endYearEofArea, startYearEofArea), "10")
  const netChangeFromThisTable = netChange(tableData, column)
  if (!netChangeFromExtentOfForest || ! netChangeFromThisTable) return false
  return !eq(netChangeFromExtentOfForest, netChangeFromThisTable)
}

const netChangeCell = (column, extentOfForest, startYear, endYear) => (props) => {
  const validationClass =
    netChangeNotValid(props.tableData, column, extentOfForest, startYear, endYear)
      ? 'validation-error'
      : ''
  return <td key="" className={`fra-table__aggregate-cell ${validationClass}`}>
    {netChangeFormatted(props.tableData, column)}
  </td>
}

const validationErrors = extentOfForest => props => {
  const yearIntervals = [
    [1, 1990, 2000],
    [2, 2000, 2010],
    [3, 2010, 2015],
    [4, 2015, 2020]
  ]
  const validationResults = R.map(([column, startYear, endYear]) => {
      if (netChangeNotValid(props.tableData, column, extentOfForest, startYear, endYear)) {
        return "Net change doesn't match"
      } else {
        return null
      }
    },
    yearIntervals
  )
  return R.reject(R.isNil, validationResults)
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
      <td className="fra-table__header-cell-right">1990-2000</td>
      <td className="fra-table__header-cell-right">2000-2010</td>
      <td className="fra-table__header-cell-right">2010-2015</td>
      <td className="fra-table__header-cell-right">2015-2020</td>
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
        {type: 'custom', render: netChangeCell(1, extentOfForest, 1990, 2000)},
        {type: 'custom', render: netChangeCell(2, extentOfForest, 2000, 2010)},
        {type: 'custom', render: netChangeCell(3, extentOfForest, 2010, 2015)},
        {type: 'custom', render: netChangeCell(4, extentOfForest, 2015, 2020)}
      ]
    ],
    validationErrors: validationErrors(extentOfForest),
    valueSlice: {
      rowStart: 0,
      rowEnd: -1,
      columnStart: 1,
      columnEnd: undefined
    }
  }
}
